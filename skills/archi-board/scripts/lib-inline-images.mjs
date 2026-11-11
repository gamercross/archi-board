// 보드 데이터 안의 사진 경로(png · jpg · webp · gif · svg)를 data: 주소로 바꾼다 — 한 파일에 넣을 때 쓴다
import fs from 'node:fs';
import path from 'node:path';
const MIME = {png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', gif: 'image/gif', svg: 'image/svg+xml'};
export function inlineImages(data, dir) {
  const st = {bytes: 0, n: 0}, root = path.resolve(dir) + path.sep;
  const out = data.replace(/(['"])((?!data:|https?:|\/\/)[^'"\n]+\.(png|jpe?g|webp|gif|svg))\1/gi, (m, q, rel, ext) => {
    const f = path.resolve(dir, rel);
    if (!f.startsWith(root) || !fs.existsSync(f)) return m; // 폴더 밖이거나 없는 파일은 그대로 둔다
    const buf = fs.readFileSync(f); st.bytes += buf.length; st.n++;
    return q + `data:${MIME[ext.toLowerCase()]};base64,${buf.toString('base64')}` + q;
  });
  if (st.bytes > 6 * 1024 * 1024) console.error(`경고: 사진 ${st.n}장이 ${(st.bytes / 1048576).toFixed(1)}MB — 너무 크면 아티팩트 · 메일에 안 올라간다. 줄여서(webp · 가로 1600px 안팎) 다시 묶는다`);
  return {data: out, n: st.n};
}
