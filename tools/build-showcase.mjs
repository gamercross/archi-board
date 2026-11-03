#!/usr/bin/env node
// 쇼케이스(루트 index.html)를 한 파일로 만든다 — 엔진 · 스타일 · 두 보드를 안에 넣어서 인터넷 없이도 열리고 아티팩트로도 올릴 수 있다.
// 원본: showcase/index.src.html + docs/board/board-data.js(스킬 아키텍처) + examples/memo/board-data.js(메모 앱) + engine/v1/
// 쓰는 법: node tools/build-showcase.mjs            → index.html을 새로 쓴다
//          node tools/build-showcase.mjs --check    → index.html이 원본과 같은지만 본다(다르면 1로 끝난다)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const guard = s => s.replace(/<\/script/gi, '<\\/script');   // 데이터나 엔진 안의 </script가 묶음을 끊지 않게
const BOARDS = { self: 'docs/board/board-data.js', memo: 'examples/memo/board-data.js' };

let html = read('showcase/index.src.html');
const put = (mark, text) => {
  if (html.split(mark).length !== 2) { console.error(`원본에 ${mark}가 정확히 하나여야 한다`); process.exit(2); }
  html = html.replace(mark, () => text);
};
put('<!--@CSS-->', `<style>\n${read('engine/v1/board.css')}\n</style>`);
// 보드마다 window를 가려서 board-data.js를 고치지 않고 그대로 담는다 — 고르는 것은 아래 로더가 한다
put('<!--@BOARDS-->', '<script>window.__B = {};</script>\n' + Object.entries(BOARDS).map(([k, f]) =>
  `<script>\n(function () { var window = {};\n${guard(read(f))}\n__B[${JSON.stringify(k)}] = window.BOARD; })();\n</script>`).join('\n'));
put('<!--@ENGINE-->', `<script>\n${guard(read('engine/v1/board.js'))}\n</script>`);
html = html.replace('<!doctype html>', '<!doctype html>\n<!-- 이 파일은 tools/build-showcase.mjs가 만든다 — 고치려면 showcase/index.src.html과 보드 데이터를 고치고 다시 만든다. -->');

const out = path.join(root, 'index.html');
if (process.argv.includes('--check')) {
  const now = fs.existsSync(out) ? fs.readFileSync(out, 'utf8') : '';
  if (now !== html) { console.error('index.html이 원본과 다르다 — node tools/build-showcase.mjs 로 다시 만든다'); process.exit(1); }
  console.log('index.html은 원본과 같다');
} else {
  fs.writeFileSync(out, html);
  console.log(`index.html: ${(Buffer.byteLength(html) / 1024).toFixed(0)}KB — 엔진 · 스타일 · 보드 ${Object.keys(BOARDS).length}개가 한 파일에 들어 있다`);
}
