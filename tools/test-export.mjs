#!/usr/bin/env node
// 왕복 시험 — board-data.js → ArchiMate 파일 → board-data.js 로 돌려 상자 · 선 · 나머지 칸이 그대로인지 본다.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const sc = path.join(root, 'skills/archi-board/scripts');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ab-export-'));
const load = f => { const w = {}; vm.runInNewContext(fs.readFileSync(f, 'utf8'), { window: w }); return w.BOARD; };
const J = v => JSON.stringify(v, (k, x) => (x === undefined || x === '' ? undefined : x));
const norm = x => { const o = Array.isArray(x) ? { f: x[0], id: x[1], t: x[2], n: x[3], d: x[4], s: x[5], c: x[6], ...(x[7] || {}) } : x; const r = {}; Object.keys(o).sort().forEach(k => { if (o[k] !== undefined && o[k] !== '') r[k] = o[k]; }); return J(r); };
const rel = r => J(Array.isArray(r) ? r.slice(0, 3) : [r.a, r.b, r.k]);
let bad = 0;
for (const b of ['docs/board', 'examples/memo']) {
  const src = path.join(root, b, 'board-data.js'), xml = path.join(tmp, 'a.xml'), back = path.join(tmp, 'b.js'), md = path.join(tmp, 'a.md');
  execFileSync('node', [path.join(sc, 'export.mjs'), src, '--archimate', xml, '--mermaid', md]);
  execFileSync('node', [path.join(sc, 'import-archimate.mjs'), xml, back]);
  const o = load(src), n = load(back), fail = [];
  if (o.elements.map(norm).join('|') !== n.elements.map(norm).join('|')) fail.push('상자');
  if (o.relations.map(rel).join('|') !== n.relations.map(rel).join('|')) fail.push('선');
  Object.keys(o).filter(k => !['elements', 'relations'].includes(k) && J(o[k]) !== J(n[k])).forEach(k => fail.push(k));
  if (!/flowchart LR/.test(fs.readFileSync(md, 'utf8'))) fail.push('mermaid');
  try { execFileSync('node', [path.join(sc, 'check.mjs'), back], { stdio: 'pipe' }); } catch (e) { fail.push('check.mjs'); }
  console.log(`${b}: ${fail.length ? '다름 — ' + fail.join(', ') : '왕복이 그대로다'}`);
  bad += fail.length;
}
process.exit(bad ? 1 : 0);
