import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// 9/11 17:30 起取代 LiveBanner:賽事結束形象畫面。延續 LiveBanner 的深色舞台語彙,
// 但中段換成通用的慶祝/感謝文案(不放名次/得獎人,那是 ResultsSection 的事),
// 讓這個畫面在明年第六屆開跑前都能穩定呈現。
const ConcludedBanner = () => {
  const { t } = useLanguage();
  const tc = t.concluded || {};

  const notes = [
    { top: '12%', left: '10%', size: 46, dur: 6, delay: 0 },
    { top: '20%', left: '85%', size: 38, dur: 7, delay: 0.6 },
    { top: '68%', left: '6%', size: 42, dur: 6.5, delay: 1.1 },
    { top: '75%', left: '90%', size: 34, dur: 5.5, delay: 0.3 },
    { top: '40%', left: '92%', size: 30, dur: 8, delay: 1.4 },
    { top: '55%', left: '4%', size: 36, dur: 7.5, delay: 0.8 },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#0C0C0C] overflow-hidden pt-24 pb-16 border-b-[6px] border-dark isolate">
      {/* 金色光暈 + 細緻網點,與 LiveBanner 同款深色舞台 */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(245,184,65,0.14) 0%, rgba(227,38,38,0.05) 35%, transparent 65%)' }}
      ></div>
      <div className="absolute inset-0 bg-halftone opacity-[0.06] pointer-events-none z-0"></div>

      {/* 漂浮音符:謝幕後的慶祝感,比照 Hero/FinalistBanner 已有的音符小動畫做法 */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {notes.map((note, i) => (
          <motion.div
            key={i}
            animate={{ y: [-16, 16, -16], rotate: [-12, 12, -12] }}
            transition={{ duration: note.dur, repeat: Infinity, ease: "easeInOut", delay: note.delay }}
            className="absolute opacity-20"
            style={{ top: note.top, left: note.left }}
          >
            <svg width={note.size} height={note.size} viewBox="0 0 24 24" className="overflow-visible">
              <path d="M9 18V5l12-2v13" fill="none" stroke="#F5B841" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="6" cy="18" r="3" fill="#F5B841"></circle>
              <circle cx="18" cy="16" r="3" fill="#F5B841"></circle>
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-0 inset-x-0 h-14 md:h-20 flex items-end justify-between px-1 gap-0.5 opacity-15 pointer-events-none z-0">
        {[...Array(60)].map((_, i) => (
          <div key={i} className={`w-full bg-primary waveform-bar delay-${(i % 5) + 1}`} style={{ height: `${Math.random() * 100}%`, minHeight: '8px' }}></div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-6 md:gap-8">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading font-bold text-primary/90 text-xs md:text-sm uppercase tracking-[0.5em] flex items-center gap-3"
        >
          <span className="w-8 h-px bg-primary/50"></span>
          {tc.eyebrow || "2026 ASE VOICE · GRAND FINALE"}
          <span className="w-8 h-px bg-primary/50"></span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 70 }}
        >
          <h1 className="font-heading font-black text-white text-4xl sm:text-6xl md:text-7xl tracking-wide leading-tight">
            {tc.title || "好聲音，因你而精彩"}
          </h1>
          <p className="font-heading font-bold text-white/40 text-base sm:text-xl md:text-2xl tracking-[0.35em] uppercase mt-2">
            {tc.titleEn || "THANK YOU FOR SHARING YOUR VOICE"}
          </p>
        </motion.div>

        {/* Subtitle:文案本身帶換行(whitespace-pre-line 保留 \n) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="font-body font-medium text-white/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl whitespace-pre-line"
        >
          {tc.subtitle || "來自日月光投控集團全國各地的十九位好聲音，\n在決賽舞台上唱出熱愛、綻放光芒，\n共同寫下屬於 2026 ASE VOICE 的動人篇章。\n感謝每一位選手傾注全力的演出，\n也謝謝每一位一路相伴、真心喝采的你——\n因為每一份參與與支持，\n都讓這段音樂旅程更加精彩，也更加難忘。"}
        </motion.p>

        {/* CTA:錨點捲到下方回放區,index.css 已設定 html { scroll-behavior: smooth } */}
        <motion.a
          href="#replay"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="inline-flex items-center gap-2 bg-primary text-dark font-heading font-black text-sm md:text-base px-6 py-3 md:px-8 md:py-4 rounded-full border-[3px] border-dark shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-active transition-all uppercase tracking-wider"
        >
          {tc.cta || "精彩回放看這裡"}
          <span className="animate-bounce-x">↓</span>
        </motion.a>
      </div>
    </section>
  );
};

export default ConcludedBanner;
