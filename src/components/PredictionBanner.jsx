import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { PREDICTION_URL } from '../config/siteConfig';
import LiveTeaserStrip from './LiveTeaserStrip';

// 8/1 起整版取代主 Banner 的「冠軍預測活動」主視覺
const PredictionBanner = () => {
  const { t } = useLanguage();
  const tp = t.predictionBanner || {};

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#FFC107] overflow-hidden pt-24 pb-10 border-b-[6px] border-dark isolate">
      {/* BACKGROUND: Sunburst + Halftone(與主視覺一致) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] rounded-full bg-sunburst opacity-80 pointer-events-none z-[-2] origin-center animate-[spin_120s_linear_infinite]"></div>
      <div className="absolute inset-0 bg-halftone opacity-10 pointer-events-none z-[-1]"></div>

      {/* 漂浮的問號與獎盃(預測活動的趣味元素) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {[
          { icon: '❓', top: '12%', left: '10%', size: 'text-5xl', dur: 5 },
          { icon: '🏆', top: '20%', left: '85%', size: 'text-6xl', dur: 7 },
          { icon: '🎤', top: '65%', left: '8%', size: 'text-5xl', dur: 6 },
          { icon: '❓', top: '70%', left: '88%', size: 'text-4xl', dur: 4.5 },
          { icon: '👑', top: '8%', left: '55%', size: 'text-5xl', dur: 8 },
          { icon: '🎁', top: '58%', left: '75%', size: 'text-4xl', dur: 5.5 },
        ].map((item, i) => (
          <motion.div
            key={i}
            animate={{ y: [-16, 16, -16], rotate: [-12, 12, -12] }}
            transition={{ duration: item.dur, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute ${item.size} opacity-50 drop-shadow-lg`}
            style={{ top: item.top, left: item.left }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-5 md:gap-7">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark text-primary font-heading font-black text-xs md:text-sm px-4 py-1.5 border-2 border-white rounded-full uppercase tracking-[0.3em] shadow-brutal"
        >
          {tp.eyebrow || "SPECIAL EVENT 互動企劃"}
        </motion.div>

        {/* Trophy + Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 80, delay: 0.15 }}
          className="flex flex-col items-center gap-3"
        >
          <motion.span
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="text-7xl md:text-8xl drop-shadow-[6px_6px_0_rgba(26,26,26,0.35)]"
          >
            🏆
          </motion.span>
          <div className="bg-white border-[4px] border-dark shadow-brutal-lg px-6 md:px-12 py-4 md:py-6 transform -rotate-1">
            <h1 className="font-heading font-black text-dark text-3xl sm:text-5xl md:text-6xl tracking-wide leading-tight">
              {tp.title || "冠軍預測 PK 賽"}
            </h1>
            <p className="font-heading font-bold text-secondary text-base sm:text-xl md:text-2xl tracking-[0.25em] mt-1 uppercase">
              {tp.titleEn || "CHAMPION PREDICTION"}
            </p>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl font-body font-bold text-dark text-sm sm:text-base md:text-xl leading-relaxed bg-light/80 border-[3px] border-dark px-4 md:px-8 py-3 md:py-4 shadow-brutal"
        >
          {tp.subtitle || "華語組、外語組各 10 位決賽選手已就位!誰能奪下兩組冠軍寶座?下滑認識決賽選手,再用你的神直覺預測冠軍,猜中就有機會把好禮抱回家!"}
        </motion.p>

        {/* CTA */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          href={PREDICTION_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 bg-secondary text-white font-heading font-black text-lg sm:text-2xl md:text-3xl px-8 md:px-14 py-4 md:py-5 border-[4px] border-dark shadow-brutal-lg hover:shadow-brutal hover:translate-x-[3px] hover:translate-y-[3px] transition-all uppercase tracking-wider"
        >
          {tp.cta || "立即預測冠軍"}
          <span className="animate-bounce-x inline-block">→</span>
        </motion.a>
        <p className="font-body font-bold text-dark/70 text-xs md:text-sm -mt-2">
          {tp.note || "* 免費參加,全集團同仁與親朋好友都能一起玩!"}
        </p>

        {/* 9/11 直播預告 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-3xl"
        >
          <LiveTeaserStrip />
        </motion.div>

        {/* 下滑看決賽名單提示 */}
        <motion.a
          href="#finalists"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-0.5 text-dark font-heading font-bold text-xs md:text-sm mt-1"
        >
          <span>{tp.scrollHint || "▼ 認識華語組 × 外語組決賽選手 ▼"}</span>
        </motion.a>
      </div>
    </section>
  );
};

export default PredictionBanner;
