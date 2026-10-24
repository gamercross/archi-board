#!/usr/bin/env node
// 엔진과 데이터를 한 HTML에 넣어 묶는다 — 인터넷 없이 열거나 claude.ai 아티팩트로 올릴 때. 묶은 파일은 자동 업데이트되지 않는다.
// 쓰는 법: node inline.mjs <보드 폴더> [나갈 파일]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const dir = process.argv[2];
if (!dir) { console.error('쓰는 법: node inline.mjs <보드 폴더> [나갈 파일]'); process.exit(2); }
const out = process.argv[3] || path.join(dir, 'board.single.html');
const eng = path.resolve(here, '../../../engine/v1');
const read = f => fs.readFileSync(f, 'utf8');
const data = read(path.join(dir, 'board-data.js'));
const title = (data.match(/["']?title["']?\s*:\s*['"]([^'"]+)['"]/) || [])[1] || 'archi-board';  // JS 칸 이름 · JSON 둘 다
const guard = s => s.replace(/<\/script/gi, '<\\/script');
// 폴더에 head.html(unpack.mjs가 남긴 머리 주석)이 있으면 <title> 아래에 그대로 붙인다
const headFile = path.join(dir, 'head.html');
const head = fs.existsSync(headFile) ? read(headFile).trimEnd() + '\n' : '';
const html = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title.replace(/[<&]/g, '')}</title>
${head}<style>
${read(path.join(eng, 'board.css'))}
</style>
</head>
<body>
<script>
${guard(data)}
</script>
<script>
${guard(read(path.join(eng, 'board.js')))}
</script>
</body>
</html>
`;
fs.writeFileSync(out, html);
console.log(`묶음: ${out} (${(html.length / 1024).toFixed(0)}KB) — 엔진이 새로 나오면 다시 묶는다`);
