//! `ab trace <id>` — 상자 · 객체 · 데이터 · 창 · 유즈케이스 하나를 둘러싼 것을 한 번에 모아 보인다.
use crate::board::{cut, Board};

pub fn run(bd: &Board, id: &str) -> bool {
    let names = bd.el_names();
    let mut hit = false;

    if let Some(e) = bd.els.iter().find(|e| e.get("id").s() == id) {
        hit = true;
        println!("## 상자 {} — {}", id, e.get("n").s());
        println!("창 {} · 종류 {} · 상태 {}", e.get("f").s(), e.get("t").s(), if e.get("s").s().is_empty() { "-" } else { e.get("s").s() });
        if !e.get("d").s().is_empty() {
            println!("{}", cut(e.get("d").s(), 200));
        }
        let nm = |k: &str| names.get(k).copied().unwrap_or("?").to_string();
        for (a, b, t) in &bd.rels {
            if a == id {
                println!("  → {} {} ({})", b, nm(b), t);
            }
            if b == id {
                println!("  ← {} {} ({})", a, nm(a), t);
            }
        }
        // 이 상자가 세로 줄인 유즈케이스
        for (lane, v) in bd.b.get("lanes").entries() {
            if v.at(1).s() == id {
                for u in bd.usecases() {
                    if u.get("lanes").arr().iter().any(|l| l.s() == lane) {
                        let n = u.get("steps").arr().iter().filter(|s| s.at(0).s() == lane || s.at(1).s() == lane).count();
                        println!("  유즈케이스 {} — {}에서 {}칸", u.get("id").s(), cut(u.get("t").s(), 24), n);
                    }
                }
            }
        }
    }

    if let Some((_, o)) = bd.objects().iter().find(|(k, _)| k == id) {
        hit = true;
        println!("## 객체 {} — {} [{}]", id, o.get("name").s(), o.get("kind").s());
        for (k, label) in [("one", "한 줄"), ("what", "무엇"), ("why", "왜")] {
            if !o.get(k).s().is_empty() {
                println!("{}: {}", label, cut(o.get(k).s(), 160));
            }
        }
        for (k, label) in [("files", "파일"), ("calls", "부르는 것"), ("holds", "들고 있는 것"), ("fails", "실패하면"), ("change", "고칠 때")] {
            let v = o.get(k).strs();
            if !v.is_empty() {
                println!("{}: {}", label, v.iter().map(|s| cut(s, 70)).collect::<Vec<_>>().join(" | "));
            }
        }
        for d in bd.data() {
            for (k, mark) in [("w", "쓴다"), ("r", "읽는다")] {
                for p in d.get(k).arr() {
                    if p.at(0).s() == id {
                        println!("  데이터 {} {} — {} ({})", d.get("id").s(), d.get("n").s(), mark, cut(p.at(1).s(), 40));
                    }
                }
            }
        }
    }

    if let Some(d) = bd.data().iter().find(|d| d.get("id").s() == id) {
        hit = true;
        println!("## 데이터 {} — {} @{}", id, d.get("n").s(), d.get("st").s());
        println!("{}", cut(d.get("one").s(), 160));
        for (k, label) in [("w", "쓰는 곳"), ("r", "읽는 곳")] {
            for p in d.get(k).arr() {
                let who = if p.at(0).s().is_empty() { "사람" } else { p.at(0).s() };
                println!("  {} {} — {}", label, who, cut(p.at(1).s(), 50));
            }
        }
        let t = d.get("tests").strs();
        if !t.is_empty() {
            println!("시험: {}", t.join(", "));
        }
    }

    if let Some(f) = bd.frames().iter().find(|f| f.get("id").s() == id) {
        hit = true;
        println!("## 창 {} — {} [{}]", id, f.get("title").s(), f.get("layout").s());
        for e in bd.els.iter().filter(|e| e.get("f").s() == id) {
            println!("  - {} {} [{}]", e.get("id").s(), cut(e.get("n").s(), 30), e.get("t").s());
        }
    }

    if let Some(u) = bd.usecases().iter().find(|u| u.get("id").s() == id) {
        hit = true;
        println!("## 유즈케이스 {} — {}", id, u.get("t").s());
        for (i, s) in u.get("steps").arr().iter().enumerate() {
            let mut line = format!("  {}. {} → {}: {}", i, s.at(0).s(), s.at(1).s(), cut(s.at(2).s(), 50));
            if !s.at(3).s().is_empty() {
                line.push_str(&format!("  [{}]", cut(s.at(3).s(), 40)));
            }
            println!("{}", line);
        }
    }

    if !hit {
        eprintln!("`{}`를 상자 · 객체 · 데이터 · 창 · 유즈케이스에서 찾지 못했다", id);
    }
    hit
}
