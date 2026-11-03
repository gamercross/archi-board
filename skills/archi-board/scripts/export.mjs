#!/usr/bin/env node
// archi-board 내보내기 — board-data.js를 다른 도구가 읽는 형식으로 바꾼다. 브라우저 없이 돈다.
// 쓰는 법: node export.mjs <board-data.js> --mermaid <out.md>      Mermaid 구조 · 순서 그림 (GitHub · 마크다운에서 바로 보인다)
//          node export.mjs <board-data.js> --archimate <out.xml>   ArchiMate Open Exchange 파일 (Archi 등에서 연다)
// 둘을 함께 줘도 된다. 대응이 없는 칸(앞뒷면 · 판단 차트 · 근거 · 이야기)은 버리지 않고
// ArchiMate 파일 안 속성(archi-board.extra)에 그대로 담는다 — import-archimate.mjs가 되돌린다.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const [dataFile, ...rest] = process.argv.slice(2);
const opt = k => { const i = rest.indexOf(k); return i >= 0 ? rest[i + 1] : null; };
const outMd = opt('--mermaid'), outXml = opt('--archimate');
if (!dataFile || (!outMd && !outXml)) { console.error('쓰는 법: node export.mjs <board-data.js> [--mermaid out.md] [--archimate out.xml]'); process.exit(2); }

