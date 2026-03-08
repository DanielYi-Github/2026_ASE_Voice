import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Trophy, CalendarCheck, Users } from 'lucide-react';
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
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-16"
                >
                    <div className="inline-block relative">
                        <div className="absolute -inset-2 bg-dark transform rotate-2"></div>
                        <h2 className="relative inline-block text-4xl md:text-5xl font-heading font-black bg-white text-dark px-8 py-3 border-4 border-dark -rotate-1">
                            {t.info.title}
                        </h2>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column: Timeline containing detailed Rules */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="bg-white border-4 border-dark shadow-brutal p-6 md:p-8"
                    >
                        <div className="flex items-center gap-4 mb-8 pb-6 border-b-4 border-dark">
                            <div className="bg-primary p-3 border-4 border-dark shadow-[4px_4px_0_0_rgba(26,26,26,1)] -rotate-3">
                                <CalendarCheck className="text-dark" size={36} />
                            </div>
                            <h3 className="text-3xl font-heading font-black tracking-wide">{t.info.timeline}</h3>
                        </div>

                        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.4rem] before:-translate-x-px before:h-full before:w-1 before:bg-dark">
                            {t.info.timelineItems.map((item, index) => (
                                <div key={index} className="relative flex items-start gap-4 group">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-dark bg-secondary text-white font-black font-heading shrink-0 shadow-[2px_2px_0_0_rgba(26,26,26,1)] z-10 transform transition-transform group-hover:scale-110 group-hover:rotate-12">
                                        {index + 1}
                                    </div>
                                    <div className="bg-light border-4 border-dark p-4 md:p-5 shadow-brutal w-full group-hover:-translate-y-1 group-hover:bg-white transition-all">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                                            <span className="font-heading font-black text-secondary text-xl bg-dark text-white px-2 py-1 w-fit inline-block -ml-6 border-2 border-dark">{item.date}</span>
                                            <h4 className="font-heading font-bold text-xl uppercase items-center">{item.event}</h4>
                                        </div>
                                        <p className="font-body font-medium text-gray-800 leading-relaxed whitespace-pre-line mt-2 text-sm md:text-base border-t-2 border-dashed border-gray-300 pt-3">
                                            {item.details}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Groups & Prizes */}
                    <div className="flex flex-col gap-10">
                        {/* Groups / Eligibility Card */}
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true, delay: 0.1 }}
                            className="bg-primary border-4 border-dark shadow-brutal p-6 md:p-8 transform rotate-1 relative"
                        >
                            {/* Decorative speech bubble tail */}
                            <div className="absolute -bottom-4 left-10 w-8 h-8 bg-primary border-r-4 border-b-4 border-dark transform rotate-45 pointer-events-none"></div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="bg-white p-3 border-4 border-dark shadow-[4px_4px_0_0_rgba(26,26,26,1)]">
                                    <Users className="text-dark" size={32} />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-heading font-black uppercase">{t.info.groups}</h3>
                            </div>
                            <div className="bg-white text-dark p-5 border-4 border-dark font-body font-bold whitespace-pre-line text-sm md:text-base leading-relaxed">
                                {t.info.groupsDesc}
                            </div>
                        </motion.div>

                        {/* Prizes Card */}
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true, delay: 0.2 }}
                            className="bg-dark text-white border-4 border-dark shadow-[8px_8px_0_0_rgba(245,184,65,1)] p-6 md:p-8 transform -rotate-1"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="bg-secondary p-3 border-4 border-primary shadow-[4px_4px_0_0_rgba(245,184,65,1)] rotate-3">
                                    <Trophy className="text-white" size={32} />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-heading font-black text-primary uppercase">{t.info.prizes}</h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {t.info.prizesList.map((prize, index) => (
                                    <div key={index} className="bg-white text-dark border-4 border-primary p-4 flex flex-col items-center justify-center text-center transform hover:scale-105 transition-transform hover:-rotate-2 hover:shadow-brutal-lg">
                                        <span className="font-heading font-bold text-lg text-gray-500 mb-1">{prize.title}</span>
                                        <span className="font-heading font-black text-2xl md:text-3xl text-secondary mb-1">{prize.amount}</span>
                                        <span className="font-body text-xs font-bold bg-light px-2 py-0.5 border-2 border-dark">{prize.extra}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InfoSection;
