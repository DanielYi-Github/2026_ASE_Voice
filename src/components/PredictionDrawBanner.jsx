import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { chineseGroup, foreignGroup } from '../data/finalistsData';

// 9/11 17:30 起接在 ConcludedBanner 下方的冠軍預測抽獎提醒。沿用 PredictionBanner 的黃色放射光、
// 漂浮圖示與「冠軍預測 PK 賽」白底標題卡,讓參加過預測的同仁一眼認出是同一個活動。
// 抽獎規則(名額、獎項、通知方式)不在 repo 內,文案刻意只講「近期內抽獎並發放」;抽獎完成後記得更新或移除此區塊。
const PredictionDrawBanner = () => {
  const { t } = useLanguage();
  const tp = t.predictionBanner || {};
  const td = t.predictionDraw || {};
  const tc = t.concluded || {};

  // 對答案:兩組冠軍直接從名次資料取,不另外寫死;組別標籤沿用成績區配色(華語組=紅、外語組=藍綠)
  const champions = [
    { group: tc.groupMandarin || "華語組", tag: 'bg-secondary', contestant: chineseGroup.find((c) => c.award === 'first') },
    { group: tc.groupForeign || "外語組", tag: 'bg-[#0E7490]', contestant: foreignGroup.find((c) => c.award === 'first') },
  ].filter((x) => x.contestant);

  return (
    <section id="prediction-draw" className="relative bg-[#FFC107] overflow-hidden py-16 md:py-24 border-b-[6px] border-dark isolate">
      {/* BACKGROUND: Sunburst + Halftone(與 PredictionBanner 一致) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] rounded-full bg-sunburst opacity-80 pointer-events-none z-[-2] origin-center animate-[spin_120s_linear_infinite]"></div>
      <div className="absolute inset-0 bg-halftone opacity-10 pointer-events-none z-[-1]"></div>

      {/* 漂浮圖示:禮物、獎盃、幸運草,呼應抽獎主題 */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {[
          { icon: '🎁', top: '10%', left: '8%', size: 'text-5xl', dur: 5 },
          { icon: '🏆', top: '14%', left: '86%', size: 'text-6xl', dur: 7 },
          { icon: '🍀', top: '70%', left: '5%', size: 'text-4xl', dur: 6 },
          { icon: '🎉', top: '74%', left: '90%', size: 'text-5xl', dur: 4.5 },
          { icon: '👑', top: '42%', left: '93%', size: 'text-4xl', dur: 8 },
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

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-6 md:gap-8">

        {/* 狀態標籤 */}
        <motion.span
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-dark text-primary font-heading font-black text-xs md:text-sm px-4 py-1.5 border-2 border-white rounded-full uppercase tracking-[0.25em] shadow-brutal"
        >
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          🎁 {td.status || "抽獎準備中"}
        </motion.span>

        {/* 標題卡:與 PredictionBanner 同款白底粗框 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 80 }}
          className="bg-white border-[4px] border-dark shadow-brutal-lg px-6 md:px-12 py-4 md:py-6 -rotate-1"
        >
          <h2 className="font-heading font-black text-dark text-3xl sm:text-5xl md:text-6xl tracking-wide leading-tight">
            {tp.title || "日月光好聲音冠軍預測活動"}
          </h2>
          <p className="font-heading font-bold text-secondary text-base sm:text-xl md:text-2xl tracking-[0.2em] mt-1 uppercase">
            {td.title || "幸運抽獎・即刻揭曉"}
          </p>
        </motion.div>

        {/* 說明文 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl font-body font-bold text-dark text-sm sm:text-base md:text-lg leading-relaxed text-balance break-keep bg-light/80 border-[3px] border-dark px-4 md:px-8 py-3 md:py-4 shadow-brutal"
        >
          {td.body || "感謝每一位參與冠軍預測的同仁！預測活動已於 9/10\u00A023:59 圓滿截止，成功猜中冠軍的你，我們將於近期內完成抽獎並發放獎品——好運也許就在你身邊，敬請期待！"}
        </motion.p>

        {/* 對答案:本屆兩組冠軍 */}
        {champions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-3xl flex flex-col items-center gap-4"
          >
            <span className="font-heading font-black text-dark text-base md:text-xl tracking-wider">
              ▼ {td.champions || "對答案！本屆冠軍"} ▼
            </span>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {champions.map(({ group, tag, contestant }) => (
                <div key={contestant.id} className="bg-white border-[3px] border-dark shadow-brutal rounded-xl px-4 py-4 flex items-center gap-3 text-left">
                  <span className="text-4xl md:text-5xl shrink-0">👑</span>
                  <div className="min-w-0">
                    <span className={`inline-block ${tag} text-white font-heading font-black text-[11px] md:text-xs px-2 py-0.5 border-2 border-dark uppercase tracking-wider`}>
                      {group}
                    </span>
                    <p className="font-heading font-black text-dark text-xl md:text-2xl leading-tight mt-1.5 break-words">{contestant.name}</p>
                    <p className="text-xs md:text-sm font-bold text-dark/60 mt-0.5">♪ {contestant.songName} - {contestant.originalArtist}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PredictionDrawBanner;
