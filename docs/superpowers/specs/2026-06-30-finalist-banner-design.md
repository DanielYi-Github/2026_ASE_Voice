# 2026 ASE Voice 決賽名單 Banner 設計規格書

## 總覽 (Overview)
本設計旨在替換現有的首頁 Hero Banner，用於公佈 2026 ASE Voice 歌唱比賽的 20 位決賽名單。系統將會在 2026 年 7 月 8 日當天自動切換至此新版 Banner。目前的設計會包含預覽版本（使用假資料），方便日後取得正式名單時能快速替換，不需在公佈當天手動進行程式部署。

## 架構與組件 (Architecture & Components)
- **FinalistBanner (決賽名單 Banner 組件)**：包含輪播圖 (Carousel) 的主要容器。
- **Carousel Mechanism (輪播機制)**：
  - 自動輪播的滑動區塊，共包含兩頁（華語組與外語組）。
  - 提供左右切換按鈕，以及下方的分頁圓點指示器，方便使用者手動點選切換。
- **ContestantGrid (參賽者網格組件)**：每一頁（每一組）的排版採用網格設計，桌機版為 2 排 x 5 欄，共 10 位選手。手機版與平板版將自動響應式調整（可能改為單排或雙排滑動）。
- **ContestantCard (參賽者卡片組件)**：獨立的選手資訊卡片，顯示：
  - 姓名（最醒目）
  - 廠區（以精緻的 Badge 標籤呈現）
  - 演唱歌曲（格式為「歌曲名稱 - 原唱歌手」，旁邊搭配音符或麥克風圖示）
- **Date Switcher Logic (時間切換邏輯)**：使用一個判斷函式來檢查目前時間是否 `>= 2026-07-08T00:00:00+08:00`。若時間已到，則渲染 `FinalistBanner`；否則維持原有的首頁 Banner。

## 資料結構 (Data Structure)
```json
[
  {
    "id": 1,
    "group": "華語組",
    "name": "陳小明",
    "factory": "楠梓一廠",
    "songName": "歌曲名稱",
    "originalArtist": "原唱歌手"
  }
]
```
*備註：我們將建立一個含有假資料的預覽檔，確保在取得最終名單後能夠輕易修改。*

## 視覺設計 (Visual Design - 充滿活力與區塊化風格)
依據 `ui-ux-pro-max` 對於動態音樂活動的推薦設計風格：
- **主題 (Theme)**：使用暗色系背景（`#0F0F23`），營造具備能量與音樂祭氛圍的視覺效果。
- **色彩配置 (Colors)**：
  - 主色 (Primary)：`#1E1B4B`
  - 次色 (Secondary)：`#4338CA`
  - 強調/行動呼籲色 (Accent/CTA)：`#22C55E`（音樂播放感的螢光綠）
  - 文字色 (Text)：`#F8FAFC`
- **字體 (Typography)**：建議使用具備活力與粗體的字型（如 Poppins、Righteous，或專案既有的字型），展現音樂的動態感。
- **排版與特效 (Layout & Effects)**：
  - 參賽者卡片帶有平滑的懸停 (Hover) 特效（例如稍微浮起、外框變色或發光）。
  - 確保高對比度，讓文字在深色背景中清晰易讀。
  - 避免使用 Emoji 作為圖示；改用專業的 SVG 圖示（如 Heroicons/Lucide 的音符或麥克風）。

## 測試與備案 (Testing & Fallback)
- **預覽模式 (Preview Mode)**：在時間切換邏輯中加入測試用的 flag 或是 URL 參數，以便在 7 月 8 日前就能預覽與測試新版 Banner。
- **響應式設計 (Responsive)**：將會測試 375px（手機）、768px（平板）與 1024px+（桌機）等多種螢幕尺寸的顯示效果。
