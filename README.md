# 🎤 2026 ASE Voice 日月光集團好聲音 官方網站

![Banner](https://img.shields.io/badge/ASE-VOICE-FFC107?style=for-the-badge&logo=music)
![Version](https://img.shields.io/badge/Version-1.2.0-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-v4.2.1-06B6D4?style=for-the-badge&logo=tailwindcss)

本專案為「2026 年第五屆日月光集團歌唱比賽」的官方活動網站。網站採用 **React 19 + Vite 7 + Tailwind CSS v4** 架構開發，並融合極具視覺衝擊力的 Neo-Brutalism (新野獸主義) 設計風格。系統具備響應式網頁設計 (RWD)、繁中/英/越三語系自動偵測與切換功能，以及基於時間軸的報名狀態智能切換機制。

---

## 📂 專案目錄結構

本專案結構清晰，核心程式碼位於 `src/` 目錄中：

```text
2026_ASE_Voice/
├── .github/workflows/   # CI/CD 自動化部署設定
│   └── deploy.yml       # GitHub Actions 部署腳本
├── public/              # 靜態資源 (字型、PDF 簡章、演講縮圖等)
├── src/
│   ├── assets/          # 視覺資源 (圖片、SVG 標誌)
│   ├── components/      # 各模組 React 元件
│   │   ├── Navbar.jsx              # 導覽列與語系切換器
│   │   ├── Hero.jsx                # 首頁橫幅與即時倒數器（報名期主 Banner）
│   │   ├── FinalistBanner.jsx      # 7/8 起：決賽名單主 Banner
│   │   ├── FinalistCarousel.jsx    # 決賽名單卡片與輪播（華語/外語分組配色，可重用）
│   │   ├── FinalistShowcase.jsx    # 8/1 起：名單下移後的獨立展示區塊
│   │   ├── PredictionBanner.jsx    # 8/1 起：冠軍預測活動主 Banner
│   │   ├── PredictionTeaser.jsx    # 主 Banner 下方的預測活動宣傳/CTA 條
│   │   ├── LiveBanner.jsx          # 9/7 起：決賽直播倒數 + YouTube 直播嵌入主 Banner
│   │   ├── LiveTeaserStrip.jsx     # 9/11 直播預告條（嵌於名單/預測 Banner 內）
│   │   ├── AnnouncementBoard.jsx   # 最新賽事佈告欄
│   │   ├── InfoSection.jsx         # 比賽簡章、時程與獎金說明
│   │   ├── QASection.jsx           # 折疊式常見問題 (FAQ)
│   │   ├── PastHighlights.jsx     # 歷屆精彩賽事回顧影音
│   │   ├── RegistrationCountdown.jsx # 倒數計時元件
│   │   └── Footer.jsx              # 主辦與聯絡資訊
│   ├── config/          # 可調整的活動設定
│   │   ├── liveConfig.js           # 決賽直播 YouTube 網址（由 npm run set-live 改寫）
│   │   └── siteConfig.js           # 冠軍預測活動網址
│   ├── context/         # 全域狀態管理
│   │   └── LanguageContext.jsx     # 三語系切換核心邏輯與語系對照表 (700+ 行)
│   ├── data/            # 靜態資料
│   │   └── finalistsData.js        # 20 位決賽名單（由 npm run update-finalists 產生）
│   ├── utils/           # 工具函式
│   │   └── registrationUtils.js    # 報名/名單/預測/直播 全時間軸判斷邏輯
│   ├── App.css          # 應用程式基礎樣式
│   ├── App.jsx          # 頁面主入口、階段 Banner 切換與錨點滾動定位
│   ├── index.css        # 全域樣式與自訂 CSS 動畫
│   └── main.jsx         # React 渲染起點與全域 Provider 包裹
├── scripts/             # 一鍵維運腳本（零依賴，純 Node）
│   ├── update-finalists.mjs        # CSV → 決賽名單一鍵更新
│   └── set-live.mjs                # 一鍵設定直播 YouTube 連結
├── finalists.template.csv          # 決賽名單 CSV 範本
├── eslint.config.js     # ESLint 靜態代碼分析配置
├── package.json         # 專案套件及腳本定義
├── tailwind.config.js   # Tailwind CSS 輔助配置
├── vite.config.js       # Vite 建置配置
└── *.py                 # 翻譯輔助與資料處理 Python 腳本
```

---

## 🛠️ 技術堆疊與版本規範

本專案採用橫向跨平台前端主流技術建置，後續維護人員請務必遵循以下版本規範：

| 類別 | 技術/套件 | 版本 | 說明 |
| :--- | :--- | :--- | :--- |
| **核心框架** | React | `^19.2.0` | 提供優異的並行渲染效能。 |
| **渲染引擎** | React DOM | `^19.2.0` | 配合 React 19 進行 DOM 渲染。 |
| **開發建置** | Vite | `^7.3.1` | 閃電般的快速熱更新與 Rollup 打包。 |
| **樣式引擎** | Tailwind CSS | `^4.2.1` | 採用最新的 v4 版本，搭配 `@tailwindcss/postcss` 進行編譯。 |
| **動畫效果** | Framer Motion | `^12.35.1` | 驅動 Neo-Brutalism 風格的彈性物理動畫。 |
| **圖示庫** | Lucide React | `^0.577.0` | 提供一致且具現代感的向量圖示。 |
| **CI/CD** | GitHub Actions | (Node.js 20) | 自動建置並部署至 GitHub Pages。 |
| **翻譯工具** | Python | `3.x` | 輔助進行 Excel 及 PDF 語系翻譯對照。 |

---

## 🔄 維護與操作指引

後續接手的使用者在進行系統更新或例行維護時，請務必遵循以下操作指南：

### 1. 修改報名時間限制

報名的時間軸控制邏輯統一封裝在 `src/utils/registrationUtils.js` 中。系統會自動根據當前時間切換為以下三種狀態：
- `BEFORE`：未開放報名，前台顯示「6 月 1 號開放報名」並啟動倒數計時。
- `OPEN`：報名進行中，前台按鈕動態高亮「即刻報名」，點擊可引導至線上報名表單。
- `ENDED`：報名已截止，前台顯示「報名時間已過，敬請期待入圍名單」。

如需修改報名起迄時間，**請僅修改該檔案中的常數**，時間格式必須包含台灣時區 (`+08:00`)：

```javascript
// src/utils/registrationUtils.js
export const START_DATE = new Date('2026-06-01T00:00:00+08:00'); // 報名開始時間
export const END_DATE = new Date('2026-06-21T23:59:59+08:00');   // 報名截止時間
```

### 2. 管理與更新三語系內容 (繁中、英文、越南文)

本專案支援 **中文 (zh)**、**英文 (en)** 與 **越南文 (vi)**。
- **偵測邏輯**：首次載入時，`LanguageProvider` 會自動讀取瀏覽器語系 (`navigator.language`)。若包含 `zh` 則預設為中文，其餘皆預設為英文。使用者亦可手動透過導覽列切換語系。
- **語系檔路徑**：`src/context/LanguageContext.jsx`。
- **維護規範**：**嚴禁在任何 UI 元件中寫死 (Hardcode) 任何顯示文字**。所有文字必須以對應語系之鍵值 (Key) 定義於 `translations` 物件中，並在所有元件中透過 `useLanguage()` 取得 `t` 進行調用。
  ```javascript
  // 範例：在元件中調用翻譯文字
  const { t } = useLanguage();
  return <button>{t.nav.register}</button>;
  ```

### 3. 設計風格與樣式自訂 (Neo-Brutalism)

專案採用前衛的 Neo-Brutalism 風格，其視覺特徵與自訂樣式設定如下：
- **核心色調**：主要金色 (`#F5B841`)、警示紅色 (`#E32626`)、深色碳黑 (`#1A1A1A`)、溫和米色 (`#F6E9D8`)。
- **粗獷陰影**：定義於 `src/index.css` 與 `tailwind.config.js` 的 `shadow-brutal` (6 像素無模糊陰影) 與 `shadow-brutal-lg` (10 像素無模糊陰影)，此為塑造野獸主義風格的核心。
- **字型整合**：標題使用具視覺張力的 **Oswald**，內文使用易讀性高的 **Inter**，中文字元則採用 **Noto Sans TC**。
- **背景與效果**：
  - `.bg-halftone`：網點效果背景。
  - `.bg-sunburst`：放射狀光芒背景。
  - `.waveform-bar`：類比音波跳動 CSS 動畫。

### 4. 翻譯輔助與資料處理 Python 腳本

專案根目錄下附帶數個 Python 輔助腳本，用於加速大型表格的翻譯和越南文翻譯比對：
- `find_missing.py` / `parse_missing.py`：檢測 `語言對照.xlsx` 工作表中尚未翻譯成越南文的中文欄位。
- `update_excel.py` / `update_missing.py`：自動將預設的翻譯對照字典更新寫入本地的 Excel 對照表。
- `parse_pdf.py`：使用 `pdfplumber` 讀取並提取官方簡章 PDF 檔案中的越文內容，以利校對。

*備註：執行此類腳本前，請確保已安裝 pandas、openpyxl 以及 pdfplumber 等依賴庫。*

---

## 🎬 活動階段營運手冊

網站首頁主 Banner 會依「今天的日期」**自動**切換四個階段，完全不需要改程式碼或手動上線。你只需要在兩個時間點各下一條指令（更新名單、設定直播連結），其餘都是自動的。

### 📅 時間軸：什麼時候該做什麼

| 日期（台灣時間） | 網站會自動變成 | 你要做的事 | 指令 |
|---|---|---|---|
| ~ 6/21 報名期 | 報名主視覺 + 即時倒數 | 無 | — |
| **7/8 00:00** | **決賽名單 Banner**（華語/外語分組輪播），公佈欄與比賽時程中「已過去」的項目自動調暗 | **7/8 前**先把 20 位名單填進 `finalists.csv` 並更新上線 | `npm run update-finalists -- finalists.csv` |
| **8/1 00:00** | **冠軍預測活動 Banner**（整版），決賽名單自動下移為頁面中段的獨立區塊 | 無（預測活動網址已設定好，按鈕自動可點） | — |
| **9/7（決賽當週週一）00:00** | **決賽直播倒數 Banner**（Apple 發表會風格倒數） | **9/11 前**拿到正式直播連結後，設定上去 | `npm run set-live -- <YouTube網址>` |
| **9/11 14:30** | 倒數歸零，**自動換成 YouTube 直播播放器**（直播結束後自動變重播） | 無 | — |

> 每次下完指令後，記得 `git add -A && git commit && git push`；推上 `main` 後 GitHub Actions 會自動建置並部署到 `asevoice.org`（約 1~2 分鐘）。指令本身只更新本地檔案，**不會**自動 push。

---

### 步驟一：一鍵更新 20 位決賽名單（7/8 前）

1. 複製範本：把根目錄的 `finalists.template.csv` 另存為 `finalists.csv`。
2. 用 Excel 打開，填入正式名單。**六個欄位（順序不限、表頭中英皆可）**：
   | 欄位 | 說明 |
   |---|---|
   | 組別 | 填「華語組」或「外語組」（含「華/中」判為華語、含「外/越/英」判為外語） |
   | 員工姓名 | 中文或外文全名皆可，長名不會被截斷 |
   | 員工工號 | 顯示於卡片上（如 `No.0068001`） |
   | 廠區 | **必須是以下四個之一**：日月光高雄廠、日月光中壢廠、矽品精密、環鴻科技。填其他值腳本會報錯（常見簡寫如「中壢廠」「矽品」會自動轉為正名） |
   | 歌名 | 決賽演唱曲目 |
   | 原唱歌手 | 該曲原唱 |

   **多語系顯示規則**：
   - **廠區**會隨網站語系自動翻譯（中：日月光高雄廠 → 英：ASE Kaohsiung → 越：ASE Cao Hùng），對照表在 `src/context/LanguageContext.jsx` 各語言的 `factories` 區塊；若未來廠區名稱有異動，需同步更新 zh/en/vi 三處。
   - **員工工號、員工姓名、歌名、原唱歌手**一律依 CSV 原文顯示、**不做翻譯**——請直接填入最終要呈現在網站上的文字。
3. **存檔為 CSV**：Excel →「另存新檔」→ 檔案類型選 **「CSV UTF-8（逗號分隔）」**（務必選 UTF-8，否則中文/越南文會變亂碼）。
4. 執行一鍵更新：
   ```bash
   npm run update-finalists -- finalists.csv
   ```
   - 腳本會驗證「華語 10 位 + 外語 10 位」，並在終端列出完整名單供你核對。
   - 只想先看解析結果、**不寫檔**：加 `--dry-run`。
   - 數量不是 10+10 但你確定要用：加 `--force`。
5. `npm run dev` 於瀏覽器核對畫面 → 沒問題就 commit + push。

---

### 步驟二：一鍵設定決賽直播連結（9/11 前）

1. 事先在 YouTube 建立直播（排程或開台皆可），取得直播網址。**支援任一種格式**：
   `https://www.youtube.com/live/xxxx`、`https://youtu.be/xxxx`、`https://www.youtube.com/watch?v=xxxx`
2. 執行一鍵設定：
   ```bash
   npm run set-live -- https://www.youtube.com/live/你的直播ID
   ```
   - 腳本會自動解析出影片 ID 並寫入 `src/config/liveConfig.js`。
   - 只想先驗證網址、不寫檔：加 `--dry-run`。
3. 用 `?preview=onair` 預覽播放器（見下方預覽章節）確認能正常播放 → commit + push。

> 直播當天什麼都不用做：9/11 14:30 一到，倒數 Banner 會自動換成 YouTube 播放器；直播結束後同一連結會自動變成完整重播。

---

### 🔍 上線前預覽：先看到未來畫面再放心上線

所有階段畫面都能在**還沒到日期前**先預覽，dev 環境與正式站皆適用。有兩種方式：

**方式 A：`?preview=` 快捷（跳到某個階段，並連動模擬該階段起始日期 — 時程調暗、按鈕顯隱等時間邏輯會一起變化）**

| 網址 | 看到的畫面 |
|---|---|
| `http://localhost:5173/?preview=finalist` | 決賽名單 Banner |
| `http://localhost:5173/?preview=prediction` | 冠軍預測活動 Banner + 名單下移區塊 |
| `http://localhost:5173/?preview=live` | 決賽直播倒數 Banner |
| `http://localhost:5173/?preview=onair` | 直播播放器（測試 YouTube 嵌入是否正常） |

**方式 B：`?mockdate=` 模擬某一天（連帶時程調暗、預測 CTA 等時間邏輯全部一起模擬，最接近真實情境）**

| 網址 | 模擬情境 |
|---|---|
| `http://localhost:5173/?mockdate=2026-07-08` | 7/8 名單公佈日：決賽名單 + 前兩項時程調暗（「公告決賽名單」當天保持亮起，7/9 起才調暗） |
| `http://localhost:5173/?mockdate=2026-08-02` | 8/1 後：整版預測 Banner + CTA 可點 + 名單下移 |
| `http://localhost:5173/?mockdate=2026-09-08` | 9/7 後：直播倒數計時 |
| `http://localhost:5173/?mockdate=2026-09-11T15:00` | 直播已開始：YouTube 播放器 |

> `mockdate` 可只寫日期（`2026-09-11`）或含時間（`2026-09-11T15:00`），一律以台灣時間（UTC+8）解讀。正式站也能用：`https://asevoice.org/?mockdate=2026-09-08`。移除網址參數即回到真實當前時間。

---

## 💻 開發與部署流程

### 本地開發步驟

```bash
# 1. 確保已安裝 Node.js (建議版本 20+)
node -v

# 2. 安裝專案相依套件
npm install

# 3. 啟動 Vite 本地開發伺服器 (預設運行於 http://localhost:5173)
npm run dev

# 4. 執行 ESLint 靜態代碼檢查
npm run lint

# 5. 建置正式生產發佈包
npm run build

# 6. 本地預覽生產環境建置產物
npm run preview
```

### 自動化部署架構 (CI/CD)

本專案使用 GitHub Actions 實現完全自動化的 CI/CD 流程：
1. **設定檔路徑**：`.github/workflows/deploy.yml`。
2. **觸發機制**：當程式碼推送 (Push) 至 `main` 分支，或在 GitHub Actions 頁面手動觸發時，即會啟動工作流。
3. **建置環境**：在 `ubuntu-latest` 容器中安裝 Node.js 20 進行 `npm run build`。
4. **自訂網域配置**：因本專案部署於專屬自訂網域 `asevoice.org`，因此 `vite.config.js` 中的 `base` 設為 `'/'`。若後續需改部署至 GitHub 預設網域 (例如 `username.github.io/repo/`)，則必須修改 `base` 為該倉庫路徑。
5. **部署目的地**：自動將打包後的 `./dist` 資料夾發佈至 GitHub Pages。

---

© 2026 日月光集團聯合職工福利委員會 & 日月光文教基金會. All rights reserved.
