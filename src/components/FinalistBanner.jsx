import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { chineseGroup, foreignGroup } from '../data/finalistsData';
import AnnouncementBoard from './AnnouncementBoard';

const ContestantCard = ({ contestant }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.05, rotate: Math.random() * 2 - 1 }}
      className="bg-white border-[3px] border-dark rounded-xl p-3 sm:p-4 flex flex-col items-center text-center justify-between shadow-[4px_4px_0_0_#1a1a1a] hover:shadow-[6px_6px_0_0_#1a1a1a] transition-all duration-300 h-full cursor-default relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FFC107] via-[#22C55E] to-[#00F0FF] opacity-80"></div>
      
      <div className="w-full flex justify-end mb-2 mt-1">
        <span className="text-[10px] sm:text-xs font-heading font-bold bg-[#FFC107] text-dark border-2 border-dark px-2 py-0.5 rounded-full whitespace-nowrap shadow-[2px_2px_0_0_#1a1a1a]">
          {contestant.factory}
        </span>
      </div>
      
      <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-dark mb-3 flex-grow flex items-center justify-center font-heading tracking-widest leading-tight">
        {contestant.name}
      </h3>
      
      <div className="w-full bg-gray-50 rounded-lg p-2 border-2 border-dark/20 mt-auto relative z-10">
        <div className="flex items-center justify-center gap-1 mb-0.5">
          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#22C55E]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
          <span className="text-[11px] sm:text-xs font-bold text-dark truncate max-w-[85%]">
            {contestant.songName}
          </span>
        </div>
        <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium truncate w-full">
          - {contestant.originalArtist} -
        </p>
      </div>
    </motion.div>
  );
};

const ContestantGrid = ({ contestants }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4 w-full h-full pb-2">
      {contestants.map((contestant) => (
        <ContestantCard key={contestant.id} contestant={contestant} />
      ))}
    </div>
  );
};

