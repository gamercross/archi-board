# board-data.js 형식 (format 1)

보드는 두 파일이다. `index.html`이 **엔진**(`engine/v1/board.js` · `board.css`)과 **데이터**(`board-data.js`)를 불러온다.
데이터 파일은 `window.BOARD = { … }` 하나만 둔다. 엔진은 고치지 않는다 — 보드를 바꾸려면 이 파일만 고친다.

완성된 예시: [`examples/memo/board-data.js`](../../../examples/memo/board-data.js). 쓰고 나면 `scripts/check.mjs`로 점검한다.

## 맨 위 칸

| 칸 | 필수 | 뜻 |
|---|---|---|
| `format` | 예 | `1` — 엔진 `engine/v1/`과 짝 |
| `title` · `sub` | 예 · 아니오 | 위 띠의 이름과 한 줄 설명 |
| `start` | 아니오 | 처음 열 때 보여 줄 창 id. 없으면 객체 지도 → `main` 창 → 전체 |
| `frames` | 예 | 창 목록 |
| `elements` | 예 | 창 안의 ArchiMate 상자 |
| `relations` | 아니오 | 상자 사이 선 |
| `flows` | 아니오 | 창 사이의 굵은 흐름 |
| `tour` | 아니오 | "흐름 따라가기" 차례 |
| `lanes` · `usecases` | 아니오 | 창 아래 순서도(유즈케이스) |
| `objectMap` | 아니오 | 객체 지도 (layout `objects` 창이 있어야 한다) |
| `dataMap` | 아니오 | 데이터 지도 (layout `datamap` 창이 있어야 한다) |
| `insights` | 아니오 | 판단 · 차트 — 사람이나 AI가 매긴 값 (열지도 · 막대 · 흐름도). 엔진 1.1 이상 |
| `screens` · `images` | 아니오 | 화면 사진 카드 (layout `screens` 창) |
| `matrixRows` · `rowNames` | 아니오 | 앱 × 유즈케이스 표 (layout `matrix` 창) |
| `arrange` | 아니오 | 창을 놓는 자리 |

## frames — 창

```js
{id: 'loop', kicker: '메인 흐름', title: '메모 한 바퀴', weight: 5, w: 1040, layout: 'ring', main: true,
 ring: ['bp_write', 'bp_save'], center: ['ba_user'],
 sub: '한 줄', desc: '창을 누르면 옆 칸에 나오는 설명', why: '이 크기인 까닭', recent: [['10/23', '최근 한 일']]}
```

- `weight` 1~5: 글자 크기와 중요도. `w`: 너비(px). 높이는 내용에 맞춰 엔진이 정한다.
- `layout`: `rows`(기본 — 층별 줄) · `ring`(가운데 고리, `ring`과 `center`에 상자 id) · `time`(이행 계획 — `plateau`와 `wp` 상자에 `col` 숫자) · `objects` · `datamap` · `matrix` · `screens`.
  `objects` · `datamap` · `matrix` · `ring` · `screens`는 보드에 **하나씩만**.
- `main: true`인 창이 파란 테두리 메인 흐름이다(하나만 권함).

## elements — 상자

```js
{f: 'parts', id: 'ac_api', t: 'acomp', n: 'API 서버', d: '설명', s: 'done', c: 'server/api.js'}
```

| 칸 | 뜻 |
|---|---|
| `f` | 들어갈 창 id |
| `id` | 보드 전체에서 하나뿐인 id. 접두어 권장: `st_` `g_` `pr_` `ba_` `bp_` `ac_` `as_` `do_` `node_` `ts_` `wp_` `pl_` |
| `t` | 종류 — 아래 표 |
| `n` · `d` | 이름(두 줄까지 보임) · 설명 |
| `s` | 상태: `done` 있음 · `part` 일부 · `todo` 없음(점선) · `cand` 후보(점선) · `gone` 뺌. 상태가 없는 목표 · 원칙은 비워 둔다 |
| `c` | 코드 위치(파일 · 함수) |
| `col` · `when` · `who` | `time` 창에서만: 열 번호, 작업 묶음의 때와 사람 |

배열로 써도 된다: `['parts', 'ac_api', 'acomp', 'API 서버', '설명', 'done', 'server/api.js', {추가 칸}]`.

**종류(t)** — ArchiMate 3 층

| 층 | 종류 |
|---|---|
| 동기 | `stakeholder` `driver` `assessment` `goal` `outcome` `principle` `constraint` |
| 전략 | `capability` `resource` `course` |
| 업무 | `bactor` `brole` `bprocess` `bservice` `bobject` `product` |
| 프로그램 | `acomp` `aiface` `aservice` `dobject` |
| 기술 | `node` `syssw` `tservice` `artifact` |
| 이행 | `plateau` `wp` |

