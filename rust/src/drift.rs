//! `ab drift` — 보드가 근거로 단 파일 · 줄이 코드에 아직 있는지, 보드를 쓴 뒤에 코드가 바뀌었는지 본다.
use crate::board::Board;
use std::collections::{BTreeMap, BTreeSet};
use std::path::{Path, PathBuf};
use std::process::Command;

const EXT: &[&str] = &[
    "js", "mjs", "cjs", "ts", "tsx", "jsx", "py", "go", "rs", "java", "kt", "rb", "php", "cs", "swift", "c", "h", "cpp", "hpp", "sql", "json", "yml", "yaml",
    "toml", "md", "html", "css", "vue", "svelte", "sh", "prisma", "graphql", "proto", "svg",
];

/// 글에서 `경로[:줄]` 꼴을 뽑는다. 뒤에 붙은 한글 조사("web/text.js에")는 떼어 낸다.
pub fn paths_in(text: &str) -> Vec<(String, Option<usize>)> {
    let mut out = vec![];
    for tok in text.split(|c: char| c.is_whitespace() || ",;()[]\"'`·—|".contains(c)) {
        if tok.contains("://") {
            continue;
        }
        let body: String = tok.chars().take_while(|c| c.is_ascii_alphanumeric() || "_-./@".contains(*c)).collect();
        let body = body.trim_end_matches('.').trim_start_matches("./");
        let ext = body.rsplit('.').next().unwrap_or("");
        if !body.contains('.') || !EXT.contains(&ext.to_ascii_lowercase().as_str()) || body.starts_with('.') && !body.contains('/') {
            continue;
        }
        let rest = &tok[tok.char_indices().nth(body.chars().count() + if tok.starts_with("./") { 2 } else { 0 }).map(|x| x.0).unwrap_or(tok.len())..];
        let line = rest.strip_prefix(':').and_then(|r| r.chars().take_while(|c| c.is_ascii_digit()).collect::<String>().parse().ok());
        out.push((body.to_string(), line));
    }
    out
}

fn index(dir: &Path, m: &mut std::collections::HashMap<String, Vec<PathBuf>>, depth: usize) {
    let Ok(rd) = std::fs::read_dir(dir) else { return };
    for e in rd.flatten() {
        let name = e.file_name().to_string_lossy().to_string();
        let Ok(ft) = e.file_type() else { continue };
        if ft.is_dir() {
            if depth < 10 && !name.starts_with('.') && !matches!(name.as_str(), "node_modules" | "target" | "dist" | "build" | "vendor" | "__pycache__") {
                index(&e.path(), m, depth + 1);
            }
        } else if ft.is_file() {
            m.entry(name).or_default().push(e.path());
        }
    }
}

fn git_time(root: &Path, rel: &str) -> Option<i64> {
    let o = Command::new("git").arg("-C").arg(root).args(["log", "-1", "--format=%ct", "--", rel]).output().ok()?;
    String::from_utf8_lossy(&o.stdout).trim().parse().ok()
}

fn top_level(dir: &Path) -> Option<PathBuf> {
    let o = Command::new("git").arg("-C").arg(dir).args(["rev-parse", "--show-toplevel"]).output().ok()?;
    if !o.status.success() {
        return None;
    }
    Some(PathBuf::from(String::from_utf8_lossy(&o.stdout).trim()))
}

