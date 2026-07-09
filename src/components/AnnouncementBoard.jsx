import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Megaphone, CalendarClock, Trophy } from 'lucide-react';
import { getRegistrationStatus, REGISTRATION_STATUS, isFinalistAnnounced, isTimelineItemPast } from '../utils/registrationUtils';

const AnnouncementBoard = () => {
    const { t, lang } = useLanguage();
    const status = getRegistrationStatus();
    const isEnded = status === REGISTRATION_STATUS.ENDED;
    const isFinalist = isFinalistAnnounced();
    
    let content = t.announcement;
    if (isFinalist) {
        content = t.announcementFinalist;
    } else if (isEnded) {
        content = t.announcementEnded;
    }

    if (!content) return null;

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
                <div className={`p-4 md:p-6 text-white border-b-[3px] md:border-b-[4px] border-dark relative flex flex-col items-center text-center transition-colors duration-500 ${isFinalist ? 'bg-gradient-to-br from-[#1E1B4B] via-[#4338CA] to-dark' : isEnded ? 'bg-gradient-to-br from-[#002BFF] via-[#051159] to-dark' : 'bg-gradient-to-br from-[#e21d38] via-[#c41530] to-dark'}`}>
                    
                    <div className="relative z-10 flex flex-col items-center w-full">
                        {/* Highlight Label */}
                        <div className={`inline-flex items-center gap-1.5 backdrop-blur-md px-3 py-1 rounded-full border mb-4 shadow-sm ${isFinalist ? 'bg-primary/20 border-primary/50 text-primary' : isEnded ? 'bg-[#00E1FF]/20 border-[#00E1FF]/50 text-[#00E1FF]' : 'bg-white/10 border-white/30 text-white'}`}>
                            <span className="animate-pulse text-sm">🔥</span>
                            <span className="font-heading font-bold tracking-widest text-[11px] md:text-sm">
                                {t.board?.featured || "FEATURED"}
                            </span>
                        </div>
                        
                        {/* Integrated Announcement / News Rich Text */}
                        <div className="flex flex-col gap-3 items-center">
                            <h3 className={`font-heading font-black text-yellow-300 text-[1.2rem] md:text-[1.3rem] xl:text-[1.35rem] leading-snug drop-shadow-md ${lang === 'zh' ? 'whitespace-nowrap' : 'px-2'}`}>
                                {content.headline}
                            </h3>
                            <p className="font-body font-medium text-white text-[13px] md:text-[15px] leading-relaxed opacity-95">
                                {content.description}
                            </p>
                            
                            <div className={`rounded-lg px-4 py-2 mt-1 border w-full md:w-auto transform -rotate-1 shadow-inner flex flex-col items-center gap-1 ${isFinalist ? 'bg-primary/10 border-primary/30 animate-pulse' : isEnded ? 'bg-[#00F0FF]/10 border-[#00F0FF]/30 animate-pulse' : 'bg-black/30 border-white/10'}`}>
                                <span className={`font-heading font-black text-sm md:text-base tracking-wide drop-shadow-sm ${isFinalist ? 'text-primary' : isEnded ? 'text-[#00F0FF]' : 'text-yellow-200'}`}>
                                    {content.dates}
                                </span>
                                {content.location && (
                                    <span className={`font-heading font-black text-sm md:text-base tracking-wide drop-shadow-sm ${isFinalist ? 'text-primary' : isEnded ? 'text-[#00F0FF]' : 'text-yellow-200'}`}>
                                        {content.location}
                                    </span>
                                )}
                            </div>
                            
                            {!isFinalist && (
                                <div className="mt-2 border-t border-white/20 pt-3 w-full text-center">
                                    <p className="font-body font-bold text-[12px] md:text-[13px] leading-snug text-white/90">
                                        {content.reminder}
                                    </p>
                                </div>
                            )}
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
                            {fullTimelines.map((item, idx) => {
                                if (!item) return null;
                                const isPast = isTimelineItemPast(idx);
                                return (
                                <li key={idx} className={`flex flex-col relative group ${isPast ? 'opacity-45 grayscale' : ''}`}>
                                    <div className={`absolute left-[4px] top-1.5 w-1.5 h-1.5 rounded-full transition-transform ${isPast ? 'bg-gray-400' : 'bg-secondary group-hover:scale-150'}`}></div>
                                    <span className={`font-heading font-bold text-[11px] md:text-xs pl-[16px] ${isPast ? 'text-gray-500 line-through' : 'text-secondary'}`}>
                                        {item.date}
                                        {isPast && (
                                            <span className="ml-1.5 no-underline inline-block bg-gray-300 text-gray-600 px-1.5 rounded-full text-[9px] md:text-[10px] align-middle">
                                                ✓ {t.board?.pastLabel || "已結束"}
                                            </span>
                                        )}
                                    </span>
                                    <span className={`font-body font-bold text-xs md:text-[13px] border-l-[3px] pl-3 ml-[6px] mt-1 leading-snug ${isPast ? 'text-gray-500 border-gray-300' : 'text-dark border-primary/40'}`}>
                                        {typeof item.event === 'string' ? item.event : '賽程活動'}
                                    </span>
                                </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementBoard;
