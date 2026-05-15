# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**2026 ASE Voice** is the official website for the 5th ASE Group annual singing competition. It's a single-page, fully static React app with a Neo-Brutalism design aesthetic, trilingual content (zh/en/vi), and live registration countdown logic.

## Commands

```bash
npm run dev       # Start Vite dev server at localhost:5173
npm run build     # Production build → /dist
npm run preview   # Preview production build locally
npm run lint      # ESLint check
```

Deployment is automatic: push to `main` triggers GitHub Actions (`.github/workflows/deploy.yml`), which builds and deploys to `asevoice.org` via GitHub Pages.

## Architecture

### Entry & Layout

- [src/main.jsx](src/main.jsx) — React root, wraps everything in `<LanguageProvider>`
- [src/App.jsx](src/App.jsx) — Renders all sections in order; handles URL `?id=<section>` scroll navigation on load
- [src/index.css](src/index.css) — Tailwind base + all custom `@keyframes` (sunburst, waveform, marquee, shimmer, soundwave)

### Global State

[src/context/LanguageContext.jsx](src/context/LanguageContext.jsx) is the central source for all user-visible text. It provides:
- `lang` — current language (`zh` / `en` / `vi`), auto-detected from browser on first load
- `t` — the full translation object for the active language (700+ lines of content covering all components)
- `setLanguage(lang)` — switch language

All components consume this context via `useLanguage()`. Never hardcode user-visible strings; add them to the translation object in all three languages.

### Registration Status Logic

[src/utils/registrationUtils.js](src/utils/registrationUtils.js) encapsulates all date logic:
- Registration window: **June 1, 2026 00:00 → June 21, 2026 23:59 (Taiwan Time, UTC+8)**
- Returns one of three states: `BEFORE` / `OPEN` / `ENDED`
- Navbar and Hero poll this every 1 second when status is `BEFORE` (live countdown)

To change registration dates, edit only this file.

### Component Responsibilities

| Component | Role |
|-----------|------|
| [Navbar.jsx](src/components/Navbar.jsx) | Fixed top nav; language switcher dropdown; register button with dynamic state |
| [Hero.jsx](src/components/Hero.jsx) | Animated hero with rotating sunburst, floating music notes, CTA button, and countdown |
| [AnnouncementBoard.jsx](src/components/AnnouncementBoard.jsx) | Scrolling bulletin board tiles (key dates, prizes) |
| [InfoSection.jsx](src/components/InfoSection.jsx) | Full competition rules, eligibility, timeline, prizes |
| [QASection.jsx](src/components/QASection.jsx) | Collapsible FAQ (26+ entries) |
| [PastHighlights.jsx](src/components/PastHighlights.jsx) | Embedded video highlights from prior years |
| [Footer.jsx](src/components/Footer.jsx) | Organizer info and contact details |
| [RegistrationCountdown.jsx](src/components/RegistrationCountdown.jsx) | Standalone countdown timer widget |

### Styling Conventions

- **Tailwind CSS v4** with a custom theme in [tailwind.config.js](tailwind.config.js)
- Key design tokens: primary gold `#F5B841`, accent red `#E32626`, dark `#1A1A1A`, cream `#F6E9D8`
- "Brutal" box shadows: `shadow-brutal` (6px offset) and `shadow-brutal-lg` (10px offset) — these define the Neo-Brutalism look
- Fonts: Oswald (headings), Inter (body), Noto Sans TC (CJK characters)
- Animations via **Framer Motion 12** for component transitions; CSS `@keyframes` in `index.css` for background effects

### Vite Config Notes

[vite.config.js](vite.config.js) sets `base: '/'` (custom domain deployment). Framer Motion is split into its own chunk (`vendor-framer`) to optimize loading.