pub fn run(bd: &Board, board_file: &Path, root: Option<PathBuf>) -> bool {
    let bdir = board_file.parent().map(|p| p.to_path_buf()).filter(|p| !p.as_os_str().is_empty()).unwrap_or_else(|| PathBuf::from("."));
    let root = root.or_else(|| top_level(&bdir)).unwrap_or_else(|| bdir.clone());

    // (어디서, 글)
    let mut texts: Vec<(String, String)> = vec![];
    for u in bd.usecases() {
        for (i, sc) in u.get("story").get("scenes").arr().iter().enumerate() {
            for s in sc.get("basis").strs() {
                texts.push((format!("유즈케이스 {} 장면 {}", u.get("id").s(), i + 1), s.to_string()));
            }
        }
    }
    for x in bd.insights() {
        for s in x.get("basis").strs() {
            texts.push((format!("판단 {}", x.get("id").s()), s.to_string()));
        }
    }
    for (id, o) in bd.objects() {
        for k in ["files", "change", "basis"] {
            for s in o.get(k).strs() {
                texts.push((format!("객체 {}", id), s.to_string()));
            }
        }
    }
    for d in bd.data() {
        for k in ["tests", "change", "basis"] {
            for s in d.get(k).strs() {
                texts.push((format!("데이터 {}", d.get("id").s()), s.to_string()));
            }
        }
    }

    // 파일 → 그 파일을 근거로 단 곳들
    let mut by: BTreeMap<String, (BTreeSet<String>, Option<usize>)> = BTreeMap::new();
    for (wh, t) in &texts {
        for (p, ln) in paths_in(t) {
            let e = by.entry(p).or_default();
            e.0.insert(wh.clone());
            e.1 = e.1.max(ln);
        }
    }

    let board_t = git_time(&root, &board_file.strip_prefix(&root).unwrap_or(board_file).to_string_lossy()).or_else(|| {
        std::fs::metadata(board_file).ok()?.modified().ok()?.duration_since(std::time::UNIX_EPOCH).ok().map(|d| d.as_secs() as i64)
    });
    // 이름만 적은 근거("check.mjs")는 폴더 안에서 같은 이름이 하나뿐일 때 그 파일로 본다
    let mut by_name: Option<std::collections::HashMap<String, Vec<PathBuf>>> = None;
    let (mut missing, mut short, mut newer, mut ok) = (vec![], vec![], vec![], 0usize);
    for (p, (wh, ln)) in &by {
        let mut found = [root.join(p), bdir.join(p)].into_iter().find(|c| c.is_file());
        if found.is_none() && !p.contains('/') {
            let idx = by_name.get_or_insert_with(|| {
                let mut m = std::collections::HashMap::new();
                index(&root, &mut m, 0);
                m
            });
            if let Some(v) = idx.get(p.as_str()).filter(|v| v.len() == 1) {
                found = Some(v[0].clone());
            }
        }
        let Some(f) = found else {
            missing.push((p.clone(), wh.iter().next().cloned().unwrap_or_default(), wh.len()));
            continue;
        };
        ok += 1;
        if let Some(n) = ln {
            let lines = std::fs::read_to_string(&f).map(|s| s.lines().count()).unwrap_or(0);
            if *n > lines {
                short.push((p.clone(), *n, lines));
            }
        }
        if let (Some(bt), Ok(rel)) = (board_t, f.strip_prefix(&root)) {
            if let Some(ft) = git_time(&root, &rel.to_string_lossy()) {
                if ft > bt {
                    newer.push((rel.to_string_lossy().to_string(), (ft - bt) / 86400, wh.iter().take(3).cloned().collect::<Vec<_>>().join(" · ")));
                }
            }
        }
    }

    println!("근거로 단 파일 {}개 (근거 글 {}개에서) — 있음 {} · 없음 {}", by.len(), texts.len(), ok, missing.len());
    if !missing.is_empty() {
        println!("\n## 코드에 없는 파일 (옮겼거나 지웠다면 보드를 고친다)");
        for (p, wh, n) in &missing {
            println!("- {}  ← {}{}", p, wh, if *n > 1 { format!(" 외 {}곳", n - 1) } else { String::new() });
        }
    }
    if !short.is_empty() {
        println!("\n## 가리킨 줄이 파일 끝을 넘음");
        for (p, n, l) in &short {
            println!("- {}:{} (파일은 {}줄)", p, n, l);
        }
    }
    if !newer.is_empty() {
        newer.sort_by(|a, b| b.1.cmp(&a.1));
        println!("\n## 보드를 쓴 뒤에 고쳐진 파일 — 보드 설명이 낡았을 수 있다");
        for (p, d, who) in &newer {
            println!("- {} (보드보다 {}일 뒤) ← {}", p, d, who);
        }
    }
    if missing.is_empty() && short.is_empty() && newer.is_empty() {
        println!("어긋남 없음");
    }
    missing.is_empty() && short.is_empty()
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn picks_paths() {
        let v = paths_in("web/app.js — 입력칸, web/text.js에 모여 있다, src/a.rs:42-50 (db/schema.sql)");
        let names: Vec<&str> = v.iter().map(|x| x.0.as_str()).collect();
        assert_eq!(names, ["web/app.js", "web/text.js", "src/a.rs", "db/schema.sql"]);
        assert_eq!(v[2].1, Some(42));
        assert!(paths_in("localStorage memo:draft https://x.com/a.js POST /api/notes").is_empty());
    }
}
