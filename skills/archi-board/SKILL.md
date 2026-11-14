---
name: archi-board
description: 프로젝트 코드와 문서를 읽어 무한 보드 한 장을 만들거나 고친다. 앞면은 처음 보는 사람(사용자 · 평가자 · 새 팀원)용 — 누가 쓰고 무엇을 받고 어떤 차례로 도는지를 쉬운 말로 그린 한 장 그림(ArchiMate 층별 뷰)과 차례 사슬, 뒷면은 만드는 사람용 — 객체 지도 · 데이터 지도 · 유즈케이스 순서도 · 판단 차트. 데이터 파일 board-data.js만 쓰고, 엔진은 공용 주소에서 불러와 엔진이 좋아지면 보드도 저절로 바뀐다. "아키텍처 보드 만들어줘", "구조를 한 장으로 그려줘", "사용자 · 평가자도 이해하게 큰 그림", "발표용 아키텍처 그림", "객체 지도", "데이터 지도", "ArchiMate로 그려줘", "보드 업데이트해줘", "board-data.js 고쳐줘"일 때 쓴다.
license: MIT
compatibility: Node 18 이상(점검 스크립트). 보드는 브라우저로 연다.
---

# archi-board — 코드로 보드 한 장 만들기

보드 = `index.html`(틀) + `board-data.js`(내용). **엔진은 고치지 않는다.** 엔진은
`https://gamercross.github.io/archi-board/engine/v1/`에서 불러오므로, 엔진이 새로 나오면 다시 만들지 않아도 보드가 바뀐다.

보드는 **두 사람**이 본다. 위 띠의 **처음 보는 사람 / 만드는 사람** 전환이 둘을 나눈다(엔진 1.2).
처음 보는 사람 쪽(`layout: 'view'` 창)이 **앞면**이고 먼저 만든다 — 부품부터 그리면 사용자 · 평가자는 첫 화면에서 길을 잃는다.

## 새로 만들 때

1. **자리를 정한다.** 사용자가 말하지 않았으면 프로젝트의 `docs/board/`를 쓴다고 알리고 진행한다.
2. **틀을 복사한다.** 이 스킬 폴더의 `assets/board.html` → `<자리>/index.html`. 고칠 것은 `<title>` 하나.
3. **앞면부터 — 처음 보는 사람용 그림.** [references/audience.md](references/audience.md)대로 — 누가 보나 한 줄 → 네 질문(무엇 · 누구 · 차례 · 받쳐 주는 것) →
   **한 장 그림**(층별 뷰)과 **차례 그림**(시작 사건 → 틀 안의 단계) 두 장. 쉬운 말, 한 장에 상자 25개 안쪽, 코드 이름 없이.
4. **코드를 읽는다 — 뒷면.** `ab`가 설치돼 있으면 먼저 `ab scan <프로젝트>`로 언어 · 경로 · 표 · 환경 변수 · 많이 불리는 파일을 모은다([ab 쓰는 법](references/ab.md)). 모은 줄은 짐작이니 열어서 확인한다. [references/reading-code.md](references/reading-code.md)의 순서대로 — 부품 → 오가는 길 → 데이터 → (있으면) 목적 · 계획.
   큰 저장소면 폴더마다 나눠 읽고 사실만 모은다. 코드에 없는 것은 쓰지 않는다. 앞면의 상자는 `see`로 뒷면(객체 · 창)에 잇는다.
