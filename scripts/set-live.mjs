#!/usr/bin/env node
// 一鍵設定決賽直播連結:驗證 YouTube 網址 → 寫入 src/config/liveConfig.js
//
// 用法:
//   npm run set-live -- https://www.youtube.com/live/qKuuNlCPDYw
//   npm run set-live -- https://youtu.be/xxxxxxxxxxx
//   npm run set-live -- --dry-run https://www.youtube.com/watch?v=xxxx   （只驗證,不寫檔）

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUTPUT = path.join(ROOT, 'src/config/liveConfig.js');

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const url = args.find((a) => !a.startsWith('--'));

function fail(msg) {
  console.error(`\n❌ ${msg}\n`);
  process.exit(1);
}

if (!url) {
  fail('請提供 YouTube 直播網址。例如:npm run set-live -- https://www.youtube.com/live/qKuuNlCPDYw');
}

// 與 src/utils/registrationUtils.js 的 getYouTubeVideoId 同一套解析邏輯
function getYouTubeVideoId(u) {
  const match = u.match(
    /(?:youtube\.com\/(?:live|embed|shorts)\/|youtu\.be\/|youtube\.com\/watch\?(?:.*&)?v=)([A-Za-z0-9_-]{6,})/
  );
  return match ? match[1] : null;
}

const videoId = getYouTubeVideoId(url);
if (!videoId) {
  fail(
    `無法從此網址解析出 YouTube 影片 ID:\n  ${url}\n` +
    `支援格式:https://www.youtube.com/live/xxxx、https://youtu.be/xxxx、https://www.youtube.com/watch?v=xxxx`
  );
}

console.log(`\n✅ 解析成功`);
console.log(`   直播網址:${url}`);
console.log(`   影片 ID :${videoId}`);
console.log(`   嵌入網址:https://www.youtube.com/embed/${videoId}`);

if (DRY_RUN) {
  console.log('\n🔍 --dry-run:未寫入檔案。\n');
  process.exit(0);
}

const fileContent =
`// 決賽直播的 YouTube 網址。
// 更新方式(擇一):
//   1. 執行 \`npm run set-live -- <YouTube網址>\`(推薦,會自動驗證並改寫此檔)
//   2. 直接把下面的網址換成正式直播連結
// 支援格式:https://www.youtube.com/live/xxxx、https://youtu.be/xxxx、https://www.youtube.com/watch?v=xxxx
// 最後更新:${new Date().toISOString()}
export const LIVE_VIDEO_URL = '${url.replace(/'/g, "\\'")}';
`;

fs.writeFileSync(OUTPUT, fileContent, 'utf8');
console.log(`\n✅ 已更新 ${path.relative(ROOT, OUTPUT)}`);
console.log('👉 下一步:npm run dev 用 ?preview=onair 預覽直播畫面,確認可播放後 git commit + git push 即自動部署。\n');
