import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Gift, Shuffle, Store, ShieldAlert, ChevronDown, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { chineseGroup, foreignGroup } from '../data/finalistsData';
import { predictionWinners } from '../data/predictionWinners';

const DRAW_VIDEO_URL = 'https://youtu.be/C9S5-N4Hq6w';

// 9/11 17:30 起接在 ConcludedBanner 下方的冠軍預測得獎公告。沿用 PredictionBanner 的黃色放射光、
// 漂浮圖示與「冠軍預測 PK 賽」白底標題卡,讓參加過預測的同仁一眼認出是同一個活動。
// 抽獎完成、獎項全數發放後,記得一併移除下方的抽獎辦法收合區塊與反詐騙卡,
// 以及 LanguageContext.jsx 三語 predictionDraw.rules 整包翻譯 key。
const PredictionDrawBanner = () => {
  const { t, lang } = useLanguage();
  const tp = t.predictionBanner || {};
  const td = t.predictionDraw || {};
  const tc = t.concluded || {};
  const tr = td.rules || {};
  const [isRulesVisible, setIsRulesVisible] = useState(false);
  const labelColon = lang === 'zh' ? '：' : ': ';

  // 兩組冠軍從名次資料取得，再依預測對象列出各組抽中的得獎者。
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
          <Motion.div
            key={i}
            animate={{ y: [-16, 16, -16], rotate: [-12, 12, -12] }}
            transition={{ duration: item.dur, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute ${item.size} opacity-50 drop-shadow-lg`}
            style={{ top: item.top, left: item.left }}
          >
            {item.icon}
          </Motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-6 md:gap-8">

        {/* 狀態標籤 */}
        <Motion.span
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-dark text-primary font-heading font-black text-xs md:text-sm px-4 py-1.5 border-2 border-white rounded-full uppercase tracking-[0.25em] shadow-brutal"
        >
          <span className="w-2 h-2 rounded-full bg-secondary"></span>
          🎁 {td.status || "得獎名單公布"}
        </Motion.span>

        {/* 標題卡:與 PredictionBanner 同款白底粗框 */}
        <Motion.div
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
            {td.title || "幸運得獎者公布"}
          </p>
        </Motion.div>

        {/* 說明文 */}
        <Motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl font-body font-bold text-dark text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line break-keep bg-light/80 border-[3px] border-dark px-4 md:px-8 py-3 md:py-4 shadow-brutal"
        >
          {td.body || "感謝每一位參與冠軍預測的同仁！兩組各抽出 50 位得獎者，名單如下。"}
        </Motion.p>

        <a
          href={DRAW_VIDEO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-dark text-white font-heading font-black text-sm md:text-base px-5 py-2.5 border-[3px] border-dark shadow-brutal hover:bg-secondary focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-dark transition-colors"
        >
          {td.watchDrawVideo || "觀看抽獎影片"}
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </a>

        {/* 對答案:本屆兩組冠軍 */}
        {champions.length > 0 && (
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full flex flex-col items-center gap-4"
          >
            <span className="font-heading font-black text-dark text-base md:text-xl tracking-wider">
              ▼ {td.champions || "對答案！本屆冠軍"} ▼
            </span>
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 items-start">
              {champions.map(({ group, tag, contestant }) => {
                const winners = predictionWinners.filter((winner) => winner.prediction === contestant.name);
                return (
                  <div key={contestant.id} className="min-w-0 bg-white border-[3px] border-dark shadow-brutal rounded-xl overflow-hidden text-left">
                    <div className="px-4 sm:px-5 py-4 flex items-center gap-3 border-b-[3px] border-dark">
                      <span className="text-4xl md:text-5xl shrink-0" aria-hidden="true">👑</span>
                      <div className="min-w-0">
                        <span className={`inline-block ${tag} text-white font-heading font-black text-[11px] md:text-xs px-2 py-0.5 border-2 border-dark uppercase tracking-wider`}>
                          {group}
                        </span>
                        <h3 className="font-heading font-black text-dark text-xl md:text-2xl leading-tight mt-1.5 break-words">{contestant.name}</h3>
                      </div>
                    </div>
                    <div className="bg-light/70 px-4 sm:px-5 py-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 mb-3">
                        <h4 className="font-heading font-black text-dark text-base sm:text-lg">{td.winnersHeading || "以下是成功預測冠軍且中獎的得獎者"}</h4>
                        <span className="font-bold text-dark/65 text-xs sm:text-sm">{winners.length} {td.winnersUnit || "位"}</span>
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
                        {winners.map((winner) => (
                          <li key={winner.employeeId} className="min-w-0 bg-white border-2 border-dark/20 rounded-lg px-3 py-2.5">
                            <p className="font-bold text-dark/70 text-xs leading-snug break-words">{t.factories?.[winner.factory] || winner.factory}</p>
                            <div className="flex flex-wrap items-baseline justify-between gap-x-2 mt-1">
                              <span className="font-heading font-black text-dark text-base leading-snug break-words">{winner.name}</span>
                              <span className="font-body font-bold text-dark/70 text-xs whitespace-nowrap">{winner.employeeId}</span>
                            </div>
                            <p className="font-medium text-dark/65 text-xs leading-snug mt-1 break-words">
                              {td.predictionLabel || "預測對象"}{labelColon}{winner.prediction}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </Motion.div>
        )}

        <div className="w-full max-w-3xl bg-white border-[3px] border-dark shadow-brutal px-5 sm:px-7 py-5 text-left">
          <h3 className="font-heading font-black text-dark text-lg md:text-xl mb-3">{td.deliveryTitle || "獎品發放方式"}</h3>
          <ul className="space-y-2 font-body font-bold text-dark text-sm md:text-base leading-relaxed">
            <li>{td.deliveryByContact}</li>
            <li>{td.deliveryByMail}</li>
          </ul>
        </div>

        {/* 抽獎辦法收合區塊:按鈕互動比照 QASection 的 press-down 陰影樣式 */}
        <div className="w-full max-w-2xl flex flex-col items-center gap-5 text-left">
          <button
            onClick={() => setIsRulesVisible((prev) => !prev)}
            className={`group inline-flex items-center gap-2 font-heading font-black tracking-wide text-sm md:text-base px-6 py-3 border-[3px] border-dark transition-all duration-300 cursor-pointer ${
              isRulesVisible
                ? 'bg-dark text-primary shadow-[0px_0px_0_0_rgba(26,26,26,1)] translate-x-1 translate-y-1'
                : 'bg-white text-dark shadow-brutal hover:shadow-brutal-active hover:translate-x-1 hover:translate-y-1'
            }`}
          >
            {isRulesVisible ? (tr.toggleHide || "收合抽獎辦法") : (tr.toggleShow || "查看完整抽獎辦法")}
            <ChevronDown className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 ${isRulesVisible ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isRulesVisible && (
              <Motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full overflow-hidden"
              >
                <div className="w-full bg-white border-[3px] border-dark shadow-brutal p-5 md:p-8 flex flex-col gap-6">
                  {/* 獎品與名額 */}
                  <div>
                    <div className="flex items-center gap-3 mb-3 border-b-[3px] border-dark pb-2">
                      <Gift className="text-secondary w-6 h-6 shrink-0" />
                      <h4 className="font-heading font-black text-dark text-base md:text-lg uppercase tracking-wide">{tr.prizeTitle || "獎品與中獎名額"}</h4>
                    </div>
                    <p className="font-body font-bold text-dark text-sm md:text-base leading-relaxed">{tr.prizeDesc}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                      <span className="inline-block bg-secondary text-white font-heading font-bold text-xs md:text-sm px-3 py-1.5 border-2 border-dark text-center">
                        {tr.prizeMandarinLabel}
                      </span>
                      <span className="inline-block bg-[#0E7490] text-white font-heading font-bold text-xs md:text-sm px-3 py-1.5 border-2 border-dark text-center">
                        {tr.prizeForeignLabel}
                      </span>
                    </div>
                  </div>

                  {/* 抽獎方式 */}
                  <div>
                    <div className="flex items-center gap-3 mb-3 border-b-[3px] border-dark pb-2">
                      <Shuffle className="text-secondary w-6 h-6 shrink-0" />
                      <h4 className="font-heading font-black text-dark text-base md:text-lg uppercase tracking-wide">{tr.methodTitle || "抽獎方式"}</h4>
                    </div>
                    <ul className="flex flex-col gap-2">
                      {(tr.methodItems || []).map((item, i) => (
                        <li key={i} className="font-body font-bold text-dark text-sm md:text-base leading-relaxed flex gap-2">
                          <span className="text-secondary shrink-0">▪</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 領獎方式與資格 */}
                  <div>
                    <div className="flex items-center gap-3 mb-3 border-b-[3px] border-dark pb-2">
                      <Store className="text-secondary w-6 h-6 shrink-0" />
                      <h4 className="font-heading font-black text-dark text-base md:text-lg uppercase tracking-wide">{tr.claimTitle || "領獎方式與資格"}</h4>
                    </div>
                    <ul className="flex flex-col gap-2">
                      {(tr.claimItems || []).map((item, i) => (
                        <li key={i} className="font-body font-bold text-dark text-sm md:text-base leading-relaxed flex gap-2">
                          <span className="text-secondary shrink-0">▪</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    {tr.claimEligibilityNote && (
                      <p className="font-body text-dark/60 text-xs md:text-sm leading-relaxed mt-3 pt-3 border-t-2 border-dashed border-dark/30">
                        {tr.claimEligibilityNote}
                      </p>
                    )}
                  </div>
                </div>
              </Motion.div>
            )}
          </AnimatePresence>

          {/* 反詐騙提醒:永遠顯示,不放進收合區塊 */}
          <div className="w-full bg-secondary text-white border-[3px] border-dark shadow-brutal p-5 md:p-8">
            <div className="flex items-center gap-3 mb-3 border-b-[3px] border-white pb-2">
              <ShieldAlert className="w-6 h-6 shrink-0" />
              <h4 className="font-heading font-black text-base md:text-lg uppercase tracking-wide">{tr.antifraudTitle || "反詐騙提醒"}</h4>
            </div>
            {tr.antifraudIntro && (
              <p className="font-body font-bold text-sm md:text-base leading-relaxed mb-3">{tr.antifraudIntro}</p>
            )}
            <ul className="flex flex-col gap-2">
              {(tr.antifraudItems || []).map((item, i) => (
                <li key={i} className="font-body text-sm md:text-base leading-relaxed">
                  <span className="font-heading font-black">{item.label}{labelColon}</span>
                  <span className="font-bold">{item.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PredictionDrawBanner;
