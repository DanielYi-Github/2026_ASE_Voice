import React from 'react';
import { useLanguage } from '../context/LanguageContext';

// 9/11 決賽直播預告條:嵌在 FinalistBanner / PredictionBanner 的排版內(非絕對定位,不會蓋住內容)
const LiveTeaserStrip = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-gradient-to-r from-[#1A103C] via-[#3B2875] to-[#1A103C] border-[3px] border-dark shadow-brutal rounded-2xl py-3 md:py-4 px-4 md:px-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
      <span className="inline-flex items-center gap-1.5 bg-[#E32626] text-white font-heading font-black text-[11px] md:text-xs px-2.5 py-1 rounded-full border-2 border-white/80 uppercase tracking-widest">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
        LIVE
      </span>
      <p className="font-heading font-black text-[#FFC107] text-sm md:text-lg tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center">
        {t.finalistBanner?.liveTeaserText || "📺 9/11 (五) 14:30 決賽現場直播,就在本網站,敬請鎖定!"}
      </p>
    </div>
  );
};

export default LiveTeaserStrip;
