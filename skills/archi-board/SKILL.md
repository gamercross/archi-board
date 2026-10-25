---
name: archi-board
description: 프로젝트 코드를 읽어 무한 보드 한 장(ArchiMate 층별 창 · 부품마다 카드인 객체 지도 · 데이터가 놓이는 곳과 쓰고 읽는 부품을 잇는 데이터 지도 · 유즈케이스 순서도 · 따라가기)을 만들거나 고친다. 데이터 파일 board-data.js만 쓰고, 그리는 엔진은 공용 주소에서 불러와 엔진이 좋아지면 보드도 저절로 바뀐다. "아키텍처 보드 만들어줘", "구조를 한 장으로 그려줘", "객체 지도", "데이터 지도", "ArchiMate로 그려줘", "보드 업데이트해줘", "board-data.js 고쳐줘"일 때 쓴다.
license: MIT
compatibility: Node 18 이상(점검 스크립트). 보드는 브라우저로 연다.
---

# archi-board — 코드로 보드 한 장 만들기

보드 = `index.html`(틀) + `board-data.js`(내용). **엔진은 고치지 않는다.** 엔진은
`https://gamercross.github.io/archi-board/engine/v1/`에서 불러오므로, 엔진이 새로 나오면 다시 만들지 않아도 보드가 바뀐다.

## 새로 만들 때

1. **자리를 정한다.** 사용자가 말하지 않았으면 프로젝트의 `docs/board/`를 쓴다고 알리고 진행한다.
2. **틀을 복사한다.** 이 스킬 폴더의 `assets/board.html` → `<자리>/index.html`. 고칠 것은 `<title>` 하나.
3. **코드를 읽는다.** [references/reading-code.md](references/reading-code.md)의 순서대로 — 부품 → 오가는 길 → 데이터 → (있으면) 목적 · 계획.
   큰 저장소면 폴더마다 나눠 읽고 사실만 모은다. 코드에 없는 것은 쓰지 않는다.
4. **`board-data.js`를 쓴다.** 형식은 [references/data-format.md](references/data-format.md), 완성 예시는 저장소의 `examples/memo/board-data.js`.
   처음에는 객체 지도 + 데이터 지도 + 유즈케이스 2~3개만으로 시작하고, 사용자가 원하면 ArchiMate 창을 더한다.
   사용자가 위험도 · 진척 · 흐름의 양 같은 **판단 값**을 원하면 `insights`(차트)를 더한다 — [판단 값 쓰는 법](references/reading-code.md#판단-값-insights-쓰는-법).
5. **점검한다.** `node <이 스킬 폴더>/scripts/check.mjs <자리>/board-data.js` — 잘못이 0개가 될 때까지 고친다. 경고는 사용자에게 알린다.
6. **보여 준다.** `<자리>/index.html`을 브라우저로 열라고 안내한다(맥: `open`, 윈도우: `start`). 인터넷이 있어야 엔진을 받는다.

## 고칠 때

- `board-data.js`만 고친다. 코드가 바뀌었으면 바뀐 부품 · 데이터 · 순서만 다시 읽어 그 칸을 고치고, 5번 점검을 다시 돈다.
- 상태(`s`)를 바꿀 때는 근거(파일 · 커밋)를 대화에 말한다.

## 인터넷 없이 · claude.ai 아티팩트로 올릴 때

엔진을 한 파일에 넣어 묶는다: `node <이 스킬 폴더>/scripts/inline.mjs <자리>` → `<자리>/board.single.html`.
이 파일은 **자동 업데이트가 안 된다** — 엔진이 새로 나오면 같은 명령으로 다시 묶는다. 사용자에게 이 차이를 한 줄로 알린다.

이미 묶은 보드만 있을 때(아티팩트를 `read`로 받은 HTML 등) 새 엔진으로 바꾸거나 데이터를 고치려면 먼저 꺼낸다:
`node <이 스킬 폴더>/scripts/unpack.mjs <묶은 html> <자리>` → `board-data.js`(+ 머리 주석 `head.html`) → 고치고 → `check.mjs` → `inline.mjs <자리>`.
아티팩트에 다시 올릴 때는 같은 주소로 올린다(메모 db 같은 기능이 이어진다).

## 지키는 것

- 키 · 토큰 · 비밀번호 · 서버 주소 · 사람 이름은 보드에 쓰지 않는다(환경 변수 **이름**까지만).
- 엔진 파일을 프로젝트에 복사해 고치지 않는다. 엔진에 없는 기능이 필요하면 사용자에게 "엔진에 없는 기능"이라고 말하고 저장소 이슈로 남기자고 제안한다.
- 형식은 `format: 1`. 엔진 주소의 `v1`과 짝이다.
