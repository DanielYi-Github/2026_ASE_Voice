import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Megaphone, CalendarClock, Trophy } from 'lucide-react';

const AnnouncementBoard = () => {
    const { t, lang } = useLanguage();

    if (!t.announcement) return null;

    const fullTimelines = t.info?.timelineItems || [];

    return (
        <div className="w-full animate-card-enter drop-shadow-[6px_6px_0_rgba(26,26,26,1)] hover:drop-shadow-[8px_8px_0_rgba(26,26,26,1)] transition-all duration-300 group">
            <div className="bg-white border-[3px] md:border-[4px] border-dark flex flex-col relative z-10 transition-transform duration-300 transform overflow-hidden rounded-md">
                
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
                
                {/* --- Section 1: The Hook (Rich Promotional Announcement) --- */}
                <div className="p-4 md:p-6 bg-gradient-to-br from-[#e21d38] via-[#c41530] to-dark text-white border-b-[3px] md:border-b-[4px] border-dark relative flex flex-col items-center text-center">
                    
                    <div className="relative z-10 flex flex-col items-center w-full">
                        {/* Highlight Label */}
                        <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 mb-4 shadow-sm">
                            <span className="animate-pulse text-sm">🔥</span>
                            <span className="font-heading font-bold text-white tracking-widest text-[11px] md:text-sm">
                                {t.board?.featured || "FEATURED"}
                            </span>
                        </div>
                        
                        {/* Integrated Announcement / News Rich Text */}
                        <div className="flex flex-col gap-3 items-center">
                            <h3 className={`font-heading font-black text-yellow-300 text-[1.2rem] md:text-[1.3rem] xl:text-[1.35rem] leading-snug drop-shadow-md ${lang === 'zh' ? 'whitespace-nowrap' : 'px-2'}`}>
                                {t.announcement.headline}
                            </h3>
                            <p className="font-body font-medium text-white text-[13px] md:text-[15px] leading-relaxed opacity-95">
                                {t.announcement.description}
                            </p>
                            
                            <div className="bg-black/30 rounded-lg px-4 py-2 mt-1 border border-white/10 w-full md:w-auto transform -rotate-1 shadow-inner">
                                <span className="font-heading font-black text-yellow-200 text-sm md:text-base tracking-wide drop-shadow-sm">
                                    {t.announcement.dates}
                                </span>
                            </div>
                            
                            <p className="font-body font-bold text-white/90 text-[12px] md:text-[13px] leading-snug mt-2 border-t border-white/20 pt-3">
                                {t.announcement.reminder}
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- Section 2: Complete Timeline --- */}
                <div className="p-4 md:p-5 bg-[#FFF8E7] flex-1">
                    <div className="flex items-center gap-1.5 mb-4 text-secondary">
                        <CalendarClock size={18} strokeWidth={3} />
                        <span className="font-heading font-black tracking-wider uppercase text-sm md:text-base mt-0.5">
                            {t.board?.dates || "Key Dates"}
                        </span>
                    </div>
                    
                    {/* Full Unrolled Timeline (No Scrollbar) */}
                    <div className="w-full">
                        <ul className="space-y-3.5 md:space-y-4">
                            {fullTimelines.map((item, idx) => (item && 
                                <li key={idx} className="flex flex-col relative group">
                                    <div className="absolute left-[4px] top-1.5 w-1.5 h-1.5 rounded-full bg-secondary group-hover:scale-150 transition-transform"></div>
                                    <span className="font-heading font-bold text-secondary text-[11px] md:text-xs pl-[16px]">
                                        {item.date}
                                    </span>
                                    <span className="font-body font-bold text-dark text-xs md:text-[13px] border-l-[3px] border-primary/40 pl-3 ml-[6px] mt-1 leading-snug">
                                        {typeof item.event === 'string' ? item.event : '賽程活動'}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementBoard;
