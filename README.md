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
│   │   ├── Hero.jsx                # 首頁橫幅與即時倒數器
│   │   ├── AnnouncementBoard.jsx   # 最新賽事佈告欄
│   │   ├── InfoSection.jsx         # 比賽簡章、時程與獎金說明
│   │   ├── QASection.jsx           # 折疊式常見問題 (FAQ)
│   │   ├── PastHighlights.jsx     # 歷屆精彩賽事回顧影音
│   │   ├── RegistrationCountdown.jsx # 倒數計時元件
│   │   └── Footer.jsx              # 主辦與聯絡資訊
│   ├── context/         # 全域狀態管理
│   │   └── LanguageContext.jsx     # 三語系切換核心邏輯與語系對照表 (700+ 行)
│   ├── utils/           # 工具函式
│   │   └── registrationUtils.js    # 報名時間判斷邏輯
│   ├── App.css          # 應用程式基礎樣式
│   ├── App.jsx          # 頁面主入口與錨點滾動定位
│   ├── index.css        # 全域樣式與自訂 CSS 動畫
│   └── main.jsx         # React 渲染起點與全域 Provider 包裹
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
