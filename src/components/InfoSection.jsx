import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Trophy, CalendarCheck, Users, Info, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const InfoSection = () => {
    const { t } = useLanguage();

    return (
        <section className="section-padding bg-light border-b-4 border-dark overflow-hidden relative" id="info">
            {/* Decorative background zigzag line */}
            <svg className="absolute top-0 right-0 w-64 h-full text-primary opacity-20 pointer-events-none" viewBox="0 0 100 1000" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M50,0 L90,50 L10,100 L90,150 L10,200 L90,250 L10,300 L90,350 L10,400 L90,450 L10,500 L90,550 L10,600 L90,650 L10,700 L90,750 L10,800 L90,850 L10,900 L90,950 L50,1000" />
            </svg>

            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="text-center mb-16"
                >
                    <div className="inline-block relative">
                        <div className="absolute -inset-2 bg-dark transform rotate-2"></div>
                        <h2 className="relative inline-block text-4xl md:text-6xl font-heading font-black bg-white text-dark px-10 py-4 border-4 border-dark -rotate-1">
                            {t.info.title}
                        </h2>
                    </div>
                </motion.div>

                {/* 1. Purpose & Groups Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="bg-white border-4 border-dark shadow-brutal p-6 md:p-8"
                    >
                        <div className="flex items-center gap-3 mb-4 border-b-4 border-primary pb-4">
                            <Info className="text-secondary" size={32} />
                            <h3 className="text-2xl font-heading font-black">{t.info.purpose}</h3>
                        </div>
                        <p className="font-body text-gray-800 leading-relaxed text-justify">
                            {t.info.purposeDesc}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, delay: 0.1 }}
                        className="bg-primary border-4 border-dark shadow-[6px_6px_0_0_rgba(26,26,26,1)] p-6 md:p-8 transform rotate-1 relative"
                    >
                        <div className="flex items-center gap-4 mb-4 border-b-4 border-dark pb-4">
                            <Users className="text-dark" size={32} />
                            <h3 className="text-2xl font-heading font-black uppercase text-dark">{t.info.groups}</h3>
                        </div>
                        <div className="bg-white text-dark p-5 border-4 border-dark font-body font-bold whitespace-pre-line text-sm md:text-base leading-relaxed">
                            {t.info.groupsDesc}
                        </div>
                    </motion.div>
                </div>

                {/* 2. Massive Timeline Row */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="bg-white border-4 border-dark shadow-brutal p-6 md:p-10 mb-12"
                >
                    <div className="flex items-center gap-4 mb-10 pb-6 border-b-4 border-dark">
                        <div className="bg-primary p-3 border-4 border-dark shadow-[4px_4px_0_0_rgba(26,26,26,1)] -rotate-3">
                            <CalendarCheck className="text-dark" size={36} />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-heading font-black tracking-wide">{t.info.timeline}</h3>
                    </div>

                    <div className="space-y-10 relative before:absolute before:inset-0 before:ml-[1.4rem] before:-translate-x-px before:h-full before:w-1 before:bg-dark">
                        {t.info.timelineItems.map((item, index) => (
                            <div key={index} className="relative flex items-start gap-4 md:gap-6 group">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-dark bg-secondary text-white font-black font-heading text-xl shrink-0 shadow-[2px_2px_0_0_rgba(26,26,26,1)] z-10 transform transition-transform group-hover:scale-110 group-hover:-rotate-12">
                                    {index + 1}
                                </div>
                                <div className="bg-light border-4 border-dark p-5 md:p-6 shadow-brutal w-full group-hover:-translate-y-1 group-hover:bg-[#ffefd8] transition-all">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
                                        <span className="font-heading font-black text-secondary text-xl bg-dark text-white px-3 py-1 w-fit border-2 border-dark">{item.date}</span>
                                        <h4 className="font-heading font-bold text-2xl uppercase items-center text-dark">{item.event}</h4>
                                    </div>
                                    <p className="font-body font-medium text-gray-800 leading-relaxed whitespace-pre-line text-sm md:text-base border-t-2 border-dashed border-gray-400 pt-4">
                                        {item.details}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* 3. Prizes and Obligations Row */}
                <div className="flex flex-col gap-12">

                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="w-full bg-dark text-white border-4 border-dark shadow-[8px_8px_0_0_rgba(227,38,38,1)] p-6 md:p-10"
                    >
                        <div className="flex items-center gap-4 mb-10 border-b-4 border-gray-700 pb-4">
                            <Trophy className="text-primary" size={36} />
                            <h3 className="text-3xl md:text-4xl font-heading font-black text-white uppercase tracking-tight">{t.info.prizes}</h3>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12">
                            {/* Mandarin Group */}
                            <div>
                                <h4 className="text-2xl font-heading font-black text-dark bg-primary inline-block px-5 py-2 mb-6 border-4 border-dark shadow-[4px_4px_0_0_rgba(255,255,255,1)] transform -rotate-1">
                                    {t.info.prizeCategories.mandarin}
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {t.info.prizesList.map((prize, index) => (
                                        <div key={`zh-${index}`} className="bg-white text-dark border-4 border-secondary p-5 flex flex-col items-center justify-center text-center transform hover:-translate-y-2 transition-transform shadow-[4px_4px_0_0_rgba(227,38,38,1)]">
                                            <span className="font-heading font-bold text-lg text-gray-500 mb-1">{prize.title}</span>
                                            <span className="font-heading font-black text-3xl md:text-4xl text-secondary mb-2">{prize.amount}</span>
                                            <span className="font-body text-sm font-bold bg-light px-3 py-1 border-2 border-dark">{prize.extra}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Foreign Group */}
                            <div>
                                <h4 className="text-2xl font-heading font-black text-white bg-secondary inline-block px-5 py-2 mb-6 border-4 border-dark shadow-[4px_4px_0_0_rgba(255,255,255,1)] transform rotate-1">
                                    {t.info.prizeCategories.foreign}
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {t.info.prizesList.map((prize, index) => (
                                        <div key={`en-${index}`} className="bg-white text-dark border-4 border-secondary p-5 flex flex-col items-center justify-center text-center transform hover:-translate-y-2 transition-transform shadow-[4px_4px_0_0_rgba(227,38,38,1)]">
                                            <span className="font-heading font-bold text-lg text-gray-500 mb-1">{prize.title}</span>
                                            <span className="font-heading font-black text-3xl md:text-4xl text-secondary mb-2">{prize.amount}</span>
                                            <span className="font-body text-sm font-bold bg-light px-3 py-1 border-2 border-dark">{prize.extra}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, delay: 0.1 }}
                        className="w-full bg-secondary text-white border-4 border-dark shadow-[8px_8px_0_0_rgba(26,26,26,1)] p-6 md:p-10"
                    >
                        <div className="flex items-center gap-3 mb-6 border-b-4 border-white pb-4">
                            <ShieldAlert className="text-white" size={32} />
                            <h3 className="text-2xl md:text-3xl font-heading font-black leading-tight uppercase">{t.info.rulesAndObligations}</h3>
                        </div>
                        <div className="font-body text-sm md:text-base text-white/90 whitespace-pre-line leading-relaxed space-y-2">
                            {t.info.rulesDesc}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default InfoSection;
