// archi-board 자체를 설명하는 아키텍처 · BPMN · 방법론 · UI/UX 확장 보드
// 4계층(유저층 · 사용자 인터페이스 · 기능 · 인프라) × BPMN 프로세스 × 모범사례 · 방법론
window.BOARD = {
  format: 1,
  title: 'archi-board 스킬 아키텍처 & 방법론 지도',
  sub: '유저층 · 사용자 인터페이스 · 기능(BPMN) · 인프라 4계층으로 본 스킬 구조와 UI/UX 모범사례',
  start: 'v_arch',

  frames: [
    // ───────── [앞면: 처음 보는 사람용 (layout: 'view')] ─────────
    {
      id: 'v_arch',
      kicker: '처음 보는 사람에게 · 4계층 한 장 그림',
      title: '유저층 · UI · 기능 · 인프라 한눈에 보기',
      weight: 5,
      w: 1840,
      layout: 'view',
      cols: 4,
      rows: {
        0: '목표 · 원칙',
        1: '1계층 · 유저층',
        2: '2계층 · 사용자 인터페이스',
        3: '3계층 · 기능 (BPMN)',
        5: '4계층 · 인프라 · 엔진'
      },
      sub: '누가 쓰고 · 어떤 화면으로 보며 · 어떤 차례로 만들고 · 무엇이 받쳐 주나',
      desc: '위에서 아래로 4계층(유저층 → 사용자 인터페이스 → 기능 BPMN → 인프라)을 따라 읽는다. 쇼케이스 헤더, 플로팅 투어 배너, 발표 모드까지 모두 반영된 최신 구조다.',
      why: '스킬을 처음 접하는 사람과 팀원이 5초 안에 전체 4계층 구조와 작동 원리를 이해하도록 맨 앞에 둔다.'
    },
    {
      id: 'v_bpmn',
      kicker: '처음 보는 사람에게 · BPMN 차례 사슬',
      title: '말 한마디에서 보드 완성 · 온보딩까지',
      weight: 4,
      w: 1840,
      layout: 'view',
      cols: 5,
      rows: {
        1: '참여하는 주체 (유저층)',
        3: 'BPMN 핵심 차례 (기능)',
        4: '사용자 인터페이스 경험',
        5: '받쳐 주는 인프라'
      },
      sub: '요청 사건 하나에서 시작해 5단계를 거쳐 검증된 보드로 그려지는 BPMN 흐름',
      desc: '왼쪽 시작 사건(갈매기 모양)에서 오른쪽으로 5단계를 차례대로 따라간다. 아래 두 띠는 각 단계에서 작동하는 UI 경험과 인프라 도구다.',
      why: '에이전트와 사람이 어떤 순서로 협업해 보드를 만들고 검증하는지 한 줄의 BPMN 사슬로 보여 준다.'
    },
    {
      id: 'v_method',
      kicker: '처음 보는 사람에게 · 모범사례와 방법론',
      title: '왜 이 보드는 누구나 읽기 쉬운가',
      weight: 4,
      w: 1840,
      layout: 'view',
      cols: 4,
      rows: {
        0: '풀려는 문제',
        0.5: '적용한 표준과 방법론',
        2: 'UI · UX 모범사례',
        3: '품질 보증 차례'
      },
      sub: 'ArchiMate · BPMN · 5초 시험 · 코드 사실주의 · 외부 온보딩 UX의 결합',
      desc: '맨 위의 문제를 해결하기 위해 어떤 방법론과 UI/UX 모범사례를 결합했는지, 그리고 어떤 품질 게이트를 거치는지 보여 준다.',
      why: '단순한 그림 도구가 아니라 검증된 아키텍처 방법론과 UX 원칙 위에 설계된 스킬임을 설명한다.'
    },

    // ───────── [뒷면: 만드는 사람용 (layout: 'rows' | 'ring' | 'cards' | 'time' | 'objects' | 'datamap' | 'matrix')] ─────────
    {
      id: 'bpmn_loop',
      kicker: '메인 흐름 · BPMN 순환 고리',
      title: '코드 · 아키텍처 보드 동기화 한 바퀴',
      weight: 5,
      w: 1120,
      layout: 'ring',
      main: true,
      ring: ['bp_front', 'bp_read', 'bp_write', 'bp_check', 'bp_serve', 'bp_sync'],
      center: ['ba_agent'],
      sub: '앞면 설계 → 코드 역공학 → 데이터 합성 → 정적 점검 → 렌더링 · 시험 → 증분 갱신',
      desc: '코드와 문서가 따로 놀지 않도록 에이전트가 6단계 BPMN 고리를 돌며 보드를 만들고 유지보수한다.',
      why: '이 스킬의 핵심 작동 원리(생성 → 검증 → 탐색 → 증분 갱신)가 도는 중심 고리이므로 메인 창으로 둔다.',
      recent: [
        ['11/03', '엔진 1.3 발표 모드 · 플로팅 투어 배너 · 코치마크 및 쇼케이스 헤더 구현 완료'],
        ['11/01', '엔진 1.2 앞면(처음 보는 사람) / 뒷면(만드는 사람) 전환 도입']
      ]
    },
    {
      id: 'arch_4tier',
      kicker: 'ArchiMate 상세 창 · 4계층 + BPMN 순서도',
      title: '유저층 · UI · 기능 · 인프라 상세 구조',
      weight: 5,
      w: 1520,
      layout: 'rows',
      button: '4계층 ArchiMate',
      sub: '동기 · 전략 · 업무(유저/BPMN) · 프로그램(UI/기능) · 기술(인프라) · 이행 전 계층과 스윔레인 순서도',
      desc: '4계층의 모든 구성요소를 ArchiMate 3 표준 층별로 매핑하고, 아래쪽에 4가지 핵심 BPMN 유즈케이스 스윔레인 순서도를 배치했다.',
      why: '엔지니어와 에이전트가 실제 파일 위치(c)와 컴포넌트 간 관계, 실행 시퀀스를 한 창에서 대조할 때 본다.'
    },
    {
      id: 'practices',
      kicker: '모범사례 · 방법론 카탈로그',
      title: '8대 아키텍처 방법론 & UI/UX 모범사례',
      weight: 4,
      w: 2400,
      layout: 'cards',
      cols: 4,
      ch: 560,
      button: '모범사례 · 방법론',
      sub: '이중 청중 분리 · 5초 인지 시험 · BPMN 사슬 · 코드 사실주의 · 정량 루브릭 · 무중단 엔진 · 쇼케이스 UX',
      desc: '스킬에 내장된 6가지 핵심 엔지니어링/아키텍처 방법론과, 외부 사용자 확산을 위해 구현된 2가지 UI/UX 모범사례를 카드로 정리했다.',
      why: '우리 스킬이 어떤 철학과 모범사례(Best Practices)로 설계되었는지 체계적으로 설명하기 위해 두었다.',
      more: [
        {
          h: '핵심 설계 철학 3원칙',
          list: [
            '**처음 보는 사람부터 배려한다**: 부품 나열보다 4가지 질문(무엇·누구·차례·기반)에 답하는 앞면 그림을 먼저 그린다.',
            '**코드에 있는 사실만 그린다**: 추측을 금지하고, 실제 코드에 구현된 것과 미구현 상태를 명확히 구분한다.',
            '**엔진과 데이터를 분리한다**: 프로젝트에는 데이터만 두고 렌더링 엔진은 공용 주소에서 불러와 무중단으로 진화한다.'
          ],
          ol: true
        }
      ]
    },
    {
      id: 'roadmap',
      kicker: '이행 계획 · 진화 로드맵',
      title: '코어 엔진 완성에서 외부 사용자 UX 확장까지',
      weight: 3,
      w: 1240,
      layout: 'time',
      sub: '1단계 코어(v1.0~1.2) → 2단계 쇼케이스 · 온보딩 UX(완료) → 3단계 뷰어 · 발표 UX 고도화(v1.3 완료)',
      desc: '에이전트·엔지니어 중심 코어(v1.0~v1.2) 위에 일반 사용자와 외부 팀을 위한 쇼케이스 및 뷰어 UX(v1.3)까지 모두 구현한 단계별 이행 기록이다.',
      why: '코어 엔진부터 외부 온보딩·발표 모드까지 어떤 순서로 완성되었는지 한눈에 보여 주기 위해 둔다.'
    },
    {
      id: 'objects',
      kicker: '한 장으로 · 4계층 부품 카드',
      title: '객체 지도 (유저층 · UI · 기능 · 인프라)',
      weight: 5,
      w: 2200,
      layout: 'objects',
      sub: '4계층 11개 핵심 주체와 부품의 책임 · 내부 순서 · 입구 · 실패 처리 · 관련 파일',
      desc: '위에서부터 1계층(유저층) → 2계층(사용자 인터페이스) → 3계층(기능 · BPMN 도구) → 4계층(인프라 · 엔진) 순서로 묶음을 나누어 배치했다.',
      why: '각 계층의 부품이 실제로 어떤 파일을 읽고 어떤 약속(rules)을 지키는지 깊이 탐색할 때 여는 지도다.'
    },
    {
      id: 'data',
      kicker: '한 장으로 · 데이터 흐름과 저장소',
      title: '데이터 지도',
      weight: 5,
      w: 2200,
      layout: 'datamap',
      sub: '스킬 규칙 · 보드 데이터 · 메타모델 · 브라우저 상태 · 단일 번들 파일의 생성과 소비',
      desc: '스킬 저장소, 대상 프로젝트 폴더, 브라우저 런타임, 아티팩트 파일 네 곳에 놓이는 6가지 핵심 데이터의 모양과 수명 주기를 보여 준다.',
      why: '데이터 파일 하나(board-data.js)를 중심으로 어떻게 검증·렌더링·번들링이 이루어지는지 파악하기 위해 둔다.'
    },
    {
      id: 'matrix',
      kicker: '교차 분석 · 계층 × 유즈케이스',
      title: '4계층 부품 × BPMN 유즈케이스 행렬',
      weight: 3,
      w: 1120,
      layout: 'matrix',
      button: '계층 × 흐름 표',
      sub: '어느 계층의 주체와 부품이 어느 BPMN 시나리오에 몇 번 참여하는가',
      desc: '유저층 · UI · 기능 · 인프라의 각 구성요소가 4가지 핵심 BPMN 유즈케이스에서 보내고 받는 횟수를 한 표로 요약한다.',
      why: '부품 간 결합도와 유즈케이스별 책임 분담을 한눈에 점검하기 위해 둔다.'
    }
  ],

  // ───────── [모범사례 · 방법론 카드 (layout: 'cards')] ─────────
  cards: [
    {
      f: 'practices',
      id: 'c_dual',
      no: '1',
      k: '방법론 1 · 청중 분리',
      n: '이중 청중 아키텍처 (앞면 · 뒷면)',
      tag: 'ArchiMate Viewpoint',
      s: 'done',
      lead: '처음 보는 사람(앞면)과 만드는 사람(뒷면)의 뷰포인트를 분리한다.',
      sections: [
        {h: '해결하는 문제', p: '개발자용 부품 지도부터 보여 주면 기획자·평가자·새 팀원은 첫 화면에서 길을 잃는다.'},
        {h: '핵심 규칙', list: ['앞면은 쉬운 말과 큰 흐름(한 장 그림 · 차례 그림)만 배치', '상자마다 see 링크로 뒷면 상세 객체·코드와 양방향 연결']},
        {h: '구현 위치', code: [['청중 전환', 'engine/v1/board.js'], ['앞면 설계법', 'skills/archi-board/references/audience.md']]}
      ],
      els: ['ac_shell', 'ac_skill'],
      to: ['c_5sec']
    },
    {
      f: 'practices',
      id: 'c_5sec',
      no: '2',
      k: '모범사례 2 · 인지 부하 제어',
      n: '5초 인지 시험 & 쉬운 말 규칙',
      tag: 'UX Cognitive Load',
      s: 'done',
      lead: '5초 동안 보고 가린 뒤 "무엇이고 어떤 차례인지" 답할 수 있어야 통과다.',
      sections: [
        {h: '정량 제한 규칙', list: ['한 장에 상자 25개 이내 (30개 초과 시 점검 경고)', '차례 틀 안의 단계는 3~6개 이내', '상자 이름은 22자 이내, 코드/경로/이슈번호 표기 금지']},
        {h: '검증 방식', say: '이게 무엇이고 누구를 돕나요? 어떤 차례로 쓰나요?'},
        {h: '자동 점검', code: [['쉬운 말 정규식 검사', 'skills/archi-board/scripts/check.mjs']]}
      ],
      els: ['ac_check'],
      to: ['c_bpmn']
    },
    {
      f: 'practices',
      id: 'c_bpmn',
      no: '3',
      k: '방법론 3 · 프로세스 & 유저 스토리',
      n: 'BPMN × ArchiMate × 유저 스토리 융합',
      tag: 'BPMN + User Story',
      s: 'done',
      lead: '정적 계층(ArchiMate), 시간 순서(BPMN 사슬·순서도), 사용자 장면 이야기(story)를 결합한다.',
      sections: [
        {h: '앞면 BPMN 사슬', p: '시작 사건(bevent 갈매기) → 프로세스 틀(kids 가로 사슬) → 단계별 자동 이어짐(triggering) 화살표로 직관적 흐름을 그린다.'},
        {h: '뒷면 순서도 & 유저 스토리', list: ['lanes와 usecases로 주체 간 요청·응답(r)·예외 갈래(alt) 표현', '순서도 카드를 누르면 누가·무엇을·왜와 장면별 보는 것(sees + basis)이 열리고 순서도가 함께 움직인다']},
        {h: '구현 위치', code: [['가로 사슬 & 유저 스토리(openUStory)', 'engine/v1/board.js']]}
      ],
      els: ['ac_canvas', 'ac_panel'],
      to: ['c_fact']
    },
    {
      f: 'practices',
      id: 'c_fact',
      no: '4',
      k: '방법론 4 · 역공학 원칙',
      n: '코드 사실주의 역공학 (Fact-Only)',
      tag: 'Reverse Engineering',
      s: 'done',
      lead: '코드에서 확인된 사실만 적고, 추측은 비우며 제안은 [제안]으로 표시한다.',
      sections: [
        {h: '읽는 순서 (작은 것부터)', list: ['1. 진입점 기반 부품 목록 (객체 지도 뼈대)', '2. 함수 호출을 따라가는 오가는 길 (순서도)', '3. 저장소 grep 기반 데이터 지도', '4. 동기와 이행 계획']},
        {h: '보안 철칙', p: '키 · 토큰 · 비밀번호 · 서버 주소 · 실명은 절대 적지 않는다(환경변수 이름만 허용).'},
        {h: '구현 위치', code: [['역공학 절차서', 'skills/archi-board/references/reading-code.md']]}
      ],
      els: ['ac_skill'],
      to: ['c_rubric']
    },
    {
      f: 'practices',
      id: 'c_rubric',
      no: '5',
      k: '방법론 5 · 설명 가능한 평가',
      n: 'Rubric · Basis 기반 정량 판단 차트',
      tag: 'Explainable AI Insight',
      s: 'done',
      lead: '위험도·복잡도·성숙도는 먼저 채점 기준(rubric)을 세우고 코드 근거(basis)를 남긴다.',
      sections: [
        {h: '3가지 시각화 차트', list: ['열지도(heatmap): 부품 × 평가 기준 매트릭스', '막대(bar): 상태 분포 · 완료율 집계', '흐름도(sankey): 계층 · 부품 간 단방향 호출량']},
        {h: '일관성 보장', p: '근거(basis)나 기준(rubric)이 빠지면 check.mjs가 즉시 경고하고 화면에도 근거 없음을 표시한다.'},
        {h: '구현 위치', code: [['차트 렌더러 & 점검', 'engine/v1/board.js']]}
      ],
      els: ['ac_panel', 'ac_check'],
      to: ['c_cdn']
    },
    {
      f: 'practices',
      id: 'c_cdn',
      no: '6',
      k: '모범사례 6 · 인프라 아키텍처',
      n: '엔진 · 데이터 분리와 무중단 자동 갱신',
      tag: 'Zero-Maintenance CDN',
      s: 'done',
      lead: '프로젝트는 board-data.js 하나만 관리하고, 엔진은 공용 CDN에서 불러온다.',
      sections: [
        {h: '작동 원리', list: ['v1 스키마 하위 호환성 유지 (칸 추가만 허용)', '엔진 개선 시 기존에 만든 모든 보드가 재생성 없이 자동 업그레이드', '오프라인·아티팩트 공유 시에만 inline.mjs로 단일 HTML 번들링']},
        {h: '무결성 파이프라인', code: [['왕복(pack/unpack) CI 검증', '.github/workflows/check.yml']]}
      ],
      els: ['ac_engine', 'ac_bundle', 'node_cdn'],
      to: ['c_ux_onboard']
    },
    {
      f: 'practices',
      id: 'c_ux_onboard',
      no: '7',
      k: 'UI/UX 모범사례 7 · 외부 확산',
      n: '쇼케이스 웰컴 헤더 & 원클릭 온보딩',
      tag: 'Onboarding UX',
      s: 'done',
      lead: '처음 방문한 사람이 10초 안에 스킬의 가치를 체험하고 설치 명령어를 복사하게 한다.',
      sections: [
        {h: '해결한 문제', p: '데모 진입 시 곧바로 메모 앱 캔버스가 열려, 비개발자나 첫 방문자가 이 도구의 정체와 설치법을 한눈에 알기 어렵던 문제를 해결했다.'},
        {h: '구현된 기능', list: ['상단 쇼케이스 배너(.sc-bar): 3단계 요약 + 원클릭 설치 명령어 복사(#scCopy)', '스킬 자체 아키텍처 보드(?board=self) ↔ 작은 메모 앱 예시(?board=memo) 즉시 전환 탭']},
        {h: '구현 위치', code: [['쇼케이스 헤더 & 탭 스위처', 'index.html']]}
      ],
      els: ['ac_shell', 'ui_showcase'],
      to: ['c_ux_viewer']
    },
    {
      f: 'practices',
      id: 'c_ux_viewer',
      no: '8',
      k: 'UI/UX 모범사례 8 · 뷰어 경험',
      n: '플로팅 투어 배너 · 발표 모드 · 코치마크',
      tag: 'Viewer & Presentation UX',
      s: 'done',
      lead: '비개발자도 발표 자료나 인터랙티브 가이드처럼 보드를 편하게 탐색하게 돕는다.',
      sections: [
        {h: '구현된 뷰어 UX (v1.3)', list: ['첫 진입 하단 플로팅 배너(#tourCta): "▶ 30초 흐름 따라가기" 즉시 실행 및 자동 숨김', '발표 모드(#bPres, #presBar): 상단 칩·미니맵을 숨기고 화살표 키로 창 간 슬라이드 이동', '3.5초 조작 코치마크(#hint): 드래그·휠·상자 클릭 안내 후 은은하게 투명도 전환']},
        {h: '구현 위치', code: [['플로팅 배너 & 발표 모드', 'engine/v1/board.js'], ['스타일 정의', 'engine/v1/board.css']]}
      ],
      els: ['ac_canvas', 'ac_panel', 'ui_pres']
    }
  ],

  // ───────── [ArchiMate 상자 (elements)] ─────────
  elements: [
    // =========================================================================
    // 1. 앞면 창 1: v_arch (유저층 · UI · 기능 · 인프라 4계층 한 장 그림) — 20개 상자, 쉬운 말
    // =========================================================================
    // 띠 0: 목표 · 원칙 (row: 0)
    {f: 'v_arch', id: 'va_goal', t: 'goal', n: '말 한마디로 구조 지도 완성', sub: '문서 작성 부담 없이 즉시 시각화', d: '코드를 읽어 누구나 탐색할 수 있는 아키텍처 보드 한 장을 만든다.', row: 0, col: 0, see: 'g_oneword'},
    {f: 'v_arch', id: 'va_pr1', t: 'principle', n: '앞뒷면 분리와 5초 인지', sub: '청중 맞춤 뷰포인트와 쉬운 말', d: '처음 보는 사람용 앞면과 개발자용 뒷면을 나누고 5초 안에 이해되게 그린다.', row: 0, col: 1, see: 'pr_dual'},
    {f: 'v_arch', id: 'va_pr2', t: 'principle', n: '코드 사실주의와 정량 근거', sub: '추측 금지 · 루브릭과 파일 근거', d: '코드에서 확인된 것만 적고 판단 값에는 기준과 근거를 명시한다.', row: 0, col: 2, see: 'pr_fact'},
    {f: 'v_arch', id: 'va_cap', t: 'capability', n: '엔진 분리 무중단 자동 갱신', sub: '데이터만 고치면 엔진은 자동 최신화', d: '렌더링 엔진을 공용 주소에서 불러와 보드를 다시 만들지 않아도 기능이 향상된다.', row: 0, col: 3, see: 'ac_engine'},

    // 띠 1: 1계층 · 유저층 (row: 1)
    {f: 'v_arch', id: 'va_u_view', t: 'bactor', n: '처음 보는 사람', sub: '기획자 · 평가자 · 새 팀원', d: '코드를 모르지만 서비스의 목적과 흐름을 빠르게 파악하려는 사용자층.', row: 1, col: 0, see: 'ba_viewer'},
    {f: 'v_arch', id: 'va_u_build', t: 'bactor', n: '만드는 사람', sub: '개발자 · 시스템 아키텍트', d: '부품 구조, 데이터 저장소, 코드 위치와 위험도를 점검하며 개발하는 사용자층.', row: 1, col: 1, see: 'ba_builder'},
    {f: 'v_arch', id: 'va_u_agent', t: 'bactor', n: '코딩 에이전트', sub: '절차에 따라 보드를 그리는 AI', d: '스킬 절차서를 읽고 코드 역공학부터 데이터 작성·점검까지 수행하는 에이전트.', row: 1, col: 2, see: 'ba_agent'},
    {f: 'v_arch', id: 'va_u_maint', t: 'brole', n: '엔진 · 스킬 관리자', sub: '공용 뷰어와 점검 규칙 유지보수', d: '하위 호환성을 지키며 뷰어 엔진과 정적 점검 스크립트를 개선하는 역할.', row: 1, col: 3, see: 'node_cdn'},

    // 띠 2: 2계층 · 사용자 인터페이스 (row: 2)
    {f: 'v_arch', id: 'va_ui_sw', t: 'aiface', n: '앞면 · 뒷면 전환 상단 띠', sub: '처음 보는 사람 / 만드는 사람 토글', d: '청중에 따라 필요한 창과 도구 단추만 골라 보여 주는 상단 인터페이스.', row: 2, col: 0, see: 'ac_shell'},
    {f: 'v_arch', id: 'va_ui_cv', t: 'aiface', n: '무한 보드 캔버스와 미니맵', sub: '줌 · 드래그 · 다크모드 · 원거리 요약', d: '멀리서는 창 제목과 진행률을, 가까이서는 상자와 화살표를 선명하게 그리는 캔버스.', row: 2, col: 1, see: 'ac_canvas'},
    {f: 'v_arch', id: 'va_ui_pn', t: 'aiface', n: '상세 패널 · 따라가기 투어', sub: '순서도 점 애니메이션 · 판단 차트', d: '상자·객체·데이터 상세 설명과 열지도·막대·흐름도 차트를 띄우는 패널.', row: 2, col: 2, see: 'ac_panel'},
    {f: 'v_arch', id: 'va_ui_new', t: 'aiface', n: '쇼케이스 · 발표 모드', sub: '온보딩 배너 · 코치마크 · 슬라이드', d: '외부 사용자가 처음 들어왔을 때 안내 배너와 발표 모드로 쉽게 탐색하게 돕는 UI.', s: 'done', row: 2, col: 3, see: 'ui_showcase'},

    // 띠 3: 3계층 · 기능 (BPMN 프로세스 사슬, row: 3)
    {f: 'v_arch', id: 'va_ev', t: 'bevent', n: '보드 제작 · 갱신 요청', sub: '자연어 한마디 트리거', d: '사용자가 아키텍처 보드 생성이나 업데이트를 요청하는 시작 사건.', row: 3, col: 0, see: 'be_req'},
    {f: 'v_arch', id: 'va_proc', t: 'bprocess', n: '보드 제작 BPMN 흐름', row: 3, col: 1, span: 3, kids: ['va_p1', 'va_p2', 'va_p3', 'va_p4'], see: 'bpmn_loop'},
    {f: 'v_arch', id: 'va_p1', t: 'bprocess', n: '앞면 쉬운 그림 설계', d: '누가 쓰는지 정의하고 네 질문에 답하는 앞면 두 장을 먼저 구성한다.', see: 'bp_front'},
    {f: 'v_arch', id: 'va_p2', t: 'bprocess', n: '코드 역공학 수집', d: '부품 → 오가는 길 → 데이터 → 판단 값 순서로 코드 사실만 모은다.', see: 'bp_read'},
    {f: 'v_arch', id: 'va_p3', t: 'bprocess', n: '데이터 작성 · 정적 점검', d: '데이터 파일을 쓰고 점검기로 오류 0개가 될 때까지 자동 검증한다.', see: 'bp_check'},
    {f: 'v_arch', id: 'va_p4', t: 'bprocess', n: '렌더링 · 5초 시험', d: '브라우저나 단일 파일로 열고 5초 인지 시험으로 가독성을 확인한다.', see: 'bp_serve'},

    // 띠 5: 4계층 · 인프라 · 엔진 (row: 5)
    {f: 'v_arch', id: 'va_in_sk', t: 'acomp', n: '스킬 절차서와 참조 규칙', sub: '청중 · 코드 읽기 · 데이터 규격 문서', d: '에이전트가 보드를 만들 때 따르는 표준 절차와 레퍼런스 가이드.', row: 5, col: 0, see: 'ac_skill'},
    {f: 'v_arch', id: 'va_in_ck', t: 'acomp', n: '무브라우저 정적 점검기', sub: '참조 무결성 · 쉬운 말 · 순환 검사', d: '브라우저를 열지 않고도 데이터 오류와 가독성 경고를 잡아내는 검증 엔진.', row: 5, col: 1, see: 'ac_check'},
    {f: 'v_arch', id: 'va_in_en', t: 'acomp', n: '공용 보드 렌더링 엔진', sub: '레이아웃 계산 · SVG 화살표 · 차트', d: '데이터 객체를 읽어 무한 보드와 인터랙티브 뷰를 그리는 프론트엔드 엔진.', row: 5, col: 2, see: 'ac_engine'},
    {f: 'v_arch', id: 'va_in_cd', t: 'node', n: '단일 번들러 · 배포 인프라', sub: '오프라인 묶기 · 자동 검증 · 배포망', d: '단일 HTML 묶기/풀기 도구와 정적 호스팅 및 자동 검증 파이프라인.', row: 5, col: 3, see: 'node_cdn'},

    // =========================================================================
    // 2. 앞면 창 2: v_bpmn (BPMN 종단간 실행 사슬) — 16개 상자, 쉬운 말
    // =========================================================================
    // 띠 1: 참여 주체 (row: 1)
    {f: 'v_bpmn', id: 'vb_u1', t: 'bactor', n: '요청자 · 팀원', sub: '자연어로 보드 요청 · 탐색', d: '보드를 만들어 달라고 요청하고 완성된 보드를 탐색·발표하는 사람.', row: 1, col: 0, see: 'ba_viewer'},
    {f: 'v_bpmn', id: 'vb_u2', t: 'bactor', n: 'AI 코딩 에이전트', sub: '코드 분석 · 데이터 작성 · 검증 실행', d: '절차서에 따라 코드를 분석하고 보드 데이터를 생성·교정하는 주체.', row: 1, col: 2, see: 'ba_agent'},
    {f: 'v_bpmn', id: 'vb_u3', t: 'bactor', n: '평가자 · 외부 사용자', sub: '5초 시험 · 쇼케이스 체험', d: '보드를 처음 열어 보고 5초 안에 이해되는지 확인하는 외부 청중.', row: 1, col: 4, see: 'ba_viewer'},

    // 띠 3: BPMN 핵심 차례 (row: 3)
    {f: 'v_bpmn', id: 'vb_start', t: 'bevent', n: '설치 및 제작 요청', sub: '두 줄 설치 후 한마디', d: '플러그인을 설치하고 프로젝트 보드 생성을 요청하는 시작 사건.', row: 3, col: 0, see: 'be_req'},
    {f: 'v_bpmn', id: 'vb_chain', t: 'bprocess', n: '종단간 BPMN 실행 사슬', row: 3, col: 1, span: 4, kids: ['vb_s1', 'vb_s2', 'vb_s3', 'vb_s4', 'vb_s5'], see: 'bpmn_loop'},
    {f: 'v_bpmn', id: 'vb_s1', t: 'bprocess', n: '청중 정의 · 앞면 구성', d: '보는 사람을 한 줄로 정하고 한 장 그림과 차례 그림을 쉬운 말로 먼저 설계한다.', see: 'bp_front'},
    {f: 'v_bpmn', id: 'vb_s2', t: 'bprocess', n: '부품 · 길 · 데이터 추출', d: '진입점부터 부품, 유즈케이스 순서도, 데이터 저장소를 역공학으로 추출한다.', see: 'bp_read'},
    {f: 'v_bpmn', id: 'vb_s3', t: 'bprocess', n: '데이터 합성 · 정적 점검', d: '데이터 파일을 작성하고 점검 스크립트로 오류 0개가 될 때까지 교정한다.', see: 'bp_check'},
    {f: 'v_bpmn', id: 'vb_s4', t: 'bprocess', n: '웹 · 단일 파일 배포', d: '공용 엔진 연결 보드 또는 오프라인용 단일 묶음 파일로 내보낸다.', see: 'bp_serve'},
    {f: 'v_bpmn', id: 'vb_s5', t: 'bprocess', n: '5초 시험 · 증분 갱신', d: '처음 보는 사람에게 5초 시험을 거치고, 코드 변경 시 바뀐 칸만 갱신한다.', see: 'bp_sync'},

    // 띠 4: 사용자 인터페이스 경험 (row: 4)
    {f: 'v_bpmn', id: 'vb_ui1', t: 'aservice', n: '쇼케이스 웰컴 안내', sub: '첫 진입 가치 요약 · 설치 복사', d: '스킬 데모에 처음 들어온 사람에게 무엇인지 안내하고 설치 명령을 복사해 준다.', s: 'done', row: 4, col: 0, see: 'ui_showcase'},
    {f: 'v_bpmn', id: 'vb_ui2', t: 'aservice', n: '플로팅 투어 가이드', sub: '30초 핵심 흐름 자동 안내', d: '처음 보는 사람이 길을 잃지 않도록 하단 배너로 따라가기 투어를 바로 제안한다.', s: 'done', row: 4, col: 2, see: 'ui_tour_cta'},
    {f: 'v_bpmn', id: 'vb_ui3', t: 'aservice', n: '양면 전환 · 발표 뷰', sub: '청중 토글 · 슬라이드 모드 · 차트', d: '앞뒷면을 전환하거나 발표 모드로 프레임 간을 깔끔하게 이동하며 설명한다.', s: 'done', row: 4, col: 4, see: 'ui_pres'},

    // 띠 5: 받쳐 주는 인프라 (row: 5)
    {f: 'v_bpmn', id: 'vb_in1', t: 'tservice', n: '플러그인 마켓 자동 갱신', sub: '두 줄 설치 · 자동 업데이트', d: '마켓플레이스 등록으로 스킬 자체를 최신 상태로 유지한다.', row: 5, col: 1, see: 'node_cdn'},
    {f: 'v_bpmn', id: 'vb_in2', t: 'tservice', n: '정적 검증 · 왕복 테스트', sub: '브라우저 없이 데이터 무결성 보증', d: '점검 스크립트와 묶기/꺼내기 왕복 비교로 깨진 보드를 사전에 차단한다.', row: 5, col: 2, see: 'ac_check'},
    {f: 'v_bpmn', id: 'vb_in3', t: 'tservice', n: '공용 엔진 CDN · 번들러', sub: '온라인 자동 최신화 · 오프라인 한 파일', d: '정적 웹 호스팅 엔진과 단일 파일 번들러로 어디서나 동일하게 그린다.', row: 5, col: 3, see: 'ac_engine'},

    // =========================================================================
    // 3. 앞면 창 3: v_method (모범사례와 방법론 한 장 그림) — 15개 상자, 쉬운 말
    // =========================================================================
    // 띠 0: 풀려는 문제 (row: 0)
    {f: 'v_method', id: 'vm_d1', t: 'driver', n: '코드와 문서의 빠른 괴리', sub: '수동 아키텍처 문서는 금방 낡는다', d: '코드는 매일 바뀌는데 사람이 손으로 그리는 구조도는 따라가지 못한다.', row: 0, col: 0, see: 'dr_drift'},
    {f: 'v_method', id: 'vm_d2', t: 'driver', n: '비전공자와 개발자의 시선 차이', sub: '상자 나열만으로는 맥락 전달 실패', d: '엔지니어용 클래스·부품 다이어그램은 기획자나 평가자에게 암호처럼 보인다.', row: 0, col: 1, see: 'dr_gap'},
    {f: 'v_method', id: 'vm_d3', t: 'driver', n: 'AI 환각과 자의적 점수 산정', sub: '근거 없는 다이어그램과 불명확한 평가', d: 'AI가 코드에 없는 부품을 지어내거나 기준 없이 위험도를 매기는 문제.', row: 0, col: 2, see: 'pr_fact'},
    {f: 'v_method', id: 'vm_g1', t: 'goal', n: '누구나 신뢰하고 읽는 산출물', sub: '정확성 · 가독성 · 유지보수성 달성', d: '사실에 기반하면서도 처음 보는 사람과 개발자 모두에게 유용한 보드 완성.', row: 0, col: 3, see: 'g_oneword'},

    // 띠 0.5: 적용한 표준과 방법론 (row: 0.5)
    {f: 'v_method', id: 'vm_m1', t: 'capability', n: 'ArchiMate 다계층 모델링', sub: '동기 · 업무 · 프로그램 · 기술 · 이행', d: '왜 만드는지부터 누가 쓰는지, 어떤 프로그램과 인프라가 받쳐 주는지 층별로 정렬한다.', row: 0.5, col: 0, see: 'arch_4tier'},
    {f: 'v_method', id: 'vm_m2', t: 'capability', n: 'BPMN 프로세스 · 스윔레인', sub: '사건 · 단계 사슬 · 주체별 순서도', d: '정적 구조만으로는 안 보이는 시간 순서와 예외 갈래를 BPMN 사슬과 순서도로 표현한다.', row: 0.5, col: 1, see: 'bpmn_loop'},
    {f: 'v_method', id: 'vm_m3', t: 'capability', n: '코드 사실주의 역공학', sub: '진입점 → 오가는 길 → 저장소 추적', d: '코드에 실제로 존재하는 부품과 데이터만 추출하고 미구현은 점선으로 구분한다.', row: 0.5, col: 2, see: 'ac_skill'},
    {f: 'v_method', id: 'vm_m4', t: 'capability', n: '루브릭 · 근거 기반 정량 평가', sub: '열지도 · 막대 · 흐름도와 채점 기준', d: '판단 값마다 1~3점 기준표와 실제 파일 근거를 함께 남겨 재검증 가능하게 한다.', row: 0.5, col: 3, see: 'ac_panel'},

    // 띠 2: UI · UX 모범사례 (row: 2)
    {f: 'v_method', id: 'vm_u1', t: 'bservice', n: '양면 뷰포인트 분리', sub: '앞면(쉬운 말) ↔ 뒷면(상세 코드)', d: '상단 토글 하나로 청중에 맞는 정보 밀도와 인터페이스를 즉시 전환한다.', row: 2, col: 0, see: 'ac_shell'},
    {f: 'v_method', id: 'vm_u2', t: 'bservice', n: '시맨틱 줌과 포커스 하이라이트', sub: '멀리선 요약 · 누르면 연결망 점등', d: '축소하면 큰 제목과 상태 바만 보이고, 상자를 누르면 연결된 경로만 밝게 빛난다.', row: 2, col: 1, see: 'ac_canvas'},
    {f: 'v_method', id: 'vm_u3', t: 'bservice', n: '쇼케이스 · 원클릭 온보딩', sub: '첫 화면 안내 · 명령어 복사 · 예시 탭', d: '외부 사용자가 링크를 열자마자 스킬 사용법과 가치를 직관적으로 경험한다.', s: 'done', row: 2, col: 2, see: 'ui_showcase'},
    {f: 'v_method', id: 'vm_u4', t: 'bservice', n: '발표 모드 · 코치마크', sub: '슬라이드 탐색 · 플로팅 투어 배너', d: '복잡한 도구를 숨기고 발표와 가이드 투어에 집중할 수 있는 프레젠테이션 UX.', s: 'done', row: 2, col: 3, see: 'ui_pres'},

    // 띠 3: 품질 보증 차례 (row: 3)
    {f: 'v_method', id: 'vm_q', t: 'bprocess', n: '3단계 품질 보증 게이트', row: 3, col: 0, span: 4, kids: ['vm_q1', 'vm_q2', 'vm_q3'], see: 'ac_check'},
    {f: 'v_method', id: 'vm_q1', t: 'bprocess', n: '정적 스키마 · 쉬운 말 점검', d: '없는 ID, 잘못된 관계, 앞면의 코드 용어와 글자 수 초과를 스크립트로 자동 검출한다.', see: 'ac_check'},
    {f: 'v_method', id: 'vm_q2', t: 'bprocess', n: '묶기 · 꺼내기 왕복 무결성', d: '단일 HTML로 묶었다가 다시 꺼낸 데이터가 원본과 100% 일치하는지 검증한다.', see: 'ac_bundle'},
    {f: 'v_method', id: 'vm_q3', t: 'bprocess', n: '사람이 판정하는 5초 시험', d: '실제 처음 보는 사람에게 5초간 보여 준 뒤 서비스 목적과 차례를 말할 수 있는지 확인한다.', see: 'ba_viewer'},

    // =========================================================================
    // 4. 뒷면 창: bpmn_loop (메인 흐름 · BPMN 순환 고리, layout: 'ring')
    // =========================================================================
    {f: 'bpmn_loop', id: 'ba_agent', t: 'bactor', n: 'Claude 에이전트 · 사용자', d: 'SKILL.md 절차에 따라 코드를 분석하고 보드를 생성·검증·탐색하는 협업 주체.', s: 'done', c: 'skills/archi-board/SKILL.md'},
    {f: 'bpmn_loop', id: 'bp_front', t: 'bprocess', n: '1. 청중 정의 · 앞면 설계', d: '누가 보는지 정의하고 네 질문에 답하는 앞면(한 장 그림 · 차례 그림)을 쉬운 말로 먼저 구성한다.', s: 'done', c: 'skills/archi-board/references/audience.md'},
    {f: 'bpmn_loop', id: 'bp_read', t: 'bprocess', n: '2. 코드 역공학 · 사실 수집', d: '진입점부터 부품 목록 → 유즈케이스 순서도 → 데이터 저장소 순서로 코드에 있는 사실만 수집한다.', s: 'done', c: 'skills/archi-board/references/reading-code.md'},
    {f: 'bpmn_loop', id: 'bp_write', t: 'bprocess', n: '3. 데이터 합성 · 채점', d: 'window.BOARD 형식에 맞춰 앞뒷면 상자, 객체/데이터 지도, rubric 기반 insights를 작성한다.', s: 'done', c: 'skills/archi-board/references/data-format.md'},
    {f: 'bpmn_loop', id: 'bp_check', t: 'bprocess', n: '4. 무브라우저 정적 점검', d: 'check.mjs를 실행해 ID 누락, 스키마 오류, 순환 그래프, 앞면 코드 용어 경고를 교정한다.', s: 'done', c: 'skills/archi-board/scripts/check.mjs'},
    {f: 'bpmn_loop', id: 'bp_serve', t: 'bprocess', n: '5. 엔진 렌더링 · 5초 시험', d: '공용 엔진(index.html) 또는 단일 번들(inline.mjs)로 렌더링하고 5초 인지 시험을 수행한다.', s: 'done', c: 'engine/v1/board.js'},
    {f: 'bpmn_loop', id: 'bp_sync', t: 'bprocess', n: '6. 코드 변경 시 증분 갱신', d: '코드가 바뀌면 전체를 다시 쓰지 않고 변경된 부품·데이터·앞면 칸만 찾아 근거와 함께 고친다.', s: 'done', c: 'skills/archi-board/SKILL.md'},

    // =========================================================================
    // 5. 뒷면 창: arch_4tier (ArchiMate 4계층 상세 아키텍처, layout: 'rows')
    // =========================================================================
    // [동기 층 - mot]
    {f: 'arch_4tier', id: 'dr_drift', t: 'driver', n: '수동 아키텍처 문서의 노후화', d: '코드 변경 속도를 수기 문서가 따라잡지 못해 설계도와 실제 코드가 괴리됨.', c: 'README.md'},
    {f: 'arch_4tier', id: 'dr_gap', t: 'driver', n: '엔지니어와 비개발자의 소통 장벽', d: '개발자 중심 다이어그램은 기획자·평가자·외부 사용자에게 진입 장벽이 높음.', c: 'skills/archi-board/references/audience.md'},
    {f: 'arch_4tier', id: 'g_oneword', t: 'goal', n: '자연어 한마디로 살아있는 보드 생성', d: '"아키텍처 보드 만들어줘" 한마디로 앞뒷면을 갖춘 무한 보드 생성 및 유지.', c: 'README.md'},
    {f: 'arch_4tier', id: 'pr_dual', t: 'principle', n: '원칙 1 · 앞면(청중) 우선 설계', d: '부품 나열 전에 처음 보는 사람용 앞면(25상자 · 22자 이내 · 쉬운 말)부터 만든다.', c: 'skills/archi-board/references/audience.md'},
    {f: 'arch_4tier', id: 'pr_fact', t: 'principle', n: '원칙 2 · 코드 사실주의 & 비밀 보호', d: '코드에 확인된 것만 적고, 추측 금지·비밀정보 배제·판단 값 근거(basis) 필수를 지킨다.', c: 'skills/archi-board/references/reading-code.md'},
    {f: 'arch_4tier', id: 'pr_immut', t: 'principle', n: '원칙 3 · 엔진 불변 & 하위 호환', d: '프로젝트에 엔진을 복사해 고치지 않으며, v1 스키마는 필드 추가만 허용한다.', c: 'README.md'},

    // [전략 층 - str]
    {f: 'arch_4tier', id: 'cap_dualview', t: 'capability', n: '청중 적응형 이중 뷰포인트', d: '하나의 데이터(board-data.js)로 비전공자용 큰 그림과 개발자용 상세 지도를 동시에 제공.', c: 'engine/v1/board.js'},
    {f: 'arch_4tier', id: 'cap_zeromaint', t: 'capability', n: 'CDN 기반 무중단 보드 진화', d: '엔진 업데이트만으로 이미 배포된 모든 프로젝트 보드의 UI와 기능이 자동 개선됨.', c: 'skills/archi-board/assets/board.html'},
    {f: 'arch_4tier', id: 'cap_selfserve', t: 'capability', n: '외부 사용자 셀프 온보딩', d: '처음 방문한 외부 사용자가 쇼케이스와 가이드 투어로 즉시 스킬을 이해하고 도입하는 역량.', s: 'done', c: 'index.html'},

    // [업무 층 - bus : 1계층 유저층 & BPMN 이벤트/서비스]
    {f: 'arch_4tier', id: 'ba_viewer', t: 'bactor', n: '처음 보는 사람 (User · Evaluator)', d: '사용자 · 평가자 · 기획자 · 새 팀원. 앞면(view)과 따라가기 투어로 프로젝트를 이해한다.', s: 'done', c: 'skills/archi-board/references/audience.md'},
    {f: 'arch_4tier', id: 'ba_builder', t: 'bactor', n: '만드는 사람 (Developer · Maintainer)', d: '개발자 · 아키텍트 · 엔진 관리자. 뒷면(객체·데이터·순서도·차트)으로 코드를 유지보수한다.', s: 'done', c: 'README.md'},
    {f: 'arch_4tier', id: 'be_req', t: 'bevent', n: '보드 생성 · 업데이트 · 번들 요청', d: '사용자가 에이전트에게 자연어로 보드 작업이나 단일 파일 묶기를 지시하는 BPMN 시작 사건.', s: 'done', c: 'skills/archi-board/SKILL.md'},
    {f: 'arch_4tier', id: 'bs_understand', t: 'bservice', n: '5초 프로젝트 구조 파악 서비스', d: '누가 쓰나 · 받는 도움 · 하는 일 · 바탕 기술을 위에서 아래 띠로 즉시 전달하는 서비스.', s: 'done', c: 'skills/archi-board/references/audience.md'},
    {f: 'arch_4tier', id: 'bs_audit', t: 'bservice', n: '아키텍처 · 데이터 · 위험도 감사', d: '부품별 책임, 데이터 수명 주기, 정량 위험도(열지도)를 근거와 함께 점검하는 서비스.', s: 'done', c: 'skills/archi-board/references/reading-code.md'},

    // [프로그램 층 - app : 2계층 사용자 인터페이스(UI) & 3계층 기능(Function)]
    {f: 'arch_4tier', id: 'ac_shell', t: 'aiface', n: '[2계층 UI] 상단 전환 띠 & 네비게이션', d: '브랜드 헤더, 처음 보는 사람/만드는 사람 토글(data-audm), 창 바로가기 칩 바, 상태 미터바.', s: 'done', c: 'engine/v1/board.js'},
    {f: 'arch_4tier', id: 'ac_canvas', t: 'aiface', n: '[2계층 UI] 무한 보드 캔버스 & 미니맵', d: '팬/줌 월드 좌표계, 시맨틱 줌(원거리 요약 sum ↔ 근거리 상자 el), SVG 곡선 화살표, 미니맵.', s: 'done', c: 'engine/v1/board.js'},
    {f: 'arch_4tier', id: 'ac_panel', t: 'aiface', n: '[2계층 UI] 상세 패널 · 투어 · 차트 뷰어', d: '우측 슬라이드 패널(상자·객체·데이터·판단 차트), 하단 따라가기(tour) 컨트롤, 읽는 법 모달.', s: 'done', c: 'engine/v1/board.js'},
    {f: 'arch_4tier', id: 'ui_showcase', t: 'aiface', n: '[2계층 UI] 쇼케이스 웰컴 헤더', d: '외부 방문자에게 스킬 가치 요약, 원클릭 설치 명령어 복사, 도메인별 예시 전환 탭을 제공.', s: 'done', c: 'index.html'},
    {f: 'arch_4tier', id: 'ui_tour_cta', t: 'aiface', n: '[2계층 UI] 플로팅 투어 배너 & 코치마크', d: '첫 화면 하단 "30초 흐름 따라가기" 배너(#tourCta)와 드래그·줌·클릭 조작 코치마크(#hint).', s: 'done', c: 'engine/v1/board.js'},
    {f: 'arch_4tier', id: 'ui_pres', t: 'aiface', n: '[2계층 UI] 발표(슬라이드) 모드', d: '상단 칩과 미니맵을 숨기고 키보드 화살표로 프레임 간을 프레젠테이션처럼 이동하는 뷰 모드(#presBar).', s: 'done', c: 'engine/v1/board.js'},
    {f: 'arch_4tier', id: 'ac_skill', t: 'acomp', n: '[3계층 기능] 스킬 절차 오케스트레이터', d: '7단계 신규 생성 절차와 증분 수정 절차를 정의한 SKILL.md 및 3종 레퍼런스 가이드.', s: 'done', c: 'skills/archi-board/SKILL.md'},
    {f: 'arch_4tier', id: 'ac_check', t: 'acomp', n: '[3계층 기능] 무브라우저 정적 점검기', d: 'Node VM에서 엔진 MODEL과 board-data.js를 대조해 참조·범위·순환·쉬운 말 규칙을 검증.', s: 'done', c: 'skills/archi-board/scripts/check.mjs'},
    {f: 'arch_4tier', id: 'ac_bundle', t: 'acomp', n: '[3계층 기능] 단일 파일 번들러 · 언패커', d: '오프라인·아티팩트용 단일 HTML 묶기(inline.mjs) 및 기존 단일 파일에서 데이터 꺼내기(unpack.mjs).', s: 'done', c: 'skills/archi-board/scripts/inline.mjs'},
    {f: 'arch_4tier', id: 'do_bdata', t: 'dobject', n: '[데이터] board-data.js (window.BOARD)', d: '보드의 모든 창·상자·관계·순서도·객체·데이터·차트를 담는 유일한 프로젝트 데이터 파일.', s: 'done', c: 'examples/memo/board-data.js'},

    // [기술 층 - tec : 4계층 인프라(Infrastructure)]
    {f: 'arch_4tier', id: 'ac_engine', t: 'syssw', n: '[4계층 인프라] 공용 렌더링 엔진 v1.3', d: '9가지 레이아웃 계산기, SVG 라우터, 양면 전환, 발표 모드가 담긴 무의존성 순수 JS/CSS 엔진.', s: 'done', c: 'engine/v1/board.js'},
    {f: 'arch_4tier', id: 'node_cdn', t: 'node', n: '[4계층 인프라] GitHub Pages · CI · 마켓', d: '공용 엔진 정적 호스팅(GitHub Pages), 문법·왕복 검증 CI(Actions), Claude 플러그인 마켓플레이스.', s: 'done', c: '.github/workflows/check.yml'},
    {f: 'arch_4tier', id: 'art_single', t: 'artifact', n: '[4계층 산출물] board.single.html', d: '인터넷 없이 열거나 claude.ai 아티팩트에 올리는 인라인 단일 HTML 사본.', s: 'done', c: 'skills/archi-board/scripts/inline.mjs'},

    // =========================================================================
    // 6. 뒷면 창: roadmap (이행 로드맵, layout: 'time')
    // =========================================================================
    {f: 'roadmap', id: 'pl_v1', t: 'plateau', n: '1단계 · 코어 엔진 & 스킬 완성 (v1.0~1.2)', d: '무한 보드 엔진, 객체/데이터 지도, 판단 차트(1.1), 앞뒷면 청중 분리(1.2), 정적 점검기', s: 'done', col: 0},
    {f: 'roadmap', id: 'pl_ux1', t: 'plateau', n: '2단계 · 외부 사용자 온보딩 쇼케이스 (완료)', d: '처음 방문한 외부인이 스킬의 가치를 즉시 이해하고 설치·체험하는 진입점 UI/UX', s: 'done', col: 1},
    {f: 'roadmap', id: 'pl_ux2', t: 'plateau', n: '3단계 · 비개발자 뷰어 & 발표 UX 고도화 (v1.3)', d: '따라가기 투어 배너, 조작 코치마크, 발표(슬라이드) 모드로 활용성 극대화', s: 'done', col: 2},
    {f: 'roadmap', id: 'wp_core', t: 'wp', n: '엔진 v1.0 & 객체·데이터·순서도', s: 'done', col: 0, when: '완료', who: '코어팀', c: 'engine/v1/board.js'},
    {f: 'roadmap', id: 'wp_ins', t: 'wp', n: '판단 · 차트 (열지도·막대·흐름도 v1.1)', s: 'done', col: 0, when: '완료', who: '코어팀', c: 'engine/v1/board.js'},
    {f: 'roadmap', id: 'wp_aud', t: 'wp', n: '앞면(view) · 뒷면(build) 전환 (v1.2)', s: 'done', col: 0, when: '완료', who: '코어팀', c: 'engine/v1/board.js'},
    {f: 'roadmap', id: 'wp_show', t: 'wp', n: '쇼케이스 웰컴 헤더 & 원클릭 설치 복사', s: 'done', col: 1, when: '11/03', who: 'UI/UX', c: 'index.html'},
    {f: 'roadmap', id: 'wp_tabs', t: 'wp', n: '다중 도메인 예시 전환 탭 & 3단계 요약', s: 'done', col: 1, when: '11/03', who: 'UI/UX', c: 'index.html'},
    {f: 'roadmap', id: 'wp_cta', t: 'wp', n: '하단 플로팅 투어 배너 & 3.5초 코치마크', s: 'done', col: 2, when: '11/03', who: '엔진 UX', c: 'engine/v1/board.js'},
    {f: 'roadmap', id: 'wp_pres', t: 'wp', n: '발표(Presentation) 슬라이드 모드', s: 'done', col: 2, when: '11/03', who: '엔진 UX', c: 'engine/v1/board.js'}
  ],

  // ───────── [상자 사이 관계 (relations)] ─────────
  relations: [
    // 1. 앞면 v_arch (4계층 한 장 그림 내부 관계)
    ['va_pr1', 'va_goal', 'realization'],
    ['va_pr2', 'va_goal', 'realization'],
    ['va_cap', 'va_goal', 'realization'],
    ['va_ui_sw', 'va_u_view', 'serving'],
    ['va_ui_sw', 'va_u_build', 'serving'],
    ['va_ui_cv', 'va_u_view', 'serving'],
    ['va_ui_cv', 'va_u_build', 'serving'],
    ['va_ui_pn', 'va_u_build', 'serving'],
    ['va_ui_new', 'va_u_view', 'serving'],
    ['va_ev', 'va_proc', 'triggering'],
    ['va_u_agent', 'va_proc', 'assignment'],
    ['va_p1', 'va_ui_sw', 'realization'],
    ['va_p4', 'va_ui_cv', 'realization'],
    ['va_in_sk', 'va_p1', 'serving'],
    ['va_in_sk', 'va_p2', 'serving'],
    ['va_in_ck', 'va_p3', 'serving'],
    ['va_in_en', 'va_p4', 'serving'],
    ['va_in_cd', 'va_in_en', 'serving'],

    // 2. 앞면 v_bpmn (BPMN 실행 사슬 내부 관계)
    ['vb_u1', 'vb_start', 'assignment'],
    ['vb_start', 'vb_chain', 'triggering'],
    ['vb_u2', 'vb_chain', 'assignment'],
    ['vb_s5', 'vb_u3', 'serving'],
    ['vb_ui1', 'vb_s1', 'serving'],
    ['vb_ui2', 'vb_s4', 'serving'],
    ['vb_ui3', 'vb_s5', 'serving'],
    ['vb_in1', 'vb_s1', 'serving'],
    ['vb_in2', 'vb_s3', 'serving'],
    ['vb_in3', 'vb_s4', 'serving'],

    // 3. 앞면 v_method (모범사례와 방법론 내부 관계)
    ['vm_d1', 'vm_g1', 'association'],
    ['vm_d2', 'vm_g1', 'association'],
    ['vm_d3', 'vm_g1', 'association'],
    ['vm_m1', 'vm_g1', 'realization'],
    ['vm_m2', 'vm_g1', 'realization'],
    ['vm_m3', 'vm_g1', 'realization'],
    ['vm_m4', 'vm_g1', 'realization'],
    ['vm_m1', 'vm_u1', 'realization'],
    ['vm_m2', 'vm_u2', 'realization'],
    ['vm_u1', 'vm_q', 'serving'],
    ['vm_u2', 'vm_q', 'serving'],
    ['vm_u3', 'vm_q', 'serving'],
    ['vm_u4', 'vm_q', 'serving'],

    // 4. 뒷면 bpmn_loop (메인 순환 고리 관계)
    ['bp_front', 'bp_read', 'triggering'],
    ['bp_read', 'bp_write', 'triggering'],
    ['bp_write', 'bp_check', 'triggering'],
    ['bp_check', 'bp_serve', 'triggering'],
    ['bp_serve', 'bp_sync', 'triggering'],
    ['bp_sync', 'bp_front', 'triggering'],
    ['ba_agent', 'bp_front', 'assignment'],
    ['ba_agent', 'bp_read', 'assignment'],
    ['ba_agent', 'bp_write', 'assignment'],
    ['ba_agent', 'bp_check', 'assignment'],

    // 5. 뒷면 arch_4tier (4계층 ArchiMate 상세 관계)
    ['dr_drift', 'g_oneword', 'association'],
    ['dr_gap', 'g_oneword', 'association'],
    ['pr_dual', 'g_oneword', 'realization'],
    ['pr_fact', 'g_oneword', 'realization'],
    ['pr_immut', 'g_oneword', 'realization'],
    ['cap_dualview', 'pr_dual', 'realization'],
    ['cap_zeromaint', 'pr_immut', 'realization'],
    ['cap_selfserve', 'dr_gap', 'influence'],
    ['bs_understand', 'ba_viewer', 'serving'],
    ['bs_audit', 'ba_builder', 'serving'],
    ['be_req', 'ac_skill', 'triggering'],
    ['ac_shell', 'bs_understand', 'realization'],
    ['ac_canvas', 'bs_understand', 'realization'],
    ['ac_panel', 'bs_audit', 'realization'],
    ['ui_showcase', 'cap_selfserve', 'realization'],
    ['ui_tour_cta', 'bs_understand', 'serving'],
    ['ui_pres', 'bs_understand', 'serving'],
    ['ac_skill', 'do_bdata', 'access'],
    ['ac_check', 'do_bdata', 'access'],
    ['ac_bundle', 'do_bdata', 'access'],
    ['ac_bundle', 'art_single', 'realization'],
    ['ac_engine', 'ac_shell', 'serving'],
    ['ac_engine', 'ac_canvas', 'serving'],
    ['ac_engine', 'ac_panel', 'serving'],
    ['ac_engine', 'do_bdata', 'access'],
    ['node_cdn', 'ac_engine', 'serving'],
    ['node_cdn', 'ac_check', 'serving'],

    // 6. 뒷면 roadmap (이행 로드맵 관계)
    ['wp_core', 'ac_engine', 'realization'],
    ['wp_ins', 'ac_panel', 'realization'],
    ['wp_aud', 'ac_shell', 'realization'],
    ['wp_show', 'ui_showcase', 'realization'],
    ['wp_tabs', 'ui_showcase', 'realization'],
    ['wp_cta', 'ui_tour_cta', 'realization'],
    ['wp_pres', 'ui_pres', 'realization']
  ],

  // ───────── [창 사이의 굵은 흐름 (flows)] ─────────
  flows: [
    // 앞면 창끼리의 흐름
    ['v_arch', 'v_bpmn', '4계층이 BPMN 사슬로 작동한다'],
    ['v_bpmn', 'v_method', '모범사례와 품질 게이트로 검증한다'],
    // 뒷면 창끼리의 흐름
    ['bpmn_loop', 'arch_4tier', '6단계 고리가 4계층 부품을 움직인다'],
    ['arch_4tier', 'practices', '8대 방법론과 UI/UX 원칙을 따른다'],
    ['practices', 'roadmap', '제안된 UX 모범사례를 로드맵으로 이행한다'],
    ['objects', 'data', '4계층 부품이 데이터를 쓰고 읽는다']
  ],

  // ───────── [흐름 따라가기 (tour)] ─────────
  tour: [
    // 앞면 전용 투어 (처음 보는 사람 모드에서는 view 창만 비추는 이 3단계가 돈다)
    {
      t: '1. 4계층으로 본 archi-board 한 장 그림',
      f: ['v_arch'],
      ids: ['va_u_view', 'va_u_build', 'va_ui_sw', 'va_ui_new', 'va_proc', 'va_in_en'],
      p: '맨 위 유저층(처음 보는 사람 · 만드는 사람 · 에이전트)이 사용자 인터페이스(양면 전환 띠 · 무한 캔버스 · 제안된 쇼케이스)를 통해 만나고, 가운데 BPMN 프로세스와 아래쪽 인프라 엔진이 이를 받쳐 줍니다.'
    },
    {
      t: '2. 말 한마디에서 보드 완성까지 BPMN 사슬',
      f: ['v_bpmn'],
      ids: ['vb_start', 'vb_s1', 'vb_s2', 'vb_s3', 'vb_s4', 'vb_s5'],
      p: '요청 한마디(시작 사건)에서 출발해 ① 앞면 설계 → ② 코드 역공학 → ③ 데이터 작성·정적 점검 → ④ 웹/단일 파일 배포 → ⑤ 5초 인지 시험 및 증분 갱신까지 빈틈없이 이어집니다.'
    },
    {
      t: '3. 왜 누구나 읽기 쉬운가 — 방법론과 UI/UX 모범사례',
      f: ['v_method'],
      ids: ['vm_m1', 'vm_m2', 'vm_u1', 'vm_u3', 'vm_u4', 'vm_q1', 'vm_q3'],
      p: 'ArchiMate 다계층 모델과 BPMN 사슬에 더해, 25상자·22자 제한과 5초 시험으로 인지 부하를 낮추고, 외부 사용자를 위한 쇼케이스·발표 모드([제안])로 진입 장벽을 없앱니다.'
    },
    // 뒷면 포함 전체 투어 (만드는 사람 모드에서 이어서 돈다)
    {
      t: '4. 메인 BPMN 순환 고리 (코드 ↔ 보드 동기화)',
      f: ['bpmn_loop'],
      ids: ['ba_agent', 'bp_front', 'bp_read', 'bp_write', 'bp_check', 'bp_serve', 'bp_sync'],
      p: '만드는 사람 쪽에서는 에이전트가 이 6단계 고리를 돌며 코드가 바뀔 때마다 바뀐 칸만 증분 갱신합니다.'
    },
    {
      t: '5. 4계층 ArchiMate 상세 구조와 스윔레인 순서도',
      f: ['arch_4tier'],
      ids: ['ac_shell', 'ac_canvas', 'ac_panel', 'ui_showcase', 'ac_skill', 'ac_check', 'ac_engine'],
      p: '유저층 · UI · 기능 · 인프라의 모든 컴포넌트와 실제 코드 파일 위치, 그리고 창 아래 4가지 BPMN 스윔레인 순서도를 한눈에 대조합니다.'
    },
    {
      t: '6. 8대 아키텍처 방법론 & UI/UX 모범사례 카드',
      f: ['practices'],
      ids: [],
      p: '이중 청중 분리, 5초 시험, BPMN 융합, 코드 사실주의, 정량 루브릭, CDN 분리 등 6대 기존 방법론과 2대 신규 UI/UX 확장 제안을 카드로 정리했습니다.'
    },
    {
      t: '7. 4계층 객체 지도와 데이터 지도',
      f: ['objects', 'data'],
      ids: [],
      p: '객체 지도에서는 4계층 11개 부품의 내부 동작과 실패 처리를, 데이터 지도에서는 board-data.js를 비롯한 6개 핵심 데이터의 흐름을 탐색할 수 있습니다.'
    }
  ],

  // ───────── [순서도 세로 줄 (lanes) & BPMN 유즈케이스 (usecases)] ─────────
  lanes: {
    viewer: ['처음 보는 사람 (User)', 'ba_viewer'],
    builder: ['만드는 사람 (Dev)', 'ba_builder'],
    agent: ['코딩 에이전트 (AI)', 'ba_agent'],
    showcase: ['쇼케이스 · 전환 UI', 'ac_shell'],
    canvas: ['무한 보드 · 패널 UI', 'ac_canvas'],
    skill: ['스킬 절차서 (SKILL.md)', 'ac_skill'],
    checker: ['정적 점검기 (check.mjs)', 'ac_check'],
    bundler: ['번들러 (inline/unpack)', 'ac_bundle'],
    engine: ['공용 엔진 (board.js)', 'ac_engine'],
    cdn: ['GitHub Pages · CI', 'node_cdn']
  },

  usecases: [
    {
      id: 'uc_create',
      f: 'arch_4tier',
      s: '보드 생성 BPMN',
      t: '1. 코드에서 아키텍처 보드를 새로 만든다 (BPMN 생성·검증 루프)',
      d: '앞면 설계부터 코드 역공학, 정적 검증 루프, 5초 시험까지의 표준 생성 시퀀스.',
      lanes: ['builder', 'agent', 'skill', 'checker', 'engine'],
      steps: [
        ['builder', 'agent', '"이 프로젝트 아키텍처 보드 만들어줘" 요청', 'Prompt Trigger'],
        ['agent', 'skill', '절차서와 청중·역공학·포맷 규칙을 읽는다', 'SKILL.md · references/*.md'],
        ['agent', 'agent', '앞면(한 장 그림 · 차례 그림)부터 쉬운 말로 설계한다', 'layout: view (<=25상자)'],
        ['agent', 'agent', '코드에서 부품 → 순서도 → 데이터 → 판단 값을 역공학 추출한다', 'docs/board/board-data.js'],
        ['agent', 'checker', '무브라우저 정적 점검을 실행한다', 'node scripts/check.mjs'],
        ['checker', 'agent', '없는 ID · 코드 용어 · 범위 오류 보고 및 재수정', 'exit 1 / 경고 출력', {r: true, alt: '오류·경고 발견 시'}],
        ['checker', 'agent', '잘못 0개 · 검증 통과 확인', 'exit 0', {r: true}],
        ['agent', 'engine', '틀(index.html)과 board-data.js를 연결해 안내한다', 'docs/board/index.html'],
        ['engine', 'builder', '앞면 한 장 그림부터 브라우저에 렌더링한다', 'window.BOARD → DOM/SVG', {r: true}]
      ],
      story: {
        who: 'ba_builder', goal: 'g_oneword', why: '문서 작성 부담 없이 즉시 시각화하려고',
        summary: '만드는 사람이 한마디 하면, 에이전트가 절차서를 읽고 보드를 설계 · 추출한 뒤 점검을 통과시켜 브라우저에 띄운다.',
        scenes: [
          {steps: [0], title: '한마디로 요청한다', sees: '대화창에 요청 한 줄', basis: ['README.md — "이 프로젝트 아키텍처 보드 만들어줘"']},
          {steps: [1, 2], title: '절차서를 읽고 앞면부터 설계한다'},
          {steps: [3], title: '코드에서 부품 · 순서 · 데이터를 뽑아 쓴다', sees: 'board-data.js가 채워진다', basis: ['docs/board/board-data.js']},
          {steps: [4, 5, 6], title: '점검하고, 잘못이 0개가 될 때까지 고친다', sees: '잘못 · 경고 줄이 나온다', basis: ['skills/archi-board/scripts/check.mjs']},
          {steps: [7, 8], title: '브라우저에 띄운다', sees: '앞면 한 장 그림부터 열린다', basis: ['docs/board/index.html']}
        ],
        branches: [{at: 3, when: '오류 · 경고가 나오면', then: '고친 뒤 다시 점검한다', end: '잘못이 0개가 될 때까지 반복'}]
      }
    },
    {
      id: 'uc_explore',
      f: 'arch_4tier',
      s: '온보딩 · 탐색 UX',
      t: '2. 외부 사용자가 보드를 처음 열고 앞뒷면을 탐색한다',
      d: '쇼케이스 온보딩, 따라가기 투어, 앞뒷면 전환, 상세 패널 및 차트 탐색 시퀀스.',
      lanes: ['viewer', 'showcase', 'canvas', 'engine', 'cdn'],
      steps: [
        ['viewer', 'showcase', '공유받은 보드 링크나 데모 페이지를 연다', 'GET index.html'],
        ['showcase', 'cdn', '공용 렌더링 엔진과 스타일을 불러온다', 'engine/v1/board.js · css'],
        ['cdn', 'engine', '최신 v1.2 엔진 스크립트 응답', '200 OK', {r: true}],
        ['engine', 'showcase', '처음 보는 사람 모드(view)를 기본으로 활성화한다', "AUDM = 'view'", {r: true}],
        ['viewer', 'showcase', '흐름 따라가기(또는 플로팅 투어 배너)를 누른다', '#bTour click'],
        ['showcase', 'canvas', '앞면 창과 핵심 상자를 차례대로 줌인·점등한다', 'openTour() → focus'],
        ['viewer', 'showcase', '만드는 사람 모드로 전환하거나 상자의 자세히 보기를 누른다', 'data-audm="build" / see'],
        ['showcase', 'canvas', '객체 지도 · 데이터 지도 · 판단 차트 패널을 펼친다', 'openObj() · openInsight()', {r: true}]
      ],
      story: {
        who: 'ba_viewer', want: '처음 열어 본 보드를 바로 이해하고, 더 보고 싶으면 파고들고 싶다', why: '직군이 달라도 같은 보드를 읽으려고',
        scenes: [
          {steps: [0], title: '공유받은 링크를 연다', sees: '보드가 불러와진다', basis: ['index.html']},
          {steps: [1, 2], title: '공용 엔진을 불러온다'},
          {steps: [3], title: '처음 보는 사람 모드로 열린다', sees: '쉬운 말로 그린 한 장 그림', basis: ["engine/v1/board.js — AUDM = 'view'"]},
          {steps: [4, 5], title: '흐름 따라가기를 누르면 핵심 상자를 차례로 비춘다', sees: '창과 상자가 차례로 켜진다', basis: ['engine/v1/board.js — 흐름 따라가기']},
          {steps: [6, 7], title: '만드는 사람 모드로 파고든다', sees: '객체 지도 · 데이터 지도 · 판단 차트 패널이 열린다', basis: ['engine/v1/board.js — setMode · openObj · openInsight']}
        ]
      }
    },
    {
      id: 'uc_bundle',
      f: 'arch_4tier',
      s: '단일 파일 묶기·풀기',
      t: '3. 오프라인 · 아티팩트용 단일 HTML로 묶거나 다시 꺼낸다',
      d: '인터넷 없는 환경이나 claude.ai 아티팩트 공유를 위한 패킹/언패킹 왕복 흐름.',
      lanes: ['builder', 'agent', 'bundler', 'checker'],
      steps: [
        ['builder', 'agent', '"인터넷 없이 열게 한 파일로 묶어줘" 요청', 'Prompt Trigger'],
        ['agent', 'bundler', '엔진 CSS/JS와 board-data.js를 인라인 병합한다', 'node scripts/inline.mjs'],
        ['bundler', 'agent', '단일 파일(board.single.html) 생성 완료', 'board.single.html', {r: true}],
        ['builder', 'agent', '묶인 HTML만 있을 때 데이터 수정 요청', 'unpack 시나리오', {alt: '묶인 파일만 있을 때'}],
        ['agent', 'bundler', '단일 HTML에서 window.BOARD와 머리 주석을 추출한다', 'node scripts/unpack.mjs'],
        ['bundler', 'checker', '추출된 board-data.js를 수정 후 다시 정적 점검한다', 'node scripts/check.mjs'],
        ['checker', 'agent', '검증 통과 후 새 엔진으로 다시 묶어 제공한다', 'inline.mjs 재실행', {r: true}]
      ],
      story: {
        who: 'ba_builder', want: '인터넷 없이도 열리는 한 파일이 필요하다', why: '인터넷 없는 곳이나 claude.ai 아티팩트에 올려야 해서',
        scenes: [
          {steps: [0], title: '한 파일로 묶어 달라고 한다'},
          {steps: [1, 2], title: '엔진과 데이터를 한 파일에 넣는다', sees: 'board.single.html 한 개가 생긴다', basis: ['skills/archi-board/scripts/inline.mjs']},
          {steps: [3, 4], title: '묶인 파일만 있으면 데이터를 꺼낸다', basis: ['skills/archi-board/scripts/unpack.mjs']},
          {steps: [5, 6], title: '고치고 점검한 뒤 다시 묶는다'}
        ]
      }
    },
    {
      id: 'uc_evolve',
      f: 'arch_4tier',
      s: '엔진 무중단 배포',
      t: '4. 엔진을 개선하면 모든 보드가 다시 만들지 않아도 좋아진다',
      d: '관리자가 엔진을 수정하고 CI 왕복 검증을 거쳐 CDN으로 무중단 배포하는 인프라 흐름.',
      lanes: ['builder', 'checker', 'bundler', 'cdn', 'engine'],
      steps: [
        ['builder', 'engine', 'v1 하위 호환성을 지키며 엔진 UI/UX 기능을 개선한다', 'engine/v1/board.js · css'],
        ['builder', 'cdn', '저장소에 푸시하여 GitHub Actions 워크플로우를 실행한다', '.github/workflows/check.yml'],
        ['cdn', 'checker', '엔진 문법 검사(node --check)와 예시 데이터 점검을 수행한다', 'check.mjs examples/memo'],
        ['cdn', 'bundler', 'inline → unpack → inline 왕복 결과가 완전히 같은지 비교한다', 'cmp memo.single.html rt.single.html'],
        ['bundler', 'cdn', 'CI 전 단계 통과 시 GitHub Pages로 엔진을 배포한다', 'gamercross.github.io/archi-board', {r: true}],
        ['cdn', 'engine', '기존에 만들어진 모든 보드가 새 엔진을 받아 즉시 개선된다', '자동 업그레이드 완료', {r: true}]
      ],
      story: {
        who: 'ba_builder', want: '엔진을 고치면 이미 만든 보드가 다시 만들지 않아도 좋아지게 하고 싶다', why: '보드를 쓰는 모든 사람에게 한 번에 좋아져야 해서',
        scenes: [
          {steps: [0], title: '엔진을 하위 호환으로 고친다'},
          {steps: [1, 2], title: '푸시하면 CI가 문법과 예시 데이터를 점검한다', basis: ['.github/workflows/check.yml']},
          {steps: [3], title: '묶기 · 풀기 · 묶기 왕복이 같은지 본다'},
          {steps: [4, 5], title: '통과하면 배포되고, 이미 만든 보드가 새 엔진을 받는다', sees: '이미 만든 보드가 새 엔진으로 열린다', basis: ['.github/workflows/check.yml · GitHub Pages']}
        ],
        branches: [{at: 2, when: '통과하지 못하면', then: '배포하지 않는다', end: '고친 뒤 다시 푸시'}]
      }
    }
  ],

  // ───────── [객체 지도 (objectMap) — 4계층 패키지 분류] ─────────
  objectMap: {
    packages: [
      {
        id: 'p_user',
        row: 0,
        l: 'bus',
        n: '1계층 · 유저층 (Actors & Collaborators)',
        d: '보드를 읽는 처음 보는 사람, 개발·관리하는 만드는 사람, 절차를 수행하는 코딩 에이전트.',
        ids: ['ba_viewer', 'ba_builder', 'ba_agent']
      },
      {
        id: 'p_ui',
        row: 1,
        l: 'app',
        n: '2계층 · 사용자 인터페이스 (Viewer & Onboarding UI)',
        d: '청중 전환 상단 띠 · 쇼케이스 헤더, 무한 보드 캔버스 · 미니맵, 상세 패널 · 투어 · 차트 뷰어.',
        ids: ['ac_shell', 'ac_canvas', 'ac_panel']
      },
      {
        id: 'p_func',
        row: 2,
        l: 'app',
        n: '3계층 · 기능 (Skill Workflow & BPMN Verification Tools)',
        d: '코드 역공학과 앞뒷면 작성을 이끄는 스킬 절차서, 무브라우저 정적 점검기, 단일 파일 번들러.',
        ids: ['ac_skill', 'ac_check', 'ac_bundle']
      },
      {
        id: 'p_infra',
        row: 3,
        l: 'tec',
        n: '4계층 · 인프라 (Engine Runtime & CDN/CI Distribution)',
        d: '공용 렌더링 엔진 코어(board.js/css)와 GitHub Pages 정적 CDN · GitHub Actions CI · 플러그인 마켓.',
        ids: ['ac_engine', 'node_cdn']
      }
    ],
    objects: {
      ba_viewer: {
        name: '처음 보는 사람 (User · Evaluator)',
        kind: '1계층 · 유저층',
        one: '앞면(한 장 그림 · 차례 그림)과 따라가기로 5초 안에 프로젝트를 이해한다',
        what: '서비스 사용자, 대회/과제 평가자, 기획자, 새로 합류한 팀원 등 코드를 직접 읽지 않는 청중.',
        why: '이 사람들이 첫 화면에서 길을 잃지 않게 하는 것이 보드 앞면(layout: view)의 존재 이유다.',
        how: [
          '보드를 열면 기본값으로 활성화된 처음 보는 사람 모드(앞면)를 본다',
          '흐름 따라가기(tour)로 핵심 상자와 설명을 순서대로 따라간다',
          '5초 시험 질문(무엇이고 누구를 돕나 / 어떤 차례로 쓰나)에 자기 말로 답한다'
        ],
        api: ['앞면 한 장 그림 · 차례 그림 열람', '흐름 따라가기 실행', '5초 인지 시험 판정'],
        fails: ['한 장에 상자가 30개를 넘거나 코드 용어가 섞이면 길을 잃는다 → check.mjs가 사전 경고'],
        rules: ['5초 시험의 통과 여부는 AI가 선언하지 않고 반드시 사람이 직접 판정한다'],
        files: ['skills/archi-board/references/audience.md']
      },
      ba_builder: {
        name: '만드는 사람 (Developer · Maintainer)',
        kind: '1계층 · 유저층',
        one: '보드를 요청·활용해 코드를 유지보수하고 공용 엔진을 발전시킨다',
        what: '프로젝트 개발자, 시스템 아키텍트, 그리고 archi-board 엔진 관리자.',
        why: '코드 변경 시 영향 범위를 파악하고 부품·데이터·위험도를 한눈에 감사하기 위해 뒷면을 사용한다.',
        how: [
          '에이전트에게 자연어로 보드 생성·업데이트·단일 파일 묶기를 지시한다',
          '만드는 사람 모드에서 객체 지도, 데이터 지도, 유즈케이스 순서도, 판단 차트를 탐색한다',
          '엔진 관리자는 하위 호환성을 지키며 engine/v1/을 개선하고 CI로 배포한다'
        ],
        api: ['자연어 프롬프트 지시', '만드는 사람 모드(build) 전체 도구 사용', 'engine/v1/ 업데이트 및 배포'],
        rules: ['프로젝트 안에서 엔진 파일을 복사해 수정하지 않는다', 'v1 엔진 수정 시 기존 필드의 의미를 바꾸거나 삭제하지 않는다'],
        files: ['README.md', '.github/workflows/check.yml']
      },
      ba_agent: {
        name: '코딩 에이전트 (Claude Code)',
        kind: '1계층 · 유저층 (AI)',
        one: 'SKILL.md 절차를 따라 코드를 읽고 board-data.js를 작성·검증한다',
        what: '사용자의 요청을 받아 아키텍처 보드를 생성하거나 증분 수정하는 AI 페어 프로그래머.',
        why: '수동 문서화의 부담을 없애고 코드에서 확인된 사실만 빠르게 구조화하기 위해 참여한다.',
        how: [
          '1~2단계: 보드 폴더(docs/board/)를 정하고 틀(assets/board.html)을 복사한다',
          '3단계: audience.md를 따라 처음 보는 사람용 앞면 두 장부터 쉬운 말로 설계한다',
          '4~5단계: reading-code.md와 data-format.md를 따라 뒷면 데이터와 판단 값을 작성한다',
          '6~7단계: check.mjs로 오류 0개를 확인한 뒤 브라우저 열람 및 5초 시험을 안내한다'
        ],
        api: ['"아키텍처 보드 만들어줘"', '"보드 업데이트해줘"', '"보드 다시 묶어줘"'],
        fails: ['코드에서 확인되지 않는 내용은 추측해 채우지 않고 비워 두거나 상태 todo/cand로 표기한다'],
        rules: ['키 · 토큰 · 비밀번호 · 서버 주소 · 실명은 보드에 절대 기록하지 않는다'],
        files: ['skills/archi-board/SKILL.md', 'skills/archi-board/references/reading-code.md']
      },
      ac_shell: {
        name: '상단 전환 띠 & 쇼케이스 헤더',
        kind: '2계층 · 사용자 인터페이스',
        one: '청중 모드(앞면/뒷면)를 전환하고 원하는 창과 기능으로 즉시 이동시킨다',
        what: '상단 헤더 바(.top), 청중 토글(.aud), 액션 단추(.acts), 창 바로가기 칩 바(.chips) 및 제안된 쇼케이스 배너.',
        why: '처음 보는 사람과 만드는 사람이 같은 보드 위에서 각자에게 필요한 도구만 깔끔하게 보게 하려고 분리했다.',
        how: [
          'view 창이 있으면 처음 보는 사람 / 만드는 사람 전환 단추를 렌더링한다',
          '선택된 청중 모드를 localStorage에 기억하고 data-mode 속성으로 UI 노출을 제어한다',
          '창마다 완료/일부/미구현 비율을 계산해 작은 진행 막대(meter)와 함께 칩으로 그린다',
          '[제안] 첫 방문자에게 쇼케이스 웰컴 카드와 원클릭 설치 명령어 복사 버튼을 제공한다'
        ],
        holds: ["localStorage 'archi-board:aud:<title>' — 마지막 선택한 청중 모드"],
        api: ['setAudMode(m) — 앞면/뒷면 전환', 'openFrame(id) — 특정 창으로 카메라 이동'],
        change: ['상단 버튼 추가 시 SHELL 템플릿과 data-aud 노출 규칙을 함께 맞춘다'],
        files: ['engine/v1/board.js', 'engine/v1/board.css']
      },
      ac_canvas: {
        name: '무한 보드 캔버스 & 미니맵',
        kind: '2계층 · 사용자 인터페이스',
        one: '줌·드래그 월드 좌표계 위에 창·상자·화살표·순서도·요약 뷰를 그린다',
        what: '무한 캔버스(#board, #world), 시맨틱 줌 요약 층(#sums), SVG 간선 층(#edges, #flows), 우측 하단 미니맵(#mini).',
        why: '수십 개의 부품과 여러 관점의 다이어그램을 페이지 이동 없이 한 장의 지도처럼 탐색하게 하려고.',
        how: [
          '배율(scale)이 낮을 때는 far 클래스를 켜서 창 제목과 진행률 요약(.sum)만 큼직하게 보여 준다',
          '가까이 확대하면 창 내부의 ArchiMate 상자(.el), 계층 띠(.band/.vband), 유즈케이스 순서도를 선명하게 그린다',
          '상자에 마우스를 올리거나 누르면 focus 모드를 켜서 연결된 상자와 곡선 화살표(.e.on)만 강조한다',
          '순서도 따라가기 실행 시 객체 지도 카드 사이로 파란 점(dot) 애니메이션을 움직인다'
        ],
        holds: ['카메라 상태 (panX, panY, scale)', '선택·포커스된 상자 및 간선 집합'],
        api: ['드래그 이동 · Ctrl/⌘+휠 확대/축소', '전체 보기(#bFit) · 미니맵 클릭 이동'],
        fails: ['prefers-reduced-motion 환경에서는 카메라 이동과 점선 애니메이션을 즉시 전환으로 대체한다'],
        files: ['engine/v1/board.js', 'engine/v1/board.css']
      },
      ac_panel: {
        name: '상세 패널 · 유저 스토리 · 따라가기 · 차트 뷰어',
        kind: '2계층 · 사용자 인터페이스',
        one: '선택한 항목의 깊은 설명과 유저 스토리(story), 판단 차트, 발표 모드를 보여 준다',
        what: '우측 상세 패널(#panel), 유저 스토리 뷰어(openUStory), 하단 따라가기(#tour · #tourCta), 발표 모드(#presBar), 읽는 법(#legend).',
        why: '캔버스 위의 상자는 22자 이내로 간결하게 유지하고, 유저 스토리·코드 위치·루브릭·근거·내부 로직은 눌렀을 때만 깊게 보여 주려고.',
        how: [
          '상자·창·객체·데이터를 누르면 우측 패널을 열고 연결된 관계, 유즈케이스, 판단 차트를 함께 묶어 보여 준다',
          '순서도 카드를 누르면 유저 스토리(누가·무엇을·왜 → 장면별 보는 것 sees와 근거 basis → 갈래)를 열고 보드 순서도와 동기화한다',
          '판단 · 차트 단추를 누르면 열지도(heatmap), 막대(bar), 흐름도(sankey)와 채점 기준(rubric)·근거(basis)를 그린다',
          '플로팅 투어 배너(#tourCta)와 발표 모드(#presBar)로 첫 방문자 온보딩 및 슬라이드 발표를 지원한다'
        ],
        api: ['openUStory(id, scene) — 유저 스토리 및 순서도 연동', 'openInsights(id) — 열지도/막대/흐름도 렌더링', 'startPres() — 발표(슬라이드) 모드'],
        rules: ['판단 차트와 유저 스토리(sees)에 근거(basis)가 없으면 check.mjs가 경고하고 화면에 표시한다'],
        files: ['engine/v1/board.js', 'engine/v1/board.css']
      },
      ac_skill: {
        name: '스킬 절차 오케스트레이터 (SKILL.md)',
        kind: '3계층 · 기능 (Skill & Methodology)',
        one: '에이전트가 앞면 설계부터 코드 역공학·데이터 작성·검증까지 따르는 표준 절차서',
        what: 'skills/archi-board/SKILL.md와 3개의 레퍼런스 문서(audience.md, reading-code.md, data-format.md), 기본 HTML 틀(assets/board.html).',
        why: '어떤 에이전트가 실행하더라도 일관된 품질과 스키마(format: 1), 쉬운 말 규칙을 지키는 보드를 만들게 하려고.',
        how: [
          'audience.md로 처음 보는 사람이 묻는 4가지 질문과 5초 시험 기준을 제시한다',
          'reading-code.md로 부품 → 오가는 길 → 데이터 → 판단 값 순서의 역공학 규칙을 안내한다',
          'data-format.md로 9종 레이아웃과 ArchiMate 3 요소·관계·인사이트 스키마를 정의한다'
        ],
        api: ['새로 만들 때 7단계 절차', '고칠 때 증분 업데이트 절차', '단일 파일 묶기/꺼내기 절차'],
        rules: ['앞면 없이 뒷면만 있는 보드를 고칠 때는 앞면 두 장을 먼저 더하자고 제안한다'],
        files: [
          'skills/archi-board/SKILL.md',
          'skills/archi-board/references/audience.md',
          'skills/archi-board/references/reading-code.md',
          'skills/archi-board/references/data-format.md'
        ]
      },
      ac_check: {
        name: '무브라우저 정적 점검기 (check.mjs)',
        kind: '3계층 · 기능 (Static Verifier)',
        one: '브라우저 없이 board-data.js의 참조 무결성·범위·순환·가독성 규칙을 검사한다',
        what: 'Node.js 기반 정적 검증 스크립트(skills/archi-board/scripts/check.mjs).',
        why: '에이전트가 잘못된 ID나 깨진 차트, 코드 용어가 섞인 앞면을 만든 채 끝내는 것을 막기 위해.',
        how: [
          'engine/v1/board.js에서 /*MODEL-START*/ ~ /*MODEL-END*/ 구간을 읽어 최신 TYPES·RELS·INSIGHTS 표를 가져온다',
          'vm.runInNewContext로 board-data.js를 실행해 window.BOARD 객체를 추출한다',
          '창·상자·관계·유즈케이스·객체·데이터·카드의 ID 중복 및 참조 무결성을 전수 검사한다',
          '앞면(view) 상자 수(>30), 단계 수(>6), 글자 수(>22), 코드 모양 정규식(CODEY) 위반을 경고한다',
          '판단 차트의 숫자 범위, 근거(basis) 유무, 흐름도(sankey)의 순환 그래프(DFS cycle) 여부를 검사한다'
        ],
        api: ['node skills/archi-board/scripts/check.mjs <board-data.js> [board.js]'],
        fails: ['잘못(err)이 1개라도 있으면 목록을 출력하고 종료 코드 1(process.exit(1))로 실패 처리한다'],
        rules: ['엔진의 MODEL 표를 동적으로 파싱하므로 엔진에 새 종류가 추가되어도 점검기를 따로 고칠 필요가 없다'],
        files: ['skills/archi-board/scripts/check.mjs']
      },
      ac_bundle: {
        name: '단일 파일 번들러 · 언패커 (inline · unpack)',
        kind: '3계층 · 기능 (Artifact Bundler)',
        one: '엔진과 데이터를 한 HTML 파일로 묶거나, 묶인 파일에서 데이터를 다시 꺼낸다',
        what: 'skills/archi-board/scripts/inline.mjs 및 unpack.mjs 스크립트.',
        why: '인터넷이 없는 환경이나 claude.ai 아티팩트처럼 단일 HTML 파일만 올릴 수 있는 곳에서도 보드를 쓰고 다시 고칠 수 있게 하려고.',
        how: [
          'inline.mjs: board.css, board-data.js, board.js(및 head.html 주석)를 읽어 board.single.html 하나로 합친다',
          '스크립트 내부의 </script 문자열을 이스케이프(guard)해 HTML 파싱 깨짐을 방지한다',
          'unpack.mjs: 묶인 HTML에서 window.BOARD 스크립트와 머리 주석을 분리해 board-data.js와 head.html로 복원한다'
        ],
        api: [
          'node skills/archi-board/scripts/inline.mjs <보드 폴더> [나갈 파일]',
          'node skills/archi-board/scripts/unpack.mjs <묶은 html> <나갈 폴더>'
        ],
        rules: ['묶은 파일은 자동 업데이트되지 않으므로 엔진이 새로 나오면 다시 묶어야 함을 사용자에게 알린다'],
        files: ['skills/archi-board/scripts/inline.mjs', 'skills/archi-board/scripts/unpack.mjs']
      },
      ac_engine: {
        name: '공용 렌더링 엔진 코어 (engine/v1)',
        kind: '4계층 · 인프라 (Core Engine)',
        one: 'window.BOARD 데이터를 읽어 9가지 레이아웃과 인터랙션을 그리는 무의존성 엔진',
        what: 'engine/v1/board.js (1,603줄) 및 engine/v1/board.css (556줄).',
        why: '모든 프로젝트가 복잡한 시각화 코드를 복사하지 않고 공용 주소에서 불러와 쓰게 하려고.',
        how: [
          'MODEL 정의: ArchiMate 3의 6개 층(LAYERS), 27개 요소 종류(TYPES), 10개 관계(RELS), 3종 인사이트(INSIGHTS) 메타모델 보유',
          '레이아웃 계산: view(앞면 띠/사슬), rows(층별 줄), ring(순환 고리), time(이행 고원), objects(객체 카드), datamap(데이터 지도), cards(격자 카드), matrix(교차 표), screens(화면 사진) 배치',
          '월드 배치(arrange): 열과 줄 배열에 따라 창들의 절대 좌표를 계산하고 SVG 곡선과 직교 꺾은선을 생성한다'
        ],
        holds: ['MODEL 메타모델 (TYPES, RELS, LAYERS, INSIGHTS)', '전역 레이아웃 좌표계 (FRAMES, E, UC, OBJ, DM)'],
        api: ['window.BOARD 전역 객체 입력', 'https://gamercross.github.io/archi-board/engine/v1/board.js · board.css'],
        rules: ['format: 1 하위 호환성을 절대 유지하며 외부 라이브러리 없이 순수 브라우저 API만 사용한다'],
        files: ['engine/v1/board.js', 'engine/v1/board.css']
      },
      node_cdn: {
        name: 'GitHub Pages CDN · Actions CI · 마켓',
        kind: '4계층 · 인프라 (Distribution & CI)',
        one: '엔진 정적 호스팅, 푸시 시 자동 무결성 검증, Claude 플러그인 배포를 담당한다',
        what: '.github/workflows/check.yml, .claude-plugin/plugin.json · marketplace.json, GitHub Pages 호스팅.',
        why: '잘못된 엔진 코드가 배포되어 전 세계 사용자의 보드가 깨지는 사고를 막고, 두 줄 명령으로 스킬을 설치·업데이트하게 하려고.',
        how: [
          'push / pull_request 시 Ubuntu Node 22 환경에서 엔진 문법 검사(node --check) 실행',
          '예시 보드 데이터 정적 점검(check.mjs) 수행',
          'inline.mjs → unpack.mjs → check.mjs → inline.mjs 왕복 실행 후 원본과 바이트 단위 비교(cmp)',
          '통과 시 GitHub Pages로 엔진을 서빙하고 마켓플레이스를 통해 스킬 업데이트를 배포한다'
        ],
        api: [
          '/plugin marketplace add gamercross/archi-board',
          '/plugin install archi-board@archi-board'
        ],
        fails: ['왕복 번들링 결과(cmp)가 1바이트라도 다르면 CI 빌드를 즉시 실패시킨다'],
        files: ['.github/workflows/check.yml', '.claude-plugin/plugin.json', '.claude-plugin/marketplace.json']
      }
    },
    extra: [
      ['ac_skill', 'ac_engine', 'format: 1 스키마 규격 공유'],
      ['ac_check', 'ac_engine', '/*MODEL-START*/ 메타모델 동적 파싱']
    ],
    usecaseNotes: {
      uc_create: {
        when: '사용자가 프로젝트 폴더에서 "아키텍처 보드 만들어줘"라고 말할 때.',
        end: 'docs/board/index.html과 검증 통과된 board-data.js가 생성된다.',
        fail: 'check.mjs에서 오류가 나면 에이전트가 오류 0개가 될 때까지 고친 뒤 안내한다.'
      },
      uc_explore: {
        when: '사용자·평가자·팀원이 브라우저로 보드를 열었을 때.',
        end: '앞면 큰 그림부터 읽고 필요하면 따라가기와 뒷면 상세 지도로 깊이 탐색한다.',
        fail: '오프라인 환경이어서 CDN 엔진을 못 받으면 board.single.html 단일 파일 사본을 사용한다.'
      },
      uc_bundle: {
        when: '인터넷 없이 열거나 claude.ai 아티팩트로 공유해야 할 때.',
        end: '엔진이 인라인으로 포함된 board.single.html(또는 역추출된 board-data.js)이 만들어진다.',
        fail: 'window.BOARD가 없는 일반 HTML을 unpack에 넣으면 안내 메시지와 함께 중단한다.'
      },
      uc_evolve: {
        when: '엔진 관리자가 engine/v1/ 또는 스크립트를 고쳐 저장소에 푸시할 때.',
        end: 'CI 검증을 거쳐 공용 엔진이 업데이트되고 기존 보드들이 자동으로 새 엔진을 쓴다.',
        fail: '문법 오류나 왕복(pack/unpack) 불일치가 발생하면 GitHub Actions가 배포를 차단한다.'
      }
    },
    journey: ['uc_create', 'uc_explore', 'uc_bundle', 'uc_evolve']
  },

  // ───────── [데이터 지도 (dataMap)] ─────────
  dataMap: {
    stores: [
      {
        id: 'st_repo',
        n: '대상 프로젝트 저장소 (docs/board/)',
        l: 'app',
        life: '프로젝트 버전 관리(Git)와 함께 영구 보존',
        d: '스킬이 사용자 프로젝트 안에 생성하고 업데이트하는 보드 폴더.'
      },
      {
        id: 'st_skill',
        n: '스킬 & 공용 엔진 저장소 (archi-board)',
        l: 'tec',
        life: '공용 GitHub 저장소 및 CDN에서 지속 관리',
        d: '에이전트가 읽는 레퍼런스 문서와 공용 렌더링 엔진 파일이 놓이는 곳.'
      },
      {
        id: 'st_browser',
        n: '브라우저 런타임 & 스토리지',
        l: 'app',
        life: '세션 동안 유지 (모드/테마 설정은 localStorage에 보존)',
        d: '브라우저에서 보드를 열었을 때 메모리에 올라가는 DOM/좌표 상태와 사용자 환경설정.'
      },
      {
        id: 'st_artifact',
        n: '단일 파일 & 아티팩트 저장소',
        l: 'tec',
        life: '다시 묶기 전까지 스냅샷으로 보존 (claude.ai 메모는 컬렉션 DB에 보존)',
        d: '오프라인 배포용 단일 HTML 파일과 claude.ai 아티팩트 메모 저장소.'
      }
    ],
    data: [
      {
        id: 'd_bdata',
        st: 'st_repo',
        n: '보드 데이터 (board-data.js)',
        k: 'window.BOARD = { format: 1, … }',
        one: '보드의 앞뒷면 창·상자·관계·순서도·객체·데이터·차트를 담는 유일한 데이터 파일',
        shape: [
          'format: 1, title, sub, start',
          'frames, elements, relations, flows, tour',
          'lanes, usecases, objectMap, dataMap, insights, cards, arrange'
        ],
        w: [
          ['ba_agent', '코드를 읽고 새로 쓰거나 바뀐 칸만 증분 수정'],
          ['ac_bundle', 'unpack.mjs 실행 시 단일 HTML에서 추출해 기록']
        ],
        r: [
          ['ac_check', 'vm.runInNewContext로 불러와 정적 검증'],
          ['ac_engine', '브라우저에서 window.BOARD를 읽어 화면 렌더링'],
          ['ac_bundle', 'inline.mjs 실행 시 읽어서 단일 HTML 안에 삽입']
        ],
        lim: '앞면(view) 창당 상자 25개 권장(30개 초과 경고), 상자 이름 22자 이내.',
        life: '프로젝트 코드가 살아 있는 동안 함께 업데이트됨.',
        never: 'API 키 · 토큰 · 비밀번호 · 내부 서버 주소(IP/도메인) · 개인 실명 및 연락처.',
        change: '칸을 고친 뒤에는 반드시 check.mjs를 다시 돌려 오류 0개를 확인한다.',
        tests: ['.github/workflows/check.yml']
      },
      {
        id: 'd_refs',
        st: 'st_skill',
        n: '스킬 절차서 & 3대 참조 규칙',
        k: 'SKILL.md · audience.md · reading-code.md · data-format.md',
        one: '에이전트가 보드를 설계하고 코드를 읽을 때 따르는 방법론 매뉴얼',
        shape: [
          'SKILL.md — 생성 7단계 · 수정 · 번들링 절차',
          'audience.md — 4대 질문 · 쉬운 말 · 5초 시험',
          'reading-code.md — 역공학 순서 · 판단 값 루브릭 규칙',
          'data-format.md — format 1 전체 필드 규격'
        ],
        w: [['ba_builder', '스킬 개선 및 방법론 업데이트 시 수정']],
        r: [['ba_agent', '보드 생성·수정 요청을 받을 때 절차 로드']],
        life: '스킬 버전과 함께 영구 관리.',
        change: '새 엔진 기능이 추가되면 data-format.md와 SKILL.md를 함께 갱신한다.'
      },
      {
        id: 'd_model',
        st: 'st_skill',
        n: 'ArchiMate & 인사이트 메타모델',
        k: '/*MODEL-START*/ TYPES · LAYERS · RELS · ST · INSIGHTS /*MODEL-END*/',
        one: '엔진과 점검기가 공유하는 ArchiMate 3 상자 종류·층·관계·차트 정의 표',
        shape: [
          'TYPES — 27종 ArchiMate 요소(한글명, 영문명, 층, 도형 모양)',
          'LAYERS — 6개 층(mot, str, bus, app, tec, imp)',
          'RELS — 10종 관계(realization, serving, triggering 등)',
          'INSIGHTS — 3종 차트(heatmap, bar, sankey)'
        ],
        w: [['ba_builder', 'engine/v1/board.js 상단 MODEL 블록 정의']],
        r: [
          ['ac_engine', '상자 색상·모양·아이콘·범례 렌더링에 사용'],
          ['ac_check', '정규식으로 추출해 데이터 유효성 검사 기준으로 사용']
        ],
        life: 'v1 엔진 수명 주기 동안 하위 호환 유지(추가만 허용).',
        change: 'engine/v1/board.js의 MODEL 블록만 고치면 check.mjs도 자동으로 새 모델을 인식한다.',
        tests: ['.github/workflows/check.yml']
      },
      {
        id: 'd_aud_pref',
        st: 'st_browser',
        n: '청중 모드 · 카메라 · 포커스 상태',
        k: "localStorage 'archi-board:aud:<title>' & 런타임 상태",
        one: '사용자가 보고 있는 청중 모드(앞면/뒷면)와 캔버스 배율·선택 상태',
        shape: [
          "AUDM — 'view'(처음 보는 사람) 또는 'build'(만드는 사람)",
          'scale, panX, panY — 현재 월드 카메라 위치 및 줌 배율',
          'sel, focus — 현재 선택되어 하이라이트된 상자 및 간선'
        ],
        w: [
          ['ac_shell', '앞면/뒷면 전환 단추 클릭 시 localStorage에 저장'],
          ['ac_canvas', '드래그·줌·상자 클릭 시 런타임 좌표/포커스 갱신']
        ],
        r: [
          ['ac_engine', '초기 로드 시 마지막 청중 모드 복원'],
          ['ac_panel', '현재 청중 모드에 맞춰 상세 패널 및 투어 항목 필터링']
        ],
        life: 'localStorage는 브라우저 데이터 삭제 전까지, 카메라 상태는 탭을 닫을 때까지.',
        never: '개인 식별 정보나 외부 트래킹 쿠키.'
      },
      {
        id: 'd_single',
        st: 'st_artifact',
        n: '단일 묶음 파일 (board.single.html)',
        k: 'board.single.html (+ head.html)',
        one: 'CSS·데이터·엔진 JS를 한 파일에 인라인으로 묶은 오프라인·아티팩트용 사본',
        shape: [
          '<style> board.css 전문 </style>',
          '<script> window.BOARD 데이터 </script>',
          '<script> board.js 엔진 전문 </script>'
        ],
        w: [['ac_bundle', 'inline.mjs가 엔진과 board-data.js를 합쳐 생성']],
        r: [
          ['ba_viewer', '인터넷 없이 브라우저나 아티팩트 뷰어에서 직접 열람'],
          ['ac_bundle', 'unpack.mjs가 읽어서 board-data.js와 head.html로 분리']
        ],
        lim: '약 100~150KB 내외의 단일 텍스트 HTML.',
        life: '자동 업데이트되지 않으므로 엔진 업그레이드 시 다시 묶어야 함.',
        change: 'inline.mjs 수정 시 unpack.mjs와의 왕복 동일성(cmp)을 반드시 확인한다.',
        tests: ['.github/workflows/check.yml']
      },
      {
        id: 'd_notes',
        st: 'st_artifact',
        n: '카드 창 메모 컬렉션 (notes)',
        k: 'frames[].notes.collection',
        one: 'claude.ai 아티팩트 환경에서 카드마다 할 일과 의견을 적어 두는 경량 문서 데이터',
        shape: ['[key]: 카드 id', 'text — 메모 내용', 'done — 완료 여부', 'at — 작성 시각'],
        w: [['ac_panel', '카드 상세 패널에서 메모 추가·완료 체크·삭제']],
        r: [['ac_panel', '카드 렌더링 및 상세 패널 열람 시 메모 목록 표시']],
        life: '같은 아티팩트 주소로 다시 올리는 동안 유지됨.'
      }
    ],
    flow: [
      {
        o: 'ba_agent',
        t: '1. 규칙 로드 & 코드 역공학',
        d: '참조 문서를 읽고 board-data.js를 작성한다',
        dm: ['d_refs', 'd_bdata']
      },
      {
        o: 'ac_check',
        t: '2. 메타모델 대조 정적 점검',
        d: 'MODEL 표와 데이터를 대조해 무결성을 검증한다',
        dm: ['d_model', 'd_bdata']
      },
      {
        o: 'ac_engine',
        t: '3. 양면 렌더링 & 상태 기억',
        d: '브라우저에서 앞뒷면 보드를 그리고 모드를 기억한다',
        dm: ['d_bdata', 'd_aud_pref']
      },
      {
        o: 'ac_bundle',
        t: '4. 단일 파일 번들링 & 아티팩트 공유',
        d: '오프라인·아티팩트용 한 파일로 묶거나 메모를 남긴다',
        dm: ['d_single', 'd_notes']
      }
    ]
  },

  // ───────── [판단 · 차트 (insights) — 열지도 · 막대 · 흐름도] ─────────
  insights: [
    {
      id: 'ins_ux_gap',
      f: 'arch_4tier',
      type: 'heatmap',
      t: '4계층 부품별 UI/UX · 검증 완성도 평가',
      d: '쇼케이스 온보딩(index.html)과 엔진 v1.3(플로팅 투어 배너 · 발표 모드 · 코치마크) 반영 후 각 부품의 위험/미비도를 다시 평가했다.',
      rows: ['ac_shell', 'ac_canvas', 'ac_panel', 'ac_skill', 'ac_check', 'ac_bundle', 'ac_engine', 'node_cdn'],
      cols: ['첫인상·온보딩', '비전공자 가독성', '검증·자동화'],
      values: [
        [1, 1, 1], // ac_shell: 상단 전환 + 쇼케이스 헤더(.sc-bar) + 원클릭 설치 복사 완료(1)
        [1, 1, 1], // ac_canvas: 무한 보드 + 3.5초 코치마크(#hint) 완료(1)
        [1, 1, 1], // ac_panel: 플로팅 투어 배너(#tourCta) + 발표 모드(#presBar) 완료(1)
        [1, 1, 1], // ac_skill: audience.md · reading-code.md · SKILL.md 완비(1)
        [1, 1, 1], // ac_check: 쉬운 말 정규식·순환·참조 검사 완비(1)
        [1, 1, 1], // ac_bundle: inline.mjs · unpack.mjs 왕복 검증 완비(1)
        [1, 1, 1], // ac_engine: v1.3 양면 엔진 · 발표 모드 · 코치마크 완비(1)
        [1, 1, 1]  // node_cdn: GitHub Pages/CI 및 예시 전환 랜딩 완비(1)
      ],
      scale: {min: 1, max: 3, labels: ['충분함(1)', '보강 권장(2)', '우선 개선(3)'], high: 'bad'},
      rubric: [
        '1 — 충분함: 코드와 문서에 기능이 구현되어 있고 자동 검증(check.mjs/CI)까지 갖춰져 있다',
        '2 — 보강 권장: 기본 기능은 작동하나 비개발자·외부인을 위한 UX 장치가 일부 부족하다',
        '3 — 우선 개선: 외부 방문자 온보딩이나 핵심 검증 장치가 빠져 있다'
      ],
      notes: [
        ['ac_shell', '첫인상·온보딩', 'index.html에 쇼케이스 바(.sc-bar), 예시 전환 탭(?board=self|memo), 원클릭 설치 복사(#scCopy) 구현 완료'],
        ['ac_panel', '첫인상·온보딩', 'engine/v1/board.js에 첫 화면 하단 플로팅 투어 배너(#tourCta)와 발표 슬라이드 모드(#presBar) 구현 완료'],
        ['ac_check', '검증·자동화', 'check.mjs가 CODEY 정규식과 상자·글자 수 제한까지 브라우저 없이 자동 검사하고 있다']
      ],
      basis: [
        'index.html — 쇼케이스 헤더(.sc-bar), 설치 명령어 클립보드 복사, 예시 보드 전환 탭 구현 확인',
        'engine/v1/board.js (v1.3.0) & board.css — #tourCta 플로팅 배너, #presBar 발표 모드, #hint 코치마크 구현 확인',
        'skills/archi-board/scripts/check.mjs (52~74줄) — 앞면(view) 쉬운 말 및 상자 수 자동 경고 로직 확인'
      ]
    },
    {
      id: 'ins_status',
      f: 'roadmap',
      type: 'bar',
      t: '아키텍처 보드 구성요소 구현 상태 분포',
      unit: '개',
      d: '이 보드에 정의된 상태 있는 상자(elements) 38개 모두 실제 코드(index.html, engine/v1/board.js, board.css)에 반영되어 완료(있음) 상태다.',
      items: [
        ['done', 38]
      ],
      basis: [
        'elements 배열에서 상태(s)가 지정된 상자 38개를 직접 센 값 — 기존 v1.2 코어 24개 + 신규 구현된 UI/UX 항목 14개 모두 done'
      ]
    },
    {
      id: 'ins_flow',
      f: 'objects',
      type: 'sankey',
      t: '4계층 간 BPMN 유즈케이스 요청 흐름량',
      unit: '칸',
      d: '4가지 핵심 유즈케이스(생성·탐색·번들·배포)에서 주체와 부품 사이에 오가는 요청 화살표(응답 제외)와 데이터 기록 흐름.',
      links: [
        ['ba_builder', 'ba_agent', 3],
        ['ba_builder', 'node_cdn', 1],
        ['ba_viewer', 'ac_shell', 3],
        ['ba_agent', 'ac_skill', 1],
        ['ba_agent', 'ac_check', 1],
        ['ba_agent', 'ac_bundle', 2],
        ['ba_agent', 'ac_engine', 1],
        ['ac_shell', 'node_cdn', 1],
        ['ac_shell', 'ac_canvas', 2],
        ['ac_bundle', 'ac_check', 1],
        ['node_cdn', 'ac_check', 1],
        ['node_cdn', 'ac_bundle', 1],
        ['ac_check', 'd_bdata', 2],
        ['ac_engine', 'd_bdata', 2]
      ],
      basis: [
        'usecases(uc_create · uc_explore · uc_bundle · uc_evolve)의 steps 중 응답(r: true)을 제외한 요청 칸을 집계',
        '단방향 비순환(DAG) 흐름으로 유저층 → UI/기능 → 인프라 → 데이터(d_bdata)로 이어지는 경로를 표현'
      ]
    }
  ],

  // ───────── [교차 표 (matrix) — 4계층 부품 × 유즈케이스] ─────────
  matrixRows: [
    'ba_viewer',
    'ba_builder',
    'ba_agent',
    'ac_shell',
    'ac_canvas',
    'ac_skill',
    'ac_check',
    'ac_bundle',
    'ac_engine',
    'node_cdn'
  ],
  rowNames: {
    ba_viewer: '[1계층 유저] 처음 보는 사람',
    ba_builder: '[1계층 유저] 만드는 사람',
    ba_agent: '[1계층 유저] 코딩 에이전트',
    ac_shell: '[2계층 UI] 상단 전환 · 쇼케이스',
    ac_canvas: '[2계층 UI] 무한 보드 · 패널',
    ac_skill: '[3계층 기능] 스킬 절차서',
    ac_check: '[3계층 기능] 정적 점검기',
    ac_bundle: '[3계층 기능] 단일 파일 번들러',
    ac_engine: '[4계층 인프라] 공용 렌더링 엔진',
    node_cdn: '[4계층 인프라] CDN · Actions CI'
  },

  // ───────── [읽는 법에 더할 설명 (legend)] ─────────
  legend: [
    '이 보드는 **archi-board 스킬 자체**를 설명하기 위해 만든 메타 아키텍처 보드입니다. **유저층 · 사용자 인터페이스 · 기능(BPMN) · 인프라**의 4계층 구조와 **8대 아키텍처 방법론 · UI/UX 모범사례**를 한 장에 담았습니다.',
    '외부 사용자를 위한 **쇼케이스 헤더 · 원클릭 설치 복사**(index.html)와 **플로팅 투어 배너 · 발표(슬라이드) 모드 · 조작 코치마크**(엔진 v1.3)까지 모두 실제 코드에 반영되었습니다.'
  ],

  // ───────── [창 배치 (arrange) — 열 → 줄 → 창] ─────────
  arrange: [
    [['v_arch'], ['v_bpmn'], ['v_method']],
    [['objects'], ['data']],
    [['bpmn_loop', 'roadmap'], ['arch_4tier'], ['practices'], ['matrix']]
  ]
};
