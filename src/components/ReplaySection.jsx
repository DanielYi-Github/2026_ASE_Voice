import React, { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LIVE_VIDEO_URL } from '../config/liveConfig';
import { getYouTubeVideoId } from '../utils/registrationUtils';

// 9/11 17:30 起,緊接在 ConcludedBanner 下方的回放區塊。
// 點擊才載入 iframe(比照 PastHighlights.jsx 的 VideoCard),不像 LiveBanner 那樣一載入就 autoplay。
const ReplaySection = () => {
  const { t } = useLanguage();
  const tc = t.concluded || {};
  const [loaded, setLoaded] = useState(false);
  const videoId = getYouTubeVideoId(LIVE_VIDEO_URL);

  return (
    <section id="replay" className="section-padding bg-dark text-white border-b-[6px] border-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-halftone opacity-[0.04] pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-5">
        <span className="inline-flex items-center gap-2 bg-primary text-dark font-heading font-black text-xs md:text-sm px-4 py-1.5 rounded-full border-2 border-dark uppercase tracking-[0.25em]">
          🏆 {tc.replayBadge || "精彩回放"}
        </span>

        <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide">
          {tc.replayTitle || "決賽直播回顧"}
        </h2>

        <p className="font-body text-white/60 text-sm md:text-base max-w-xl">
          {tc.replayNote || "完整決賽直播全程收錄，錯過的精彩片刻都在這裡！"}
        </p>

        <div className="w-full max-w-3xl aspect-video bg-black border-[4px] border-primary shadow-[8px_8px_0_0_rgba(245,184,65,0.35)] rounded-xl overflow-hidden mt-2">
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
      </div>
    </section>
  );
};

export default ReplaySection;
