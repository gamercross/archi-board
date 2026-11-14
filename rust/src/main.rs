mod board;
mod brief;
mod check;
mod drift;
mod scan;
mod trace;
mod value;

use std::path::PathBuf;
use std::process::exit;

const HELP: &str = "ab — archi-board 보조 도구

  ab brief <board-data.js>              보드를 한 화면 글로 줄인다 (창 · 허브 · 유즈케이스 · 객체 · 데이터 · 판단)
  ab trace <board-data.js> <id>         상자 · 객체 · 데이터 · 창 · 유즈케이스 하나를 둘러싼 것을 모은다
  ab check <board-data.js>              id · 연결 점검 (글자 한도 · 종류 표는 node check.mjs가 맡는다)
  ab drift <board-data.js> [--root 폴더] 보드가 근거로 단 파일 · 줄이 코드에 있는지, 보드 뒤에 코드가 바뀌었는지
  ab scan  <폴더>                       코드베이스를 훑어 보드 재료를 모은다 (언어 · 경로 · 표 · 환경 변수 · 많이 불리는 파일)";

fn main() {
    let a: Vec<String> = std::env::args().skip(1).collect();
    let cmd = a.first().map(|s| s.as_str()).unwrap_or("");
    let load = |i: usize| -> (PathBuf, board::Board) {
        let Some(p) = a.get(i) else {
            eprintln!("{}", HELP);
            exit(2)
        };
        match board::load(&PathBuf::from(p)) {
            Ok(b) => (PathBuf::from(p), b),
            Err(e) => {
                eprintln!("읽지 못했다: {}", e);
                exit(1)
            }
        }
    };
    match cmd {
        "brief" => brief::run(&load(1).1),
        "trace" => {
            let id = a.get(2).cloned().unwrap_or_else(|| {
                eprintln!("{}", HELP);
                exit(2)
            });
            if !trace::run(&load(1).1, &id) {
                exit(1)
            }
        }
        "check" => {
            let bd = load(1).1;
            let (errs, warns) = check::run(&bd);
            for w in &warns {
                println!("경고 · {}", w);
            }
            for e in &errs {
                println!("잘못 · {}", e);
            }
            println!("상자 {} · 관계 {} · 객체 {} · 데이터 {} — 잘못 {} · 경고 {}", bd.els.len(), bd.rels.len(), bd.objects().len(), bd.data().len(), errs.len(), warns.len());
            if !errs.is_empty() {
                exit(1)
            }
        }
        "drift" => {
            let (p, bd) = load(1);
            let root = a.iter().position(|x| x == "--root").and_then(|i| a.get(i + 1)).map(PathBuf::from);
            if !drift::run(&bd, &p, root) {
                exit(1)
            }
        }
        "scan" => scan::run(&PathBuf::from(a.get(1).map(|s| s.as_str()).unwrap_or("."))),
        _ => {
            eprintln!("{}", HELP);
            exit(2)
        }
    }
}
