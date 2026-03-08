import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <section className="relative min-h-[95vh] flex flex-col items-center justify-center bg-sunburst overflow-hidden pt-20 border-b-4 border-dark">
            {/* Decorative Halftone overlay */}
            <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none mix-blend-multiply"></div>

            {/* Floating Music Notes */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <motion.div
                    animate={{ y: [-20, 20, -20], rotate: [-10, 10, -10] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-[10%] opacity-80"
                >
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dark">
                        <path d="M9 18V5l12-2v13"></path>
                        <circle cx="6" cy="18" r="3"></circle>
                        <circle cx="18" cy="16" r="3"></circle>
                    </svg>
                </motion.div>
                <motion.div
                    animate={{ y: [15, -15, 15], rotate: [15, -15, 15] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-1/4 right-[5%] md:right-[15%] opacity-80"
                >
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dark">
                        <path d="M9 18V5l12-2v13"></path>
                        <circle cx="6" cy="18" r="3"></circle>
                        <circle cx="18" cy="16" r="3"></circle>
                    </svg>
                </motion.div>
                <motion.div
                    animate={{ x: [-10, 10, -10], rotate: [-5, 25, -5] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute top-[15%] right-[20%] opacity-60"
                >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dark">
                        <path d="M9 18V5l12-2v13"></path>
                        <circle cx="6" cy="18" r="3"></circle>
                        <circle cx="18" cy="16" r="3"></circle>
                    </svg>
                </motion.div>
            </div>

            <div className="container mx-auto px-4 z-10 text-center flex flex-col md:flex-row items-center justify-between pt-12 md:px-12">

                {/* Left: Text Content */}
                <div className="flex flex-col items-center md:items-start md:w-1/2">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="relative inline-block"
                    >
                        {/* Brutalist Title Group */}
                        <div className="bg-white border-4 border-dark shadow-brutal-lg p-6 md:p-10 transform -rotate-2 relative z-10 w-full max-w-xl mx-auto md:mx-0">
                            <h2 className="text-secondary font-heading font-black text-2xl md:text-4xl tracking-widest uppercase mb-1">
                                {t.hero.titleLine1}
                            </h2>
                            <h1 className="text-dark font-heading font-black text-6xl md:text-[5.5rem] leading-none uppercase mb-1 whitespace-nowrap">
                                {t.hero.titleLine2}
                            </h1>
                            <h1 className="text-dark font-heading font-black text-7xl md:text-[6.5rem] leading-none uppercase 
                              drop-shadow-[4px_4px_0_var(--color-secondary)] whitespace-nowrap">
                                {t.hero.titleLine3}
                            </h1>

                            <div className="absolute -bottom-6 -right-4 md:-right-8 bg-primary text-dark font-body font-bold text-sm md:text-lg py-2 px-4 border-4 border-dark shadow-brutal transform rotate-6 whitespace-nowrap">
                                {t.hero.subtitle}
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA Container */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-20 flex flex-col items-center md:items-start gap-4 relative z-20"
                    >
                        <div className="group relative">
                            <a
                                href="https://reurl.cc/qpzKog"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-brutal btn-secondary text-2xl md:text-3xl px-8 py-5 md:px-10 md:py-5 flex items-center gap-3 group-hover:bg-yellow-300"
                            >
                                {t.hero.registerBtn}
                            </a>

                            {/* Hover Tooltip / Note */}
                            <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 w-max max-w-[90vw]
                              opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 
                              transition-all duration-300 bg-dark text-white text-xs md:text-sm px-4 py-2 font-body rounded-sm pointer-events-none">
                                {t.hero.registerNote}
                                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-dark"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right: Graphic Element (Retro Microphone) */}
                <motion.div
                    initial={{ x: 50, opacity: 0, rotate: 10 }}
                    animate={{ x: 0, opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="hidden md:flex md:w-1/2 justify-center items-center relative z-10 mt-12 md:mt-0"
                >
                    {/* A large, brutalist comic-style microphone illustration made with SVG/CSS */}
                    <div className="relative w-72 h-72 lg:w-96 lg:h-96">
                        <div className="absolute inset-0 bg-secondary rounded-full transform translate-x-4 translate-y-4 border-4 border-dark"></div>
                        <div className="absolute inset-0 bg-white rounded-full border-4 border-dark p-6 flex items-center justify-center overflow-hidden">
                            {/* Halftone dot pattern inside the circle */}
                            <div className="absolute inset-0 bg-halftone opacity-10"></div>
                            {/* Mic Icon SVG */}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-dark relative z-10 transform -rotate-12">
                                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" fill="#1A1A1A" />
                                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                <line x1="12" y1="19" x2="12" y2="22" strokeWidth="3" />
                                <line x1="8" y1="22" x2="16" y2="22" strokeWidth="3" />
                            </svg>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
