# 2026 ASE Voice 日月光集團好聲音 官方網站

本專案為「2026 年首次全國性日月光集團歌唱比賽」的官方活動網站，以 React + Vite + Tailwind CSS v4 開發，具備完整的 RWD（手機/電腦皆完美呈現）與中英雙語系自動偵測切換功能。

## 📋 Tech Stack

| 分類       | 工具                          |
| ---------- | ----------------------------- |
| 框架       | React 19                      |
| 建置工具   | Vite 7                        |
| 樣式       | Tailwind CSS v4               |
| 動畫       | Framer Motion                 |
| 圖示       | Lucide React                  |
| 部署       | GitHub Pages (GitHub Actions) |

---

## 🚀 本地開發

```bash
# 1. 安裝套件
npm install

# 2. 啟動開發伺服器
npm run dev

# 3. 建置正式版（選用）
npm run build

# 4. 預覽正式版（選用）
npm run preview
```

---

## 🔄 GitHub Actions 自動部署 (CI/CD)

本專案使用 **GitHub 官方推薦**的 Pages 部署方式（位於 `.github/workflows/deploy.yml`），具備以下特色：

- ✅ 使用 `actions/deploy-pages@v4` 官方 Action（更安全、更穩定）
- ✅ 支援手動觸發部署（`workflow_dispatch`）
- ✅ 並行部署保護（新部署會自動取消舊的進行中部署）
- ✅ Build 與 Deploy 拆分為獨立 Job，清晰可追蹤

### 自動部署流程：

1. 將變更 Push 到 GitHub 的 `main` 分支
2. GitHub Actions 自動觸發 `Deploy to GitHub Pages` 工作流程
3. 系統自動安裝套件並執行 `npm run build`
4. 建置產物自動上傳至 GitHub Pages

### 首次啟用 GitHub Pages：

1. 前往本專案的 GitHub 頁面，點選 **Settings** > 左側 **Pages**
2. 在 **Build and deployment** 區塊中：
   - **Source** 選擇 `GitHub Actions`（⚠️ 注意：不是選  `Deploy from a branch`）
3. 回到 **Actions** 分頁，手動觸發一次工作流程或 Push 一次程式碼
4. 等待約 1~2 分鐘，網站即自動上線！✨

### 手動觸發部署：

如需手動部署（不需要 Push 程式碼），可以：
1. 前往 GitHub 頁面 > **Actions** 分頁
2. 左側選擇 **Deploy to GitHub Pages**
3. 點擊右側 **Run workflow** > **Run workflow**

> **🛑 網域路徑配置注意：**
> - 目前 `vite.config.js` 內已設定 `base: '/2026_ASE_Voice/'`，適用於 `https://DanielYi-Github.github.io/2026_ASE_Voice/` 部署路徑。
> - 若改為自訂網域或根目錄部署，請將 `base` 改為 `'/'`。

---

## 🔒 .gitignore 隱私與安全管控

為保護專案安全與節省 Repository 空間，`.gitignore` 已設定排除以下類型檔案：

| 類別                       | 排除項目                                                              |
| -------------------------- | --------------------------------------------------------------------- |
| 📦 套件與編譯              | `node_modules/`, `dist/`, `build/`, `.vite/`                          |
| 🔑 環境變數與金鑰          | `.env`, `.env.*`, `*.pem`, `*.key`（保留 `.env.example` 作為範本）    |
| 📝 日誌                    | `*.log`, `npm-debug.log*` 系列                                        |
| 💻 作業系統產物            | `.DS_Store`, `Thumbs.db`, `._*`, `Desktop.ini`                        |
| 🔧 編輯器/IDE             | `.vscode/*`, `.idea/`, `*.sw?`（保留 `extensions.json`, `settings.json`） |
| 📄 辦公文件                | `*.docx`, `*.xlsx`, `*.pptx`, `*.pdf` 等                              |
| 📸 非專案圖片              | `aTalk-*` 等通訊軟體截圖                                              |
| 🗜️ 壓縮檔                 | `*.zip`, `*.tar.gz`, `*.rar`                                          |

> **💡 小提醒：** 專案用圖片請統一放在 `public/` 或 `src/assets/` 目錄下。

---

## 📁 專案結構

```
形象網站/
├── .github/workflows/     # GitHub Actions 自動部署設定
│   └── deploy.yml
├── public/                # 靜態資源 (不經過 Vite 處理)
│   ├── hero-mic.png
│   ├── pure-mic.png
│   └── vite.svg
├── src/
│   ├── assets/            # 需經過 Vite 處理的資源
│   ├── components/        # React 元件
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── InfoSection.jsx
│   │   ├── Navbar.jsx
│   │   └── PastHighlights.jsx
│   ├── context/           # React Context（語系切換）
│   │   └── LanguageContext.jsx
│   ├── App.jsx            # 主要應用元件
│   ├── App.css            # App 樣式
│   ├── index.css          # 全域樣式
│   └── main.jsx           # 進入點
├── .gitignore             # Git 排除規則
├── index.html             # HTML 入口
├── package.json           # 專案設定與依賴
├── vite.config.js         # Vite 設定（含 base 路徑）
├── tailwind.config.js     # Tailwind CSS 設定
├── postcss.config.js      # PostCSS 設定
└── eslint.config.js       # ESLint 設定
```

---

## 📌 注意事項

- 部署前請確認 `vite.config.js` 中的 `base` 路徑與您的 GitHub Repo 名稱一致
- 機密資訊（API Key 等）務必使用 `.env` 管理，**絕對不要** commit 到版控
- 辦公文件（簡章、企劃書等）請存放於獨立文件目錄，不要放入程式碼 Repo
