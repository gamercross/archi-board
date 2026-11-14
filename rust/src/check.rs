//! `ab check` — 빠른 연결 점검. id가 겹치거나 가리키는 곳이 없으면 잡는다.
//! 글자 수 한도 · 종류 표 · 판단 차트 모양은 엔진이 알아야 하니 `node check.mjs`가 맡는다.
use crate::board::Board;
use std::collections::HashSet;

pub fn run(bd: &Board) -> (Vec<String>, Vec<String>) {
    let (mut errs, mut warns) = (vec![], vec![]);
    let b = &bd.b;
    let dup = |what: &str, ids: Vec<&str>, errs: &mut Vec<String>| -> HashSet<String> {
        let mut s = HashSet::new();
        for id in ids {
            if !s.insert(id.to_string()) {
                errs.push(format!("{} id가 겹친다: {}", what, id));
            }
        }
        s
    };
    let fid = dup("창", bd.frames().iter().map(|f| f.get("id").s()).collect(), &mut errs);
    let eid = dup("상자", bd.els.iter().map(|e| e.get("id").s()).collect(), &mut errs);
    let uid = dup("유즈케이스", bd.usecases().iter().map(|u| u.get("id").s()).collect(), &mut errs);
    let objs: HashSet<&str> = bd.objects().iter().map(|(k, _)| k.as_str()).collect();

    for e in &bd.els {
        let id = e.get("id").s();
        if !fid.contains(e.get("f").s()) {
            errs.push(format!("상자 {}: 없는 창 {}", id, e.get("f").s()));
        }
        if e.get("n").s().is_empty() {
            errs.push(format!("상자 {}: 이름(n)이 없다", id));
        }
        for k in e.get("kids").strs() {
            if !eid.contains(k) {
                errs.push(format!("상자 {}: kids의 {}가 상자에 없다", id, k));
            }
        }
        let see = e.get("see").s();
        if !see.is_empty() && !eid.contains(see) && !fid.contains(see) && !objs.contains(see) {
            errs.push(format!("상자 {}: see의 {}를 찾을 수 없다", id, see));
        }
    }
    for (a, c, t) in &bd.rels {
        for x in [a, c] {
            if !eid.contains(x.as_str()) {
                errs.push(format!("관계 {} → {}: {}가 상자에 없다", a, c, x));
            }
        }
        if t.is_empty() {
            errs.push(format!("관계 {} → {}: 종류가 비었다", a, c));
        }
    }
    for fl in b.get("flows").arr() {
        let (a, c) = if matches!(fl, crate::value::V::Arr(_)) { (fl.at(0).s(), fl.at(1).s()) } else { (fl.get("from").s(), fl.get("to").s()) };
        for x in [a, c] {
            if !fid.contains(x) {
                errs.push(format!("흐름 {} → {}: 없는 창 {}", a, c, x));
            }
        }
    }
    for (i, t) in b.get("tour").arr().iter().enumerate() {
        for f in t.get("f").strs() {
            if !fid.contains(f) {
                errs.push(format!("따라가기 {}: 없는 창 {}", i + 1, f));
            }
        }
        for x in t.get("ids").strs() {
            if !eid.contains(x) {
                errs.push(format!("따라가기 {}: 없는 상자 {}", i + 1, x));
            }
        }
    }
    let lanes = b.get("lanes");
    for (k, v) in lanes.entries() {
        if !eid.contains(v.at(1).s()) {
            errs.push(format!("세로 줄 {}: 상자 {}가 없다", k, v.at(1).s()));
        }
    }
    for u in bd.usecases() {
        let id = u.get("id").s();
        if !fid.contains(u.get("f").s()) {
            errs.push(format!("유즈케이스 {}: 없는 창 {}", id, u.get("f").s()));
        }
        let ls: Vec<&str> = u.get("lanes").strs();
        for l in &ls {
            if !lanes.has(l) {
                errs.push(format!("유즈케이스 {}: 없는 세로 줄 {}", id, l));
            }
        }
        let n = u.get("steps").arr().len() as f64;
        for (i, s) in u.get("steps").arr().iter().enumerate() {
            for x in [s.at(0).s(), s.at(1).s()] {
                if !ls.contains(&x) {
                    errs.push(format!("유즈케이스 {} {}칸: 줄 {}가 lanes에 없다", id, i + 1, x));
                }
            }
            if s.at(2).s().is_empty() {
                errs.push(format!("유즈케이스 {} {}칸: 하는 일이 비었다", id, i + 1));
            }
        }
        let st = u.get("story");
        for k in ["who", "goal"] {
            let v = st.get(k).s();
            if !v.is_empty() && !eid.contains(v) {
                errs.push(format!("유즈케이스 {} story: {}의 {}가 상자에 없다", id, k, v));
            }
        }
        let mut seen: Vec<f64> = vec![];
        for (k, sc) in st.get("scenes").arr().iter().enumerate() {
            let ss: Vec<f64> = match sc.get("steps") {
                crate::value::V::Num(x) => vec![*x],
                crate::value::V::Arr(a) => a.iter().filter_map(|v| v.num()).collect(),
                _ => vec![],
            };
            if ss.is_empty() {
                errs.push(format!("유즈케이스 {} story: 장면 {}에 steps가 없다", id, k + 1));
            }
            for i in ss {
                if i < 0.0 || i >= n || i.fract() != 0.0 {
                    errs.push(format!("유즈케이스 {} story: 장면 {}의 칸 번호 {}가 범위 밖이다", id, k + 1, i));
                } else if seen.contains(&i) {
                    errs.push(format!("유즈케이스 {} story: 칸 {}가 두 장면에 들어 있다", id, i));
                } else if seen.last().map_or(false, |l| i < *l) {
                    errs.push(format!("유즈케이스 {} story: 장면 {}의 칸 {}가 앞 장면보다 앞선다", id, k + 1, i));
                } else {
                    seen.push(i);
                }
            }
            if !sc.get("sees").s().is_empty() && sc.get("basis").strs().is_empty() {
                warns.push(format!("유즈케이스 {} story: 장면 {}에 sees는 있는데 basis가 없다", id, k + 1));
            }
        }
    }
    // 객체 지도
    let om = b.get("objectMap");
    if !om.is_null() {
        let mut inpkg = HashSet::new();
        for p in om.get("packages").arr() {
            for id in p.get("ids").strs() {
                if !objs.contains(id) {
                    errs.push(format!("묶음 {}: 객체 {}가 objects에 없다", p.get("id").s(), id));
                }
                inpkg.insert(id);
            }
        }
        for (id, o) in bd.objects() {
            if !inpkg.contains(id.as_str()) {
                warns.push(format!("객체 {}: 어느 묶음에도 없어 지도에 안 나온다", id));
            }
            if o.get("name").s().is_empty() {
                errs.push(format!("객체 {}: name이 없다", id));
            }
        }
        for e in om.get("extra").arr() {
            for x in [e.at(0).s(), e.at(1).s()] {
                if !objs.contains(x) {
                    errs.push(format!("extra: 없는 객체 {}", x));
                }
            }
        }
        for j in om.get("journey").strs() {
            if !uid.contains(j) {
                errs.push(format!("journey: 없는 유즈케이스 {}", j));
            }
        }
    }
    // 데이터 지도
    let dm = b.get("dataMap");
    if !dm.is_null() {
        let sid = dup("놓이는 곳", dm.get("stores").arr().iter().map(|s| s.get("id").s()).collect(), &mut errs);
        let did = dup("데이터", bd.data().iter().map(|d| d.get("id").s()).collect(), &mut errs);
        for d in bd.data() {
            let id = d.get("id").s();
            if !sid.contains(d.get("st").s()) {
                errs.push(format!("데이터 {}: 없는 놓이는 곳 {}", id, d.get("st").s()));
            }
            for k in ["w", "r", "v"] {
                for p in d.get(k).arr() {
                    let o = p.at(0).s();
                    if !o.is_empty() && !objs.contains(o) {
                        errs.push(format!("데이터 {}.{}: 객체 지도에 없는 {}", id, k, o));
                    }
                }
            }
            if d.get("w").arr().is_empty() {
                warns.push(format!("데이터 {}: 쓰는 곳(w)이 없다", id));
            }
            if d.get("r").arr().is_empty() {
                warns.push(format!("데이터 {}: 읽는 곳(r)이 없다", id));
            }
        }
        for (i, s) in dm.get("flow").arr().iter().enumerate() {
            let o = s.get("o").s();
            if !o.is_empty() && !objs.contains(o) {
                errs.push(format!("한 줄 흐름 {}: 없는 객체 {}", i + 1, o));
            }
            for x in s.get("dm").strs() {
                if !did.contains(x) {
                    errs.push(format!("한 줄 흐름 {}: 없는 데이터 {}", i + 1, x));
                }
            }
        }
    }
    let iid = dup("판단", bd.insights().iter().map(|x| x.get("id").s()).collect(), &mut errs);
    for f in bd.frames().iter().filter(|f| f.get("layout").s() == "insight") {
        for x in f.get("insights").strs() {
            if !iid.contains(x) {
                errs.push(format!("창 {}: insights의 {}가 B.insights에 없다", f.get("id").s(), x));
            }
        }
    }
    for x in bd.insights() {
        let f = x.get("f").s();
        if !f.is_empty() && !fid.contains(f) {
            errs.push(format!("판단 {}: 없는 창 {}", x.get("id").s(), f));
        }
        if x.get("basis").strs().is_empty() {
            warns.push(format!("판단 {}: basis(근거)가 없다", x.get("id").s()));
        }
    }
    for col in b.get("arrange").arr() {
        for row in col.arr() {
            let ids: Vec<&str> = if let crate::value::V::Arr(_) = row { row.arr().iter().map(|v| v.s()).collect() } else { vec![row.s()] };
            for id in ids {
                if !fid.contains(id) {
                    errs.push(format!("arrange: 없는 창 {}", id));
                }
            }
        }
    }
    let st = b.get("start").s();
    if !st.is_empty() && !fid.contains(st) {
        errs.push(format!("start: 없는 창 {}", st));
    }
    (errs, warns)
}