## relations — 선

`['보내는 상자', '받는 상자', '관계']` — 관계: `realization` 실현 · `serving` 지원 · `assignment` 맡음 · `access` 읽고 씀 ·
`flow` 넘겨줌 · `triggering` 이어짐 · `influence` 영향 · `composition` 이룸 · `aggregation` 묶음 · `association` 관련.
창이 다른 상자끼리 이으면 평소에는 숨고, 상자를 누를 때 나타난다.

## flows · tour

```js
flows: [['loop', 'parts', '부품이 일을 한다'], ['loop', 'why', '목표를 이룬다', 150]]   // 넷째 값: 위로 돌아가는 높이
tour:  [{t: '제목', f: ['loop'], ids: ['bp_write'], p: '설명 한두 문장'}]              // f: 비출 창, ids: 켤 상자
```

## lanes · usecases — 순서도

```js
lanes: {user: ['사용자', 'ba_user'], api: ['API 서버', 'ac_api']},     // 세로 줄 열쇠 → [이름, 상자 id]
usecases: [{id: 'save', f: 'parts', s: '저장', t: '메모를 저장한다', d: '한 줄', lanes: ['user', 'api'], steps: [
  ['user', 'api', '저장을 누른다', 'POST /api/notes'],          // [보내는 줄, 받는 줄, 하는 일, 코드]
  ['api', 'api', '길이를 본다'],                                  // 같은 줄이면 "안에서"
  ['api', 'user', '저장됨', '201', {r: true}],                    // r: 돌려주는 답(점선)
  ['api', 'user', '거절', '413', {r: true, alt: '너무 길면'}]      // alt: 그 경우에만 지나는 갈래
]}]
```

- 순서도는 `f` 창의 아래쪽에 붙는다. `s`는 짧은 이름(카드 · 표에 쓰임), `t`는 긴 이름.
- `prop: true`인 유즈케이스는 아직 없는 기능 — 객체 지도의 선 · 따라가기에서 뺀다.

## objectMap — 객체 지도

```js
objectMap: {
  packages: [{id: 'p_back', row: 1, l: 'app', n: '서버', d: '한 줄', ids: ['ac_api']}],   // row: 위에서 몇째 줄, l: app · bus · tec(색)
  objects: {
    ac_api: {name: 'API 서버', kind: '서버', one: '한 줄로 맡은 일', what: '무엇인가', why: '왜 따로 있나',
      how: ['안에서 도는 순서'], holds: ['가진 것 · 기억하는 것'], api: ['받는 입구 — 설명'], calls: ['부르는 것'],
      fails: ['실패하거나 막을 때'], rules: ['꼭 지키는 약속'], change: ['고칠 때 볼 것'], files: ['server/api.js'],
      parts: [{n: '부분 이름', d: '설명', fn: 'func()'}]}            // parts는 화면처럼 안이 큰 객체에만
  },
  laneMap: {conn: 'ac_connect'},     // 세로 줄이 상자와 다른 객체를 가리킬 때만
  extra: [['ac_api', 'node_db', '밤마다 백업']],   // 순서도에는 없지만 코드에서 이어지는 길(점선)
  usecaseNotes: {save: {when: '언제 시작', end: '끝나면 남는 것', fail: '안 될 때'}},
  journey: ['save', 'find']           // "전체 여정 따라가기" 차례
}
```

- 객체 id는 보통 상자 id와 같게 둔다 — 순서도의 세로 줄이 그 객체로 이어진다.
- 객체 사이 선은 엔진이 순서도의 화살표(답 제외)를 세어 그린다. 굵을수록 자주 오간다.

## dataMap — 데이터 지도

```js
dataMap: {
  stores: [{id: 'br', n: '브라우저', l: 'app', life: '이 브라우저에만', d: '설명'}],       // 데이터가 놓이는 곳 (l: app · tec)
  data: [{id: 'd_draft', st: 'br', n: '초안', k: "localStorage 'memo:draft'", one: '한 줄',
          shape: ['칸 — 뜻'], w: [['ac_web', '어떻게 쓰나']], r: [['ac_web', '어떻게 읽나']], v: [['ac_mask', '거치며 하는 일']],
          lim: '한도', life: '언제 사라지나', never: '남기지 않는 것', change: '바꿀 때 같이 고칠 곳', tests: ['tests/draft.test.js']}],
  flow: [{o: 'ac_web', t: '칸 이름', d: '한 줄', dm: ['d_draft']}]     // 맨 위 "한 줄 흐름"
}
```

- `w` · `r` · `v`의 첫 값은 객체 지도의 객체 id. 사람이 직접 하면 `null`.
- 모르는 칸은 비우거나 `'—'`. 지어내지 않는다.