const eng = fs.readFileSync(path.resolve(here, '../../../engine/v1/board.js'), 'utf8');
const mm = eng.match(/\/\*MODEL-START\*\/([\s\S]*?)\/\*MODEL-END\*\//);
const model = vm.runInNewContext(mm[1] + '\n;({TYPES, RELS})');
const win = {};
vm.runInNewContext(fs.readFileSync(dataFile, 'utf8'), { window: win }, { filename: dataFile });
const B = win.BOARD;
if (!B) { console.error('window.BOARD가 없다'); process.exit(1); }

const arr = v => (Array.isArray(v) ? v : []);
const els = arr(B.elements).map(x => Array.isArray(x) ? { f: x[0], id: x[1], t: x[2], n: x[3], d: x[4], s: x[5], c: x[6], ...(x[7] || {}) } : x);
const rels = arr(B.relations).map(r => Array.isArray(r) ? { a: r[0], b: r[1], k: r[2] } : r);
const frameTitle = id => (arr(B.frames).find(f => f.id === id) || {}).title || id;
const seen = new Set(els.map(e => e.id));

/* ───────── Mermaid ───────── */
const mid = id => 'n_' + String(id).replace(/[^A-Za-z0-9_]/g, '_');
const q = s => '"' + String(s == null ? '' : s).replace(/"/g, '＂').replace(/[\r\n]+/g, ' ') + '"';
const ARROW = { realization: '-.->', serving: '-->', assignment: '-->', access: '-.->', flow: '==>', triggering: '-->', influence: '-.->', composition: '---', aggregation: '---', association: '---' };

function mermaid() {
  const out = [`# ${B.title || 'archi-board'}`, '', B.sub ? `${B.sub}\n` : '', '> archi-board의 board-data.js에서 뽑은 그림. 원본은 board-data.js다.', ''];
  const byFrame = {};
  els.forEach(e => (byFrame[e.f] = byFrame[e.f] || []).push(e));
  const edges = rels.filter(r => seen.has(r.a) && seen.has(r.b));
  out.push('## 구조', '', '```mermaid', 'flowchart LR');
  Object.entries(byFrame).forEach(([f, list]) => {
    out.push(`  subgraph sg_${mid(f)}[${q(frameTitle(f))}]`);
    list.forEach(e => out.push(`    ${mid(e.id)}[${q(e.n)}]`));
    out.push('  end');
  });
  edges.forEach(r => out.push(`  ${mid(r.a)} ${ARROW[r.k] || '-->'}|${(model.RELS[r.k] || [r.k])[0]}| ${mid(r.b)}`));
  out.push('```', '');
  arr(B.usecases).filter(u => arr(u.steps).length).forEach(u => {
    const lanes = B.lanes || {}, used = [];
    const nm = k => (lanes[k] ? lanes[k][0] : k);
    arr(u.steps).forEach(s => { [s[0], s[1]].forEach(k => { if (!used.includes(k)) used.push(k); }); });
    out.push(`## 순서 — ${u.t || u.id}`, '', '```mermaid', 'sequenceDiagram');
    used.forEach(k => out.push(`  participant ${mid(k)} as ${nm(k).replace(/[;#]/g, ' ')}`));
    arr(u.steps).forEach((s, i) => {
      const o = s[4] || {}, label = `${i + 1}. ${[s[2], s[3]].filter(Boolean).join(' · ')}`.replace(/[;#]/g, ' ');
      if (o.alt) out.push(`  Note over ${mid(s[0])}: ${String(o.alt).replace(/[;#]/g, ' ')}`);
      out.push(`  ${mid(s[0])}${o.r ? '-->>' : '->>'}${mid(s[1])}: ${label}`);
    });
    out.push('```', '');
  });
  return out.join('\n');
}

/* ───────── ArchiMate Open Exchange ───────── */
const xe = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const xid = id => 'id-' + String(id).replace(/[^A-Za-z0-9_.-]/g, '_');
const XT = t => model.TYPES[t][1].replace(/ /g, '');
const PROPS = [['frame', 'archi-board.frame'], ['status', 'archi-board.status'], ['code', 'archi-board.code']];
const EXTRA_SKIP = ['elements', 'relations'];

function archimate() {
  const extra = {};
  Object.keys(B).forEach(k => { if (!EXTRA_SKIP.includes(k)) extra[k] = B[k]; });
  const pd = [...PROPS.map(([, n]) => n), 'archi-board.extra', 'archi-board.fields'];
  const pref = n => 'propid-' + (pd.indexOf(n) + 1);
  const prop = (n, v) => `<property propertyDefinitionRef="${pref(n)}"><value xml:lang="ko">${xe(v)}</value></property>`;
  const o = ['<?xml version="1.0" encoding="UTF-8"?>',
    '<model xmlns="http://www.opengroup.org/xsd/archimate/3.0/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengroup.org/xsd/archimate/3.0/ http://www.opengroup.org/xsd/archimate/3.1/archimate3_Model.xsd" identifier="id-board">',
    `  <name xml:lang="ko">${xe(B.title || 'archi-board')}</name>`,
    '  <properties>', `    ${prop('archi-board.extra', JSON.stringify(extra))}`, '  </properties>',
    '  <elements>'];
  els.forEach(e => {
    o.push(`    <element identifier="${xid(e.id)}" xsi:type="${XT(e.t)}">`, `      <name xml:lang="ko">${xe(e.n)}</name>`);
    if (e.d) o.push(`      <documentation xml:lang="ko">${xe(e.d)}</documentation>`);
    const more = {}; Object.keys(e).forEach(k => { if (!['f', 'id', 't', 'n', 'd', 's', 'c'].includes(k)) more[k] = e[k]; });
    const ps = [['archi-board.frame', e.f], ['archi-board.status', e.s], ['archi-board.code', e.c], ['archi-board.fields', Object.keys(more).length ? JSON.stringify(more) : '']].filter(([, v]) => v);
    if (ps.length) o.push('      <properties>', ...ps.map(([n, v]) => `        ${prop(n, v)}`), '      </properties>');
    o.push('    </element>');
  });
  o.push('  </elements>', '  <relationships>');
  rels.filter(r => seen.has(r.a) && seen.has(r.b) && model.RELS[r.k]).forEach((r, i) =>
    o.push(`    <relationship identifier="id-rel-${i + 1}" source="${xid(r.a)}" target="${xid(r.b)}" xsi:type="${model.RELS[r.k][1]}"/>`));
  o.push('  </relationships>', '  <propertyDefinitions>');
  pd.forEach((n, i) => o.push(`    <propertyDefinition identifier="propid-${i + 1}" type="string"><name>${n}</name></propertyDefinition>`));
  o.push('  </propertyDefinitions>', '</model>', '');
  return o.join('\n');
}

if (outMd) { fs.writeFileSync(outMd, mermaid()); console.log(`Mermaid → ${outMd}`); }
if (outXml) { fs.writeFileSync(outXml, archimate()); console.log(`ArchiMate → ${outXml}`); }
