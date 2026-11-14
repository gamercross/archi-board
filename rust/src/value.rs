//! board-data.js(`window.BOARD = {...}`)를 JS 실행 없이 읽는 작은 파서.
//! 주석 · 작은따옴표 · 따옴표 없는 열쇠 · 끝 쉼표 · 템플릿 글 · 글 이어 붙이기(`'a' + 'b'`)를 받는다.

#[derive(Debug, Clone, PartialEq)]
pub enum V {
    Null,
    Bool(bool),
    Num(f64),
    Str(String),
    Arr(Vec<V>),
    Obj(Vec<(String, V)>),
}

pub static NULL: V = V::Null;

impl V {
    pub fn get(&self, k: &str) -> &V {
        if let V::Obj(o) = self {
            for (key, v) in o {
                if key == k {
                    return v;
                }
            }
        }
        &NULL
    }
    pub fn at(&self, i: usize) -> &V {
        match self {
            V::Arr(a) => a.get(i).unwrap_or(&NULL),
            _ => &NULL,
        }
    }
    pub fn s(&self) -> &str {
        match self {
            V::Str(s) => s,
            _ => "",
        }
    }
    pub fn arr(&self) -> &[V] {
        match self {
            V::Arr(a) => a,
            _ => &[],
        }
    }
    pub fn entries(&self) -> &[(String, V)] {
        match self {
            V::Obj(o) => o,
            _ => &[],
        }
    }
    pub fn num(&self) -> Option<f64> {
        match self {
            V::Num(n) => Some(*n),
            _ => None,
        }
    }
    pub fn is_null(&self) -> bool {
        matches!(self, V::Null)
    }
    pub fn has(&self, k: &str) -> bool {
        self.entries().iter().any(|(key, _)| key == k)
    }
    /// 글 하나 또는 글 목록을 글 목록으로 (`basis: 'a'` 와 `basis: ['a','b']` 를 같게 본다)
    pub fn strs(&self) -> Vec<&str> {
        match self {
            V::Str(s) => vec![s.as_str()],
            V::Arr(a) => a.iter().filter_map(|x| if let V::Str(s) = x { Some(s.as_str()) } else { None }).collect(),
            _ => vec![],
        }
    }
}

pub fn parse_board(src: &str) -> Result<V, String> {
    let chars: Vec<char> = src.chars().collect();
    let mut p = P { c: &chars, i: 0 };
    // `window.BOARD =` 앞부분은 건너뛰고 첫 값부터 읽는다
    let hay: String = chars.iter().collect();
    if let Some(pos) = hay.find("BOARD") {
        p.i = hay[..pos].chars().count() + 5;
        p.ws()?;
        if p.peek() == Some('=') {
            p.i += 1;
        }
    }
    p.value()
}

struct P<'a> {
    c: &'a [char],
    i: usize,
}