const FinalistBanner = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides = [];
  const chunkSize = 10;
  for (let i = 0; i < chineseGroup.length; i += chunkSize) {
    slides.push({
      title: t.finalistBanner?.chineseGroup || "華語組決賽名單",
      data: chineseGroup.slice(i, i + chunkSize)
    });
  }
  for (let i = 0; i < foreignGroup.length; i += chunkSize) {
    slides.push({
      title: t.finalistBanner?.foreignGroup || "外語組決賽名單",
      data: foreignGroup.slice(i, i + chunkSize)
    });
  }

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

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
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 pointer-events-none origin-bottom flex justify-center mix-blend-multiply"
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

      {/* MIDDLE LAYER: Rich Music Particles & Waves */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          <motion.div
              animate={{ x: [0, -1200] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-[30%] left-0 w-[400vw] h-64 flex flex-col justify-center opacity-30 gap-4"
          >
              <svg viewBox="0 0 1200 100" className="w-full h-12 stroke-white/50 fill-transparent" strokeWidth="4">
                  <path d="M0 50 Q 150 0 300 50 T 600 50 T 900 50 T 1200 50" />
              </svg>
              <svg viewBox="0 0 1200 100" className="w-full h-16 stroke-dark/30 fill-transparent" strokeWidth="6">
                  <path d="M0 50 Q 150 100 300 50 T 600 50 T 900 50 T 1200 50" />
              </svg>
              <svg viewBox="0 0 1200 100" className="w-full h-10 stroke-primary/80 fill-transparent" strokeWidth="3">
                  <path d="M0 50 Q 150 20 300 50 T 600 50 T 900 50 T 1200 50" />
              </svg>
          </motion.div>
          {[
              { type: 'double', top: '10%', left: '15%', size: 64, dur: 6, delay: 0 },
              { type: 'single', top: '22%', left: '45%', size: 48, dur: 4.5, delay: 0.5 },
              { type: 'staff', top: '15%', left: '30%', size: 100, dur: 7, delay: 1.2 },
              { type: 'double', top: '40%', left: '12%', size: 56, dur: 7, delay: 2 },
              { type: 'single', top: '8%', left: '75%', size: 60, dur: 8, delay: 0.8 },
              { type: 'staff', top: '55%', left: '8%', size: 120, dur: 8.5, delay: 1.5 },
              { type: 'double', top: '65%', left: '40%', size: 96, dur: 9, delay: 0.2 },
              { type: 'single', top: '75%', left: '15%', size: 50, dur: 5, delay: 1.0 },
              { type: 'double', top: '80%', left: '32%', size: 70, dur: 6.5, delay: 0.7 },
              { type: 'staff', top: '18%', left: '60%', size: 140, dur: 10, delay: 0 },
              { type: 'single', top: '35%', left: '25%', size: 42, dur: 5.5, delay: 0.3 },
              { type: 'double', top: '50%', left: '5%', size: 60, dur: 6, delay: 1.8 },
              { type: 'double', top: '25%', left: '85%', size: 52, dur: 7.5, delay: 1.1 },
              { type: 'staff', top: '35%', left: '55%', size: 90, dur: 6.5, delay: 0.4 },
              { type: 'single', top: '45%', left: '88%', size: 46, dur: 5, delay: 0.9 },
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
      <div className="absolute inset-0 bg-gradient-to-r from-dark/60 md:from-dark/40 via-transparent to-transparent z-10 pointer-events-none"></div>

      <div className="relative w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col md:flex-row md:items-center flex-grow z-40 pb-16 md:pb-0">
        
        {/* Left Side: Finalist Carousel */}
        <div className="w-full md:w-[65%] lg:w-[70%] flex flex-col justify-center py-8 md:py-0 relative z-40 md:-mt-12">
          
          {/* Live Broadcast Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 z-20 relative w-max md:self-start self-center"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#22C55E] to-[#00F0FF] rounded-full blur-md opacity-80 animate-pulse"></div>
            <div className="relative bg-dark text-white font-heading font-black text-xs sm:text-sm md:text-base px-3 py-1.5 border-[2px] border-white shadow-[3px_3px_0_0_#22C55E] rounded-full flex items-center gap-1.5 transform -rotate-1">
              <span className="animate-bounce text-sm">📺</span>
              {t.finalistBanner?.liveBroadcast || "🔥 9/11 決賽現場實況直播 敬請期待"}
            </div>
          </motion.div>

          <div 
            className="flex flex-col w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="mb-4 text-center md:text-left pl-1 sm:pl-2">
              <motion.div 
                key={currentSlide}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-block bg-white border-[3px] border-dark px-4 sm:px-6 py-1.5 sm:py-2 shadow-[4px_4px_0_0_rgba(26,26,26,1)] transform -rotate-2"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-dark tracking-wide font-heading">
                  {slides[currentSlide].title}
                </h2>
              </motion.div>
            </div>

            <div className="relative flex items-center justify-center w-full min-h-[280px]">
              {/* Navigation Arrows */}
              <button 
                onClick={prevSlide}
                className="absolute left-0 sm:left-2 z-50 p-2 sm:p-3 bg-white border-2 border-dark text-dark rounded-full shadow-[3px_3px_0_0_#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_0_#1a1a1a] transition-all focus:outline-none"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="w-full overflow-visible relative px-12 sm:px-16 py-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-full"
                  >
                    <ContestantGrid contestants={slides[currentSlide].data} />
                  </motion.div>
                </AnimatePresence>
              </div>

              <button 
                onClick={nextSlide}
                className="absolute right-0 sm:right-2 z-50 p-2 sm:p-3 bg-white border-2 border-dark text-dark rounded-full shadow-[3px_3px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_0_#1a1a1a] transition-all focus:outline-none"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center md:justify-start md:pl-8 mt-6 gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full border-2 border-dark transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-dark scale-125' 
                      : 'bg-white'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: AnnouncementBoard */}
        <div className="w-full md:w-[35%] lg:w-[30%] py-8 md:py-0 flex flex-col items-center md:items-end z-40 relative px-2">
          <div className="w-full h-full">
            <AnnouncementBoard />
          </div>
        </div>
      </div>

      {/* Horizontal Bottom Bar for Reminder (Screenshot 2 style) */}
      <div className="absolute bottom-20 md:bottom-28 left-1/2 -translate-x-1/2 w-[95%] max-w-[1200px] z-50">
        <div className="bg-gradient-to-r from-[#1A103C]/95 via-[#3B2875]/95 to-[#1A103C]/95 border-[2px] border-[#6D42D0]/60 shadow-[0_0_30px_rgba(109,66,208,0.6)] backdrop-blur-xl rounded-2xl py-3 md:py-4 px-6 flex items-center justify-center">
            <p className="font-heading font-black text-[#FFC107] text-sm md:text-lg lg:text-xl tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center animate-pulse">
                {t.announcementFinalist?.reminder || "📺 決賽當天將於【本網站】全程實況轉播，敬請鎖定，為你支持的選手集氣加油！🔥"}
            </p>
        </div>
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
