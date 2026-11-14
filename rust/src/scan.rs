//! `ab scan <폴더>` — 코드베이스를 한 번 훑어 보드의 재료(어떤 언어 · 진입점 · 경로 · 표 · 환경 변수 · 많이 불리는 파일)를 모은다.
//! 짐작은 하지 않고 글자 모양으로 찾은 것만 줄 번호와 함께 적는다. 보드에 쓸 때는 그 줄을 다시 열어 확인한다.
use std::collections::{BTreeMap, HashMap};
use std::fs;
use std::path::{Path, PathBuf};

const SKIP_DIR: &[&str] = &[
    "node_modules", ".git", "target", "dist", "build", ".next", ".nuxt", "__pycache__", ".venv", "venv", "vendor", ".idea", ".gradle", "out", "coverage", ".cache",
    "Pods", ".turbo", ".svelte-kit",
];
const CODE: &[&str] = &[
    "js", "mjs", "cjs", "ts", "tsx", "jsx", "py", "go", "rs", "java", "kt", "rb", "php", "cs", "swift", "c", "h", "cpp", "hpp", "sql", "vue", "svelte", "prisma", "sh",
];
const MAX_BYTES: u64 = 1_000_000;

#[derive(Default)]
struct Out {
    lang: BTreeMap<String, (usize, usize)>,
    manifests: Vec<String>,
    entries: Vec<String>,
    routes: Vec<String>,
    tables: Vec<String>,
    envs: BTreeMap<String, String>,
    files: Vec<(PathBuf, String)>, // (상대 경로, 글)
}

fn walk(dir: &Path, root: &Path, o: &mut Out, depth: usize) {
    let Ok(rd) = fs::read_dir(dir) else { return };
    let mut ents: Vec<_> = rd.flatten().collect();
    ents.sort_by_key(|e| e.file_name());
    for e in ents {
        let name = e.file_name().to_string_lossy().to_string();
        let path = e.path();
        let Ok(ft) = e.file_type() else { continue };
        if ft.is_symlink() {
            continue;
        }
        if ft.is_dir() {
            if SKIP_DIR.contains(&name.as_str()) || (name.starts_with('.') && name != ".github") || depth > 12 {
                continue;
            }
            walk(&path, root, o, depth + 1);
            continue;
        }
        let rel = path.strip_prefix(root).unwrap_or(&path).to_path_buf();
        let rels = rel.to_string_lossy().to_string();
        if matches!(
            name.as_str(),
            "package.json" | "Cargo.toml" | "pyproject.toml" | "requirements.txt" | "go.mod" | "pom.xml" | "build.gradle" | "Gemfile" | "composer.json" | "Dockerfile"
                | "docker-compose.yml" | "docker-compose.yaml" | "Makefile" | "schema.prisma"
        ) {
            o.manifests.push(manifest_line(&path, &rels, &name));
        }
        let ext = path.extension().and_then(|x| x.to_str()).unwrap_or("").to_ascii_lowercase();
        if !CODE.contains(&ext.as_str()) {
            continue;
        }
        if fs::metadata(&path).map(|m| m.len() > MAX_BYTES).unwrap_or(true) {
            continue;
        }
        let Ok(text) = fs::read_to_string(&path) else { continue }; // 글이 아닌 파일은 건너뜀
        let l = text.lines().count();
        let ent = o.lang.entry(ext.clone()).or_default();
        ent.0 += 1;
        ent.1 += l;
        let stem = path.file_stem().and_then(|x| x.to_str()).unwrap_or("");
        if matches!(stem, "main" | "index" | "app" | "server" | "cli" | "manage" | "__main__" | "lib") && depth <= 3 {
            o.entries.push(rels.clone());
        }
        find_facts(&rels, &text, o);
        o.files.push((rel, text));
    }
}

fn manifest_line(path: &Path, rel: &str, name: &str) -> String {
    let Ok(t) = fs::read_to_string(path) else { return rel.to_string() };
    let mut extra = String::new();
    if name == "package.json" {
        if let Ok(v) = crate::value::parse_board(&format!("X={}", t)) {
            let sc: Vec<&str> = v.get("scripts").entries().iter().map(|(k, _)| k.as_str()).take(8).collect();
            let deps = v.get("dependencies").entries().len();
            let dev = v.get("devDependencies").entries().len();
            extra = format!(" — {} · scripts [{}] · deps {}+{}", v.get("name").s(), sc.join(","), deps, dev);
        }
    } else if name == "Cargo.toml" || name == "pyproject.toml" {
        if let Some(l) = t.lines().find(|l| l.trim_start().starts_with("name")) {
            extra = format!(" — {}", l.trim());
        }
    } else if name == "go.mod" {
        if let Some(l) = t.lines().next() {
            extra = format!(" — {}", l.trim());
        }
    }
    format!("{}{}", rel, extra)
}

