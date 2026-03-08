import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <section className="relative min-h-[95vh] flex flex-col items-center justify-center bg-sunburst overflow-hidden pt-20 border-b-[6px] border-dark">
            {/* Decorative Halftone overlay */}
            <div className="absolute inset-0 bg-halftone opacity-10 pointer-events-none mix-blend-multiply"></div>

            {/* Dynamic Backgrounds (Staves & Waveforms) */}
            <div className="absolute inset-x-0 top-0 bottom-32 pointer-events-none z-0 overflow-hidden">
                {/* Animated Staves passing across the screen */}
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 left-0 w-[300vw] h-16 flex flex-col justify-between opacity-15"
                >
                    <div className="w-full border-t-[3px] border-dark"></div>
                    <div className="w-full border-t-[3px] border-dark"></div>
                    <div className="w-full border-t-[3px] border-dark"></div>
                    <div className="w-full border-t-[3px] border-dark"></div>
                    <div className="w-full border-t-[3px] border-dark"></div>
                </motion.div>

                {/* Floating Music Notes */}
                <motion.div
                    animate={{ y: [-20, 20, -20], rotate: [-10, 10, -10] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[20%] left-[15%] lg:left-[10%] opacity-80"
                >
                    <svg width="56" height="56" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dark">
                        <path d="M9 18V5l12-2v13"></path>
                        <circle cx="6" cy="18" r="3"></circle>
                        <circle cx="18" cy="16" r="3"></circle>
                    </svg>
                </motion.div>
                <motion.div
                    animate={{ y: [30, -30, 30], rotate: [15, -25, 15] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-[35%] right-[20%] lg:right-[35%] hidden md:block opacity-60"
                >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dark">
                        <path d="M9 18V5l12-2v13"></path>
                        <circle cx="6" cy="18" r="3"></circle>
                        <circle cx="18" cy="16" r="3"></circle>
                    </svg>
                </motion.div>
            </div>

            <div className="container mx-auto px-4 z-10 text-center flex flex-col md:flex-row items-center justify-between pt-8 md:pt-12 md:px-12 w-full max-w-7xl relative">

                {/* Left: Text Content & Title */}
                <div className="flex flex-col items-center md:items-start md:w-[45%] z-20 order-2 md:order-1 mt-6 md:mt-0">

                    {/* Corporate Brand Array */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-4 mb-4 md:mb-6 px-4 py-2 border-4 border-dark bg-white shadow-brutal transform -rotate-1 self-center md:self-start"
                    >
                        <span className="font-heading font-black text-secondary tracking-widest text-sm md:text-base">ASE</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-dark"></div>
                        <span className="font-heading font-black text-blue-700 tracking-widest text-sm md:text-base">SPIL</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-dark"></div>
                        <span className="font-heading font-black text-green-700 tracking-widest text-sm md:text-base">USI</span>
                        <div className="absolute -bottom-6 left-2 font-body font-bold text-xs bg-dark text-white px-2 py-0.5 whitespace-nowrap hidden md:block border-2 border-dark">
                            日月光投控集團成員共同參與
                        </div>
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-body font-bold text-[10px] bg-dark text-white px-2 py-0.5 whitespace-nowrap block md:hidden border-2 border-dark">
                            集團成員共同參與
                        </div>
                    </motion.div>

                    {/* Epic Brutalist Title Group */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                        className="relative inline-block w-full"
                    >
                        <div className="bg-white border-[5px] border-dark shadow-[10px_10px_0_0_rgba(26,26,26,1)] p-6 md:p-10 transform -rotate-1 relative z-10 w-full max-w-[600px] mx-auto md:mx-0 text-center md:text-left">
                            <h2 className="text-secondary font-heading font-black text-2xl md:text-4xl tracking-widest uppercase mb-1 drop-shadow-[2px_2px_0_var(--color-dark)]">
                                {t.hero.titleLine1}
                            </h2>
                            <h1 className="text-dark font-heading font-black text-[5.5rem] md:text-8xl lg:text-[7.5rem] leading-[0.8] uppercase mb-1 whitespace-nowrap tracking-tighter">
                                {t.hero.titleLine2}
                            </h1>
                            <h1 className="text-dark font-heading font-black text-6xl md:text-[6rem] lg:text-[7rem] leading-none uppercase 
                              drop-shadow-[6px_6px_0_var(--color-secondary)] whitespace-nowrap">
                                {t.hero.titleLine3}
                            </h1>

                            <div className="absolute -bottom-5 -right-2 md:-right-6 bg-primary text-dark font-body font-black text-sm md:text-lg lg:text-xl py-2 px-5 border-[4px] border-dark shadow-[4px_4px_0_0_rgba(26,26,26,1)] transform rotate-3 whitespace-nowrap z-20">
                                {t.hero.subtitle}
                            </div>
                        </div>
                    </motion.div>

                    {/* Supercharged Glowing CTA Container */}
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-20 md:mt-28 flex flex-col items-center md:items-start gap-4 relative z-30 w-full"
                    >
                        <div className="group relative mx-auto md:mx-0">
                            <a
                                href="https://reurl.cc/qpzKog"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-brutal glow-breathing font-heading font-black text-2xl md:text-4xl lg:text-[2.5rem] px-12 py-5 lg:px-16 lg:py-6 flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-300 via-primary to-orange-500 transform hover:scale-105 transition-all duration-300 hover:rotate-2 border-[4px] border-dark shadow-[8px_8px_0_0_rgba(26,26,26,1)]"
                            >
                                {t.hero.registerBtn}
                            </a>

                            {/* Hover Tooltip / Note */}
                            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-max max-w-[90vw]
                              opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 
                              transition-all duration-300 bg-dark text-white text-sm md:text-base px-5 py-2.5 font-body font-bold rounded-sm pointer-events-none shadow-xl border-2 border-white/20">
                                {t.hero.registerNote}
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px] border-l-transparent border-r-transparent border-b-dark"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right: Highly impactful generated Pop-Art Microphone Image */}
                <motion.div
                    initial={{ x: 50, opacity: 0, scale: 0.8 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 80 }}
                    className="w-[85%] md:w-[55%] flex justify-center items-center relative z-20 order-1 md:order-2"
                >
                    <div className="relative w-full max-w-[450px] lg:max-w-[650px] transform hover:scale-105 transition-transform duration-500 hover:-rotate-2 cursor-pointer">
                        <img
                            src="/hero-mic.png"
                            alt="ASE Voice Retro Microphone"
                            className="w-full h-auto drop-shadow-[20px_20px_0_rgba(26,26,26,0.5)] md:drop-shadow-[35px_35px_0_rgba(26,26,26,0.6)] mix-blend-multiply"
                        />
                    </div>
                </motion.div>

            </div>

            {/* Decorative Waveform at the bottom edge */}
            <div className="absolute bottom-0 inset-x-0 h-24 flex items-end justify-between px-2 gap-1 md:gap-2 opacity-30 pointer-events-none z-10">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className={`w-full bg-dark waveform-bar delay-${(i % 5) + 1}`}
                        style={{
                            height: `${Math.random() * 100}%`,
                            minHeight: '20px'
                        }}
                    ></div>
                ))}
            </div>
        </section>
    );
};

export default Hero;
