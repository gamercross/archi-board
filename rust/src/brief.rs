//! `ab brief` — 보드 한 장을 한 화면에 읽히는 글로 줄인다. 처음 보는 사람도 · AI도 이것부터 읽으면 된다.
use crate::board::{cut, Board};
use std::collections::{BTreeMap, HashMap};

pub fn run(bd: &Board) {
    let b = &bd.b;
    println!("# {}", b.get("title").s());
    if !b.get("sub").s().is_empty() {
        println!("{}", b.get("sub").s());
    }
    let uc = bd.usecases();
    println!(
        "\n창 {} · 상자 {} · 관계 {} · 유즈케이스 {} · 객체 {} · 데이터 {} · 판단 {} · 카드 {}",
        bd.frames().len(),
        bd.els.len(),
        bd.rels.len(),
        uc.len(),
        bd.objects().len(),
        bd.data().len(),
        bd.insights().len(),
        b.get("cards").arr().len()
    );

    // 창
    println!("\n## 창");
    let mut per: HashMap<&str, usize> = HashMap::new();
    for e in &bd.els {
        *per.entry(e.get("f").s()).or_default() += 1;
    }
    for f in bd.frames() {
        let id = f.get("id").s();
        let lay = if f.get("layout").s().is_empty() { "rows" } else { f.get("layout").s() };
        println!("- {} [{}] {} — 상자 {}", id, lay, cut(f.get("title").s(), 40), per.get(id).unwrap_or(&0));
    }

    // 상태
    let mut st: BTreeMap<&str, usize> = BTreeMap::new();
    for e in &bd.els {
        let s = e.get("s").s();
        if !s.is_empty() {
            *st.entry(s).or_default() += 1;
        }
    }
    if !st.is_empty() {
        let t: Vec<String> = st.iter().map(|(k, v)| format!("{} {}", k, v)).collect();
        println!("\n## 상태\n{}", t.join(" · "));
    }

    // 허브와 외톨이
    let names = bd.el_names();
    let mut deg: HashMap<&str, (usize, usize)> = HashMap::new();
    for (a, c, _) in &bd.rels {
        deg.entry(a.as_str()).or_default().1 += 1;
        deg.entry(c.as_str()).or_default().0 += 1;
    }
    let mut hubs: Vec<(&&str, &(usize, usize))> = deg.iter().collect();
    hubs.sort_by(|x, y| (y.1 .0 + y.1 .1).cmp(&(x.1 .0 + x.1 .1)).then(x.0.cmp(y.0)));
    if !hubs.is_empty() {
        println!("\n## 이어진 것이 많은 상자 (받는 · 보내는)");
        for (id, (i, o)) in hubs.iter().take(8) {
            println!("- {} {} ({} · {})", id, cut(names.get(*id).copied().unwrap_or("?"), 24), i, o);
        }
    }
    let lone: Vec<&str> = bd.els.iter().map(|e| e.get("id").s()).filter(|id| !deg.contains_key(id)).collect();
    if !lone.is_empty() {
        println!("\n## 어디와도 안 이어진 상자 {}개", lone.len());
        println!("{}", lone.iter().take(20).cloned().collect::<Vec<_>>().join(" · "));
    }

    // 유즈케이스
    if !uc.is_empty() {
        println!("\n## 유즈케이스");
        for u in uc {
            let sc = u.get("story").get("scenes").arr().len();
            println!(
                "- {} {} — {}칸{}",
                u.get("id").s(),
                cut(u.get("t").s(), 30),
                u.get("steps").arr().len(),
                if sc > 0 { format!(" · 장면 {}", sc) } else { String::new() }
            );
        }
    }

    // 객체 지도
    if !bd.objects().is_empty() {
        println!("\n## 객체 (한 줄 설명 · 파일)");
        for (id, o) in bd.objects() {
            let files: Vec<&str> = o.get("files").strs();
            println!(
                "- {} {} [{}] {}{}",
                id,
                cut(o.get("name").s(), 20),
                o.get("kind").s(),
                cut(o.get("one").s(), 40),
                if files.is_empty() { String::new() } else { format!(" · {}", files.join(", ")) }
            );
        }
    }

    // 데이터 지도
    if !bd.data().is_empty() {
        println!("\n## 데이터 (쓰는 곳 → 읽는 곳)");
        for d in bd.data() {
            let who = |k: &str| -> String {
                let v: Vec<&str> = d.get(k).arr().iter().map(|p| p.at(0).s()).map(|s| if s.is_empty() { "사람" } else { s }).collect();
                v.join(",")
            };
            println!("- {} {} @{} · {} → {}", d.get("id").s(), cut(d.get("n").s(), 20), d.get("st").s(), who("w"), who("r"));
        }
    }

    // 판단 · 차트
    if !bd.insights().is_empty() {
        println!("\n## 판단 · 차트");
        for x in bd.insights() {
            println!("- {} [{}] {}", x.get("id").s(), x.get("type").s(), cut(x.get("t").s(), 40));
        }
    }

    // 근거가 얼마나 달려 있나
    let mut basis = 0usize;
    for u in uc {
        for sc in u.get("story").get("scenes").arr() {
            basis += sc.get("basis").strs().len();
        }
    }
    for x in bd.insights() {
        basis += x.get("basis").strs().len();
    }
    println!("\n## 근거\n장면 · 판단에 달린 근거 {}개 (코드와 맞는지는 `ab drift`로 본다)", basis);
}
