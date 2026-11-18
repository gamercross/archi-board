#!/usr/bin/env node
// Claude Code 훅(PostToolUse — Edit · Write · MultiEdit). 고친 파일을 보드가 근거로 쓰고 있으면
// "보드도 다시 보라"는 짧은 메모를 Claude에게 남긴다. 사람 대신 바뀜을 알아채는 몫이다.
// 프로젝트에 docs/board/board-data.js가 없거나, 고친 파일이 보드에 나오지 않으면 아무것도 하지 않는다.
// 일을 막지 않는다 — 늘 exit 0. 같은 세션에서 같은 파일은 한 번만 알린다.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const done = () => process.exit(0);
let raw = '';
process.stdin.on('data', d => { raw += d; });
process.stdin.on('end', () => {
  try {
    const inp = JSON.parse(raw || '{}');
    const file = (inp.tool_input && inp.tool_input.file_path) || (inp.tool_response && inp.tool_response.filePath);
    const root = process.env.CLAUDE_PROJECT_DIR || inp.cwd || process.cwd();
    if (!file) done();
    const boardFile = path.join(root, 'docs', 'board', 'board-data.js');
    if (!fs.existsSync(boardFile)) done();
    const rel = path.relative(root, path.resolve(root, file)).split(path.sep).join('/');
    if (!rel || rel.startsWith('..') || rel.startsWith('docs/board/')) done(); // 프로젝트 밖 · 보드 자신은 건너뛴다
    const src = fs.readFileSync(boardFile, 'utf8');
    const n = src.split(rel).length - 1;
    if (!n) done();

    const mark = path.join(os.tmpdir(), `archi-board-hook-${String(inp.session_id || 'x').replace(/[^\w-]/g, '')}.json`);
    let seen = [];
    try { seen = JSON.parse(fs.readFileSync(mark, 'utf8')); } catch (e) { /* 처음 */ }
    if (seen.includes(rel)) done();
    try { fs.writeFileSync(mark, JSON.stringify([...seen, rel])); } catch (e) { /* 못 써도 알림은 한다 */ }

    // 이 파일을 근거로 쓰는 상자 · 객체 id를 같은 줄에서 몇 개 찾아 준다
    const ids = [...new Set(src.split('\n').filter(l => l.includes(rel))
      .map(l => (l.match(/\bid:\s*'([^']+)'/) || l.match(/^\s*([A-Za-z_]\w*):\s*\{/) || [])[1]).filter(Boolean))].slice(0, 6);
    const note = `archi-board: 고친 파일 ${rel}을 보드(docs/board/board-data.js)가 근거로 쓴다 — ${n}곳${ids.length ? ` (${ids.join(', ')})` : ''}. ` +
      '바꾼 동작이 보드와 달라졌으면 그 칸만 고치고, 바뀐 상자에는 ch: \'날짜 · 무엇이 바뀜\'을 단다. ' +
      '요구가 바뀐 것이면 요구(requirement) 상자를 먼저 고치고 ab impact <요구 id>로 다시 볼 곳을 본다. 끝나면 node check.mjs와 ab drift로 확인한다.';
    process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'PostToolUse', additionalContext: note } }));
  } catch (e) { /* 훅은 일을 막지 않는다 */ }
  done();
});
