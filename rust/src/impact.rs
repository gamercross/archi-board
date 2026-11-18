//! `ab impact <id>` — 상자 하나(보통 요구)가 바뀌면 다시 볼 곳을 모은다. 엔진 1.6의 "바뀌면 다시 볼 곳"과 같은 규칙이다.
//! 바로 이어진 상자 → 그 상자에서 한 번 더(동기 층 상자로는 올라가지 않는다) → 같은 id의 객체 → 그 객체가 쓰고 읽는 데이터
//! → 그 상자 · 객체가 나오는 유즈케이스 → 시험 · 코드 파일.
use crate::board::{cut, Board};
use crate::value::V;

/// 동기 층 종류 — 영향이 목표 · 원칙 쪽으로 번지지 않게 여기서 멈춘다
const MOT: &[&str] = &["stakeholder", "driver", "assessment", "goal", "outcome", "principle", "constraint", "requirement", "meaning", "value"];

#[derive(Debug, Default)]
pub struct Impact {
    pub l1: Vec<String>,
    pub l2: Vec<String>,
    pub objs: Vec<String>,
    pub data: Vec<String>,
    pub ucs: Vec<String>,
    pub tests: Vec<String>,
    pub code: Vec<String>,
}

fn push(v: &mut Vec<String>, s: &str) {
    if !s.is_empty() && !v.iter().any(|x| x == s) {
        v.push(s.to_string());
    }
}

pub fn compute(bd: &Board, id: &str) -> Option<Impact> {
    let el = |x: &str| bd.els.iter().find(|e| e.get("id").s() == x);
    let me = el(id)?;
    let is_mot = |x: &str| el(x).map(|e| MOT.contains(&e.get("t").s())).unwrap_or(false);
    let nb = |x: &str| -> Vec<String> {
        let mut v = Vec::new();
        for (a, b, _) in &bd.rels {
            let o = if a == x { b } else if b == x { a } else { continue };
            if o != x && el(o).is_some() {
                push(&mut v, o);
            }
        }
        v
    };
    let mut m = Impact { l1: nb(id), ..Default::default() };
    for x in m.l1.clone() {
        if is_mot(&x) {
            continue;
        }
        for y in nb(&x) {
            if y != id && !m.l1.contains(&y) && !is_mot(&y) {
                push(&mut m.l2, &y);
            }
        }
    }
    let mut all = vec![id.to_string()];
    all.extend(m.l1.iter().cloned());
    all.extend(m.l2.iter().cloned());
    let has = |v: &[String], s: &str| v.iter().any(|x| x == s);

    for x in &all {
        if bd.objects().iter().any(|(k, _)| k == x) {
            push(&mut m.objs, x);
        }
    }
    let mut dvs: Vec<&V> = Vec::new();
    for d in bd.data() {
        if ["w", "r", "v"].iter().any(|k| d.get(k).arr().iter().any(|p| has(&m.objs, p.at(0).s()))) {
            push(&mut m.data, d.get("id").s());
            dvs.push(d);
        }
    }
    // 세로 줄 → 상자(lanes[k][1]), 객체는 laneMap이 있으면 그쪽 (엔진의 L2O와 같다)
    let lanes = bd.b.get("lanes");
    let lane_map = bd.b.get("objectMap").get("laneMap");
    for u in bd.usecases() {
        let by_lane = u.get("lanes").arr().iter().any(|k| {
            let k = k.s();
            let e = lanes.get(k).at(1).s();
            let o = if lane_map.get(k).s().is_empty() { if e.is_empty() { k } else { e } } else { lane_map.get(k).s() };
            has(&all, e) || has(&m.objs, o)
        });
        if by_lane || u.get("rel").arr().iter().any(|x| has(&all, x.s())) {
            push(&mut m.ucs, u.get("id").s());
        }
    }
    for t in me.get("tests").strs() {
        push(&mut m.tests, t);
    }
    for d in &dvs {
        for t in d.get("tests").strs() {
            push(&mut m.tests, t);
        }
    }
    for x in &all {
        if let Some(e) = el(x) {
            push(&mut m.code, e.get("c").s());
        }
    }
    for o in m.objs.clone() {
        if let Some((_, ov)) = bd.objects().iter().find(|(k, _)| *k == o) {
            for f in ov.get("files").strs() {
                push(&mut m.code, f);
            }
        }
    }
    Some(m)
}