5. **`board-data.js`를 쓴다.** 형식은 [references/data-format.md](references/data-format.md), 완성 예시는 저장소의 `examples/memo/board-data.js`.
   처음에는 **앞면 두 장 + 객체 지도 + 데이터 지도 + 유즈케이스 2~3개**로 시작하고, `start`는 한 장 그림으로 둔다. 사용자가 원하면 ArchiMate 창을 더한다.
   순서도 카드를 누르면 열리는 **유저 스토리**는 `usecases`의 `story`로 더한다 — [쓰는 법](references/reading-code.md#유저-스토리-story-쓰는-법). 없어도 칸이 그대로 장면이 된다.
   사용자가 위험도 · 진척 · 흐름의 양 같은 **판단 값**을 원하면 `insights`(차트)를 더한다 — [판단 값 쓰는 법](references/reading-code.md#판단-값-insights-쓰는-법).
6. **점검한다.** `node <이 스킬 폴더>/scripts/check.mjs <자리>/board-data.js` — 잘못이 0개가 될 때까지 고친다. 경고는 사용자에게 알린다
   (앞면이 없거나, 한 장에 상자가 너무 많거나, 앞면 이름에 코드처럼 보이는 말이 있으면 경고가 난다).
7. **보여 준다.** `<자리>/index.html`을 브라우저로 열라고 안내한다(맥: `open`, 윈도우: `start`). 인터넷이 있어야 엔진을 받는다.
   처음 보는 사람 한 명에게 **5초 시험**(audience.md 5절)을 부탁한다 — 통과는 사람이 정한다.

## 고칠 때

- 먼저 `ab brief <board-data.js>`로 보드를 한 화면으로 읽고, `ab drift <board-data.js>`로 근거 파일이 아직 있는지 · 보드 뒤에 바뀐 코드가 무엇인지 본다([ab](references/ab.md)). `ab`가 없으면 `board-data.js`를 읽는다.
- `board-data.js`만 고친다. 코드가 바뀌었으면 바뀐 부품 · 데이터 · 순서만 다시 읽어 그 칸을 고치고, 6번 점검을 다시 돈다.
- 기능이 바뀌면 **앞면(한 장 · 차례)도 같이** 고친다 — 뒷면만 고치면 처음 보는 사람이 옛 그림을 본다.
- 앞면이 없는 보드를 고칠 때는 점검 경고를 알리고 앞면 두 장을 먼저 더하자고 제안한다.
- 상태(`s`)를 바꿀 때는 근거(파일 · 커밋)를 대화에 말한다.

## 인터넷 없이 · claude.ai 아티팩트로 올릴 때

엔진을 한 파일에 넣어 묶는다: `node <이 스킬 폴더>/scripts/inline.mjs <자리>` → `<자리>/board.single.html`.
이 파일은 **자동 업데이트가 안 된다** — 엔진이 새로 나오면 같은 명령으로 다시 묶는다. 사용자에게 이 차이를 한 줄로 알린다.

이미 묶은 보드만 있을 때(아티팩트를 `read`로 받은 HTML 등) 새 엔진으로 바꾸거나 데이터를 고치려면 먼저 꺼낸다:
`node <이 스킬 폴더>/scripts/unpack.mjs <묶은 html> <자리>` → `board-data.js`(+ 머리 주석 `head.html`) → 고치고 → `check.mjs` → `inline.mjs <자리>`.

## 다른 도구와 주고받기
- 내보내기: `node <이 스킬 폴더>/scripts/export.mjs <자리>/board-data.js --mermaid out.md --archimate out.xml` — Mermaid(GitHub · 마크다운에서 보임)와 ArchiMate Open Exchange 파일(Archi 등에서 열림). 대응이 없는 칸(앞뒷면 · 판단 차트 · 근거 · 이야기)은 버리지 않고 파일 안 속성에 담는다.
- 가져오기: `node <이 스킬 폴더>/scripts/import-archimate.mjs <model.xml> <자리>/board-data.js`. 이 스킬이 내보낸 파일이면 모든 칸이 돌아오고, 다른 도구의 파일이면 상자 · 선만 온다. 그 뒤 [reading-code.md](references/reading-code.md)의 "다른 형식에서 가져올 때" 순서로 채운다.
아티팩트에 다시 올릴 때는 같은 주소로 올린다(메모 db 같은 기능이 이어진다).

## 지키는 것

- 키 · 토큰 · 비밀번호 · 서버 주소 · 사람 이름은 보드에 쓰지 않는다(환경 변수 **이름**까지만).
- 엔진 파일을 프로젝트에 복사해 고치지 않는다. 엔진에 없는 기능이 필요하면 사용자에게 "엔진에 없는 기능"이라고 말하고 저장소 이슈로 남기자고 제안한다.
- 형식은 `format: 1`. 엔진 주소의 `v1`과 짝이다.
