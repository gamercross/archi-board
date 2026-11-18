# 엔진 업데이트 조사 — 요구 · 바뀌면 다시 볼 곳 (2026-11-18)

반영할 것: 수업에서 배운 UML 3~9강(요구분석 · 기능 · 정적 · 동적 · 아키텍처 · 데이터 · UI), 빅테크 시스템 설계 7단계, PRD · TDD, 그리고
"요구사항이 바뀌면 사람이 그림을 하나씩 고치지만, archi-board는 엔진이 다시 그려 준다".

## 1. 조사 때 엔진에 비어 있던 곳

| 반영할 것 | 있던 것 | 비어 있던 곳 |
|---|---|---|
| 요구분석 · PRD | 동기 층 상자: goal · principle · constraint · driver … | **`requirement` 상자가 없었다** — 기능 / 비기능, 인수 기준, 확인 방법, 시험을 적을 칸 |
| 유스케이스 | 순서도(`usecases`) · 갈래(`alt`) · 이야기(`story`) | 유스케이스 다이어그램(include · extend), 시작 · 끝 조건 |
| 클래스 | 객체 지도 카드(CRC 카드와 같은 꼴) | 다중도, 상속 · 집합 |
| 동적 모델 | 순서도, 객체 지도 위 점 흐름 | 상태 창, 순서도 ↔ 상태 교차 점검 |
| 데이터 | 데이터 지도 | 데이터끼리의 관계 · 다중도(ERD), 표 정의 읽기 |
| 빅테크 7단계 | 판단 차트 · 객체 `api` 글 | 규모 추정 숫자, API 목록, "7단계 중 어디가 비었나" 점검표 |
| 요구가 바뀌면 | `ab drift` · `ab trace` · "보드 업데이트해줘" | **요구 하나 → 흔들리는 곳을 모아 비추는 영향 보기**, 바뀐 상자 표시, 바뀔 때 저절로 알리기 |

## 2. 쓸 것 — 확인한 표준 · 도구 · 방법

| 이름 | 무엇 | 엔진에 넣는 자리 |
|---|---|---|
| **ArchiMate 4** (The Open Group, 최종판) | 개념 60 → 42, 층 → 영역, 업무 · 애플리케이션 · 기술 Process를 공통 Process 하나로, **Constraint는 빼고 Requirement로**, 관계에 다중도 | v1에는 `requirement`만 더했다(1.6). 영역 · 공통 행동 · 다중도는 깨는 바꿈이라 엔진 v2 |
| **Mermaid requirementDiagram** (SysML 바탕) | 확인 방법 넷(analysis · inspection · test · demonstration), 관계 satisfies · verifies | 확인 방법 넷을 `verify` 칸으로 가져왔다. satisfies는 ArchiMate `realization` 선으로, verifies는 `tests` 칸으로 — ArchiMate 내보내기 왕복을 깨지 않게 |
| **SysML v2** (OMG, 2025 채택) | 요구를 1급 요소로, verify 관계 | 요구 ↔ 시험의 뜻을 맞추는 기준 |
| **요구 추적 "코드 속 표시"** — OpenFastTrace · StrictDoc의 방법 | 코드 · 시험에 요구 번호 표시 | 도구는 들이지 않는다. 시험 · 코드 속 `req: FR-3` 같은 표시를 읽어 `tests`를 채우는 길을 reading-code.md에 적었다 |
| **ByteByteGo 7단계** · 구글 디자인 문서 · Hello Interview 틀 | 요구 → 규모 → 큰 구조 → DB → 인터페이스 → 확장 · 성능 → 신뢰성 | 다음: "7단계 점검표" 창, 비목표 · 다른 안 칸 |
| **OpenAPI 3.2** · SQL DDL · Prisma | API · 표 정의 | 다음: `ab scan`이 읽어 객체의 받는 입구 · ERD를 채운다 |
| **tree-sitter** · **ELK.js** | 문법을 아는 코드 읽기 · 자동 배치 | 다음: `ab scan` 정밀화 · 새 창(상태 · ERD)의 자리 |
| **C4 · Structurizr · LikeC4** | 모델 하나 → 그림 여러 장 | archi-board의 "board-data.js 한 파일 → 창 여럿"과 같은 생각 — 참고만 |
| **Claude Code 훅** · GitHub Actions | 편집 뒤 · 푸시마다 저절로 도는 점검 | 훅을 넣었다(1.6) — 보드가 근거로 쓰는 파일을 고치면 Claude에게 메모 |

