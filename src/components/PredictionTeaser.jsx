import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { isPredictionLaunched, isLiveStarted } from '../utils/registrationUtils';
import { PREDICTION_URL } from '../config/siteConfig';

// 主 Banner 下方的「冠軍預測活動」宣傳條:
// 8/1 前顯示預告標語;8/1 後(直播倒數期間仍顯示時)自動變成可點擊的 CTA;
// 9/11 14:30 比賽開始即停止預測,整條撤下
const PredictionTeaser = () => {
  const { t } = useLanguage();
  const launched = isPredictionLaunched();

  if (isLiveStarted()) return null;

  return (
    <section className="relative w-full bg-dark border-b-[6px] border-dark overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#3A2A05] to-[#1A1A1A]"></div>
      <div className="absolute inset-0 bg-halftone opacity-10"></div>

      <div className="relative max-w-6xl mx-auto px-4 py-4 md:py-5 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-5">
        <motion.span
          animate={{ rotate: [-8, 8, -8] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="text-3xl md:text-4xl drop-shadow-[0_0_12px_rgba(245,184,65,0.8)]"
        >
          🏆
        </motion.span>

        <p className="font-heading font-black text-primary text-sm md:text-lg text-center tracking-wider leading-snug">
          {launched
            ? (t.prediction?.sloganLive || "🔥 冠軍預測 PK 賽 火熱進行中!你心目中的歌王是誰?馬上下注你的直覺!")
            : (t.prediction?.slogan || "神預測開催!誰是本屆歌王?冠軍預測活動 8/1 熱血上線,猜中冠軍贏好禮 — 敬請期待!")}
        </p>

        {launched ? (
          <a
            href={PREDICTION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1.5 bg-secondary text-white font-heading font-black text-sm md:text-base px-4 py-2 border-[3px] border-white shadow-[4px_4px_0_0_rgba(245,184,65,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_rgba(245,184,65,1)] transition-all uppercase"
          >
            {t.prediction?.cta || "立即預測"}
            <span className="animate-bounce-x inline-block">→</span>
          </a>
        ) : (
          <span className="shrink-0 inline-flex items-center gap-1.5 bg-primary text-dark font-heading font-black text-xs md:text-sm px-3 py-1.5 border-2 border-white/70 rounded-full uppercase tracking-widest animate-pulse">
            {t.prediction?.dateChip || "8/1 COMING SOON"}
          </span>
        )}
      </div>
    </section>
  );
};

export default PredictionTeaser;
