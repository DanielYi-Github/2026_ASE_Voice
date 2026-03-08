# 2026 ASE Voice 日月光集團好聲音 官方網站

本專案為「2026 年首次全國性日月光集團歌唱比賽」的官方活動網站，以 React + Vite + Tailwind CSS v4 開發，具備完整的 RWD（手機/電腦皆完美呈現）與中英雙語系自動偵測切換功能。

## 🚀 GitHub Action 部署指南 (CI/CD)

我們已經為此專案建置了自動化部署至 GitHub Pages 的工作流程（位於 `.github/workflows/deploy.yml`）。

### 自動部署流程：
1. 確認您的本地端已經綁定 GitHub 並且將變更 Push 到 GitHub 的 `main` 分支。
2. Push 後，GitHub Actions 會自動觸發 `Deploy to GitHub Pages` 工作流程。
3. 系統將自動安裝套件並進行編譯 `npm run build`。
4. 編譯出的 `/dist` 資料夾裡的檔案，會被自動推播（Push）到 `gh-pages` 分支。

### 啟用網頁：
1. 前往本專案的 GitHub 頁面，點選 **Settings** > 左側導覽列的 **Pages**。
2. 在 **Build and deployment** 區塊中：
   - Source 選擇 `Deploy from a branch`
   - Branch 下拉選單選擇 `gh-pages`
   - 資料夾選擇 `/root` 後點擊 **Save**。
3. 等待約 1~2 分鐘，網站即自動上線！✨

> **🛑 網域路徑配置注意：**
> 如果您要部署在 GitHub Pages 的子目錄下（例如 `https://your-name.github.io/ase-voice/`），請記得在專案的 `vite.config.js` 內加入 `base: '/ase-voice/'`。若您部署在客製化網域或 Repo 的根目錄下，則不需要任何修改。

---

## 🔒 .gitignore 隱私與快照檔管控

為了保護專案安全與節省 Repository 空間，我們在 `.gitignore` 內阻擋了不必要上傳的檔案。確保 Commit 和 Push 時不會外洩以下資料：

*   **環境變數與私鑰**：`.env`, `.env.local`, `.env.production`，避免專案上如果有使用 API Key 等機密資訊曝光於公開版控。
*   **各類快取與編譯檔案**：阻斷 `node_modules/`, `dist/`, `.vite/`, `.eslintcache` 等過大的暫存與安裝包上傳。
*   **作業系統與編輯器產物**：如 Mac macOS 專屬的隱藏設定檔 `.DS_Store`, 或是其他軟體產生的暫存檔。
