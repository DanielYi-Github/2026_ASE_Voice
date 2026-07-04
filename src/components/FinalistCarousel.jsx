import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { chineseGroup, foreignGroup } from '../data/finalistsData';

// 兩組專屬配色:華語組=暖金、外語組=冰藍,輪播切換時整區色溫改變以利辨識
const GROUP_THEMES = {
  chinese: {
    cardBg: 'bg-[#FFF6E0]',
    topBar: 'bg-gradient-to-r from-[#E32626] via-[#F5B841] to-[#FFC107]',
    factoryBadge: 'bg-[#E32626] text-white',
    idBadge: 'bg-white text-dark',
    songBox: 'bg-white/80 border-[#E32626]/25',
    noteIcon: 'text-[#E32626]',
    titleBox: 'bg-[#E32626] text-white',
    dotActive: 'bg-[#E32626]'
  },
  foreign: {
    cardBg: 'bg-[#E9F8FF]',
    topBar: 'bg-gradient-to-r from-[#0E7490] via-[#00F0FF] to-[#38BDF8]',
    factoryBadge: 'bg-[#0E7490] text-white',
    idBadge: 'bg-white text-dark',
    songBox: 'bg-white/80 border-[#0E7490]/25',
    noteIcon: 'text-[#0E7490]',
    titleBox: 'bg-[#0E7490] text-white',
    dotActive: 'bg-[#0E7490]'
  }
};

export const ContestantCard = ({ contestant, variant = 'chinese' }) => {
  const { t } = useLanguage();
  const theme = GROUP_THEMES[variant] || GROUP_THEMES.chinese;
  const name = contestant.name || '';
  // 只有廠區隨語系切換;工號、姓名、歌名、原唱一律依名單原文顯示,不做翻譯
  const factoryLabel = t.factories?.[contestant.factory] || contestant.factory;
  // 長名字(常見於外語組)降一級字級,但維持可讀下限並允許換行,不截斷
  const nameSizeClass = name.length > 14
    ? 'text-sm sm:text-base lg:text-lg'
    : name.length > 8
      ? 'text-base sm:text-lg lg:text-xl'
      : 'text-lg sm:text-xl lg:text-2xl';

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.04, rotate: Math.random() * 2 - 1 }}
      className={`${theme.cardBg} border-[3px] border-dark rounded-xl p-2.5 sm:p-3.5 flex flex-col items-center text-center shadow-[4px_4px_0_0_#1a1a1a] hover:shadow-[6px_6px_0_0_#1a1a1a] transition-all duration-300 h-full cursor-default relative overflow-hidden`}
    >
      <div className={`absolute top-0 left-0 w-full h-2 ${theme.topBar} opacity-90`}></div>

      <div className="w-full flex justify-between items-center gap-1 mb-2 mt-2">
        <span className={`text-[9px] sm:text-[10px] font-heading font-bold ${theme.idBadge} border-2 border-dark px-1.5 py-0.5 rounded-full whitespace-nowrap`}>
          No.{contestant.employeeId}
        </span>
        <span className={`text-[9px] sm:text-[10px] font-heading font-bold ${theme.factoryBadge} border-2 border-dark px-1.5 py-0.5 rounded-full whitespace-nowrap shadow-[2px_2px_0_0_#1a1a1a]`}>
          {factoryLabel}
        </span>
      </div>

      <h3 className={`${nameSizeClass} font-black text-dark mb-2 flex-grow flex items-center justify-center font-heading leading-tight break-words w-full min-h-[2.6em]`}>
        {contestant.name}
      </h3>

      <div className={`w-full ${theme.songBox} rounded-lg p-2 border-2 mt-auto relative z-10`}>
        <div className="flex items-start justify-center gap-1 mb-0.5">
          <svg className={`w-3 h-3 sm:w-4 sm:h-4 shrink-0 mt-0.5 ${theme.noteIcon}`} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
          <span className="text-[11px] sm:text-xs font-bold text-dark leading-snug line-clamp-2">
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

const ContestantGrid = ({ contestants, variant }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 lg:gap-4 w-full h-full pb-2">
    {contestants.map((contestant) => (
      <ContestantCard key={contestant.id} contestant={contestant} variant={variant} />
    ))}
  </div>
);

// 華語/外語兩組輪播;align 控制標題與圓點在桌機的對齊(hero 版靠左、獨立區塊版置中)
const FinalistCarousel = ({ align = 'left' }) => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides = [];
  const chunkSize = 10;
  for (let i = 0; i < chineseGroup.length; i += chunkSize) {
    slides.push({
      title: t.finalistBanner?.chineseGroup || "華語組決賽名單",
      variant: 'chinese',
      data: chineseGroup.slice(i, i + chunkSize)
    });
  }
  for (let i = 0; i < foreignGroup.length; i += chunkSize) {
    slides.push({
      title: t.finalistBanner?.foreignGroup || "外語組決賽名單",
      variant: 'foreign',
      data: foreignGroup.slice(i, i + chunkSize)
    });
  }

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(interval);
  }, [isHovered, slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const slide = slides[currentSlide];
  const theme = GROUP_THEMES[slide.variant];
  const alignTitle = align === 'left' ? 'text-center md:text-left' : 'text-center';
  const alignDots = align === 'left' ? 'justify-center md:justify-start md:pl-8' : 'justify-center';

  return (
    <div
      className="flex flex-col w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`mb-4 ${alignTitle} pl-1 sm:pl-2`}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`inline-block ${theme.titleBox} border-[3px] border-dark px-4 sm:px-6 py-1.5 sm:py-2 shadow-[4px_4px_0_0_rgba(26,26,26,1)] transform -rotate-2`}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-wide font-heading">
            {slide.title}
          </h2>
        </motion.div>
      </div>

      <div className="relative flex items-center justify-center w-full min-h-[280px]">
        <button
          onClick={prevSlide}
          aria-label="Previous group"
          className="absolute left-0 z-50 p-1.5 sm:p-2.5 bg-white border-2 border-dark text-dark rounded-full shadow-[3px_3px_0_0_#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_0_#1a1a1a] transition-all focus:outline-none"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="w-full overflow-visible relative px-10 sm:px-14 py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full"
            >
              <ContestantGrid contestants={slide.data} variant={slide.variant} />
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={nextSlide}
          aria-label="Next group"
          className="absolute right-0 z-50 p-1.5 sm:p-2.5 bg-white border-2 border-dark text-dark rounded-full shadow-[3px_3px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_0_#1a1a1a] transition-all focus:outline-none"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className={`flex ${alignDots} mt-6 gap-2 items-center`}>
        {slides.map((s, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full border-2 border-dark transition-all duration-300 ${
              currentSlide === index
                ? `${GROUP_THEMES[s.variant].dotActive} w-7`
                : 'bg-white w-3'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FinalistCarousel;
