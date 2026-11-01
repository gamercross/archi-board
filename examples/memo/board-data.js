// archi-board 예시 — 작은 메모 앱. 실제 서비스가 아니라 형식을 보여 주려고 지은 것이다.
window.BOARD = {
  format: 1,
  title: '메모 앱 보드',
  sub: '예시 · 메모를 쓰고 저장하고 찾는 작은 웹 앱',
  start: 'big',   // 처음 보는 사람용 한 장 그림부터. '만드는 사람'으로 바꾸면 객체 지도부터

  frames: [
    // 처음 보는 사람(사용자 · 평가자 · 새 팀원)용 — layout 'view'. 코드 이름 없이 쉬운 말, 한 장에 상자 25개 안쪽
    {id: 'big', kicker: '처음 보는 사람에게', title: '메모 앱은 이렇게 돈다', weight: 5, w: 1700, layout: 'view', cols: 4,
     sub: '누가 쓰고 · 무엇을 받고 · 어떤 차례로 · 무엇이 받쳐 주나',
     desc: '위에서 아래로 읽는다. 맨 위가 쓰는 사람, 그 아래가 그 사람이 받는 도움, 가운데가 하는 일의 차례, 아래로 갈수록 그 일을 받쳐 주는 프로그램 · 데이터 · 기술이다.',
     why: '처음 여는 사람이 30초 안에 "무엇이고 어떻게 도는지"를 말할 수 있게 하는 그림이라 가장 먼저 보인다.'},
    {id: 'trip', kicker: '처음 보는 사람에게 · 차례', title: '3초 안에 남기기', weight: 4, w: 1700, layout: 'view', cols: 5,
     sub: '생각이 떠오른 순간부터 저장될 때까지 한 번의 차례',
     desc: '시작 사건(떠오른 생각)에서 단계 넷을 왼쪽에서 오른쪽으로 지나간다. 아래 줄은 그 단계를 돕는 프로그램의 일이다.',
     why: '사람이 실제로 겪는 순서를 한 줄로 보여 주는 그림이다.'},
    {id: 'why', kicker: '동기', title: '왜 만드는가', weight: 2, w: 700,
     sub: '누가 무엇 때문에 곤란한가', desc: '떠오른 생각을 잃어버리는 사람이 3초 안에 메모를 남기게 한다.', why: '모든 창이 이 목표를 향한다.'},
    {id: 'loop', kicker: '메인 흐름', title: '메모 한 바퀴', weight: 5, w: 1040, layout: 'ring', main: true,
     ring: ['bp_write', 'bp_save', 'bp_sync', 'bp_find'], center: ['ba_user'],
     sub: '쓰기 → 저장 → 동기화 → 찾기', desc: '메모 하나가 도는 네 칸이다.', why: '제품의 중심이라 가장 크게 둔다.',
     recent: [['10/23', '찾기 칸을 더함']]},
    {id: 'parts', kicker: '프로그램', title: '화면 · 서버 · 저장', weight: 3, w: 1040,
     sub: '메모가 지나는 부품', desc: '브라우저 화면이 API 서버에 저장을 부탁하고, 서버가 데이터베이스에 쓴다.', why: '고칠 때 가장 자주 여는 창이다.'},
    {id: 'road', kicker: '이행', title: '만드는 순서', weight: 2, w: 1000, layout: 'time',
     sub: '지금 → 다음', desc: '지금 만든 것과 다음에 만들 것.', why: '계획은 작게 둔다.'},
    {id: 'objects', kicker: '한 장으로', title: '객체 지도', weight: 5, w: 2000, layout: 'objects',
     sub: '부품 넷을 카드로', desc: '프로그램을 이루는 부품 하나를 카드 하나로 그렸다.', why: '유지보수할 때 먼저 여는 지도다.'},
    {id: 'data', kicker: '한 장으로 · 데이터', title: '데이터 지도', weight: 5, w: 2000, layout: 'datamap',
     sub: '어디에 놓이고 누가 쓰나', desc: '데이터가 놓이는 곳 셋과 데이터마다 쓰는 곳 · 읽는 곳.', why: '객체 지도 바로 아래에 둔다.'},
    {id: 'first', kicker: '처음 쓰는 길', title: '첫 1분 · 장면 셋', weight: 3, w: 1040, layout: 'cards', cols: 3, ch: 300, button: '첫 1분',
     sub: '처음 연 사람이 첫 메모를 남기기까지', desc: '장면 하나가 카드 하나다. 카드마다 보는 것과 하는 일, 이어지는 상자.', why: '처음 쓰는 길을 고칠 때 본다.'}
  ],

  // 카드 창 — 장면 하나 = 카드 하나
  cards: [
    {f: 'first', id: 'c1', no: '1', k: '0:00', n: '빈 화면', tag: '시작', s: 'done',
     sections: [{h: '보는 것', p: '입력 칸 하나와 빈 목록.'}, {h: '화면의 말', say: '첫 메모를 적어 보세요.'}], els: ['ac_web'], to: ['c2']},
    {f: 'first', id: 'c2', no: '2', k: '0:20', n: '한 줄 적기', tag: '쓰기', s: 'done',
     sections: [{h: '하는 일', p: '한 줄을 적는다. 적는 동안 초안이 남는다.'}, {h: '만드는 법', code: [['초안 저장', 'web/draft.js']]}], els: ['ac_web'], to: ['c3']},
    {f: 'first', id: 'c3', no: '3', k: '0:40', n: '저장 · 목록', tag: '저장', s: 'part',
     sections: [{h: '하는 일', p: '저장을 누르면 목록 맨 위에 보인다.'}, {h: '더할 것', list: ['저장됨 표시를 잠깐 보이기']}], els: ['ac_api', 'node_db']}
  ],

  // {f: 창, id, t: 종류(TYPES), n: 이름, d: 설명, s: 상태(done · part · todo · cand · gone), c: 코드 위치}
  elements: [
    // 한 장 그림 — row: 위에서 몇째 띠(없으면 종류로 정해진다), col · span: 열 자리와 폭, kids: 틀 안의 단계(차례대로 저절로 이어진다), sub: 이름 아래 한 줄, see: 만드는 사람 쪽 자세히
    {f: 'big', id: 'v_user', t: 'bactor', n: '바쁜 사람', sub: '떠오른 생각을 자주 잊는다', d: '생각이 떠올라도 적을 곳을 찾다가 잊는다.'},
    {f: 'big', id: 'v_keep', t: 'bservice', n: '바로 적어 두기', sub: '3초 안에', d: '앱을 열고 저장까지 3초.', col: 1},
    {f: 'big', id: 'v_find', t: 'bservice', n: '다시 찾기', sub: '낱말 하나로', d: '낱말로 지난 메모를 찾는다.', col: 2},
    {f: 'big', id: 'v_idea', t: 'bevent', n: '생각이 떠오름', col: 0},
    {f: 'big', id: 'v_flow', t: 'bprocess', n: '메모 남기기', col: 1, span: 3, kids: ['v_w', 'v_s', 'v_f']},
    {f: 'big', id: 'v_w', t: 'bprocess', n: '쓴다', d: '글을 적으면 바로 초안에 남는다.'},
    {f: 'big', id: 'v_s', t: 'bprocess', n: '저장한다', d: '저장을 누르면 서버로 보낸다. 끊겼으면 다시 이어질 때 올린다.'},
    {f: 'big', id: 'v_f', t: 'bprocess', n: '찾는다', d: '낱말로 지난 메모를 찾는다.', s: 'todo'},
    {f: 'big', id: 'v_web', t: 'acomp', n: '메모 화면', sub: '쓰고 보는 곳', d: '브라우저에서 도는 화면.', col: 1, see: 'ac_web'},
    {f: 'big', id: 'v_api', t: 'acomp', n: '메모 서버', sub: '저장 · 찾기를 받는다', d: '화면의 요청을 받아 메모를 남기고 꺼낸다.', col: 2, see: 'ac_api'},
    {f: 'big', id: 'v_note', t: 'dobject', n: '메모', sub: '글 · 쓴 때', col: 2},
    {f: 'big', id: 'v_db', t: 'node', n: '데이터베이스', sub: '메모를 오래 둔다', col: 2},
    {f: 'trip', id: 't_go', t: 'bevent', n: '떠오른 생각', col: 0},
    {f: 'trip', id: 't_run', t: 'bprocess', n: '3초 안에 남기기', col: 1, span: 4, kids: ['t_1', 't_2', 't_3', 't_4']},
    {f: 'trip', id: 't_1', t: 'bprocess', n: '앱을 연다'},
    {f: 'trip', id: 't_2', t: 'bprocess', n: '한 줄 적는다'},
    {f: 'trip', id: 't_3', t: 'bprocess', n: '저장을 누른다'},
    {f: 'trip', id: 't_4', t: 'bprocess', n: '서버에 남는다'},
    {f: 'trip', id: 't_draft', t: 'aservice', n: '초안 보관', sub: '끊겨도 잃지 않는다', col: 2},
    {f: 'trip', id: 't_save', t: 'aservice', n: '저장 받기', sub: '서버가 받아 남긴다', col: 4},
    {f: 'why', id: 'st_user', t: 'stakeholder', n: '바쁜 사람', d: '생각이 떠올라도 적을 곳을 찾다가 잊는다.'},
    {f: 'why', id: 'g_fast', t: 'goal', n: '3초 안에 남긴다', d: '앱을 열고 저장까지 3초.'},
    {f: 'why', id: 'pr_off', t: 'principle', n: '끊겨도 쓴다', d: '네트워크가 없어도 쓰고, 다시 이어지면 올린다.'},
    {f: 'loop', id: 'ba_user', t: 'bactor', n: '사용자', s: 'done'},
    {f: 'loop', id: 'bp_write', t: 'bprocess', n: '쓰기', d: '글을 적으면 바로 초안에 남는다.', s: 'done'},
    {f: 'loop', id: 'bp_save', t: 'bprocess', n: '저장', d: '저장을 누르면 서버로 보낸다.', s: 'done'},
    {f: 'loop', id: 'bp_sync', t: 'bprocess', n: '동기화', d: '끊겼던 동안의 메모를 올린다.', s: 'part'},
    {f: 'loop', id: 'bp_find', t: 'bprocess', n: '찾기', d: '낱말로 지난 메모를 찾는다.', s: 'todo'},
    {f: 'parts', id: 'ac_web', t: 'acomp', n: '웹 화면', d: '메모를 쓰고 보는 곳.', s: 'done', c: 'web/app.js'},
    {f: 'parts', id: 'ac_api', t: 'acomp', n: 'API 서버', d: '저장 · 찾기 요청을 받는다.', s: 'done', c: 'server/api.js'},
    {f: 'parts', id: 'do_note', t: 'dobject', n: '메모', d: 'id · 글 · 쓴 때.', s: 'done'},
    {f: 'parts', id: 'node_db', t: 'node', n: '데이터베이스', d: '메모를 오래 둔다.', s: 'done'},
    {f: 'road', id: 'pl_now', t: 'plateau', n: '지금', d: '쓰기 · 저장', s: 'done', col: 0},
    {f: 'road', id: 'pl_next', t: 'plateau', n: '다음', d: '동기화 · 찾기', s: 'todo', col: 1},
    {f: 'road', id: 'wp_save', t: 'wp', n: '저장 API', s: 'done', col: 0, when: '10/20', who: '나'},
    {f: 'road', id: 'wp_find', t: 'wp', n: '찾기 화면', s: 'todo', col: 1, when: '10/30', who: '나'}
  ],

  // [보내는 쪽, 받는 쪽, 관계(RELS)]
  relations: [
    ['v_user', 'v_flow', 'assignment'], ['v_keep', 'v_user', 'serving'], ['v_find', 'v_user', 'serving'],
    ['v_s', 'v_keep', 'realization'], ['v_f', 'v_find', 'realization'], ['v_idea', 'v_flow', 'triggering'],
    ['v_web', 'v_w', 'serving'], ['v_api', 'v_s', 'serving'], ['v_web', 'v_api', 'flow'], ['v_api', 'v_note', 'access'], ['v_db', 'v_api', 'serving'],
    ['t_go', 't_run', 'triggering'], ['t_draft', 't_2', 'serving'], ['t_save', 't_4', 'serving'],
    ['g_fast', 'st_user', 'association'], ['pr_off', 'bp_sync', 'influence'],
    ['bp_write', 'bp_save', 'triggering'], ['bp_save', 'bp_sync', 'triggering'], ['bp_sync', 'bp_find', 'triggering'],
    ['ba_user', 'bp_write', 'assignment'], ['ac_web', 'bp_write', 'serving'], ['ac_api', 'bp_save', 'serving'],
    ['ac_web', 'ac_api', 'flow'], ['ac_api', 'do_note', 'access'], ['node_db', 'ac_api', 'serving'],
    ['wp_save', 'ac_api', 'realization'], ['wp_find', 'bp_find', 'realization'], ['bp_save', 'g_fast', 'realization']
  ],

  // [보내는 창, 받는 창, 이름, (위로 돌아가는 높이)]
  flows: [['loop', 'parts', '부품이 일을 한다'], ['loop', 'why', '목표를 이룬다'], ['road', 'parts', '이 순서로 만든다'], ['objects', 'data', '부품이 쓰고 읽는 데이터']],

  tour: [
    {t: '메모 앱 한 장', f: ['big'], ids: ['v_user', 'v_keep', 'v_find'], p: '맨 위의 바쁜 사람이 받는 도움은 둘 — 바로 적어 두기와 다시 찾기. 가운데 차례(쓴다 → 저장한다 → 찾는다)가 그 도움을 만든다.'},
    {t: '3초 안에 남기는 차례', f: ['trip'], ids: ['t_go', 't_1', 't_2', 't_3', 't_4'], p: '생각이 떠오른 순간부터 서버에 남을 때까지 네 단계. 끊겨도 초안이 남는다.'},
    {t: '한 바퀴', f: ['loop'], ids: ['ba_user', 'bp_write', 'bp_save', 'bp_sync', 'bp_find'], p: '메모 하나는 쓰기 → 저장 → 동기화 → 찾기를 돈다.'},
    {t: '부품', f: ['parts'], ids: ['ac_web', 'ac_api', 'node_db'], p: '화면이 서버에 부탁하고, 서버가 데이터베이스에 쓴다.'},
    {t: '객체 지도', f: ['objects'], ids: [], p: '부품마다 카드 하나. 카드를 누르면 자세히 나온다.'}
  ],

  // 순서도의 세로 줄: 열쇠 → [이름, 상자 id]
  lanes: {user: ['사용자', 'ba_user'], web: ['웹 화면', 'ac_web'], api: ['API 서버', 'ac_api'], db: ['데이터베이스', 'node_db']},

  // 칸: [보내는 줄, 받는 줄, 하는 일, 코드, {r: 답이면 true, alt: 갈래 이름}]
  usecases: [
    {id: 'save', f: 'parts', s: '저장', t: '메모를 저장한다', d: '쓴 글이 데이터베이스에 남기까지.', lanes: ['user', 'web', 'api', 'db'], steps: [
      ['user', 'web', '글을 적고 저장을 누른다'],
      ['web', 'web', '초안을 이 브라우저에 먼저 남긴다', 'localStorage memo:draft'],
      ['web', 'api', '메모를 보낸다', 'POST /api/notes'],
      ['api', 'db', '한 줄 넣는다', 'INSERT notes'],
      ['db', 'api', '새 id', '', {r: true}],
      ['api', 'web', '저장됨', '201', {r: true}],
      ['web', 'user', '목록 맨 위에 보인다', '', {r: true}]
    ]},
    {id: 'find', f: 'parts', s: '찾기', t: '지난 메모를 찾는다', d: '낱말 하나로.', lanes: ['user', 'web', 'api', 'db'], steps: [
      ['user', 'web', '낱말을 적는다'],
      ['web', 'api', '찾아 달라고 한다', 'GET /api/notes?q='],
      ['api', 'db', '글에 낱말이 든 메모', 'SELECT … LIKE'],
      ['db', 'api', '메모 목록', '', {r: true}],
      ['api', 'web', '최대 50개', '', {r: true}]
    ]}
  ],

  objectMap: {
    packages: [
      {id: 'p_user', row: 0, l: 'bus', n: '사람', d: '메모를 쓰는 사람.', ids: ['ba_user']},
      {id: 'p_front', row: 1, l: 'app', n: '브라우저', d: '화면이 도는 곳.', ids: ['ac_web']},
      {id: 'p_back', row: 1, l: 'app', n: '서버', d: '요청을 받는 곳.', ids: ['ac_api']},
      {id: 'p_store', row: 2, l: 'tec', n: '저장', d: '오래 두는 곳.', ids: ['node_db']}
    ],
    objects: {
      ba_user: {name: '사용자', kind: '행위자', one: '메모를 쓰고 찾는다', what: '이 앱을 쓰는 사람.', why: '모든 일이 여기서 시작한다.'},
      ac_web: {name: '웹 화면', kind: '화면', one: '메모를 쓰고 보여 준다', what: '브라우저에서 도는 화면.', why: '판정은 서버가 하고 화면은 보여 주기만 한다.',
        how: ['글을 적으면 초안을 남긴다', '저장을 누르면 서버로 보낸다', '답이 오면 목록을 다시 그린다'],
        holds: ['초안 — localStorage memo:draft'], api: ['저장 단추 — 글이 비면 막는다'], calls: ['POST /api/notes', 'GET /api/notes'],
        fails: ['서버가 안 받으면 초안을 두고 다시 보내기 단추를 보인다'], change: ['단추 문구는 web/text.js에 모여 있다'], files: ['web/app.js', 'web/text.js']},
      ac_api: {name: 'API 서버', kind: '서버', one: '저장 · 찾기 요청을 받는다', what: '작은 웹 서버.', why: '데이터베이스를 화면에 직접 열지 않으려고.',
        how: ['로그인을 확인한다', '글 길이를 본다(1만 자까지)', '데이터베이스에 쓴다'],
        api: ['POST /api/notes — 메모 하나 저장', 'GET /api/notes?q= — 낱말로 찾기'], fails: ['로그인이 없으면 401', '글이 너무 길면 413'],
        rules: ['다른 사람의 메모는 404로 숨긴다'], files: ['server/api.js'], },
      node_db: {name: '데이터베이스', kind: '저장소', one: '메모를 오래 둔다', what: '표 하나(notes).', why: '서버를 껐다 켜도 남아야 한다.',
        holds: ['notes — id · owner · text · at'], files: ['server/schema.sql']}
    },
    extra: [['ac_api', 'node_db', '밤마다 백업']],
    usecaseNotes: {
      save: {when: '저장을 누를 때.', end: '데이터베이스에 한 줄, 목록 맨 위에 하나.', fail: '서버가 안 받으면 초안이 남는다.'},
      find: {when: '찾기 칸에 낱말을 적을 때.', end: '최대 50개의 메모.', fail: '아무것도 없으면 "없어요"를 보인다.'}
    },
    journey: ['save', 'find']
  },

  dataMap: {
    stores: [
      {id: 'br', n: '브라우저', l: 'app', life: '이 브라우저에만', d: '화면이 스스로 쓰고 읽는다.'},
      {id: 'db', n: '데이터베이스', l: 'tec', life: '지우기 전까지', d: '서버만 쓰고 읽는다.'}
    ],
    data: [
      {id: 'd_draft', st: 'br', n: '초안', k: "localStorage 'memo:draft'", one: '저장 전의 글',
       shape: ['text — 쓰던 글', 'at — 마지막으로 고친 때'], w: [['ac_web', '글을 적을 때마다']], r: [['ac_web', '켤 때 이어 쓴다']],
       life: '저장되면 지운다.', never: '로그인 정보.', tests: ['tests/draft.test.js']},
      {id: 'd_notes', st: 'db', n: '메모 표', k: 'notes', one: '저장된 메모 전부',
       shape: ['id', 'owner — 쓴 사람', 'text — 1만 자까지', 'at'], w: [['ac_api', 'POST /api/notes']], r: [['ac_api', 'GET /api/notes']],
       lim: '사람마다 1만 개.', life: '지우기 전까지.', change: '칸을 더하면 schema.sql과 api.js를 같이.', tests: ['tests/api.test.js']}
    ],
    flow: [
      {o: 'ac_web', t: '초안을 남긴다', d: '이 브라우저에', dm: ['d_draft']},
      {o: 'ac_api', t: '서버가 쓴다', d: '데이터베이스에 한 줄', dm: ['d_notes']},
      {o: 'ac_web', t: '목록을 다시 그린다', d: '초안은 지운다', dm: ['d_draft', 'd_notes']}
    ]
  },

  // 판단 · 차트 — 사람이나 AI가 코드를 보고 매긴 값. 값마다 근거(basis)를 붙인다.
  insights: [
    {id: 'risk', f: 'parts', type: 'heatmap', t: '부품별 걱정되는 정도',
     d: '고치기 전에 어디부터 볼지 정하려고 매겼다.',
     rows: ['ac_web', 'ac_api', 'node_db'], cols: ['보안', '시험', '결합'],
     values: [[1, 2, 2], [3, 1, 3], [2, 3, 1]],
     scale: {min: 1, max: 3, labels: ['낮음', '보통', '높음'], high: 'bad'},
     rubric: ['1 — 걱정 없음: 막는 장치와 시험이 있다', '2 — 보통: 일부만 있다', '3 — 높음: 없거나 코드로 확인되지 않는다'],
     notes: [['ac_api', '보안', '로그인 없이도 열리는 길이 있는지 코드에서 못 찾았다'], ['node_db', '시험', 'schema.sql을 확인하는 시험이 없다']],
     basis: ['server/api.js — 길이 · 로그인 검사는 있으나 속도 제한은 없다', 'tests/ — api.test.js와 draft.test.js뿐']},
    {id: 'status', f: 'loop', type: 'bar', t: '보드 상자의 상태', unit: '개',
     d: '상자에 적은 상태를 센 것이다.',
     items: [['done', 9], ['part', 1], ['todo', 3]],
     basis: ['elements의 s 값을 센 것 — 상태를 바꾸면 이 숫자도 다시 센다']},
    {id: 'paths', f: 'objects', type: 'sankey', t: '순서도로 본 길 (요청만)', unit: '칸',
     d: '유즈케이스 순서도에서 요청 화살표가 몇 칸 지나는지.',
     links: [['ba_user', 'ac_web', 2], ['ac_web', 'ac_api', 2], ['ac_web', 'd_draft', 1], ['ac_api', 'd_notes', 2]],
     basis: ['usecases save · find의 steps 중 답(r)이 아닌 칸을 보내는 쪽 → 받는 쪽으로 센 것', '같은 줄 안의 칸(초안 남기기)은 데이터 쪽으로 셌다']}
  ],

  // 열 → 줄 → 창
  arrange: [
    [['objects'], ['data']],
    [['why'], ['road']],
    [['loop', 'parts'], ['first']]
  ]
};