## insights — 판단 · 차트 (엔진 1.1 이상)

코드에서 바로 읽히지 않고 **사람이나 AI가 판단해 매긴 값**(위험도 · 복잡도 · 진척 · 흐름의 양)을 그린다.
위 띠의 "판단 · 차트" 단추, 창 · 상자 · 객체 · 데이터 패널의 "판단 · 차트" 칸에서 열린다. 그리는 자리는 옆 패널이라 창 배치는 바뀌지 않는다.

```js
insights: [
  {id: 'risk', f: 'parts', type: 'heatmap', t: '부품별 걱정되는 정도', d: '한 줄',
   rows: ['ac_web', 'ac_api'], cols: ['보안', '시험', '결합'],
   values: [[1, 2, 2], [3, 1, null]],                       // 줄 × 칸. 모르면 null
   scale: {min: 1, max: 3, labels: ['낮음', '보통', '높음'], high: 'bad'},
   rubric: ['1 — …', '2 — …', '3 — …'],                    // 값의 기준
   notes: [['ac_api', '보안', '칸 하나의 근거']],
   basis: ['server/api.js — 근거 한 줄']},
  {id: 'status', type: 'bar', t: '상태', unit: '개', items: [['done', 9], ['part', 1], ['todo', 3]], basis: ['…']},
  {id: 'paths', type: 'sankey', t: '길', unit: '칸', links: [['ac_web', 'ac_api', 2]], basis: ['…']}
]
```

| 칸 | 필수 | 뜻 |
|---|---|---|
| `id` · `type` | 예 | 하나뿐인 id · `heatmap` `bar` `sankey` |
| `t` · `d` | 아니오 · 아니오 | 제목 · 한 줄 설명 |
| `f` | 아니오 | 이 판단이 속한 창 id. 그 창의 패널에도 나타나고, 열면 그 창으로 간다 |
| `basis` | **권함** | 근거 — 문자열이나 목록. 코드 위치나 까닭. 없으면 점검이 경고하고 패널에 "근거 없음"이 뜬다 |
| `of` | 아니오 | 더 걸고 싶은 상자 · 객체 · 데이터 id (아래 id는 자동으로 걸린다) |

- **heatmap**: `rows`(상자 · 객체 · 데이터 id나 글) × `cols`(글). `values`는 `rows` 수 × `cols` 수의 숫자, 모르면 `null`.
  `scale.high`가 `bad`(기본)면 큰 값이 붉고 `good`이면 큰 값이 옅다. 색에만 기대지 않도록 칸에 숫자가 함께 보인다.
  `rubric`에 점수마다 무슨 뜻인지 적는다 — 같은 코드를 보고 사람마다 점수가 달라지지 않게.
- **bar**: `items`는 `[이름, 숫자]`. 이름이 `done · part · todo · cand · gone`이면 상태 색으로 그린다. `max`로 눈금 끝을 정한다.
- **sankey**: `links`는 `[보내는 쪽, 받는 쪽, 양]`. 한 방향이어야 한다(돌고 도는 길은 점검이 막는다). `unit`은 양의 단위.
- `rows` · `items` · `links`의 이름이 상자 · 객체 · 데이터 id이면 이름으로 바뀌고 눌러서 그 카드로 갈 수 있다.
- 값을 지어내지 않는다. 근거를 댈 수 없는 칸은 `null`로 두고 `basis`에 "확인 못 함"이라고 쓴다.

## screens · matrix (선택)

```js
screens: [{img: 'setup', t: '처음 켜면', url: 'index.html#setup', uc: 'boot', k: 0, els: ['ac_web'],
           mv: '움직이면 보이는 것', fe: ['프론트 쪽'], be: ['백엔드 쪽']}],
images: {setup: 'shots/setup.webp'},        // 경로 · 주소 · data: URI. img에 바로 주소를 써도 된다
matrixRows: ['ba_user', 'ac_web', 'ac_api'], rowNames: {ba_user: '사용자'}
```

## arrange — 자리

`[열, 열, …]`, 열은 `[줄, 줄, …]`, 줄은 `[창 id, …]`. 열은 왼쪽부터, 줄은 위부터 놓인다.
빠진 창은 첫 열 아래에 셋씩 붙는다. 예: `[[['objects'], ['data']], [['why'], ['road']], [['loop', 'parts']]]`.

## 버전

- 엔진 주소의 `v1`은 형식 1이다. v1 안에서는 칸을 **더하기만** 하고 뜻을 바꾸지 않는다 — 그래서 v1 엔진이 고쳐지면 모든 보드가 그대로 좋아진다.
- 형식을 깨는 바꿈은 `engine/v2/`와 `format: 2`로 따로 낸다.
