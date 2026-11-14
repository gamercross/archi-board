# ab — 보드를 빠르게 읽는 Rust 도구

`board-data.js`를 JS 실행 없이 읽어 한 화면으로 줄이고, 코드와 어긋난 곳을 찾는다. 의존성 없는 단일 실행 파일이다.
없어도 스킬은 돈다 — 점검의 기준은 `check.mjs`다.

설치: `cargo install --path rust` (저장소 루트에서) 또는 `cargo build --release --manifest-path rust/Cargo.toml` 뒤 `rust/target/release/ab`.

| 명령 | 언제 | 보여 주는 것 |
|---|---|---|
| `ab brief <board-data.js>` | 보드를 고치기 전 · 처음 읽을 때 | 창 목록 · 상태 · 이어진 것이 많은 상자 · 외톨이 · 유즈케이스 · 객체(파일) · 데이터(쓰는 곳→읽는 곳) · 판단 |
| `ab trace <board-data.js> <id>` | 상자 · 객체 · 데이터 · 창 · 유즈케이스 하나를 고칠 때 | 이어진 선 · 객체 카드 · 쓰고 읽는 데이터 · 나오는 유즈케이스 |
| `ab drift <board-data.js> [--root 폴더]` | 코드가 바뀐 뒤 | 근거로 단 파일이 없는지 · 줄 번호가 파일 끝을 넘는지 · 보드를 쓴 뒤에 고쳐진 파일. 없는 파일이 있으면 1로 끝난다 |
| `ab scan <폴더>` | 새로 만들 때 코드를 읽기 전 | 언어 · 설정 파일 · 진입점 후보 · 경로 · 표 · 환경 변수 · 많이 불리는 파일 |
| `ab check <board-data.js>` | 빠른 연결 점검 | id 겹침 · 없는 id를 가리키는 연결. 글자 한도 · 종류 표는 하지 않으니 `check.mjs`를 돌린다 |

- `ab scan`이 모은 것은 글자 모양으로 찾은 **짐작**이다. 보드에 쓰기 전에 줄을 열어 확인하고, 읽지 못한 것은 쓰지 않는다.
- `ab drift`는 `basis` · `files` · `tests` · `change`에 적힌 `경로[:줄]`만 본다. `check.mjs`는 이 글을 코드와 대조하지 않는다.
- 이름만 적은 근거(`check.mjs`)는 저장소 안에 같은 이름이 하나뿐일 때만 그 파일로 본다.
