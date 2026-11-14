//! 보드 데이터를 명령들이 같이 쓰는 모양으로 꺼내 준다.
use crate::value::{parse_board, V};
use std::collections::HashMap;
use std::path::Path;

pub struct Board {
    pub b: V,
    pub els: Vec<V>,                 // 상자 (배열 모양도 객체로 바꿔 둔다)
    pub rels: Vec<(String, String, String)>,
}

pub fn load(path: &Path) -> Result<Board, String> {
    let src = std::fs::read_to_string(path).map_err(|e| format!("{}: {}", path.display(), e))?;
    let b = parse_board(&src).map_err(|e| format!("{} {}", path.display(), e))?;
    if !matches!(b, V::Obj(_)) {
        return Err("window.BOARD가 객체가 아니다".into());
    }
    let els = b.get("elements").arr().iter().map(norm_el).collect();
    let rels = b
        .get("relations")
        .arr()
        .iter()
        .map(|r| match r {
            V::Arr(_) => (r.at(0).s().to_string(), r.at(1).s().to_string(), r.at(2).s().to_string()),
            _ => (r.get("from").s().to_string(), r.get("to").s().to_string(), r.get("type").s().to_string()),
        })
        .collect();
    Ok(Board { b, els, rels })
}

/// `[창, id, 종류, 이름, 설명, 상태, ?, {더}]` 모양을 `{f,id,t,n,d,s,...}`로
fn norm_el(x: &V) -> V {
    match x {
        V::Arr(a) => {
            let mut o: Vec<(String, V)> = ["f", "id", "t", "n", "d", "s"]
                .iter()
                .enumerate()
                .map(|(i, k)| (k.to_string(), a.get(i).cloned().unwrap_or(V::Null)))
                .collect();
            if let Some(V::Obj(extra)) = a.get(7) {
                o.extend(extra.iter().cloned());
            }
            V::Obj(o)
        }
        other => other.clone(),
    }
}

impl Board {
    pub fn el_names(&self) -> HashMap<&str, &str> {
        self.els.iter().map(|e| (e.get("id").s(), e.get("n").s())).collect()
    }
    pub fn frames(&self) -> &[V] {
        self.b.get("frames").arr()
    }
    pub fn objects(&self) -> &[(String, V)] {
        self.b.get("objectMap").get("objects").entries()
    }
    pub fn data(&self) -> &[V] {
        self.b.get("dataMap").get("data").arr()
    }
    pub fn usecases(&self) -> &[V] {
        self.b.get("usecases").arr()
    }
    pub fn insights(&self) -> &[V] {
        self.b.get("insights").arr()
    }
}

/// 글자 수(바이트가 아니라 글자)
pub fn chars(s: &str) -> usize {
    s.chars().count()
}

/// 긴 글을 n글자로 자르고 … 를 붙인다
pub fn cut(s: &str, n: usize) -> String {
    let one: String = s.split_whitespace().collect::<Vec<_>>().join(" ");
    if chars(&one) <= n {
        one
    } else {
        let mut t: String = one.chars().take(n).collect();
        t.push('…');
        t
    }
}
