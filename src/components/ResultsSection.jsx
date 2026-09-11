import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { chineseGroup, foreignGroup } from '../data/finalistsData';
import { ContestantCard } from './FinalistCarousel';

const TIER_ORDER = ['first', 'second', 'third', 'merit'];
const TIER_ICON = { first: '🏆', second: '🥈', third: '🥉', merit: '🎖️' };

// 篩出有名次的選手,依 冠軍→亞軍→季軍→佳作 排序;award 為 null 的(還沒公布)不會出現
const sortByAward = (contestants) =>
  contestants
    .filter((c) => c.award)
    .sort((a, b) => TIER_ORDER.indexOf(a.award) - TIER_ORDER.indexOf(b.award));

const GroupResults = ({ title, contestants, variant, tierLabel }) => {
  if (contestants.length === 0) return null;
  return (
    <div className="flex flex-col w-full">
      <h3 className="font-heading font-black text-xl md:text-2xl text-dark mb-4 text-center md:text-left">
        {title}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 w-full">
        {contestants.map((contestant) => (
          <div key={contestant.id} className="relative pt-2 pl-1">
            <span className="absolute top-0 left-0 z-20 bg-dark text-white text-[10px] md:text-xs font-heading font-black px-2 py-1 rounded-full border-2 border-white shadow-[2px_2px_0_0_rgba(26,26,26,1)] whitespace-nowrap">
              {TIER_ICON[contestant.award]} {tierLabel(contestant.award)}
            </span>
            <ContestantCard contestant={contestant} variant={variant} />
          </div>
        ))}
      </div>
    </div>
  );
};

// 9/11 17:30 起,ReplaySection 下方的決賽成績公布區塊。
// 兩組選手全部 award 都還是 null(成績還沒告訴我)時,不渲染任何東西,跟 PressReleaseCard 同一套「資料空就隱藏」慣例。
const ResultsSection = () => {
  const { t } = useLanguage();
  const tc = t.concluded || {};

  const mandarinResults = sortByAward(chineseGroup);
  const foreignResults = sortByAward(foreignGroup);

  if (mandarinResults.length === 0 && foreignResults.length === 0) return null;

  const tierLabel = (award) => ({
    first: tc.tierFirst || "冠軍",
    second: tc.tierSecond || "亞軍",
    third: tc.tierThird || "季軍",
    merit: tc.tierMerit || "佳作",
  }[award]);

  return (
    <section id="results" className="section-padding bg-light border-b-[6px] border-dark relative overflow-hidden">
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
            {tc.resultsTitle || "決賽成績公布"}
          </h2>
        </motion.div>

        <div className="flex flex-col gap-10 md:gap-14">
          <GroupResults
            title={t.finalistBanner?.chineseGroup || "華語組決賽名單"}
            contestants={mandarinResults}
            variant="chinese"
            tierLabel={tierLabel}
          />
          <GroupResults
            title={t.finalistBanner?.foreignGroup || "外語組決賽名單"}
            contestants={foreignResults}
            variant="foreign"
            tierLabel={tierLabel}
          />
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
