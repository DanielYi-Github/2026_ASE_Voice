import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { pressRelease } from '../data/pressData';

// 首頁「最新消息」新聞稿卡片:嵌在 ConcludedBanner 感謝標語正下方,一進站首屏就看得到。
// 收合時只露封面照、標題與導言;點「閱讀完整新聞稿」在卡片原位展開全文與附圖說的照片。
// 內文僅中文原文(pressData.js),英/越介面只翻譯按鈕等介面字,並顯示 originalNote 提示。
const PressReleaseCard = () => {
  const { t } = useLanguage();
  const tp = t.press || {};
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);
  const scrollBackRef = useRef(false);

  if (!pressRelease) return null;

  const assetUrl = (src) => `${import.meta.env.BASE_URL}${src}`;

  // 文末收合鈕:收起後捲回卡片頂端,避免讀完長文後停在頁面中段。
  // 捲動要等收合動畫結束(onExitComplete)才執行,動畫進行中頁面高度持續變動會讓捲動失效。
  const collapseAndScroll = () => {
    scrollBackRef.current = true;
    setExpanded(false);
  };

  const handleExitComplete = () => {
    if (!scrollBackRef.current) return;
    scrollBackRef.current = false;
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    // 進場只做淡入不位移:?id=press 在載入 100ms 後就捲動定位,位移動畫會讓卡片停在錯的位置
    <motion.article
      ref={cardRef}
      id="press"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="scroll-mt-24 relative w-full max-w-4xl bg-light border-[4px] border-dark rounded-xl shadow-[8px_8px_0_0_rgba(245,184,65,0.35)] text-left"
    >
      {/* 外凸標籤:沿用 GroupResults 組別標籤樣式 */}
      <div className="absolute -top-5 left-4 sm:left-5 z-10 -rotate-2 bg-secondary text-white border-[3px] border-dark px-4 sm:px-6 py-1.5 shadow-[4px_4px_0_0_#F5B841] whitespace-nowrap flex items-center gap-2">
        <Newspaper className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="font-heading font-black text-base sm:text-xl tracking-wide">{tp.badge || "最新消息"}</span>
      </div>

      {/* 內層負責裁圓角,外層不能 overflow-hidden,否則外凸標籤會被切掉 */}
      <div className="overflow-hidden rounded-lg">
        {/* 新聞稿抬頭:原稿頁首的基金會 logo,比照 Word 置中;白底讓 logo 維持品牌原色、與 JPEG 白背景無縫接合。
            手機上方多留空間,避免被外凸標籤壓到 */}
        {pressRelease.logo && (
          <div className="bg-white border-b-[4px] border-dark flex justify-center px-5 pt-8 pb-3 md:py-3">
            <img src={assetUrl(pressRelease.logo.src)} alt={pressRelease.logo.alt} className="h-9 md:h-14 w-auto" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* 封面照:手機疊在上方維持 2:1(接近原圖 2.2:1,少裁切也省首屏高度);桌機填滿左欄高度 */}
          <div className="relative md:col-span-2 border-b-[4px] md:border-b-0 md:border-r-[4px] border-dark bg-dark">
            <img
              src={assetUrl(pressRelease.cover)}
              alt={pressRelease.title}
              className="w-full aspect-[2/1] object-cover md:absolute md:inset-0 md:h-full md:aspect-auto"
            />
          </div>

          <div className="md:col-span-3 flex flex-col gap-3 px-5 pt-6 pb-5 sm:px-7 sm:pb-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-dark text-primary font-heading font-black text-[11px] md:text-xs px-2.5 py-1 uppercase tracking-widest">
                {tp.label || "新聞稿"}
              </span>
              <span className="font-heading font-bold text-dark/60 text-xs md:text-sm tracking-wider">{pressRelease.date}</span>
            </div>
            {tp.originalNote && (
              <p className="font-body font-bold text-secondary text-xs md:text-sm">{tp.originalNote}</p>
            )}
            <h3 className="font-heading font-black text-dark text-xl sm:text-2xl md:text-[1.75rem] leading-snug">
              {pressRelease.title}
            </h3>
            <p className={`font-body text-dark/80 text-sm md:text-[15px] leading-relaxed ${expanded ? '' : 'line-clamp-3'}`}>
              {pressRelease.lead}
            </p>
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              aria-controls="press-body"
              className="self-start mt-1 btn-brutal btn-secondary px-5 py-2.5 text-sm md:text-base gap-2"
            >
              {expanded ? (tp.collapse || "收合新聞稿") : (tp.readMore || "閱讀完整新聞稿")}
              <ChevronDown size={18} className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* 展開內文:在卡片原位向下展開 */}
        <AnimatePresence initial={false} onExitComplete={handleExitComplete}>
          {expanded && (
            <motion.div
              id="press-body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="border-t-[4px] border-dark bg-white px-5 sm:px-8 md:px-12 py-8 md:py-10">
                <div className="max-w-3xl mx-auto flex flex-col gap-5 md:gap-6">
                  {pressRelease.blocks.map((block, i) => {
                    if (block.type === 'h') {
                      return (
                        <h4 key={i} className="mt-3 font-heading font-black text-dark text-lg md:text-2xl leading-snug border-l-[6px] border-secondary pl-3">
                          {block.text}
                        </h4>
                      );
                    }
                    if (block.type === 'img') {
                      return (
                        <figure key={i} className="my-2">
                          <img
                            src={assetUrl(block.src)}
                            alt={block.caption.replace(/^圖說：/, '')}
                            loading="lazy"
                            className="w-full h-auto border-[3px] border-dark rounded-lg shadow-brutal"
                          />
                          <figcaption className="mt-3 font-body font-medium text-dark/60 text-xs md:text-sm text-center">
                            {block.caption}
                          </figcaption>
                        </figure>
                      );
                    }
                    return (
                      <p key={i} className="font-body text-dark/85 text-[15px] md:text-[17px] leading-[1.9]">
                        {block.text}
                      </p>
                    );
                  })}

                  <button
                    type="button"
                    onClick={collapseAndScroll}
                    className="self-center mt-2 btn-brutal btn-outline px-5 py-2.5 text-sm md:text-base gap-2"
                  >
                    {tp.collapse || "收合新聞稿"}
                    <ChevronDown size={18} className="rotate-180" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
};

export default PressReleaseCard;