## 3. 엔진 1.6에서 한 것

1. **`requirement` 상자** — 칸 `no` · `kind` · `accept` · `verify` · `tests`. 옆 칸에 "요구"(번호 · 종류 · 인수 기준 · 확인 방법) · 확인하는 시험 · 채우는 상자. `check.mjs`가 칸 값과 "있음인데 채우는 상자가 없음"을 잡는다.
2. **바뀌면 다시 볼 곳** — 상자 옆 칸의 "이것이 바뀌면"(요구면 "이 요구가 바뀌면"): 바로 이어진 상자 → 한 번 더(동기 층으로는 안 올라감) → 객체 → 데이터 → 순서도 → 시험 · 코드를 보드에서 함께 비추고 목록으로 보인다. 같은 규칙의 `ab impact`(Rust).
3. **바뀐 상자 `ch`** — '바뀜' 표시, 창 옆 칸의 바뀐 상자 목록과 "바뀐 곳 모두 비추기".
4. **Claude Code 훅** — `hooks/hooks.json` + `scripts/board-hook.mjs`. 막지 않고, 같은 파일은 세션에 한 번만 알린다.
5. 예시(메모 앱)에 요구 둘(FR-1 기능 · NFR-1 비기능, 바뀜 표시)과 따라가기 한 칸.

## 4. 다음 차례

1. 상태 창 + 순서도 ↔ 상태 교차 점검(동적 모델의 모델 검증).
2. 데이터 관계 · 다중도(ERD) — ArchiMate 4 관계 다중도와 같은 칸으로.
3. 유스케이스 다이어그램 창(include · extend, 시작 · 끝 조건).
4. 빅테크 7단계 점검표 창.
5. ELK.js 자동 배치 · `ab scan`에 tree-sitter · OpenAPI · SQL/Prisma · Mermaid requirementDiagram 내보내기.
6. ArchiMate 4에 맞춘 엔진 v2.

## 출처

- ArchiMate 4: [보도자료](https://www.opengroup.org/The-Open-Group-Announces-ArchiMate%C2%AE-4-Specification) · [Bizzdesign, Marc Lankhorst, 2026-08-20](https://bizzdesign.com/blog/archimate-4-changes) · [교환 형식](https://www.opengroup.org/xsd/archimate/)
- [Mermaid requirementDiagram](https://mermaid.js.org/syntax/requirementDiagram.html) · [SysML v2](https://github.com/systems-modeling/sysml-v2-release)
- [OpenFastTrace](https://github.com/itsallcode/openfasttrace/blob/main/doc/user_guide.md) · [StrictDoc](https://strictdoc.readthedocs.io/en/latest/strictdoc_01_user_guide.html)
- [ByteByteGo 7단계](https://bytebytego.com/guides/how-to-ace-system-design-interviews-like-a-boss/) · [Design Docs at Google](https://www.industrialempathy.com/posts/design-docs-at-google/) · [Hello Interview](https://www.hellointerview.com/learn/system-design/in-a-hurry/delivery)
- [OpenAPI 3.2](https://spec.openapis.org/oas/v3.2) · [ELK Layered](https://eclipse.dev/elk/reference/algorithms/org-eclipse-elk-layered.html) · [LikeC4](https://github.com/likec4)
- [Claude Code 훅](https://code.claude.com/docs/en/hooks.md) · [플러그인 구성](https://code.claude.com/docs/en/plugins/components.md)