/// 줄마다 경로 · 표 · 환경 변수 모양을 찾는다
fn find_facts(rel: &str, text: &str, o: &mut Out) {
    for (i, line) in text.lines().enumerate() {
        let n = i + 1;
        let t = line.trim();
        if t.len() > 400 {
            continue;
        }
        // 경로: app.get('/x') · router.post("/x") · @GetMapping("/x") · @app.route("/x") · #[get("/x")] · path('x/', ...)
        for m in ["get", "post", "put", "patch", "delete"] {
            for pre in [".", "#["] {
                let key = format!("{}{}(", pre, m);
                if let Some(p) = t.find(&key) {
                    if let Some(path) = quoted_after(&t[p + key.len()..]) {
                        if path.starts_with('/') {
                            o.routes.push(format!("{}:{}  {} {}", rel, n, m.to_uppercase(), path));
                        }
                    }
                }
            }
        }
        for (key, verb) in [("@GetMapping(", "GET"), ("@PostMapping(", "POST"), ("@PutMapping(", "PUT"), ("@DeleteMapping(", "DELETE"), ("@app.route(", "ROUTE"), ("@router.route(", "ROUTE"), ("@RequestMapping(", "ANY")] {
            if let Some(p) = t.find(key) {
                if let Some(path) = quoted_after(&t[p + key.len()..]) {
                    if path.starts_with('/') {
                        o.routes.push(format!("{}:{}  {} {}", rel, n, verb, path));
                    }
                }
            }
        }
        // 표
        let low = t.to_ascii_lowercase();
        if let Some(p) = low.find("create table") {
            let rest = low[p + 12..].trim_start().trim_start_matches("if not exists").trim_start();
            let name: String = rest.chars().take_while(|c| c.is_alphanumeric() || "_.\"`[]".contains(*c)).collect();
            let name = name.trim_matches(|c| "\"`[]".contains(c));
            if name.chars().next().map_or(false, |c| c.is_alphabetic()) {
                o.tables.push(format!("{}:{}  {}", rel, n, name));
            }
        }
        if rel.ends_with(".prisma") && t.starts_with("model ") {
            o.tables.push(format!("{}:{}  {}", rel, n, t.split_whitespace().nth(1).unwrap_or("")));
        }
        if t.starts_with("class ") && (t.contains("models.Model") || t.contains("db.Model") || t.contains("Base)")) {
            let nm: String = t[6..].chars().take_while(|c| c.is_alphanumeric() || *c == '_').collect();
            o.tables.push(format!("{}:{}  {} (모델)", rel, n, nm));
        }
        // 환경 변수
        for key in ["process.env.", "import.meta.env.", "os.environ[\"", "os.environ['", "os.getenv(\"", "os.getenv('", "env::var(\"", "System.getenv(\"", "ENV['", "ENV[\""] {
            let mut from = 0;
            while let Some(p) = t[from..].find(key) {
                let s = from + p + key.len();
                let name: String = t[s..].chars().take_while(|c| c.is_ascii_uppercase() || c.is_ascii_digit() || *c == '_').collect();
                if name.len() > 1 {
                    o.envs.entry(name).or_insert_with(|| format!("{}:{}", rel, n));
                }
                from = s;
            }
        }
    }
}

fn quoted_after(s: &str) -> Option<String> {
    let s = s.trim_start();
    let q = s.chars().next().filter(|c| *c == '\'' || *c == '"' || *c == '`')?;
    let body = &s[1..];
    let end = body.find(q)?;
    Some(body[..end].to_string())
}

