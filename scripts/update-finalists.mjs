#!/usr/bin/env node
// 一鍵更新決賽名單:讀取 CSV → 產生 src/data/finalistsData.js
//
// 用法:
//   npm run update-finalists -- finalists.csv
//   npm run update-finalists -- finalists.csv --dry-run   （只預覽,不寫檔）
//   npm run update-finalists -- finalists.csv --force      （即使不是 10+10 也強制寫入）
//
// CSV 欄位（表頭中英皆可，順序不限）:
//   組別 / group、員工姓名 / name、員工工號 / employeeId、廠區 / factory、歌名 / songName、原唱歌手 / originalArtist
// 組別欄位含「華」「中」「Chinese」→ 華語組;含「外」「Foreign」「越」「英」→ 外語組。
// 廠區欄位僅接受四個正名:日月光高雄廠、日月光中壢廠、矽品精密、環鴻科技(常見簡寫會自動轉為正名,其餘報錯)。

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUTPUT = path.join(ROOT, 'src/data/finalistsData.js');

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const csvPath = args.find((a) => !a.startsWith('--'));
const DRY_RUN = flags.has('--dry-run');
const FORCE = flags.has('--force');

function fail(msg) {
  console.error(`\n❌ ${msg}\n`);
  process.exit(1);
}

if (!csvPath) {
  fail('請指定 CSV 檔案路徑。例如:npm run update-finalists -- finalists.csv');
}
const absCsv = path.resolve(ROOT, csvPath);
if (!fs.existsSync(absCsv)) {
  fail(`找不到檔案:${absCsv}`);
}

// --- 極簡 CSV 解析(支援雙引號欄位、逗號、跳脫的 "") ---
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field); field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.some((v) => v.trim() !== '')) rows.push(row);
      row = [];
    } else field += c;
  }
  if (field !== '' || row.length) {
    row.push(field);
    if (row.some((v) => v.trim() !== '')) rows.push(row);
  }
  return rows;
}

// 表頭別名對照
const HEADER_MAP = {
  group: ['組別', '分組', 'group', '組'],
  name: ['員工姓名', '姓名', '選手姓名', 'name'],
  employeeId: ['員工工號', '工號', '員編', 'employeeid', 'employee_id', 'id'],
  factory: ['廠區', '廠別', 'factory'],
  songName: ['歌名', '歌曲名稱', '曲目', 'songname', 'song', 'song_name'],
  originalArtist: ['原唱歌手', '原唱', '歌手', 'originalartist', 'artist', 'original_artist']
};

function resolveHeaders(headerRow) {
  const norm = headerRow.map((h) => h.replace(/^﻿/, '').trim().toLowerCase());
  const idx = {};
  for (const [key, aliases] of Object.entries(HEADER_MAP)) {
    idx[key] = norm.findIndex((h) => aliases.some((a) => h === a.toLowerCase()));
  }
  const missing = Object.entries(idx).filter(([, v]) => v === -1).map(([k]) => k);
  if (missing.length) {
    fail(`CSV 表頭缺少欄位:${missing.join(', ')}\n請確認第一列表頭包含:組別、員工姓名、員工工號、廠區、歌名、原唱歌手`);
  }
  return idx;
}

function classifyGroup(raw) {
  const v = (raw || '').trim();
  if (/華|中文|chinese|國語|台語/i.test(v)) return 'chinese';
  if (/外|foreign|越|英|international|其他/i.test(v)) return 'foreign';
  return null;
}

// 廠區只有四個正名(顯示時由 LanguageContext.jsx 的 factories 依語系翻譯)。
// 常見簡寫自動轉為正名,其餘一律報錯,避免打錯字或新增不存在的廠區。
const FACTORY_CANONICAL = ['日月光高雄廠', '日月光中壢廠', '矽品精密', '環鴻科技'];
const FACTORY_ALIASES = [
  [/^(日月光)?(高雄廠?|楠梓.{0,2}廠)$/, '日月光高雄廠'],
  [/^(日月光)?中壢廠?$/, '日月光中壢廠'],
  [/^矽品(精密)?$/, '矽品精密'],
  [/^環鴻(科技)?$/, '環鴻科技']
];

