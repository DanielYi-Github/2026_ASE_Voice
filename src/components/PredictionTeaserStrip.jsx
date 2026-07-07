import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { isPredictionLaunched, isLiveStarted } from '../utils/registrationUtils';
import { PREDICTION_URL } from '../config/siteConfig';

// 冠軍預測預告條:與 LiveTeaserStrip 同款主要訊息匡樣式,嵌入主 Banner 內(非絕對定位),
// 確保訪客一進站就能在首屏看到,不必往下捲動到獨立區塊才發現
const PredictionTeaserStrip = () => {
  const { t } = useLanguage();
  const launched = isPredictionLaunched();

  if (isLiveStarted()) return null;

  return (
    <div className="w-full bg-gradient-to-r from-[#1A1A1A] via-[#5C3D0A] to-[#1A1A1A] border-[3px] border-dark shadow-brutal rounded-2xl py-4 md:py-5 px-4 md:px-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5">
      <span className="inline-flex items-center gap-1.5 bg-secondary text-white font-heading font-black text-[11px] md:text-xs px-2.5 py-1 rounded-full border-2 border-white/80 uppercase tracking-widest">
        🏆 PREDICTION
      </span>
      <p className="font-heading font-black text-primary text-sm md:text-lg tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center">
        {launched
          ? (t.prediction?.sloganLive || "冠軍預測 PK 賽火熱進行中!你心目中的歌王是誰?快來下注你的神直覺!")
          : (t.prediction?.slogan || "神預測開催!誰是本屆歌王?冠軍預測活動 8/1 熱血上線,猜中冠軍贏好禮 — 敬請期待!")}
      </p>
      {launched ? (
        <a
          href={PREDICTION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-1 bg-primary text-dark font-heading font-black text-[11px] md:text-xs px-3 py-1.5 rounded-full border-2 border-white/80 uppercase tracking-widest hover:translate-x-[1px] hover:translate-y-[1px] transition-transform"
        >
          {t.prediction?.cta || "立即預測"} →
        </a>
      ) : (
        <span className="shrink-0 inline-flex items-center gap-1.5 bg-white/10 text-white font-heading font-black text-[11px] md:text-xs px-2.5 py-1 rounded-full border-2 border-white/40 uppercase tracking-widest">
          {t.prediction?.dateChip || "8/1 上線・敬請期待"}
        </span>
      )}
    </div>
  );
};

export default PredictionTeaserStrip;
