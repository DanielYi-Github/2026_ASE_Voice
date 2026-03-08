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
            <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
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
            </div>

            <div className="container mx-auto px-4 z-10 text-center flex flex-col md:flex-row items-center justify-between pt-12 md:px-12 w-full max-w-7xl">

                {/* Left: Text Content & Title */}
                <div className="flex flex-col items-center md:items-start md:w-5/12 z-20 order-2 md:order-1 mt-10 md:mt-0">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="relative inline-block"
                    >
                        {/* Brutalist Title Group */}
                        <div className="bg-white border-4 border-dark shadow-brutal-lg p-6 md:p-8 transform -rotate-2 relative z-10 w-full max-w-xl mx-auto md:mx-0">
                            <h2 className="text-secondary font-heading font-black text-2xl md:text-3xl tracking-widest uppercase mb-1">
                                {t.hero.titleLine1}
                            </h2>
                            <h1 className="text-dark font-heading font-black text-6xl lg:text-8xl leading-none uppercase mb-1 whitespace-nowrap tracking-tight">
                                {t.hero.titleLine2}
                            </h1>
                            <h1 className="text-dark font-heading font-black text-7xl lg:text-9xl leading-none uppercase 
                              drop-shadow-[4px_4px_0_var(--color-secondary)] whitespace-nowrap">
                                {t.hero.titleLine3}
                            </h1>

                            <div className="absolute -bottom-6 -right-4 md:-right-8 bg-primary text-dark font-body font-bold text-[0.8rem] md:text-sm lg:text-base py-2 px-4 border-4 border-dark shadow-brutal transform rotate-6 whitespace-nowrap">
                                {t.hero.subtitle}
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA Container */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-16 md:mt-24 flex flex-col items-center md:items-start gap-4 relative z-20"
                    >
                        <div className="group relative">
                            <a
                                href="https://reurl.cc/qpzKog"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-brutal btn-secondary text-xl md:text-3xl lg:text-4xl px-12 py-5 lg:px-16 lg:py-6 flex items-center gap-3 group-hover:bg-yellow-300"
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

                {/* Right: Highly impactful generated Pop-Art Microphone Image */}
                <motion.div
                    initial={{ x: 50, opacity: 0, scale: 0.9 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.1, type: "spring", stiffness: 100 }}
                    className="w-full md:w-7/12 flex justify-center items-center relative z-10 order-1 md:order-2"
                >
                    {/* We display the AI-generated high-impact image here */}
                    <div className="relative w-full max-w-[500px] lg:max-w-[700px] transform hover:scale-105 transition-transform duration-500 hover:-rotate-1 cursor-pointer">
                        <img
                            src="/hero-mic.png"
                            alt="ASE Voice Retro Microphone"
                            className="w-full h-auto drop-shadow-[15px_15px_0_rgba(26,26,26,0.3)] md:drop-shadow-[25px_25px_0_rgba(26,26,26,0.4)] mix-blend-multiply"
                        />
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