function normalizeFactory(raw) {
  const v = (raw || '').trim();
  if (FACTORY_CANONICAL.includes(v)) return v;
  const hit = FACTORY_ALIASES.find(([re]) => re.test(v));
  return hit ? hit[1] : null;
}

const raw = fs.readFileSync(absCsv, 'utf8');
const rows = parseCsv(raw);
if (rows.length < 2) fail('CSV 內容為空或只有表頭。');

const idx = resolveHeaders(rows[0]);
const chinese = [];
const foreign = [];
const problems = [];

rows.slice(1).forEach((cols, i) => {
  const lineNo = i + 2;
  const get = (key) => (cols[idx[key]] ?? '').trim();
  const group = classifyGroup(get('group'));
  const name = get('name');
  const employeeId = get('employeeId');
  const factory = normalizeFactory(get('factory'));
  const songName = get('songName');
  const originalArtist = get('originalArtist');

  if (!name) { problems.push(`第 ${lineNo} 列:缺少員工姓名`); return; }
  if (!group) { problems.push(`第 ${lineNo} 列(${name}):無法判斷組別「${get('group')}」`); return; }
  if (!factory) { problems.push(`第 ${lineNo} 列(${name}):廠區「${get('factory')}」不在允許清單,只能是:${FACTORY_CANONICAL.join('、')}`); return; }

  const record = { name, employeeId, factory, songName, originalArtist };
  (group === 'chinese' ? chinese : foreign).push(record);
});

if (problems.length) {
  fail(`CSV 有 ${problems.length} 筆資料問題:\n  - ${problems.join('\n  - ')}`);
}

// 指派連續 id(華語 1-10、外語接續),同時輸出
const withIds = (arr, startId) => arr.map((r, i) => ({ id: startId + i, ...r }));
const chineseGroup = withIds(chinese, 1);
const foreignGroup = withIds(foreign, chinese.length + 1);

// 數量檢查
const countOk = chinese.length === 10 && foreign.length === 10;
if (!countOk && !FORCE) {
  fail(
    `名單數量不符預期(華語組 ${chinese.length} 位、外語組 ${foreign.length} 位,應各為 10 位)。\n` +
    `若確定要用目前數量,請加上 --force 參數。`
  );
}

// --- 產生 finalistsData.js ---
const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const toLine = (r) =>
  `  { id: ${r.id}, name: "${esc(r.name)}", employeeId: "${esc(r.employeeId)}", factory: "${esc(r.factory)}", songName: "${esc(r.songName)}", originalArtist: "${esc(r.originalArtist)}" }`;

const fileContent =
`// 此檔案由 \`npm run update-finalists -- <csv檔>\` 自動產生,也可手動編輯。
// 欄位:id(流水號)、name(員工姓名)、employeeId(員工工號)、factory(廠區)、songName(歌名)、originalArtist(原唱歌手)
// 最後更新:${new Date().toISOString()}
export const chineseGroup = [
${chineseGroup.map(toLine).join(',\n')}
];

export const foreignGroup = [
${foreignGroup.map(toLine).join(',\n')}
];
`;

// --- 輸出總表供核對 ---
function printTable(title, arr) {
  console.log(`\n【${title}】共 ${arr.length} 位`);
  arr.forEach((r) => {
    console.log(`  ${String(r.id).padStart(2, ' ')}. ${r.name}  (No.${r.employeeId})  ${r.factory}  ♪ ${r.songName} - ${r.originalArtist}`);
  });
}

printTable('華語組', chineseGroup);
printTable('外語組', foreignGroup);

if (DRY_RUN) {
  console.log('\n🔍 --dry-run:未寫入檔案。以上為解析結果預覽。\n');
  process.exit(0);
}

fs.writeFileSync(OUTPUT, fileContent, 'utf8');
console.log(`\n✅ 已更新 ${path.relative(ROOT, OUTPUT)}(華語 ${chinese.length} 位、外語 ${foreign.length} 位)`);
console.log('👉 下一步:npm run dev 於瀏覽器核對畫面,確認無誤後 git commit + git push 即自動部署。\n');
