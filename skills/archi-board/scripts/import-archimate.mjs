#!/usr/bin/env node
// archi-board 가져오기 — ArchiMate Open Exchange 파일(.xml)을 board-data.js로 바꾼다. 브라우저 없이 돈다.
// 쓰는 법: node import-archimate.mjs <model.xml> <out board-data.js>
// export.mjs가 만든 파일이면 앞뒷면 · 판단 차트 · 근거 · 이야기까지 그대로 돌아온다(archi-board.extra).
// 다른 도구가 만든 파일이면 상자와 선만 오고, 창은 층마다 하나씩 만든다 — 나머지는 reading-code.md 순서로 AI가 채운다.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const [xmlFile, outFile] = process.argv.slice(2);
if (!xmlFile || !outFile) { console.error('쓰는 법: node import-archimate.mjs <model.xml> <out board-data.js>'); process.exit(2); }

const eng = fs.readFileSync(path.resolve(here, '../../../engine/v1/board.js'), 'utf8');
const model = vm.runInNewContext(eng.match(/\/\*MODEL-START\*\/([\s\S]*?)\/\*MODEL-END\*\//)[1] + '\n;({TYPES, RELS})');
const T2K = {}; Object.entries(model.TYPES).forEach(([k, v]) => { T2K[v[1].replace(/ /g, '')] = k; });
const R2K = {}; Object.entries(model.RELS).forEach(([k, v]) => { R2K[v[1]] = k; });
const LAYER = { mot: '동기', str: '전략', bus: '업무', app: '프로그램', tec: '기술', imp: '이행' };

const xml = fs.readFileSync(xmlFile, 'utf8');
const un = s => s.replace(/&(lt|gt|quot|apos|amp);/g, (_, c) => ({ lt: '<', gt: '>', quot: '"', apos: "'", amp: '&' }[c]));
const tag = (s, t) => { const m = s.match(new RegExp(`<${t}(?:\\s[^>]*)?>([\\s\\S]*?)</${t}>`)); return m ? un(m[1].trim()) : ''; };
const pdefs = {};
[...xml.matchAll(/<propertyDefinition\s+identifier="([^"]+)"[^>]*>\s*<name[^>]*>([\s\S]*?)<\/name>/g)].forEach(m => { pdefs[m[1]] = un(m[2].trim()); });
const propsOf = s => { const o = {}; [...s.matchAll(/<property\s+propertyDefinitionRef="([^"]+)"[^>]*>\s*<value[^>]*>([\s\S]*?)<\/value>/g)].forEach(m => { o[pdefs[m[1]]] = un(m[2]); }); return o; };

const idMap = {}, taken = new Set();
const mk = raw => { let b = String(raw).replace(/^id-/, '').replace(/[^A-Za-z0-9_]/g, '_') || 'x', id = b, i = 2; while (taken.has(id)) id = `${b}_${i++}`; taken.add(id); return id; };

const elements = [];
[...xml.matchAll(/<element\s+identifier="([^"]+)"[^>]*xsi:type="([^"]+)"[^>]*>([\s\S]*?)<\/element>/g)].forEach(m => {
  const k = T2K[m[2]];
  if (!k) { console.error(`건너뜀: 모르는 종류 ${m[2]} (${m[1]})`); return; }
  const id = mk(m[1]); idMap[m[1]] = id;
  const p = propsOf(m[3]);
  const e = { f: p['archi-board.frame'] || 'imp_' + model.TYPES[k][2], id, t: k, n: tag(m[3], 'name') || id };
  const d = tag(m[3], 'documentation'); if (d) e.d = d;
  if (p['archi-board.status']) e.s = p['archi-board.status'];
  if (p['archi-board.code']) e.c = p['archi-board.code'];
  if (p['archi-board.fields']) { try { Object.assign(e, JSON.parse(p['archi-board.fields'])); } catch (err) { console.error(`상자 ${id}의 archi-board.fields를 읽지 못했다`); } }
  elements.push(e);
});
const relations = [];
[...xml.matchAll(/<relationship\s+identifier="[^"]+"\s+source="([^"]+)"\s+target="([^"]+)"[^>]*xsi:type="([^"]+)"/g)].forEach(m => {
  if (idMap[m[1]] && idMap[m[2]] && R2K[m[3]]) relations.push([idMap[m[1]], idMap[m[2]], R2K[m[3]]]);
});

const modelProps = propsOf(xml.slice(0, xml.indexOf('<elements')));
let B = { format: 1, title: tag(xml.slice(0, xml.indexOf('<elements')), 'name') || '가져온 보드' };
if (modelProps['archi-board.extra']) {
  try { B = { ...B, ...JSON.parse(modelProps['archi-board.extra']) }; } catch (e) { console.error('archi-board.extra를 읽지 못했다:', e.message); }
}
if (!B.frames) {
  const layers = [...new Set(elements.map(e => e.f))];
  B.frames = layers.map(f => ({ id: f, title: LAYER[f.replace('imp_', '')] || f, kicker: '가져온 상자', weight: 3, w: 1100, layout: 'rows' }));
  B.sub = '다른 도구에서 가져온 보드 — 설명 · 이야기 · 판단 차트는 아직 없다';
}
B.elements = elements; B.relations = relations;
fs.writeFileSync(outFile, '// archi-board import-archimate로 만든 파일 — 점검: node check.mjs <이 파일>\nwindow.BOARD = ' + JSON.stringify(B, null, 1) + ';\n');
console.log(`가져옴: 상자 ${elements.length} · 선 ${relations.length} → ${outFile}`);
