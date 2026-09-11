import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { pressItems } from '../data/pressData';

const HEADING = { zh: "最新消息", en: "Latest News", vi: "Tin Mới Nhất" };
const READ_MORE = { zh: "閱讀全文", en: "Read More", vi: "Đọc Thêm" };

// 新聞稿保留區塊:pressData.js 是空陣列時整個 section 不渲染,
// 新聞稿送達後只需要在 pressData.js 填一筆資料,這裡就會自動出現,不用動日期邏輯或元件本身。
const PressReleaseSection = () => {
  const { lang } = useLanguage();

  if (pressItems.length === 0) return null;

  return (
    <section id="press" className="section-padding bg-light border-b-[6px] border-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-halftone opacity-5 pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-8 md:mb-12"
        >
          <div className="bg-primary border-[3px] border-dark p-2 md:p-3 shadow-brutal rotate-[3deg]">
            <Newspaper className="w-6 h-6 md:w-8 md:h-8 text-dark" />
          </div>
          <h2 className="font-heading font-black text-dark text-2xl sm:text-4xl md:text-5xl uppercase tracking-wide text-center">
            {HEADING[lang] || HEADING.zh}
          </h2>
        </motion.div>

        <div className="flex flex-col gap-6">
          {pressItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border-[3px] border-dark rounded-xl p-5 md:p-6 shadow-brutal flex flex-col gap-2"
            >
              {item.date && (
                <span className="font-heading font-bold text-secondary text-xs md:text-sm tracking-wide">
                  {item.date}
                </span>
              )}
              <h3 className="font-heading font-black text-dark text-lg md:text-xl">{item.title}</h3>
              {item.summary && (
                <p className="font-body text-dark/70 text-sm md:text-base leading-relaxed">{item.summary}</p>
              )}
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start mt-2 btn-brutal btn-secondary px-4 py-2 text-xs md:text-sm"
                >
                  {READ_MORE[lang] || READ_MORE.zh}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PressReleaseSection;
