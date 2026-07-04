import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import FinalistCarousel from './FinalistCarousel';

// 8/1 主 Banner 換成冠軍預測活動後,決賽名單下移為此獨立區塊繼續展示
const FinalistShowcase = () => {
  const { t } = useLanguage();

  return (
    <section id="finalists" className="section-padding bg-light border-b-[6px] border-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-halftone opacity-5 pointer-events-none"></div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-8 md:mb-12"
        >
          <div className="bg-primary border-[3px] border-dark p-2 md:p-3 shadow-brutal rotate-[-4deg]">
            <Trophy className="w-6 h-6 md:w-8 md:h-8 text-dark" />
          </div>
          <h2 className="font-heading font-black text-dark text-2xl sm:text-4xl md:text-5xl uppercase tracking-wide text-center">
            {t.finalistBanner?.showcaseTitle || "決賽選手陣容"}
          </h2>
        </motion.div>

        <div className="bg-[#FFC107] border-[4px] border-dark shadow-brutal-lg rounded-2xl px-3 sm:px-6 py-6 md:py-8">
          <FinalistCarousel align="center" />
        </div>
      </div>
    </section>
  );
};

export default FinalistShowcase;
