# 2026 ASE Voice Finalist Banner Design Spec

## Overview
A dynamic hero banner replacement to announce the 20 finalists of the 2026 ASE Voice singing competition. The banner will automatically switch on July 8, 2026. This allows the preview version to be built now and populated with the official list later without a manual deployment on the day.

## Architecture & Components
- **FinalistBanner Component**: The main container with a carousel.
- **Carousel Mechanism**: Auto-playing slider with two slides (華語組 and 外語組), manual navigation arrows, and pagination dots. 
- **ContestantGrid Component**: A responsive grid layout (2x5 on desktop) displaying 10 contestants per slide.
- **ContestantCard Component**: Individual cards displaying Name, Factory Badge, and Song Info.
- **Date Switcher Logic**: A utility that checks if the current date is >= `2026-07-08T00:00:00+08:00`. If true, renders the `FinalistBanner`; if false, renders the original default banner.

## Data Structure
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
*Note: A preview dummy data file will be created with placeholders so it can be quickly edited once the final list is obtained.*

## Visual Design (Vibrant & Block-based)
Based on `ui-ux-pro-max` recommendations for dynamic music events:
- **Theme**: Dark background (`#0F0F23`) with energetic music festival vibes.
- **Colors**:
  - Primary: `#1E1B4B`
  - Secondary: `#4338CA`
  - Accent/CTA: `#22C55E` (Green, resembling audio play)
  - Text: `#F8FAFC`
- **Typography**: Poppins/Righteous (or existing project fonts), bold and energetic.
- **Layout & Effects**: 
  - Smooth hover transitions on contestant cards (e.g., slight lift, color shift).
  - Clear contrast for text legibility.
  - No emojis as icons; use SVGs for decorative elements (e.g., music notes, microphone).

## Testing & Fallback
- **Preview Mode**: The date check logic will have a testing flag or URL parameter to force the display of the new banner before July 8 for QA.
- **Responsive**: Will verify presentation across 375px, 768px, and 1024px+ viewports.
