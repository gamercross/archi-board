#!/usr/bin/env node
// archi-board 데이터 점검 — board-data.js의 id · 종류 · 연결이 서로 맞는지 본다. 브라우저 없이 돈다.
// 쓰는 법: node check.mjs <board-data.js> [engine/v1/board.js]
// 잘못이 있으면 줄마다 하나씩 쓰고 1로 끝난다. 경고(빈 설명 등)는 끝을 막지 않는다.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const dataFile = process.argv[2];
const engineFile = process.argv[3] || path.resolve(here, '../../../engine/v1/board.js');
if (!dataFile) { console.error('쓰는 법: node check.mjs <board-data.js> [board.js]'); process.exit(2); }

// 엔진의 종류 표(TYPES · RELS · LAYERS)를 그대로 읽는다 — 표가 바뀌어도 이 파일을 고칠 필요가 없게
const eng = fs.readFileSync(engineFile, 'utf8');
const m = eng.match(/\/\*MODEL-START\*\/([\s\S]*?)\/\*MODEL-END\*\//);
if (!m) { console.error('엔진에서 MODEL 표를 찾지 못했다:', engineFile); process.exit(2); }
const model = vm.runInNewContext(m[1] + '\n;({TYPES, RELS, LAYERS})');

const win = {};
try { vm.runInNewContext(fs.readFileSync(dataFile, 'utf8'), { window: win }, { filename: dataFile }); }
catch (e) { console.error('board-data.js를 실행하지 못했다:', e.message); process.exit(1); }
const B = win.BOARD;
const errs = [], warns = [];
const err = t => errs.push(t), warn = t => warns.push(t);
if (!B) { console.error('window.BOARD가 없다'); process.exit(1); }
const arr = v => (Array.isArray(v) ? v : []);
const dup = (list, what) => { const s = new Set(); list.forEach(id => { if (s.has(id)) err(`${what} id가 겹친다: ${id}`); s.add(id); }); return s; };

if (B.format && Math.floor(B.format) !== 1) err(`format ${B.format} — 이 점검은 형식 1용이다`);
const LAYOUTS = ['rows', 'ring', 'time', 'objects', 'datamap', 'matrix', 'screens'];
const frames = arr(B.frames), fid = dup(frames.map(f => f.id), '창');
frames.forEach(f => {
  if (f.layout && !LAYOUTS.includes(f.layout)) err(`창 ${f.id}: 모르는 layout ${f.layout} (${LAYOUTS.join(' · ')})`);
  if (!f.title) warn(`창 ${f.id}: title이 없다`);
});
['objects', 'datamap', 'matrix', 'ring', 'screens'].forEach(l => { if (frames.filter(f => f.layout === l).length > 1) err(`layout '${l}' 창은 하나만 둘 수 있다`); });
const els = arr(B.elements).map(x => Array.isArray(x) ? { f: x[0], id: x[1], t: x[2], n: x[3], s: x[5], ...(x[7] || {}) } : x);
const eid = dup(els.map(x => x.id), '상자');
const ST = ['done', 'part', 'todo', 'cand', 'gone', 'rule', undefined, ''];
els.forEach(x => {
  if (!fid.has(x.f)) err(`상자 ${x.id}: 없는 창 ${x.f}`);
  if (!model.TYPES[x.t]) err(`상자 ${x.id}: 모르는 종류 ${x.t}`);
  if (!ST.includes(x.s)) err(`상자 ${x.id}: 모르는 상태 ${x.s} (done · part · todo · cand · gone)`);
  if (!x.n) err(`상자 ${x.id}: 이름(n)이 없다`);
  const f = frames.find(f => f.id === x.f);
  if (f && f.layout === 'time' && (x.t === 'plateau' || x.t === 'wp') && x.col === undefined) err(`상자 ${x.id}: time 창의 plateau · wp에는 col이 있어야 한다`);
});
frames.filter(f => f.layout === 'ring').forEach(f => [...arr(f.ring), ...arr(f.center)].forEach(id => { if (!eid.has(id)) err(`창 ${f.id}: ring/center의 ${id}가 상자에 없다`); }));
arr(B.relations).forEach(r => {
  const [a, b, t] = Array.isArray(r) ? r : [r.from, r.to, r.type];
  if (!eid.has(a)) err(`관계 ${a} → ${b}: ${a}가 상자에 없다`);
  if (!eid.has(b)) err(`관계 ${a} → ${b}: ${b}가 상자에 없다`);
  if (!model.RELS[t]) err(`관계 ${a} → ${b}: 모르는 관계 ${t}`);
});
arr(B.flows).forEach(x => { const [a, b] = Array.isArray(x) ? x : [x.from, x.to]; [a, b].forEach(id => { if (!fid.has(id)) err(`흐름 ${a} → ${b}: 없는 창 ${id}`); }); });
arr(B.tour).forEach((t, i) => {
  arr(t.f).forEach(id => { if (!fid.has(id)) err(`따라가기 ${i + 1}: 없는 창 ${id}`); });
  arr(t.ids).forEach(id => { if (!eid.has(id)) err(`따라가기 ${i + 1}: 없는 상자 ${id}`); });
  if (!arr(t.f).length) err(`따라가기 ${i + 1}: f(보여 줄 창)가 비었다`);
});
const LN = B.lanes || {};
Object.entries(LN).forEach(([k, v]) => { if (!Array.isArray(v) || !eid.has(v[1])) err(`세로 줄 ${k}: [이름, 상자 id] 모양이 아니거나 상자가 없다`); });
const uid = dup(arr(B.usecases).map(u => u.id), '유즈케이스');
arr(B.usecases).forEach(u => {
  if (!fid.has(u.f)) err(`유즈케이스 ${u.id}: 없는 창 ${u.f}`);
  arr(u.lanes).forEach(k => { if (!LN[k]) err(`유즈케이스 ${u.id}: 없는 세로 줄 ${k}`); });
  arr(u.steps).forEach((s, i) => {
    const [a, b, t] = Array.isArray(s) ? s : [s.a, s.b, s.t];
    [a, b].forEach(k => { if (!arr(u.lanes).includes(k)) err(`유즈케이스 ${u.id} ${i + 1}칸: 줄 ${k}가 lanes에 없다`); });
    if (!t) err(`유즈케이스 ${u.id} ${i + 1}칸: 하는 일이 비었다`);
  });
});
const OM = B.objectMap;
const objs = OM ? OM.objects || {} : {};
if (OM) {
  if (!frames.some(f => f.layout === 'objects')) err(`objectMap이 있는데 layout 'objects' 창이 없다`);
  const inPkg = new Set();
  arr(OM.packages).forEach(p => arr(p.ids).forEach(id => { if (!objs[id]) err(`묶음 ${p.id}: 객체 ${id}가 objects에 없다`); inPkg.add(id); }));
  Object.keys(objs).forEach(id => { if (!inPkg.has(id)) warn(`객체 ${id}: 어느 묶음에도 없어 지도에 안 나온다`); if (!objs[id].name) err(`객체 ${id}: name이 없다`); if (!objs[id].one) warn(`객체 ${id}: one(한 줄 설명)이 비었다`); });
  Object.entries(OM.laneMap || {}).forEach(([k, o]) => { if (!LN[k]) err(`laneMap: 없는 세로 줄 ${k}`); if (!objs[o]) err(`laneMap ${k}: 없는 객체 ${o}`); });
  arr(OM.extra).forEach(([a, b]) => [a, b].forEach(o => { if (!objs[o]) err(`extra ${a} → ${b}: 없는 객체 ${o}`); }));
  arr(OM.journey).forEach(id => { if (!uid.has(id)) err(`journey: 없는 유즈케이스 ${id}`); });
  Object.keys(OM.usecaseNotes || {}).forEach(id => { if (!uid.has(id)) err(`usecaseNotes: 없는 유즈케이스 ${id}`); });
}
const DMAP = B.dataMap;
if (DMAP) {
  if (!frames.some(f => f.layout === 'datamap')) err(`dataMap이 있는데 layout 'datamap' 창이 없다`);
  const sid = dup(arr(DMAP.stores).map(s => s.id), '놓이는 곳'), did = dup(arr(DMAP.data).map(x => x.id), '데이터');
  arr(DMAP.data).forEach(x => {
    if (!sid.has(x.st)) err(`데이터 ${x.id}: 없는 놓이는 곳 ${x.st}`);
    ['w', 'r', 'v'].forEach(k => arr(x[k]).forEach(([o]) => { if (o && !objs[o]) err(`데이터 ${x.id}.${k}: 객체 지도에 없는 ${o} (사람이면 null)`); }));
    if (!arr(x.w).length) warn(`데이터 ${x.id}: 쓰는 곳(w)이 없다`);
    if (!arr(x.r).length) warn(`데이터 ${x.id}: 읽는 곳(r)이 없다`);
  });
  arr(DMAP.flow).forEach((s, i) => { if (s.o && !objs[s.o]) err(`한 줄 흐름 ${i + 1}: 없는 객체 ${s.o}`); arr(s.dm).forEach(id => { if (!did.has(id)) err(`한 줄 흐름 ${i + 1}: 없는 데이터 ${id}`); }); });
}
arr(B.screens).forEach((x, i) => { arr(x.els).forEach(id => { if (!eid.has(id)) err(`화면 ${i + 1}: 없는 상자 ${id}`); }); if (x.uc && !uid.has(x.uc)) err(`화면 ${i + 1}: 없는 유즈케이스 ${x.uc}`); });
arr(B.matrixRows).forEach(id => { if (!eid.has(id)) err(`matrixRows: 없는 상자 ${id}`); });
arr(B.arrange).forEach(col => arr(col).forEach(row => (Array.isArray(row) ? row : [row]).forEach(id => { if (!fid.has(id)) err(`arrange: 없는 창 ${id}`); })));
if (B.start && !fid.has(B.start)) err(`start: 없는 창 ${B.start}`);

warns.forEach(t => console.log('경고 ·', t));
errs.forEach(t => console.log('잘못 ·', t));
console.log(`창 ${frames.length} · 상자 ${els.length} · 관계 ${arr(B.relations).length} · 유즈케이스 ${arr(B.usecases).length} · 객체 ${Object.keys(objs).length} · 데이터 ${DMAP ? arr(DMAP.data).length : 0} — 잘못 ${errs.length} · 경고 ${warns.length}`);
process.exit(errs.length ? 1 : 0);