pub fn run(bd: &Board, id: &str) -> bool {
    let Some(m) = compute(bd, id) else {
        eprintln!("`{}`를 상자에서 찾지 못했다 (ab impact는 상자 id를 받는다)", id);
        return false;
    };
    let names = bd.el_names();
    let me = bd.els.iter().find(|e| e.get("id").s() == id).unwrap();
    let no = me.get("no").s();
    println!(
        "## 바뀌면 다시 볼 곳 — {} {} [{}{}]",
        id,
        cut(me.get("n").s(), 40),
        me.get("t").s(),
        if no.is_empty() { String::new() } else { format!(" {}", no) }
    );
    let line = |label: &str, v: &[String], named: bool| {
        if v.is_empty() {
            return;
        }
        let items: Vec<String> = v
            .iter()
            .map(|x| if named { format!("{} {}", x, cut(names.get(x.as_str()).copied().unwrap_or(""), 20)).trim().to_string() } else { x.clone() })
            .collect();
        println!("{} {}: {}", label, v.len(), items.join(" · "));
    };
    line("바로 이어진 상자", &m.l1, true);
    line("한 번 더 건너 이어진 상자", &m.l2, true);
    line("객체", &m.objs, false);
    line("데이터", &m.data, false);
    line("유즈케이스", &m.ucs, false);
    line("시험", &m.tests, false);
    line("코드 · 파일", &m.code, false);
    if m.l1.is_empty() {
        println!("이어진 상자가 없다 — relations에 선을 이으면 바뀔 때 흔들리는 곳이 보인다");
    }
    true
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::board::from_src;

    #[test]
    fn follows_two_steps_and_stops_at_motivation() {
        let bd = from_src(
            r#"window.BOARD = {format: 1, frames: [{id: 'w'}, {id: 'p'}],
  elements: [
    {f: 'w', id: 'rq', t: 'requirement', n: '끊겨도 남는다', tests: ['tests/a.test.js']},
    {f: 'w', id: 'g', t: 'goal', n: '빨리'},
    {f: 'w', id: 'g2', t: 'goal', n: '멀리'},
    {f: 'p', id: 'web', t: 'acomp', n: '화면', c: 'web/app.js'},
    {f: 'p', id: 'api', t: 'acomp', n: '서버', c: 'server/api.js'},
    {f: 'p', id: 'db', t: 'node', n: 'DB'},
    {f: 'p', id: 'far', t: 'node', n: '먼 곳'}
  ],
  relations: [['web', 'rq', 'realization'], ['rq', 'g', 'realization'], ['g', 'g2', 'association'],
              ['web', 'api', 'flow'], ['db', 'api', 'serving'], ['db', 'far', 'serving']],
  lanes: {u: ['화면', 'web'], s: ['서버', 'api']},
  usecases: [{id: 'save', f: 'p', lanes: ['u', 's'], steps: [['u', 's', '저장']]}],
  objectMap: {objects: {web: {name: '화면', files: ['web/text.js']}, api: {name: '서버'}}},
  dataMap: {data: [{id: 'd1', n: '초안', w: [['web', '쓴다']], tests: ['tests/d.test.js']}, {id: 'd2', n: '딴 것', w: [['zz', '쓴다']]}]}
};"#,
        )
        .unwrap();
        let m = compute(&bd, "rq").unwrap();
        assert_eq!(m.l1, ["web", "g"]);
        assert_eq!(m.l2, ["api"]); // 목표 g에서 g2로는 건너가지 않는다, db는 세 걸음이라 빠진다
        assert_eq!(m.objs, ["web", "api"]);
        assert_eq!(m.data, ["d1"]);
        assert_eq!(m.ucs, ["save"]);
        assert_eq!(m.tests, ["tests/a.test.js", "tests/d.test.js"]);
        assert_eq!(m.code, ["web/app.js", "server/api.js", "web/text.js"]);
        assert!(compute(&bd, "nope").is_none());
    }
}