impl<'a> P<'a> {
    fn peek(&self) -> Option<char> {
        self.c.get(self.i).copied()
    }
    fn err<T>(&self, m: &str) -> Result<T, String> {
        let line = self.c[..self.i.min(self.c.len())].iter().filter(|&&c| c == '\n').count() + 1;
        Err(format!("{}줄: {}", line, m))
    }
    fn ws(&mut self) -> Result<(), String> {
        loop {
            match self.peek() {
                Some(c) if c.is_whitespace() || c == '\u{feff}' => self.i += 1,
                Some('/') if self.c.get(self.i + 1) == Some(&'/') => {
                    while let Some(c) = self.peek() {
                        if c == '\n' {
                            break;
                        }
                        self.i += 1;
                    }
                }
                Some('/') if self.c.get(self.i + 1) == Some(&'*') => {
                    self.i += 2;
                    loop {
                        match self.peek() {
                            None => return self.err("/* 주석이 닫히지 않았다"),
                            Some('*') if self.c.get(self.i + 1) == Some(&'/') => {
                                self.i += 2;
                                break;
                            }
                            _ => self.i += 1,
                        }
                    }
                }
                _ => return Ok(()),
            }
        }
    }
    fn value(&mut self) -> Result<V, String> {
        self.ws()?;
        match self.peek() {
            None => self.err("값이 와야 하는데 파일이 끝났다"),
            Some('{') => self.object(),
            Some('[') => self.array(),
            Some(q @ ('\'' | '"' | '`')) => {
                let mut s = self.string(q)?;
                // 'a' + 'b'
                loop {
                    let save = self.i;
                    self.ws()?;
                    if self.peek() == Some('+') {
                        self.i += 1;
                        self.ws()?;
                        if let Some(q2 @ ('\'' | '"' | '`')) = self.peek() {
                            s.push_str(&self.string(q2)?);
                            continue;
                        }
                    }
                    self.i = save;
                    break;
                }
                Ok(V::Str(s))
            }
            Some(c) if c.is_ascii_digit() || c == '-' || c == '+' || c == '.' => self.number(),
            Some(c) if c.is_alphabetic() || c == '_' || c == '$' => {
                let id = self.ident();
                match id.as_str() {
                    "true" => Ok(V::Bool(true)),
                    "false" => Ok(V::Bool(false)),
                    "null" | "undefined" => Ok(V::Null),
                    "NaN" | "Infinity" => Ok(V::Null),
                    _ => self.err(&format!("지원하지 않는 식 `{}` — board-data.js는 값만 쓴다(함수 · 변수 없이)", id)),
                }
            }
            Some(c) => self.err(&format!("뜻밖의 글자 `{}`", c)),
        }
    }
    fn ident(&mut self) -> String {
        let st = self.i;
        while let Some(c) = self.peek() {
            if c.is_alphanumeric() || c == '_' || c == '$' {
                self.i += 1;
            } else {
                break;
            }
        }
        self.c[st..self.i].iter().collect()
    }
    fn number(&mut self) -> Result<V, String> {
        let st = self.i;
        while let Some(c) = self.peek() {
            if c.is_ascii_digit() || matches!(c, '-' | '+' | '.' | 'e' | 'E') {
                self.i += 1;
            } else {
                break;
            }
        }
        let t: String = self.c[st..self.i].iter().collect();
        match t.trim_start_matches('+').parse::<f64>() {
            Ok(n) => Ok(V::Num(n)),
            Err(_) => self.err(&format!("숫자가 아니다 `{}`", t)),
        }
    }
    fn string(&mut self, q: char) -> Result<String, String> {
        self.i += 1;
        let mut s = String::new();
        loop {
            match self.peek() {
                None => return self.err("글이 닫히지 않았다"),
                Some(c) if c == q => {
                    self.i += 1;
                    return Ok(s);
                }
                Some('$') if q == '`' && self.c.get(self.i + 1) == Some(&'{') => {
                    return self.err("템플릿 글의 ${} 식은 쓸 수 없다");
                }
                Some('\\') => {
                    self.i += 1;
                    let e = self.peek();
                    self.i += 1;
                    match e {
                        Some('n') => s.push('\n'),
                        Some('t') => s.push('\t'),
                        Some('r') => s.push('\r'),
                        Some('0') => s.push('\0'),
                        Some('\n') => {}
                        Some('u') => {
                            let h: String = self.c[self.i..(self.i + 4).min(self.c.len())].iter().collect();
                            self.i += 4;
                            match u32::from_str_radix(&h, 16).ok().and_then(char::from_u32) {
                                Some(ch) => s.push(ch),
                                None => return self.err("\\u 번호가 잘못됐다"),
                            }
                        }
                        Some(c) => s.push(c),
                        None => return self.err("글이 닫히지 않았다"),
                    }
                }
                Some(c) => {
                    s.push(c);
                    self.i += 1;
                }
            }
        }
    }
    fn array(&mut self) -> Result<V, String> {
        self.i += 1;
        let mut out = vec![];
        loop {
            self.ws()?;
            match self.peek() {
                Some(']') => {
                    self.i += 1;
                    return Ok(V::Arr(out));
                }
                Some(',') => {
                    // 빈 칸 `[a,,b]` 는 null로
                    self.i += 1;
                    out.push(V::Null);
                    continue;
                }
                None => return self.err("] 가 닫히지 않았다"),
                _ => {}
            }
            out.push(self.value()?);
            self.ws()?;
            match self.peek() {
                Some(',') => self.i += 1,
                Some(']') => {}
                _ => return self.err("배열에서 , 또는 ] 가 와야 한다"),
            }
        }
    }
    fn object(&mut self) -> Result<V, String> {
        self.i += 1;
        let mut out: Vec<(String, V)> = vec![];
        loop {
            self.ws()?;
            let key = match self.peek() {
                Some('}') => {
                    self.i += 1;
                    return Ok(V::Obj(out));
                }
                None => return self.err("} 가 닫히지 않았다"),
                Some(q @ ('\'' | '"')) => self.string(q)?,
                Some(c) if c.is_ascii_digit() => {
                    // 숫자 열쇠 `0.5:` 는 글로
                    let st = self.i;
                    while matches!(self.peek(), Some(c) if c.is_ascii_digit() || c == '.') {
                        self.i += 1;
                    }
                    self.c[st..self.i].iter().collect()
                }
                Some(c) if c.is_alphanumeric() || c == '_' || c == '$' => self.ident(),
                Some(c) => return self.err(&format!("열쇠 자리에 뜻밖의 글자 `{}`", c)),
            };
            self.ws()?;
            if self.peek() != Some(':') {
                return self.err(&format!("열쇠 `{}` 뒤에 : 가 와야 한다", key));
            }
            self.i += 1;
            let v = self.value()?;
            out.push((key, v));
            self.ws()?;
            match self.peek() {
                Some(',') => self.i += 1,
                Some('}') => {}
                _ => return self.err("객체에서 , 또는 } 가 와야 한다"),
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn reads_js_literals() {
        let v = parse_board(
            "// 머리\nwindow.BOARD = {\n  a: 'x\\'y', /* 주석 */ 'b-c': \"z\",\n  n: [1, -2.5, , null,],\n  0.5: 'half', s: 'a' + 'b', t: `긴\\n글`, ok: true,\n};\n",
        )
        .unwrap();
        assert_eq!(v.get("a").s(), "x'y");
        assert_eq!(v.get("b-c").s(), "z");
        assert_eq!(v.get("n").arr().len(), 4);
        assert_eq!(v.get("n").at(1).num(), Some(-2.5));
        assert!(v.get("n").at(2).is_null());
        assert_eq!(v.get("0.5").s(), "half");
        assert_eq!(v.get("s").s(), "ab");
        assert_eq!(v.get("t").s(), "긴\n글");
        assert_eq!(v.get("ok"), &V::Bool(true));
    }

    #[test]
    fn rejects_code_with_line_number() {
        let e = parse_board("window.BOARD = {\n a: foo(),\n}").unwrap_err();
        assert!(e.starts_with("2줄"), "{}", e);
    }

    #[test]
    fn both_boards_load() {
        let root = std::path::Path::new(env!("CARGO_MANIFEST_DIR")).join("..");
        for (p, els) in [("docs/board/board-data.js", 98), ("examples/memo/board-data.js", 36)] {
            let b = crate::board::load(&root.join(p)).unwrap();
            assert_eq!(b.els.len(), els, "{}", p);
            assert!(crate::check::run(&b).0.is_empty(), "{}", p);
        }
    }
}
