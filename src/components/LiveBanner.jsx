import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { getLiveTimeRemaining, isLiveStarted, getYouTubeVideoId } from '../utils/registrationUtils';
import { LIVE_VIDEO_URL } from '../config/liveConfig';
import PredictionTeaserStrip from './PredictionTeaserStrip';

const pad = (n) => String(Math.max(0, n)).padStart(2, '0');

const CountdownUnit = ({ value, label }) => (
  <div className="flex flex-col items-center gap-2 md:gap-3">
    <div className="w-[72px] sm:w-24 md:w-32 lg:w-36 py-3 md:py-5 bg-white/[0.06] border border-white/20 rounded-2xl backdrop-blur-sm shadow-[0_0_40px_rgba(245,184,65,0.08)]">
      <span className="block text-center font-heading font-black text-white text-4xl sm:text-5xl md:text-7xl tabular-nums tracking-tight">
        {pad(value)}
      </span>
    </div>
    <span className="font-heading font-bold text-white/50 text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em]">
      {label}
    </span>
  </div>
);

// 9/7 起取代主 Banner:Apple 發表會風格的決賽直播倒數;
// 倒數歸零(9/11 14:30)自動換成 YouTube 直播播放器
const LiveBanner = () => {
  const { t } = useLanguage();
  const tl = t.live || {};
  const [remaining, setRemaining] = useState(getLiveTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => setRemaining(getLiveTimeRemaining()), 1000);
    return () => clearInterval(timer);
  }, []);

  const onAir = isLiveStarted() || remaining.total <= 0;
  const videoId = getYouTubeVideoId(LIVE_VIDEO_URL);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#0C0C0C] overflow-hidden pt-24 pb-16 border-b-[6px] border-dark isolate">
      {/* 金色光暈 + 細緻網點,保留品牌感的深色舞台 */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(245,184,65,0.14) 0%, rgba(227,38,38,0.05) 35%, transparent 65%)' }}
      ></div>
      <div className="absolute inset-0 bg-halftone opacity-[0.06] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 inset-x-0 h-14 md:h-20 flex items-end justify-between px-1 gap-0.5 opacity-15 pointer-events-none z-0">
        {[...Array(60)].map((_, i) => (
          <div key={i} className={`w-full bg-primary waveform-bar delay-${(i % 5) + 1}`} style={{ height: `${Math.random() * 100}%`, minHeight: '8px' }}></div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-6 md:gap-8">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading font-bold text-primary/90 text-xs md:text-sm uppercase tracking-[0.5em] flex items-center gap-3"
        >
          <span className="w-8 h-px bg-primary/50"></span>
          {tl.eyebrow || "ASE VOICE 2026 · GRAND FINALE"}
          <span className="w-8 h-px bg-primary/50"></span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 70 }}
        >
          <h1 className="font-heading font-black text-white text-4xl sm:text-6xl md:text-7xl tracking-wide leading-tight">
            {tl.title || "決賽之日"}
          </h1>
          <p className="font-heading font-bold text-white/40 text-base sm:text-xl md:text-2xl tracking-[0.35em] uppercase mt-2">
            {tl.titleEn || "THE FINAL SHOWDOWN"}
          </p>
        </motion.div>

        {/* Date line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-heading font-black text-primary text-xl sm:text-2xl md:text-3xl tracking-widest"
        >
          {tl.dateLine || "9.11 (五) 14:30"}
        </motion.p>

        {onAir ? (
          /* ON AIR:YouTube 直播播放器 */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col items-center gap-4"
          >
            <span className="inline-flex items-center gap-2 bg-[#E32626] text-white font-heading font-black text-sm md:text-base px-4 py-1.5 rounded-full border-2 border-white/80 uppercase tracking-[0.25em]">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
              {tl.onAirBadge || "LIVE 直播中"}
            </span>
            {videoId ? (
              <div className="w-full max-w-4xl aspect-video bg-black border-[4px] border-primary shadow-[8px_8px_0_0_rgba(245,184,65,0.35)] rounded-xl overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                  title="ASE Voice 2026 Live"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <p className="text-white/70 font-body font-bold">
                {tl.streamPending || "直播連結準備中,請稍候再回來!"}
              </p>
            )}
            <p className="text-white/40 font-body font-bold text-xs md:text-sm">
              {tl.onAirNote || "若影片未自動播放,請點擊播放鍵。直播結束後此處將保留完整重播。"}
            </p>
          </motion.div>
        ) : (
          /* COUNTDOWN */
          <>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-start justify-center gap-2.5 sm:gap-4 md:gap-6"
            >
              <CountdownUnit value={remaining.days} label={tl.days || "天"} />
              <span className="font-heading font-black text-white/25 text-4xl md:text-6xl mt-3 md:mt-5">:</span>
              <CountdownUnit value={remaining.hours} label={tl.hours || "時"} />
              <span className="font-heading font-black text-white/25 text-4xl md:text-6xl mt-3 md:mt-5">:</span>
              <CountdownUnit value={remaining.minutes} label={tl.minutes || "分"} />
              <span className="font-heading font-black text-white/25 text-4xl md:text-6xl mt-3 md:mt-5">:</span>
              <CountdownUnit value={remaining.seconds} label={tl.seconds || "秒"} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="flex items-center gap-2.5 bg-white/[0.06] border border-white/15 rounded-full px-5 py-2.5 backdrop-blur-sm"
            >
              <span className="text-lg">📺</span>
              <p className="font-body font-bold text-white/80 text-xs sm:text-sm md:text-base">
                {tl.watchHint || "直播將於本頁面準時開播,倒數歸零自動上線 — 敬請鎖定!"}
              </p>
            </motion.div>
          </>
        )}

        {/* 冠軍預測仍開放時的預告條(直播開始後自動撤下) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="w-full max-w-3xl"
        >
          <PredictionTeaserStrip />
        </motion.div>
      </div>
    </section>
  );
};

export default LiveBanner;
