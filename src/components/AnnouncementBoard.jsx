import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Megaphone, CalendarClock, Trophy } from 'lucide-react';

const AnnouncementBoard = () => {
    const { t } = useLanguage();

    if (!t.announcement) return null;

    // Use specific timeline items. (assuming items 0 and the final one are most important to highlight)
    const highlightTimelines = t.info?.timelineItems 
        ? [t.info.timelineItems[0], t.info.timelineItems[t.info.timelineItems.length - 1]]
        : [];

    const topPrizes = t.info?.prizesList ? t.info.prizesList.slice(0, 3) : [];

    return (
        <div className="w-full xl:w-[90%] animate-card-enter drop-shadow-[5px_5px_0_rgba(26,26,26,1)] hover:drop-shadow-[7px_7px_0_rgba(26,26,26,1)] transition-all duration-300 group">
            <div className="bg-white border-[3px] border-dark flex flex-col relative z-10 transition-transform duration-300 transform overflow-hidden rounded-md">
                
                {/* Master Header */}
                <div className="bg-secondary text-white py-2 px-4 flex items-center justify-between border-b-[3px] border-dark">
                    <div className="flex items-center gap-2">
                        <div className="bg-white text-secondary rounded-full p-1 border-2 border-dark group-hover:animate-pulse">
                            <Megaphone size={16} strokeWidth={2.5} />
                        </div>
                        <span className="font-heading font-black tracking-wider text-sm md:text-base mt-0.5 uppercase">
                            {t.board?.title || "Bulletin Board"}
                        </span>
                    </div>
                </div>
                
                {/* Content Area - Latest News */}
                <div className="p-3 md:p-4 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:10px_10px] bg-white border-b-[3px] border-dark">
                    <div className="inline-block bg-dark text-white px-2 py-0.5 font-heading font-bold text-[10px] uppercase tracking-wider mb-2 rounded-sm">{t.board?.featured || "🔥 Featured"}</div>
                    <p className="font-body font-bold text-dark text-xs md:text-sm leading-snug">
                        {t.announcement}
                    </p>
                </div>

                {/* Content Area - Timeline & Prizes Split */}
                <div className="flex flex-col">
                    
                    {/* Timeline */}
                    <div className="p-3 md:p-4 border-b-[3px] border-dark bg-[#FFF8E7]">
                        <div className="flex items-center gap-1.5 mb-2 text-secondary">
                            <CalendarClock size={16} strokeWidth={2.5} />
                            <span className="font-heading font-black tracking-wider uppercase text-xs md:text-sm mt-0.5">{t.board?.dates || "Key Dates"}</span>
                        </div>
                        <ul className="space-y-1.5">
                            {highlightTimelines.map((item, idx) => (item && 
                                <li key={idx} className="flex flex-col">
                                    <span className="font-heading font-bold text-secondary text-[10px] md:text-xs">{item.date}</span>
                                    <span className="font-body font-bold text-dark text-xs border-l-[2px] border-primary pl-1.5 mt-0.5 leading-snug">
                                        {typeof item.event === 'string' ? item.event : '賽程活動'}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Prizes */}
                    <div className="p-3 md:p-4 bg-white">
                        <div className="flex items-center gap-1.5 mb-2">
                            <Trophy size={16} strokeWidth={2.5} className="text-secondary" />
                            <span className="font-heading font-black text-dark tracking-wider uppercase text-xs md:text-sm mt-0.5 drop-shadow-[1px_1px_0_#F5B841]">{t.board?.prizes || "Top Prizes"}</span>
                        </div>
                        <div className="grid gap-1">
                            {topPrizes.map((prize, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-light border-2 border-dark px-1.5 py-1 shadow-[2px_2px_0_0_rgba(26,26,26,1)] rounded-sm">
                                    <span className="font-heading font-bold text-dark text-[10px] md:text-xs">{prize.title}</span>
                                    <span className="font-heading font-black text-secondary text-xs">{prize.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AnnouncementBoard;
