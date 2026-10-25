#!/usr/bin/env node
// 묶은 보드(board.single.html · claude.ai 아티팩트에서 받은 HTML)에서 데이터만 꺼낸다 — 새 엔진으로 다시 묶거나 데이터를 고칠 때.
// 쓰는 법: node unpack.mjs <묶은 html> <나갈 폴더>  →  <나갈 폴더>/board-data.js
// 묶은 파일 머리의 주석(<!-- … -->)은 <나갈 폴더>/head.html에 따로 남긴다 — 다시 묶은 뒤 <title> 아래에 붙인다.
import fs from 'node:fs';
import path from 'node:path';
const [src, dir] = process.argv.slice(2);
if (!src || !dir) { console.error('쓰는 법: node unpack.mjs <묶은 html> <나갈 폴더>'); process.exit(2); }
const html = fs.readFileSync(src, 'utf8');
const scripts = [...html.matchAll(/<script>\n?([\s\S]*?)<\/script>/g)].map(m => m[1]);
const data = scripts.find(s => /window\.BOARD\s*=/.test(s));
if (!data) { console.error('window.BOARD가 든 <script>를 찾지 못했다 — archi-board로 묶은 파일이 아니다'); process.exit(1); }
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'board-data.js'), data.replace(/<\\\/script/gi, '</script').trimEnd() + '\n');
const head = (html.split(/<\/title>/)[1] || '').split(/<style>/)[0].match(/<!--[\s\S]*?-->/g) || [];
if (head.length) fs.writeFileSync(path.join(dir, 'head.html'), head.join('\n') + '\n');
console.log(`꺼냄: ${path.join(dir, 'board-data.js')}${head.length ? ` · 머리 주석 ${head.length}개는 head.html` : ''}`);
