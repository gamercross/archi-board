# archi-board

코드를 읽어 **무한 보드 한 장**을 만드는 Claude Code 스킬이다. 보드에는 다음이 들어간다.

- **ArchiMate 창**: 동기 · 업무 · 프로그램 · 기술 · 이행 층으로 나눈 상자와 선
- **객체 지도**: 부품 하나를 카드 하나로. 맡은 일, 안에서 도는 순서, 실패할 때, 고칠 때 볼 파일
- **데이터 지도**: 데이터가 놓이는 곳과, 데이터마다 쓰는 부품과 읽는 부품
- **유즈케이스 순서도**: 사람과 부품 사이를 오가는 차례. 한 칸씩 따라가기
- **판단 · 차트**: 사람이나 AI가 코드를 보고 매긴 값(열지도 · 막대 · 흐름도). 값마다 근거와 기준을 함께 둔다

예시 보드: https://gamercross.github.io/archi-board/

## 설치 — Claude Code에서 두 줄

```
/plugin marketplace add gamercross/archi-board
/plugin install archi-board@archi-board
```

그다음 프로젝트 폴더에서 "이 프로젝트 아키텍처 보드 만들어줘"라고 말하면 된다. 결과는 `docs/board/`에 생긴다.
`docs/board/index.html`을 브라우저로 연다.

## 업데이트가 저절로 되는 두 곳

| 무엇 | 어떻게 |
|---|---|
| **이미 만든 보드** | 보드는 엔진을 `https://gamercross.github.io/archi-board/engine/v1/`에서 불러온다. 엔진이 좋아지면 다시 만들지 않아도 보드가 바뀐다. |
| **스킬** | `/plugin` → Marketplaces → `archi-board` → **Enable auto-update**를 한 번 켠다. 다른 사람의 마켓플레이스는 기본이 꺼짐이다. 손으로 받으려면 `/plugin marketplace update archi-board` 다음 `/reload-plugins`를 한다. |

`version`을 일부러 비워 두었다. 그래서 이 저장소에 푸시할 때마다 새 버전으로 친다.

`board.single.html`(인터넷 없이 여는 묶음, claude.ai 아티팩트용)은 엔진을 안에 넣은 사본이다. 그래서 저절로 바뀌지 않는다.
스킬에게 "보드 다시 묶어줘"라고 하면 된다.

## 구조

```
engine/v1/board.js · board.css      그리는 엔진 (GitHub Pages로 나간다)
skills/archi-board/SKILL.md         Claude가 따르는 절차
skills/archi-board/references/      데이터 형식 · 코드 읽는 법
skills/archi-board/assets/          보드 틀 (index.html)
skills/archi-board/scripts/         check.mjs (점검) · inline.mjs (한 파일로 묶기)
examples/memo/                      예시 보드
```

## 엔진을 고칠 때 (관리자)

- **v1 안에서는 칸을 더하기만 한다.** 이미 있는 칸의 뜻을 바꾸거나 칸을 지우면 모든 사람의 보드가 깨진다.
- 형식을 깨는 바꿈이 필요하면 `engine/v2/`를 새로 만들고 데이터는 `format: 2`로 한다. 그동안 `v1`은 그대로 둔다.
- 푸시 전에 확인할 것:
  - `node --check engine/v1/board.js`
  - `node skills/archi-board/scripts/check.mjs examples/memo/board-data.js`
  - 차트를 고쳤다면 예시 보드의 `판단 · 차트` 단추로 세 가지가 다 그려지는지 본다
  - 예시 보드를 브라우저로 한 번 연다
  - CI(`.github/workflows/check.yml`)도 같은 것을 돈다.

## 라이선스

MIT
