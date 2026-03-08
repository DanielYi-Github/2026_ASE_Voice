import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center bg-sunburst overflow-hidden pt-20 border-b-[6px] border-dark isolate">
            {/* Decorative Halftone overlay */}
            <div className="absolute inset-0 bg-halftone opacity-10 pointer-events-none mix-blend-multiply z-[-1]"></div>

            {/* Dynamic Backgrounds (Staves & Waveforms) */}
            <div className="absolute inset-x-0 top-0 bottom-32 pointer-events-none z-0 overflow-hidden">
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
                    animate={{ y: [15, -15, 15], rotate: [10, -20, 10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-[45%] left-[8%] lg:left-[5%] opacity-60"
                >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dark">
                        <path d="M9 18V5l12-2v13"></path>
                        <circle cx="6" cy="18" r="3"></circle>
                    </svg>
                </motion.div>

                <motion.div
                    animate={{ y: [-10, 25, -10], rotate: [0, 15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute top-[10%] left-[40%] lg:left-[35%] opacity-50"
                >
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dark">
                        <path d="M9 18V5l12-2v13"></path>
                        <circle cx="6" cy="18" r="3"></circle>
                        <circle cx="18" cy="16" r="3"></circle>
                    </svg>
                </motion.div>

                <motion.div
                    animate={{ y: [30, -10, 30], rotate: [-15, 5, -15] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute top-[60%] left-[25%] lg:left-[20%] opacity-70"
                >
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dark">
                        <path d="M9 18V5l12-2v13"></path>
                        <circle cx="6" cy="18" r="3"></circle>
                    </svg>
                </motion.div>

                <motion.div
                    animate={{ y: [-25, 15, -25], rotate: [20, -10, 20] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                    className="absolute top-[15%] right-[20%] lg:right-[30%] opacity-60"
                >
                    <svg width="52" height="52" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dark">
                        <path d="M9 18V5l12-2v13"></path>
                        <circle cx="6" cy="18" r="3"></circle>
                        <circle cx="18" cy="16" r="3"></circle>
                    </svg>
                </motion.div>
            </div>

            {/* Pure White Background Generated Image - Absolute Positioning to FIX Mix-Blend context */}
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, type: "tween", ease: "easeOut" }}
                className="absolute bottom-[-5vh] right-[-10vw] md:right-[-2vw] lg:right-10 xl:right-32 w-[90vw] md:w-[60vw] lg:w-[45vw] max-w-[900px] h-[55vh] md:h-[85vh] mix-blend-multiply pointer-events-none z-10 origin-bottom"
            >
                <img
                    src="/pure-mic.png"
                    alt="ASE Voice Retro Microphone Pop Art"
                    className="w-full h-full object-contain pointer-events-auto hover:scale-[1.03] hover:-rotate-2 transition-transform duration-500 origin-bottom md:drop-shadow-[15px_15px_0_rgba(26,26,26,0.2)]"
                />
            </motion.div>

            <div className="container mx-auto px-4 z-20 flex pt-8 md:pt-12 md:px-12 w-full max-w-[1400px] relative h-full">

                {/* Left: Pixel-Perfect Title & CTA Block */}
                <div className="flex flex-col items-center md:items-start w-full md:w-[65%] lg:w-[55%] z-30 mt-6 md:mt-0 mb-48 md:mb-0">

                    {/* Corporate Brand Array */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-2 md:gap-4 mb-8 md:mb-12 px-4 md:px-6 py-2 border-[4px] border-dark bg-white shadow-brutal transform -rotate-2 origin-left self-center md:self-start relative z-30"
                    >
                        <span className="font-heading font-black text-secondary tracking-widest text-xs sm:text-sm md:text-base">ASE</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-dark hidden sm:block"></div>
                        <span className="font-heading font-black text-blue-700 tracking-widest text-xs sm:text-sm md:text-base hidden sm:block">SPIL</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-dark hidden sm:block"></div>
                        <span className="font-heading font-black text-green-700 tracking-widest text-xs sm:text-sm md:text-base hidden sm:block">USI</span>
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-body font-bold text-[10px] md:text-[11px] bg-dark text-white px-2 py-0.5 whitespace-nowrap border-2 border-dark z-20">
                            日月光投控集團成員共同參與
                        </div>
                    </motion.div>

                    {/* Original Poster Style Title Box */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                        className="relative inline-block w-full max-w-[700px]"
                    >
                        {/* The Black Box */}
                        <div className="bg-dark text-white pt-10 pb-8 px-4 sm:px-6 md:px-10 transform -rotate-3 relative z-10 w-full text-center md:text-left shadow-[8px_8px_0_0_rgba(244,196,98,0.7)] border-[3px] border-white/10"
                            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.15\' mix-blend-mode=\'screen\'/%3E%3C/svg%3E")' }}>

                            {/* Top Yellow Ribbon */}
                            <div className="absolute -top-4 left-2 sm:-left-4 bg-primary text-dark font-heading font-black text-xs sm:text-sm md:text-base py-1 px-3 sm:px-4 transform -rotate-2 border-2 border-dark shadow-[3px_3px_0_0_rgba(26,26,26,1)] z-20 flex flex-wrap gap-1 sm:gap-2 w-max max-w-[90%]">
                                <span className="text-dark">首屆</span>
                                <span className="text-white drop-shadow-[1px_1px_0_rgba(26,26,26,1)]">{t.hero.titleLine2}{t.hero.titleLine3}</span>
                                <span className="text-dark whitespace-nowrap hidden sm:inline">{t.hero.subtitle}</span>
                            </div>

                            {/* Huge Text: Row 1 */}
                            <div className="flex flex-row items-baseline justify-center md:justify-start gap-3 sm:gap-4 md:mb-2 whitespace-nowrap">
                                <span className="font-heading font-black text-[3rem] sm:text-[4.5rem] md:text-[5rem] lg:text-[6.5rem] leading-[0.85] tracking-tighter text-white drop-shadow-[2px_2px_0_#A0A0A0]">
                                    {t.hero.titleLine2}
                                </span>
                                <span className="font-heading font-black text-[3rem] sm:text-[4.5rem] md:text-[5rem] lg:text-[6.5rem] leading-[0.85] tracking-tighter text-secondary drop-shadow-[2px_2px_0_#800000]">
                                    ASE
                                </span>
                            </div>

                            {/* Huge Text: Row 2 */}
                            <div className="flex flex-row items-baseline justify-center md:justify-start gap-3 sm:gap-4 mt-2 sm:mt-4 md:mt-0 whitespace-nowrap">
                                <span className="font-heading font-black text-[3.5rem] sm:text-[5rem] md:text-[6rem] lg:text-[7.5rem] leading-[0.85] tracking-tighter text-white drop-shadow-[2px_2px_0_#A0A0A0]">
                                    {t.hero.titleLine3}
                                </span>
                                <span className="font-heading font-black text-[3rem] sm:text-[4.5rem] md:text-[5rem] lg:text-[6.5rem] leading-[0.85] tracking-tighter text-secondary drop-shadow-[2px_2px_0_#800000] ml-0 sm:ml-2">
                                    VOICE
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Original Poster Style CTA Button Container */}
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-12 md:mt-20 flex flex-col items-center md:items-start gap-3 relative z-40 w-full"
                    >
                        <div className="group relative mx-auto md:mx-0 w-full max-w-[320px] sm:max-w-[420px] md:max-w-[480px]">
                            <a
                                href="https://reurl.cc/qpzKog"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full bg-gradient-to-r from-red-600 to-orange-500 text-center py-4 sm:py-6 md:py-8 transform -rotate-2 hover:-translate-y-2 hover:-rotate-3 transition-all duration-300 relative border-[4px] sm:border-[6px] border-dark shadow-[8px_8px_0_0_rgba(26,26,26,0.9)] hover:shadow-[12px_12px_0_0_rgba(26,26,26,1)]"
                                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.15\' mix-blend-mode=\'screen\'/%3E%3C/svg%3E")' }}
                            >
                                {/* Transparent accent strips inside the button */}
                                <div className="absolute top-1.5 left-1.5 right-1.5 h-1 bg-white/30"></div>
                                <div className="absolute bottom-1.5 left-1.5 right-1.5 h-1 bg-dark/20"></div>

                                <div className="flex items-center justify-center gap-2 sm:gap-4 font-heading font-black tracking-tighter whitespace-nowrap drop-shadow-[2px_2px_0_rgba(26,26,26,1)]">
                                    <span className="text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] text-white leading-none">即刻</span>
                                    <span className="text-[2.8rem] sm:text-[4rem] md:text-[5.5rem] text-primary leading-none pb-0.5 sm:pb-1 drop-shadow-[2px_2px_0_rgba(26,26,26,1)]">報名</span>
                                </div>
                            </a>

                            {/* Note Below the button directly matching the poster */}
                            <div className="w-full text-center mt-6 transform -rotate-2 font-body font-bold text-xs sm:text-sm md:text-base text-dark bg-white/50 backdrop-blur-sm px-4 py-1.5 border-2 border-dark rounded-full inline-block shadow-sm">
                                活動採線上報名，{t.hero.registerNote}
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>

            {/* Decorative Waveform at the bottom edge */}
            <div className="absolute bottom-0 inset-x-0 h-24 flex items-end justify-between px-2 gap-1 md:gap-2 opacity-30 pointer-events-none z-0">
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
