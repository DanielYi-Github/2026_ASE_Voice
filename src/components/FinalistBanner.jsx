import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import AnnouncementBoard from './AnnouncementBoard';
import FinalistCarousel from './FinalistCarousel';
import LiveTeaserStrip from './LiveTeaserStrip';
import PredictionTeaserStrip from './PredictionTeaserStrip';

const FinalistBanner = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start bg-[#FFC107] overflow-hidden pt-20 border-b-[6px] border-dark isolate">
      {/* BACKGROUND LAYER: Radial Sunburst & Halftone */}
      <div className="absolute left-1/2 top-[45vh] md:top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] rounded-full bg-sunburst opacity-80 pointer-events-none z-[-2] origin-center animate-[spin_120s_linear_infinite]"></div>
      <div className="absolute inset-0 bg-halftone opacity-10 pointer-events-none z-[-1]"></div>

      {/* CENTER: MASSIVE MICROPHONE — pinned bottom-center (Like Hero.jsx) */}
      <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3, type: "spring", stiffness: 40 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-0 pointer-events-none origin-bottom flex justify-center mix-blend-multiply"
          style={{ width: 'clamp(380px, 50vw, 820px)', height: '92vh' }}
      >
          <picture>
              <source srcSet={`${import.meta.env.BASE_URL}pure-mic.webp`} type="image/webp" />
              <img
                  src={`${import.meta.env.BASE_URL}pure-mic.png`}
                  alt="ASE Voice Retro Microphone Pop Art"
                  className="w-auto h-full max-h-[100%] object-contain object-bottom drop-shadow-xl"
              />
          </picture>
      </motion.div>

      {/* MIDDLE LAYER: Music Particles */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {[
              { type: 'double', top: '10%', left: '15%', size: 64, dur: 6, delay: 0 },
              { type: 'single', top: '22%', left: '45%', size: 48, dur: 4.5, delay: 0.5 },
              { type: 'staff', top: '15%', left: '30%', size: 100, dur: 7, delay: 1.2 },
              { type: 'single', top: '8%', left: '75%', size: 60, dur: 8, delay: 0.8 },
              { type: 'double', top: '25%', left: '85%', size: 52, dur: 7.5, delay: 1.1 },
              { type: 'single', top: '45%', left: '88%', size: 46, dur: 5, delay: 0.9 },
              { type: 'staff', top: '18%', left: '60%', size: 140, dur: 10, delay: 0 },
          ].map((note, i) => (
              <motion.div
                  key={i}
                  animate={{ y: [-20, 20, -20], rotate: [-15, 15, -15] }}
                  transition={{ duration: note.dur, repeat: Infinity, ease: "easeInOut", delay: note.delay }}
                  className="absolute opacity-40 z-20"
                  style={{ top: note.top, left: note.left }}
              >
                  {note.type === 'double' && (
                      <svg width={note.size} height={note.size} viewBox="0 0 24 24" className="overflow-visible">
                          <path d="M9 18V5l12-2v13" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="6" cy="18" r="3" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2"></circle>
                          <circle cx="18" cy="16" r="3" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2"></circle>
                      </svg>
                  )}
                  {note.type === 'single' && (
                      <svg width={note.size} height={note.size} viewBox="0 0 24 24" className="overflow-visible">
                          <path d="M9 18V5" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M9 5c3 0 7 2 7 6" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="6" cy="18" r="3" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2"></circle>
                      </svg>
                  )}
                  {note.type === 'staff' && (
                      <svg width={note.size} height={note.size * 0.5} viewBox="0 0 100 50" className="overflow-visible">
                          <path d="M 0 10 Q 25 2 50 10 T 100 10 M 0 18 Q 25 10 50 18 T 100 18 M 0 26 Q 25 18 50 26 T 100 26 M 0 34 Q 25 26 50 34 T 100 34 M 0 42 Q 25 34 50 42 T 100 42" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
                          <ellipse cx="30" cy="26" rx="4" ry="3" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" transform="rotate(-20 30 26)"></ellipse>
                          <path d="M 33 26 V 5" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"></path>
                          <ellipse cx="65" cy="18" rx="4" ry="3" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" transform="rotate(-20 65 18)"></ellipse>
                          <path d="M 68 18 V -3" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"></path>
                      </svg>
                  )}
              </motion.div>
          ))}
      </div>

      {/* OVERLAY LAYER for readable text */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark/50 md:from-dark/30 via-transparent to-transparent z-10 pointer-events-none"></div>

      <div className="relative w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col md:flex-row md:items-center flex-grow z-40">

        {/* Left 2/3: Finalist Carousel */}
        <div className="w-full md:w-2/3 flex flex-col justify-center py-8 md:py-0 relative z-40">

          {/* Live Broadcast Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 z-20 relative w-max max-w-full md:self-start self-center"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#22C55E] to-[#00F0FF] rounded-full blur-md opacity-80 animate-pulse"></div>
            <div className="relative bg-dark text-white font-heading font-black text-xs sm:text-sm md:text-base px-3 py-1.5 border-[2px] border-white shadow-[3px_3px_0_0_#22C55E] rounded-full flex items-center gap-1.5 transform -rotate-1">
              <span className="animate-bounce text-sm">📺</span>
              {t.finalistBanner?.liveBroadcast || "🔥 9/11 決賽現場實況直播 敬請期待"}
            </div>
          </motion.div>

          <FinalistCarousel align="left" />
        </div>

        {/* Right 1/3: AnnouncementBoard */}
        <div className="w-full md:w-1/3 py-8 md:py-0 flex flex-col items-center md:items-end z-40 relative px-2">
          <div className="w-full h-full">
            <AnnouncementBoard />
          </div>
        </div>
      </div>

      {/* In-flow 重要訊息匡:9/11 直播預告 + 冠軍預測預告,兩者同款樣式並排,確保首屏可見 */}
      <div className="relative w-full max-w-[1200px] mx-auto px-4 sm:px-6 z-40 pb-24 md:pb-28 pt-4 flex flex-col gap-5 md:gap-6">
        <LiveTeaserStrip />
        <PredictionTeaserStrip />
      </div>

      {/* Subdued Bottom Waveform */}
      <div className="absolute bottom-0 inset-x-0 h-16 md:h-24 flex items-end justify-between px-1 md:px-2 gap-0.5 md:gap-1 opacity-20 pointer-events-none z-20">
          {[...Array(50)].map((_, i) => (
              <div
                  key={i}
                  className={`w-full bg-dark waveform-bar delay-${(i % 5) + 1}`}
                  style={{ height: `${Math.random() * 100}%`, minHeight: '10px' }}
              ></div>
          ))}
      </div>
    </section>
  );
};

export default FinalistBanner;