/// 상대 import(JS · TS) · 모듈 이름(Python) · mod(Rust)로 "어느 파일이 몇 번 불리나"를 센다
fn fan_in(o: &Out) -> Vec<(String, usize)> {
    let set: HashMap<String, usize> = o.files.iter().enumerate().map(|(i, (p, _))| (p.to_string_lossy().to_string(), i)).collect();
    let mut stems: HashMap<String, Vec<String>> = HashMap::new();
    for (p, _) in &o.files {
        if let Some(s) = p.file_stem().and_then(|x| x.to_str()) {
            stems.entry(s.to_string()).or_default().push(p.to_string_lossy().to_string());
        }
    }
    let mut cnt: HashMap<String, usize> = HashMap::new();
    for (p, text) in &o.files {
        let ext = p.extension().and_then(|x| x.to_str()).unwrap_or("");
        let dir = p.parent().unwrap_or(Path::new(""));
        let mut targets: Vec<String> = vec![];
        for line in text.lines().take(400) {
            let t = line.trim();
            match ext {
                "js" | "mjs" | "cjs" | "ts" | "tsx" | "jsx" | "vue" | "svelte" => {
                    let spec = if t.starts_with("import ") || t.contains("require(") || t.starts_with("export ") && t.contains(" from ") {
                        t.rfind(|c| c == '\'' || c == '"').and_then(|e| t[..e].rfind(|c| c == '\'' || c == '"').map(|s| t[s + 1..e].to_string()))
                    } else {
                        None
                    };
                    if let Some(sp) = spec.filter(|s| s.starts_with('.')) {
                        let base = normalize(&dir.join(&sp));
                        for cand in [base.clone(), format!("{}.ts", base), format!("{}.tsx", base), format!("{}.js", base), format!("{}.mjs", base), format!("{}/index.ts", base), format!("{}/index.js", base)] {
                            if set.contains_key(&cand) {
                                targets.push(cand);
                                break;
                            }
                        }
                    }
                }
                "py" => {
                    let m = t.strip_prefix("from ").or_else(|| t.strip_prefix("import ")).map(|r| r.split_whitespace().next().unwrap_or("").trim_end_matches(','));
                    if let Some(m) = m {
                        let last = m.trim_start_matches('.').rsplit('.').next().unwrap_or("");
                        if let Some(c) = stems.get(last).filter(|c| c.len() == 1) {
                            targets.push(c[0].clone());
                        }
                    }
                }
                "rs" => {
                    let m = t.strip_prefix("pub mod ").or_else(|| t.strip_prefix("mod ")).map(|r| r.trim_end_matches(';').trim());
                    if let Some(c) = m.and_then(|m| stems.get(m)).filter(|c| c.len() == 1) {
                        targets.push(c[0].clone());
                    }
                }
                _ => {}
            }
        }
        targets.sort();
        targets.dedup();
        for tg in targets {
            if tg != p.to_string_lossy() {
                *cnt.entry(tg).or_default() += 1;
            }
        }
    }
    let mut v: Vec<(String, usize)> = cnt.into_iter().collect();
    v.sort_by(|a, b| b.1.cmp(&a.1).then(a.0.cmp(&b.0)));
    v
}

fn normalize(p: &Path) -> String {
    let mut out: Vec<String> = vec![];
    for c in p.components() {
        match c.as_os_str().to_str().unwrap_or("") {
            "." | "" => {}
            ".." => {
                out.pop();
            }
            s => out.push(s.to_string()),
        }
    }
    out.join("/")
}

pub fn run(dir: &Path) {
    let mut o = Out::default();
    walk(dir, dir, &mut o, 0);
    let total_files: usize = o.lang.values().map(|x| x.0).sum();
    let total_lines: usize = o.lang.values().map(|x| x.1).sum();
    println!("# {} — 글 파일 {}개 · {}줄", dir.canonicalize().unwrap_or(dir.to_path_buf()).display(), total_files, total_lines);

    let mut langs: Vec<_> = o.lang.iter().collect();
    langs.sort_by(|a, b| b.1 .1.cmp(&a.1 .1));
    println!("\n## 언어 (파일 · 줄)");
    println!("{}", langs.iter().take(8).map(|(k, v)| format!("{} {} · {}", k, v.0, v.1)).collect::<Vec<_>>().join("  |  "));

    let show = |title: &str, v: &[String], cap: usize| {
        if v.is_empty() {
            return;
        }
        println!("\n## {} ({})", title, v.len());
        for x in v.iter().take(cap) {
            println!("- {}", x);
        }
        if v.len() > cap {
            println!("- … 외 {}개", v.len() - cap);
        }
    };
    show("꾸러미 · 설정 파일", &o.manifests, 12);
    show("진입점 후보 (파일 이름으로만 짐작)", &o.entries, 12);
    show("경로 (글자 모양으로 찾음)", &o.routes, 30);
    show("표 · 모델", &o.tables, 30);
    let envs: Vec<String> = o.envs.iter().map(|(k, v)| format!("{}  ← {}", k, v)).collect();
    show("환경 변수", &envs, 20);

    let fi = fan_in(&o);
    if !fi.is_empty() {
        println!("\n## 많이 불리는 파일 (불러 쓰는 파일 수) — 보드의 중심 상자 후보");
        for (p, n) in fi.iter().take(10) {
            println!("- {} ({})", p, n);
        }
    }
    println!("\n※ 글자 모양으로 찾은 것이다. 보드에 쓰기 전에 줄을 열어 확인한다.");
}
