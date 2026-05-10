# 🎤 2026 ASE Voice 日月光集團好聲音 官方網站

![Banner](https://img.shields.io/badge/ASE-VOICE-FFC107?style=for-the-badge&logo=music)
![Version](https://img.shields.io/badge/Version-1.2.0-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss)

本專案為「2026 年首次全國性日月光集團歌唱比賽」的官方活動網站。採用 **React 19 + Vite 7 + Tailwind CSS v4** 開發，打造極具視覺衝擊力的 Neo-Brutalism (新野獸主義) 設計風格，並具備完整的 RWD 與三語系（中/英/越）自動偵測切換功能。

---

## ✨ 核心特色

- 🚀 **極致效能**：基於 Vite 7 構建，實現秒開的載入體驗。
- 🎨 **前衛設計**：採用 Neo-Brutalism 風格，結合豐富的微交互動畫 (Framer Motion)。
- 🌍 **多國語系**：支援 **中文、英文、越南文**，自動偵測瀏覽器語言並提供無縫切換。
- 📅 **智能狀態控制**：報名按鈕會根據系統時間自動切換狀態：
  - **尚未開放**：顯示「6 月 1 號開放報名」並提供提示。
  - **報名期間**：動態高亮「即刻報名」導向報名系統。
  - **報名結束**：自動切換為「報名時間已過，敬請期待入圍名單」。
- 📱 **全平台支援**：針對手機與桌面端進行深度介面優化。

---

## 📋 技術堆疊

| 類別 | 工具 | 描述 |
| :--- | :--- | :--- |
| **核心框架** | React 19 | 最新版本的 React，提供更優異的渲染效能。 |
| **建置工具** | Vite 7 | 閃電般的熱更新與編譯速度。 |
| **樣式解決方案** | Tailwind CSS v4 | 最前衛的 CSS 框架，實現極速開發與高度定製。 |
| **動畫效果** | Framer Motion | 驅動網站中所有精緻的物理性動畫。 |
| **圖示庫** | Lucide React | 清晰、美觀且具一致性的向量圖示。 |
| **部署** | GitHub Pages | 透過 GitHub Actions 實現 CI/CD 自動化部署。 |

---

## 🛠️ 本地開發

```bash
# 1. 克隆專案
git clone https://github.com/DanielYi-Github/2026_ASE_Voice.git

# 2. 安裝依賴
npm install

# 3. 啟動開發伺服器
npm run dev
```

---

## 🔄 自動化部署 (CI/CD)

本專案透過 `.github/workflows/deploy.yml` 實現自動化流程：
1. **Push to main**：當程式碼推送到主分支。
2. **Auto Build**：系統自動執行 `npm run build`。
3. **Auto Deploy**：建置產物自動推送至 GitHub Pages 網域。

---

## 📂 專案結構精要

```text
src/
├── assets/          # 視覺資源 (圖片、SVG)
├── components/      # 重用組件 (Hero, Navbar, AnnouncementBoard...)
├── context/         # 狀態管理 (語系切換邏輯)
├── utils/           # 工具函式 (報名時間判斷邏輯)
├── App.jsx          # 主要應用入口
└── main.jsx         # 渲染進入點
```

---

## 📌 注意事項

- **報名時間設定**：位於 `src/utils/registrationUtils.js`，如需修改請直接變更該處日期。
- **語系資料**：所有文字內容統一管理於 `src/context/LanguageContext.jsx`。
- **網域路徑**：`vite.config.js` 中的 `base` 需與 Repository 名稱一致。

---

© 2026 日月光集團聯合職工福利委員會 & 日月光文教基金會. All rights reserved.
