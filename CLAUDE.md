# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**2026 ASE Voice** is the official website for the 5th ASE Group annual singing competition. It's a single-page, fully static React app with a Neo-Brutalism design aesthetic, trilingual content (zh/en/vi), and live registration/finalist-announcement countdown logic.

## Commands

```bash
npm run dev       # Start Vite dev server at localhost:5173
npm run build     # Production build → /dist
npm run preview   # Preview production build locally
npm run lint      # ESLint check
```

There is no test suite configured. Deployment is automatic: push to `main` triggers GitHub Actions (`.github/workflows/deploy.yml`), which builds and deploys to `asevoice.org` via GitHub Pages.

## Architecture

### Entry & Layout

- [src/main.jsx](src/main.jsx) — React root, wraps everything in `<LanguageProvider>`
- [src/App.jsx](src/App.jsx) — Renders all sections in order; handles URL `?id=<section>` scroll navigation on load; toggles the hero section between `Hero` and `FinalistBanner` based on `isFinalistAnnounced()`
- [src/index.css](src/index.css) — Tailwind base + all custom `@keyframes` (sunburst, waveform, marquee, shimmer, soundwave)

### Global State

[src/context/LanguageContext.jsx](src/context/LanguageContext.jsx) is the central source for all user-visible text. It provides:
- `lang` — current language (`zh` / `en` / `vi`), auto-detected from `navigator.language` on first load
- `t` — the full translation object for the active language (700+ lines of content covering all components)
- `setLanguage(lang)` — switch language

All components consume this context via `useLanguage()`. Never hardcode user-visible strings; add them to the translation object in all three languages.

### Registration & Finalist-Announcement Logic

[src/utils/registrationUtils.js](src/utils/registrationUtils.js) encapsulates all date logic and is the only file that should be edited to change these dates:
- Registration window: **June 1, 2026 00:00 → June 21, 2026 23:59 (Taiwan Time, UTC+8)**. `getRegistrationStatus()` returns `BEFORE` / `OPEN` / `ENDED`; Navbar and Hero poll this every 1 second when status is `BEFORE` (live countdown).
- Finalist announcement: `isFinalistAnnounced()` flips to `true` at **July 8, 2026 00:00 (UTC+8)**, or immediately if the URL contains `?preview=finalist` (used to preview the finalist banner before the real date). `App.jsx` uses this to swap `Hero` for `FinalistBanner`.

### Component Responsibilities

| Component | Role |
|-----------|------|
| [Navbar.jsx](src/components/Navbar.jsx) | Fixed top nav; language switcher dropdown; register button with dynamic state |
| [Hero.jsx](src/components/Hero.jsx) | Pre-announcement hero: animated sunburst, floating music notes, CTA button, countdown; embeds `AnnouncementBoard` |
| [FinalistBanner.jsx](src/components/FinalistBanner.jsx) | Post-announcement replacement for Hero: paginated grid of finalist `ContestantCard`s sourced from `finalistsData.js`, also embeds `AnnouncementBoard` |
| [AnnouncementBoard.jsx](src/components/AnnouncementBoard.jsx) | Scrolling bulletin board tiles (key dates, prizes) — not a top-level `App.jsx` section; rendered inside `Hero` and `FinalistBanner` |
| [InfoSection.jsx](src/components/InfoSection.jsx) | Full competition rules, eligibility, timeline, prizes |
| [QASection.jsx](src/components/QASection.jsx) | Collapsible FAQ (26+ entries) |
| [PastHighlights.jsx](src/components/PastHighlights.jsx) | Embedded video highlights from prior years |
| [Footer.jsx](src/components/Footer.jsx) | Organizer info and contact details |
| [RegistrationCountdown.jsx](src/components/RegistrationCountdown.jsx) | Standalone countdown timer widget |

[src/data/finalistsData.js](src/data/finalistsData.js) exports `chineseGroup` and `foreignGroup` arrays (`{ id, name, factory, songName, originalArtist }`) consumed by `FinalistBanner`.

### Registration Form (outside the React app)

`registration.html?lang=<zh|en|vi>` is a **standalone static page in `public/`**, not part of the React SPA — Navbar and Hero link to it directly via `${import.meta.env.BASE_URL}registration.html?lang=${lang}`. During the open registration window it embeds a Google Form via iframe against the Google Apps Script Web App URL configured in `.env` (`VITE_GAS_WEBAPP_URL`, see `.env.example`). Once the registration window ends it instead shows a static "registration closed" message, localized inline in that file's own script (not via `LanguageContext`).

### Styling Conventions

- **Tailwind CSS v4** with a custom theme in [tailwind.config.js](tailwind.config.js)
- Key design tokens: primary gold `#F5B841`, accent red `#E32626`, dark `#1A1A1A`, cream `#F6E9D8`
- "Brutal" box shadows: `shadow-brutal` (6px offset) and `shadow-brutal-lg` (10px offset) — these define the Neo-Brutalism look
- Fonts: Oswald (headings), Inter (body), Noto Sans TC (CJK characters)
- Animations via **Framer Motion 12** for component transitions; CSS `@keyframes` in `index.css` for background effects

### Vite Config Notes

[vite.config.js](vite.config.js) sets `base: '/'` (custom domain deployment). Framer Motion is split into its own chunk (`vendor-framer`) to optimize loading.

### Translation Helper Scripts

The root-level Python scripts (`find_missing.py`, `parse_missing.py`, `update_excel.py`, `update_missing.py`, `parse_pdf.py`) are one-off maintenance tools for reconciling a `語言對照.xlsx` translation spreadsheet against `LanguageContext.jsx` and the official PDF rulebook — they are not part of the built site and have no npm script wiring them up.

## Skills

- 嚴格遵守 `.agent/rules/karpathy-guidelines.md` 中的開發準則。
