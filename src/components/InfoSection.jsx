import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Trophy, CalendarCheck, Users, Mic2, ShieldAlert, Medal, Gem, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const InfoSection = () => {
    const { t } = useLanguage();

    // Helper for 3D Honor Card styling based on Rank (0: Gold, 1: Silver, 2: Bronze, 3+: Regular)
    const getRankStyle = (index) => {
        switch (index) {
            case 0: return "bg-gradient-to-br from-yellow-100 to-yellow-300 border-yellow-600 shadow-[6px_6px_0_0_rgba(202,138,4,1)] text-yellow-900"; // Gold
            case 1: return "bg-gradient-to-br from-gray-100 to-gray-300 border-gray-500 shadow-[6px_6px_0_0_rgba(107,114,128,1)] text-gray-800"; // Silver
            case 2: return "bg-gradient-to-br from-orange-100 to-orange-300 border-orange-700 shadow-[6px_6px_0_0_rgba(194,65,12,1)] text-orange-950"; // Bronze
            default: return "bg-white border-dark shadow-[4px_4px_0_0_rgba(26,26,26,1)] text-dark"; // Merit
        }
    };

    const getRankIcon = (index) => {
        switch (index) {
            case 0: return <Trophy className="text-yellow-600 w-10 h-10 mb-2" />;
            case 1: return <Trophy className="text-gray-500 w-10 h-10 mb-2" />;
            case 2: return <Medal className="text-orange-700 w-10 h-10 mb-2" />;
            default: return <Gem className="text-primary w-8 h-8 mb-2" />;
        }
    };

    return (
        <section className="section-padding bg-light border-b-4 border-dark overflow-hidden relative" id="info">
            {/* Decorative background zigzag line */}
            <svg className="absolute top-0 right-0 w-64 h-full text-primary opacity-20 pointer-events-none" viewBox="0 0 100 1000" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M50,0 L90,50 L10,100 L90,150 L10,200 L90,250 L10,300 L90,350 L10,400 L90,450 L10,500 L90,550 L10,600 L90,650 L10,700 L90,750 L10,800 L90,850 L10,900 L90,950 L50,1000" />
            </svg>

            <div className="container mx-auto max-w-[100rem] relative z-10 px-4 md:px-8 lg:px-12">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="text-center mb-16 md:mb-24"
                >
                    <div className="inline-block relative">
                        <div className="absolute -inset-2 bg-dark transform rotate-2"></div>
                        <h2 className="relative inline-block text-5xl md:text-7xl font-heading font-black bg-white text-dark px-10 py-5 border-[5px] border-dark -rotate-1 tracking-tight">
                            {t.info.title}
                        </h2>
                    </div>
                </motion.div>

                {/* 1. Purpose & Groups Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16 px-0 md:px-8">
                    {/* Upgraded Mission Card with Softer, Connecting Theme */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-blue-50 to-cyan-100 border-[5px] border-dark shadow-[8px_8px_0_0_rgba(26,26,26,1)] p-8 md:p-12 transform -rotate-1"
                    >
                        <div className="flex items-center gap-4 mb-6 border-b-[4px] border-cyan-300 pb-5">
                            <div className="bg-cyan-500 p-3 rounded-full text-white shadow-brutal border-2 border-dark">
                                <Mic2 size={36} />
                            </div>
                            <h3 className="text-3xl font-heading font-black text-cyan-950 uppercase">{t.info.purpose}</h3>
                        </div>
                        <p className="font-body text-cyan-950 text-xl md:text-2xl leading-[1.9] text-justify font-bold tracking-wide">
                            {t.info.purposeDesc}
                        </p>
                    </motion.div>

                    {/* Clear Columns for Categories */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, delay: 0.1 }}
                        className="bg-primary border-[5px] border-dark shadow-[8px_8px_0_0_rgba(26,26,26,1)] p-8 md:p-12 transform rotate-1 relative"
                    >
                        <div className="flex items-center gap-4 mb-6 border-b-[4px] border-dark pb-5">
                            <div className="bg-white p-3 border-4 border-dark shadow-[4px_4px_0_0_rgba(26,26,26,1)]">
                                <Star className="text-dark" size={32} />
                            </div>
                            <h3 className="text-3xl lg:text-4xl font-heading font-black uppercase text-dark tracking-tight">{t.info.groups}</h3>
                        </div>
                        <div className="bg-white text-dark p-6 lg:p-8 border-4 border-dark font-body font-bold whitespace-pre-line text-xl md:text-2xl leading-[1.9] shadow-inner tracking-wide">
                            {t.info.groupsDesc}
                        </div>
                    </motion.div>
                </div>

                {/* 2. Massive Timeline Row */}
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="bg-white border-[5px] border-dark shadow-[12px_12px_0_0_rgba(227,38,38,1)] p-8 md:p-14 mb-16 mx-0 md:mx-4"
                >
                    <div className="flex items-center gap-5 mb-12 pb-8 border-b-[5px] border-dark">
                        <div className="bg-primary p-4 border-[4px] border-dark shadow-[6px_6px_0_0_rgba(26,26,26,1)] -rotate-3">
                            <CalendarCheck className="text-dark w-12 h-12" />
                        </div>
                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tighter uppercase">{t.info.timeline}</h3>
                    </div>

                    <div className="space-y-12 relative before:absolute before:inset-0 before:ml-[1.75rem] before:-translate-x-px before:h-full before:w-[6px] before:bg-dark">
                        {t.info.timelineItems.map((item, index) => (
                            <div key={index} className="relative flex items-start gap-6 md:gap-10 group">
                                <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full border-[4px] border-dark bg-secondary text-white font-black font-heading text-2xl md:text-3xl shrink-0 shadow-[4px_4px_0_0_rgba(26,26,26,1)] z-10 transform transition-transform group-hover:scale-110 group-hover:-rotate-12">
                                    {index + 1}
                                </div>
                                <div className="bg-light border-[4px] border-dark p-6 md:p-8 shadow-[6px_6px_0_0_rgba(26,26,26,1)] w-full group-hover:-translate-y-2 group-hover:bg-[#ffefd8] transition-all duration-300">
                                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between mb-5 gap-4">
                                        <span className="font-heading font-black text-secondary text-2xl bg-dark text-white px-4 py-1 w-fit border-2 border-dark">{item.date}</span>
                                        <h4 className="font-heading font-bold text-3xl md:text-4xl uppercase items-center text-dark tracking-tight">{item.event}</h4>
                                    </div>
                                    <p className="font-body font-bold text-gray-800 leading-[1.8] whitespace-pre-line text-lg md:text-xl border-t-[3px] border-dashed border-gray-400 pt-5">
                                        {item.details}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* 3. 3D Honor Awards and Obligations Row */}
                <div className="flex flex-col gap-12">

                    {/* 3D Honor Cards Section */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="w-full bg-dark text-white border-[5px] border-dark shadow-[12px_12px_0_0_rgba(227,38,38,1)] p-8 md:p-14 mb-8"
                    >
                        <div className="flex items-center gap-5 mb-12 border-b-[5px] border-gray-700 pb-6">
                            <Trophy className="text-primary w-12 h-12" />
                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white uppercase tracking-tighter">{t.info.prizes}</h3>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 md:gap-16">
                            {/* Mandarin Group */}
                            <div>
                                <h4 className="text-3xl font-heading font-black text-dark bg-primary inline-block px-8 py-3 mb-8 border-[4px] border-dark shadow-[6px_6px_0_0_rgba(255,255,255,1)] transform -rotate-2">
                                    {t.info.prizeCategories.mandarin}
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                                    {t.info.prizesList.map((prize, index) => (
                                        <div key={`zh-${index}`} className={`border-[4px] p-6 flex flex-col items-center justify-center text-center transform hover:-translate-y-3 transition-transform duration-300 relative overflow-hidden group ${getRankStyle(index)}`}>
                                            {/* Shimmer Effect */}
                                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>

                                            {getRankIcon(index)}
                                            <span className="font-heading font-black text-xl mb-2 opacity-80 uppercase tracking-widest">{prize.title}</span>
                                            <span className="font-heading font-black text-4xl md:text-5xl mb-4 drop-shadow-sm">{prize.amount}</span>
                                            <span className="font-body text-base font-bold bg-dark text-white px-4 py-1.5 border-2 border-transparent relative z-10">{prize.extra}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Foreign Group */}
                            <div>
                                <h4 className="text-3xl font-heading font-black text-white bg-secondary inline-block px-8 py-3 mb-8 border-[4px] border-dark shadow-[6px_6px_0_0_rgba(255,255,255,1)] transform rotate-2">
                                    {t.info.prizeCategories.foreign}
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                                    {t.info.prizesList.map((prize, index) => (
                                        <div key={`en-${index}`} className={`border-[4px] p-6 flex flex-col items-center justify-center text-center transform hover:-translate-y-3 transition-transform duration-300 relative overflow-hidden group ${getRankStyle(index)}`}>
                                            {/* Shimmer Effect */}
                                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>

                                            {getRankIcon(index)}
                                            <span className="font-heading font-black text-xl mb-2 opacity-80 uppercase tracking-widest">{prize.title}</span>
                                            <span className="font-heading font-black text-4xl md:text-5xl mb-4 drop-shadow-sm">{prize.amount}</span>
                                            <span className="font-body text-base font-bold bg-dark text-white px-4 py-1.5 border-2 border-transparent relative z-10">{prize.extra}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Obligations Section */}
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, delay: 0.2 }}
                        className="w-full bg-secondary text-white border-[5px] border-dark shadow-[10px_10px_0_0_rgba(26,26,26,1)] p-8 md:p-12 mb-12"
                    >
                        <div className="flex items-center gap-4 mb-8 border-b-[4px] border-white pb-6">
                            <ShieldAlert className="text-white w-10 h-10" />
                            <h3 className="text-3xl md:text-4xl font-heading font-black leading-tight uppercase tracking-tight">{t.info.rulesAndObligations}</h3>
                        </div>
                        <div className="font-body text-lg md:text-xl font-bold text-white/95 whitespace-pre-line leading-[1.8] space-y-4">
                            {t.info.rulesDesc}
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default InfoSection;
