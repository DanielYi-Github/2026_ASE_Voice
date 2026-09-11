import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Trophy, Play, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { chineseGroup, foreignGroup } from '../data/finalistsData';
import { LIVE_VIDEO_URL } from '../config/liveConfig';
import { getYouTubeVideoId } from '../utils/registrationUtils';
import PressReleaseCard from './PressReleaseCard';

// 頒獎台排列:桌機為 亞軍|冠軍|季軍(冠軍居中、台座最高);手機改成直向名次列表,冠軍排第一
const PODIUM = [
  { award: 'second', rank: 2, labelKey: 'tierSecond', fallback: '亞軍', block: 'bg-[#D9DEE5]', height: 'sm:h-24' },
  { award: 'first', rank: 1, labelKey: 'tierFirst', fallback: '冠軍', block: 'bg-primary', height: 'sm:h-[7.5rem]' },
  { award: 'third', rank: 3, labelKey: 'tierThird', fallback: '季軍', block: 'bg-[#E0A06A]', height: 'sm:h-[4.5rem]' },
];

const GroupResults = ({ title, tabColor, contestants }) => {
  const { t } = useLanguage();
  const tc = t.concluded || {};
  const factoryLabel = (c) => t.factories?.[c.factory] || c.factory;
  const merits = contestants.filter((c) => c.award === 'merit');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative bg-white/[0.04] border-2 border-white/15 rounded-2xl px-3 sm:px-5 pt-12 pb-5 sm:pb-6"
    >
      {/* 組別標籤:華語組=紅、外語組=藍綠,沿用 FinalistCarousel 的組別配色 */}
      <div className={`absolute -top-5 left-4 sm:left-5 -rotate-2 ${tabColor} text-white border-[3px] border-dark px-5 sm:px-7 py-1.5 shadow-[4px_4px_0_0_#F5B841] whitespace-nowrap`}>
        <h3 className="font-heading font-black text-lg sm:text-2xl tracking-wide">{title}</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 sm:items-end gap-3 sm:gap-2 lg:gap-3">
        {PODIUM.map((tier) => {
          const c = contestants.find((x) => x.award === tier.award);
          if (!c) return null;
          const isChampion = tier.rank === 1;
          const nameSize = c.name.length > 14
            ? 'text-base sm:text-sm lg:text-lg'
            : c.name.length > 8
              ? 'text-lg sm:text-base lg:text-xl'
              : 'text-xl sm:text-lg lg:text-2xl';
          return (
            <div
              key={tier.award}
              className={`flex sm:flex-col-reverse drop-shadow-[4px_4px_0_rgba(245,184,65,0.35)] ${isChampion ? 'order-first sm:order-none' : ''}`}
            >
              {/* 台座:名次數字 + 名次名稱 */}
              <div className={`${tier.block} ${tier.height} w-[5.5rem] shrink-0 sm:w-auto border-[3px] border-dark rounded-l-xl sm:rounded-none flex flex-col items-center justify-center px-1`}>
                <span className="font-heading font-black text-dark text-3xl sm:text-4xl leading-none">{tier.rank}</span>
                <span className="font-heading font-bold text-dark text-[10px] sm:text-xs uppercase tracking-wide text-center leading-tight mt-1">
                  {tc[tier.labelKey] || tier.fallback}
                </span>
              </div>
              {/* 選手資訊:姓名不截斷,長名字降一級字級 */}
              <div className="relative flex-1 bg-light border-[3px] border-l-0 sm:border-l-[3px] sm:border-b-0 border-dark rounded-r-xl sm:rounded-br-none sm:rounded-tl-xl px-3 py-3 sm:pt-6 sm:pb-3 sm:min-h-[10.5rem] lg:min-h-[12.5rem] flex flex-col justify-center text-left sm:text-center">
                {isChampion && (
                  <span className="absolute -top-4 -right-2 rotate-12 sm:-top-6 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 sm:rotate-0 text-2xl sm:text-3xl">👑</span>
                )}
                <p className={`${nameSize} font-heading font-black text-dark leading-tight break-words`}>{c.name}</p>
                <p className="text-[11px] sm:text-[10px] lg:text-xs font-bold text-dark/55 mt-0.5">{factoryLabel(c)}</p>
                <p className="text-xs sm:text-[11px] lg:text-xs font-bold text-dark leading-snug mt-2">♪ {c.songName}</p>
                <p className="text-[10px] lg:text-[11px] font-medium text-dark/50">-&nbsp;{c.originalArtist}&nbsp;-</p>
              </div>
            </div>
          );
        })}
      </div>

      {merits.length > 0 && (
        <div className="mt-7">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px flex-1 bg-white/20"></span>
            <span className="font-heading font-black text-primary text-sm sm:text-base uppercase tracking-[0.2em] whitespace-nowrap">
              🎖️ {tc.tierMerit || '特別獎'}
            </span>
            <span className="h-px flex-1 bg-white/20"></span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {merits.map((c) => (
              <li key={c.id} className="bg-white/[0.06] border border-white/15 rounded-lg px-3 py-2">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-heading font-bold text-white text-sm sm:text-base leading-tight">{c.name}</span>
                  <span className="shrink-0 text-[10px] sm:text-[11px] font-bold text-white/45">{factoryLabel(c)}</span>
                </div>
                <p className="text-[11px] sm:text-xs text-white/60 leading-snug mt-0.5">♪ {c.songName} - {c.originalArtist}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

// 9/11 17:30 起取代 LiveBanner:賽後主視覺。延續 LiveBanner 的深色舞台語彙,由上而下為
// 感謝標語 → 最新消息新聞稿卡片 → 兩組決賽成績(頒獎台 + 特別獎)→ 感謝文 + 決賽直播回放框。
// 名次讀取 finalistsData.js 的 award 欄位。
const ConcludedBanner = () => {
  const { t } = useLanguage();
  const tc = t.concluded || {};
  const [loaded, setLoaded] = useState(false);
  const videoId = getYouTubeVideoId(LIVE_VIDEO_URL);
  const replayRef = useRef(null);
  const replayInView = useInView(replayRef, { amount: 0.3 });

  const notes = [
    { top: '4%', left: '10%', size: 46, dur: 6, delay: 0 },
    { top: '8%', left: '85%', size: 38, dur: 7, delay: 0.6 },
    { top: '38%', left: '3%', size: 42, dur: 6.5, delay: 1.1 },
    { top: '52%', left: '95%', size: 34, dur: 5.5, delay: 0.3 },
    { top: '78%', left: '92%', size: 30, dur: 8, delay: 1.4 },
    { top: '86%', left: '4%', size: 36, dur: 7.5, delay: 0.8 },
  ];

  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-start bg-[#0C0C0C] overflow-hidden pt-28 md:pt-32 pb-24 md:pb-32 border-b-[6px] border-dark isolate">
        {/* 金色光暈 + 細緻網點,與 LiveBanner 同款深色舞台 */}
        <div className="absolute left-1/2 top-[45vh] -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] rounded-full pointer-events-none z-0"
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

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-14 md:gap-16">

          {/* 1. 感謝標語 */}
          <div className="flex flex-col items-center text-center gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading font-bold text-primary/90 text-xs md:text-sm uppercase tracking-[0.5em] flex items-center gap-3"
            >
              <span className="w-8 h-px bg-primary/50"></span>
              {tc.eyebrow || "2026 ASE VOICE · GRAND FINALE"}
              <span className="w-8 h-px bg-primary/50"></span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 70 }}
            >
              <h1 className="font-heading font-black text-white text-4xl sm:text-6xl md:text-7xl tracking-wide leading-tight break-keep">
                {tc.title || "日月光好聲音，因你而精彩"}
              </h1>
              <p className="font-heading font-bold text-white/40 text-base sm:text-xl md:text-2xl tracking-[0.35em] uppercase mt-2">
                {tc.titleEn || "THANK YOU FOR SHARING YOUR VOICE"}
              </p>
            </motion.div>
          </div>

          {/* 2. 最新消息:新聞稿卡片,首屏可見、點擊原位展開全文 */}
          <PressReleaseCard />

          {/* 3. 決賽成績 */}
          <div id="results" className="relative scroll-mt-24 w-full flex flex-col items-center gap-12 md:gap-14">
            {/* 頒獎光芒:沿用 Hero 的 sunburst,在深色舞台上只留淡淡金色放射光 */}
            <div
              className="absolute left-1/2 top-8 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-sunburst opacity-[0.08] pointer-events-none -z-10 animate-[spin_120s_linear_infinite]"
              style={{ maskImage: 'radial-gradient(circle, #000 0%, transparent 65%)', WebkitMaskImage: 'radial-gradient(circle, #000 0%, transparent 65%)' }}
            ></div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-3"
            >
              <div className="bg-primary border-[3px] border-dark p-2 md:p-2.5 shadow-[4px_4px_0_0_#E32626] rotate-[-4deg]">
                <Trophy className="w-6 h-6 md:w-8 md:h-8 text-dark" />
              </div>
              <h2 className="font-heading font-black text-white text-2xl sm:text-4xl md:text-5xl uppercase tracking-wide text-center">
                {tc.resultsTitle || "決賽成績公布"}
              </h2>
            </motion.div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-8">
              <GroupResults title={tc.groupMandarin || "華語組"} tabColor="bg-secondary" contestants={chineseGroup} />
              <GroupResults title={tc.groupForeign || "外語組"} tabColor="bg-[#0E7490]" contestants={foreignGroup} />
            </div>
          </div>

          {/* 4. 感謝文 + 決賽直播回放框(點擊才載入 iframe,比照 PastHighlights.jsx 的 VideoCard) */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 relative border-l-[4px] border-primary pl-5 md:pl-7"
            >
              <span className="absolute -top-8 left-3 font-heading font-black text-primary/30 text-7xl leading-none select-none">“</span>
              {/* 文案本身帶換行(whitespace-pre-line 保留 \n) */}
              <p className="font-body font-medium text-white/80 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {tc.subtitle || "來自日月光投控集團全國各地的十九位好聲音，\n在決賽舞台上唱出熱愛、綻放光芒，\n共同寫下屬於 2026 ASE VOICE 的動人篇章。\n感謝每一位選手傾注全力的演出，\n也謝謝每一位一路相伴、真心喝采的你——\n因為每一份參與與支持，\n都讓這段音樂旅程更加精彩，也更加難忘。"}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              id="replay"
              className="scroll-mt-24 lg:col-span-3 flex flex-col items-center gap-4"
            >
              <span className="inline-flex items-center gap-2 bg-primary text-dark font-heading font-black text-xs md:text-sm px-4 py-1.5 rounded-full border-2 border-dark uppercase tracking-[0.25em]">
                📺 {tc.replayBadge || "精彩回放"}
              </span>

              <div ref={replayRef} className="w-full aspect-video bg-black border-[4px] border-primary shadow-[8px_8px_0_0_rgba(245,184,65,0.35)] rounded-xl overflow-hidden">
                {videoId ? (
                  loaded ? (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                      title="ASE Voice 2026 Grand Finale Replay"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <button
                      onClick={() => setLoaded(true)}
                      className="relative w-full h-full cursor-pointer group flex items-center justify-center bg-black"
                      aria-label="Play replay"
                    >
                      <img
                        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                        alt="ASE Voice 2026 Grand Finale Replay"
                        className="absolute inset-0 w-full h-full object-cover opacity-70"
                        loading="lazy"
                      />
                      <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 bg-secondary/90 border-4 border-white rounded-full flex items-center justify-center shadow-brutal transition-transform group-hover:scale-110">
                        <Play size={32} className="text-white fill-white ml-1" />
                      </div>
                    </button>
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center px-6">
                    <p className="text-white/70 font-body font-bold text-center">
                      {t.live?.streamPending || "直播連結準備中，請稍候再回來！"}
                    </p>
                  </div>
                )}
              </div>

              <a
                href={LIVE_VIDEO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brutal btn-outline px-6 py-3 text-sm mt-1 inline-flex items-center gap-2"
              >
                {tc.watchOnYoutube || "在 YouTube 觀看"} <ExternalLink size={16} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 精彩回放浮動按鈕:桌機為貼齊畫面右緣的直式分頁、手機為右下角按鈕;回放框進入畫面時自動收起。
          放在 section 之外,避免被 section 的 isolate 堆疊層與下方區塊蓋住。
          錨點捲動靠 index.css 的 html { scroll-behavior: smooth } */}
      <AnimatePresence>
        {!replayInView && (
          <motion.a
            href="#replay"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="fixed z-40 bottom-5 right-4 md:bottom-auto md:right-0 md:top-1/2 md:-translate-y-1/2 flex md:flex-col items-center gap-2 md:gap-3 bg-primary hover:bg-white text-dark border-[3px] md:border-r-0 border-dark rounded-full md:rounded-r-none md:rounded-l-2xl pl-2 pr-4 py-2 md:px-2.5 md:py-4 shadow-[4px_4px_0_0_#1A1A1A] md:shadow-[-4px_4px_0_0_#1A1A1A] transition-colors"
          >
            <span className="w-8 h-8 shrink-0 rounded-full bg-secondary border-2 border-dark flex items-center justify-center">
              <Play size={14} className="text-white fill-white ml-0.5" />
            </span>
            <span className="font-heading font-black text-sm md:text-base uppercase tracking-wider md:tracking-[0.2em] whitespace-nowrap md:[writing-mode:vertical-rl]">
              {tc.cta || "精彩回放看這裡"}
            </span>
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
};

export default ConcludedBanner;
