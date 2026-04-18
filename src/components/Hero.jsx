import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import AnnouncementBoard from './AnnouncementBoard';

const Hero = () => {
    const { t, lang } = useLanguage();

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-start bg-[#FFC107] overflow-hidden pt-20 border-b-[6px] border-dark isolate">
            {/* BACKGROUND LAYER: Radial Sunburst & Halftone */}
            {/* 手機版：top-[45vh] 讓轉盤中心固定在 viewport 可見區（避免 section 高於視窗時下移）  */}
            {/* 桌面版：top-1/2 維持以 section 為基準置中（section ≈ viewport 高度）             */}
            <div className="absolute left-1/2 top-[45vh] md:top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] rounded-full bg-sunburst opacity-80 pointer-events-none z-[-2] origin-center animate-[spin_120s_linear_infinite]"></div>
            <div className="absolute inset-0 bg-halftone opacity-10 pointer-events-none z-[-1]"></div>

            {/* MIDDLE LAYER: Rich Music Particles & Waves */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                <motion.div
                    animate={{ x: [0, -1200] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[30%] left-0 w-[400vw] h-64 flex flex-col justify-center opacity-30 gap-4"
                >
                    <svg viewBox="0 0 1200 100" className="w-full h-12 stroke-white/50 fill-transparent" strokeWidth="4">
                        <path d="M0 50 Q 150 0 300 50 T 600 50 T 900 50 T 1200 50" />
                    </svg>
                    <svg viewBox="0 0 1200 100" className="w-full h-16 stroke-dark/30 fill-transparent" strokeWidth="6">
                        <path d="M0 50 Q 150 100 300 50 T 600 50 T 900 50 T 1200 50" />
                    </svg>
                    <svg viewBox="0 0 1200 100" className="w-full h-10 stroke-primary/80 fill-transparent" strokeWidth="3">
                        <path d="M0 50 Q 150 20 300 50 T 600 50 T 900 50 T 1200 50" />
                    </svg>
                </motion.div>
                {[
                    { type: 'double', top: '10%', left: '15%', size: 64, dur: 6, delay: 0 },
                    { type: 'single', top: '22%', left: '45%', size: 48, dur: 4.5, delay: 0.5 },
                    { type: 'staff',  top: '15%', left: '30%', size: 100, dur: 7, delay: 1.2 },
                    { type: 'double', top: '40%', left: '12%', size: 56, dur: 7, delay: 2 },
                    { type: 'single', top: '8%',  left: '75%', size: 60, dur: 8, delay: 0.8 },
                    { type: 'staff',  top: '55%', left: '8%',  size: 120, dur: 8.5, delay: 1.5 },
                    { type: 'double', top: '65%', left: '40%', size: 96, dur: 9, delay: 0.2 },
                    { type: 'single', top: '75%', left: '15%', size: 50, dur: 5, delay: 1.0 },
                    { type: 'double', top: '80%', left: '32%', size: 70, dur: 6.5, delay: 0.7 },
                    { type: 'staff',  top: '18%', left: '60%', size: 140, dur: 10, delay: 0 },
                    { type: 'single', top: '35%', left: '25%', size: 42, dur: 5.5, delay: 0.3 },
                    { type: 'double', top: '50%', left: '5%',  size: 60, dur: 6, delay: 1.8 },
                    { type: 'double', top: '25%', left: '85%', size: 52, dur: 7.5, delay: 1.1 },
                    { type: 'staff',  top: '35%', left: '55%', size: 90, dur: 6.5, delay: 0.4 },
                    { type: 'single', top: '45%', left: '88%', size: 46, dur: 5, delay: 0.9 },
                ].map((note, i) => (
                    <motion.div
                        key={i}
                        animate={{ y: [-20, 20, -20], rotate: [-15, 15, -15] }}
                        transition={{ duration: note.dur, repeat: Infinity, ease: "easeInOut", delay: note.delay }}
                        className="absolute opacity-40 z-20"
                        style={{ top: note.top, left: note.left }}
                    >
                        {note.type === 'double' && (
                            <svg width={note.size} height={note.size} viewBox="0 0 24 24" className="overflow-visible">
                                <path d="M9 18V5l12-2v13" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="6" cy="18" r="3" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2"></circle>
                                <circle cx="18" cy="16" r="3" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2"></circle>
                            </svg>
                        )}
                        {note.type === 'single' && (
                            <svg width={note.size} height={note.size} viewBox="0 0 24 24" className="overflow-visible">
                                <path d="M9 18V5" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9 5c3 0 7 2 7 6" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="6" cy="18" r="3" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2"></circle>
                            </svg>
                        )}
                        {note.type === 'staff' && (
                            <svg width={note.size} height={note.size * 0.5} viewBox="0 0 100 50" className="overflow-visible">
                                <path d="M 0 10 Q 25 2 50 10 T 100 10 M 0 18 Q 25 10 50 18 T 100 18 M 0 26 Q 25 18 50 26 T 100 26 M 0 34 Q 25 26 50 34 T 100 34 M 0 42 Q 25 34 50 42 T 100 42" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
                                <ellipse cx="30" cy="26" rx="4" ry="3" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" transform="rotate(-20 30 26)"></ellipse>
                                <path d="M 33 26 V 5" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"></path>
                                <ellipse cx="65" cy="18" rx="4" ry="3" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" transform="rotate(-20 65 18)"></ellipse>
                                <path d="M 68 18 V -3" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"></path>
                            </svg>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* OVERLAY LAYER for readable text */}
            <div className="absolute inset-0 bg-gradient-to-r from-dark/60 md:from-dark/40 via-transparent to-transparent z-10 pointer-events-none"></div>

            {/* ================================================================ */}
            {/* MOBILE LAYOUT — 移除 minHeight，內容自然撐高，公告板緊接報名按鈕 */}
            {/* ================================================================ */}
            <div className="md:hidden w-full">

                {/* 單一 relative 容器：麥克風 absolute 背景，所有內容正常流排 */}
                <div className="relative w-full">

                    {/* 麥克風：absolute bottom-0，貼在整個內容底端作為背景裝飾 */}
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.9, delay: 0.3, type: "spring", stiffness: 40 }}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 mix-blend-multiply pointer-events-none origin-bottom"
                        style={{ width: '88vw', maxWidth: '380px', height: '65vh' }}
                    >
                        <picture>
                            <source srcSet={`${import.meta.env.BASE_URL}pure-mic.webp`} type="image/webp" />
                            <img
                                src={`${import.meta.env.BASE_URL}pure-mic.png`}
                                alt="ASE Voice Retro Microphone Pop Art"
                                className="w-auto h-full object-contain object-bottom drop-shadow-xl"
                            />
                        </picture>
                    </motion.div>

                    {/* 內容層（z-40）：無 minHeight，高度由內容自然決定 */}
                    <div className="relative z-40 w-full flex flex-col gap-5 px-4 pt-2 pb-8">

                        {/* Logo + 標題 */}
                        <div className="flex flex-col items-start gap-4">

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col items-center gap-2 bg-white px-3 py-2 border-[3px] border-dark shadow-[4px_4px_0_0_rgba(26,26,26,1)] w-max"
                            >
                                <div className="flex items-center gap-2 pb-1.5 border-b-2 border-dark/20">
                                    <span className="font-heading font-black text-secondary tracking-wider text-lg">ASE</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-dark/40"></div>
                                    <span className="font-heading font-black text-blue-600 tracking-wider text-lg">SPIL</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-dark/40"></div>
                                    <span className="font-heading font-black text-green-600 tracking-wider text-lg">USI</span>
                                </div>
                                <span className="font-heading font-black text-xs text-dark tracking-wide text-center">
                                    {t.hero.brandNote}
                                </span>
                            </motion.div>

                            <motion.div
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.15 }}
                                className="relative"
                            >
                                <div className="bg-dark text-white pt-6 pb-6 px-4 transform -rotate-1 relative inline-block text-left shadow-[8px_8px_0_0_rgba(244,196,98,0.3)] border-4 border-white">
                                    <div className="absolute -top-4 -left-1 bg-secondary text-white font-heading font-black text-[10px] py-1 px-3 transform -rotate-1 border-2 border-dark shadow-[2px_2px_0_0_rgba(26,26,26,1)] z-10 whitespace-nowrap">
                                        {t.hero.titleLine1} | {t.hero.subtitle}
                                    </div>
                                    <div className="flex flex-row items-baseline gap-2 whitespace-nowrap mt-2">
                                        <span className="font-heading font-black text-[2.4rem] leading-[0.85] tracking-tighter text-white drop-shadow-[2px_2px_0_#444]">
                                            {t.hero.titleLine2}
                                        </span>
                                        {t.hero.titleLine2En && (
                                            <span className="font-heading font-black text-[2rem] leading-[0.85] tracking-tighter text-secondary drop-shadow-[2px_2px_0_#444]">
                                                {t.hero.titleLine2En}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-row items-baseline gap-2 mt-2 whitespace-nowrap">
                                        <span className="font-heading font-black text-[2.8rem] leading-[0.85] tracking-tighter text-white drop-shadow-[2px_2px_0_#444]">
                                            {t.hero.titleLine3}
                                        </span>
                                        {t.hero.titleLine3En && (
                                            <span className="font-heading font-black text-[2.4rem] leading-[0.85] tracking-tighter text-secondary drop-shadow-[2px_2px_0_#444]">
                                                {t.hero.titleLine3En}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* 報名按鈕 */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex justify-center"
                        >
                            <div className="group relative w-max">
                                <div className="absolute -inset-2 bg-gradient-to-r from-[#00F0FF] via-[#0080FF] to-[#00F0FF] rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <a
                                    href={`${import.meta.env.BASE_URL}registration.html?lang=${lang}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative flex items-center justify-center bg-gradient-to-r from-[#00E1FF] via-[#0066FF] to-[#002BFF] px-10 py-4 rounded-2xl border-[3px] border-white shadow-[0_8px_20px_rgba(0,195,255,0.6)] overflow-hidden"
                                >
                                    <div className="relative flex items-center gap-3 font-heading font-black tracking-widest whitespace-nowrap">
                                        <span className="text-[1.8rem] text-white leading-none drop-shadow-[2px_2px_0_rgba(0,43,255,0.8)]">🎤</span>
                                        <span className="text-[1.6rem] text-white leading-none drop-shadow-[2px_2px_0_rgba(0,43,255,0.8)]">{t.nav.register}</span>
                                    </div>
                                </a>
                            </div>
                        </motion.div>

                        {/* 公告板：直接接在按鈕後，無空白間距 */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <AnnouncementBoard />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* ================================================================ */}
            {/* DESKTOP LAYOUT — absolute 三欄，僅 md+ 顯示                      */}
            {/* ================================================================ */}
            <div className="hidden md:block relative w-full max-w-[1680px] mx-auto min-h-[calc(100vh-5rem)] pt-16">

                {/* CENTER: MASSIVE MICROPHONE — pinned bottom-center */}
                <motion.div
                    initial={{ y: 200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.3, type: "spring", stiffness: 40 }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 pointer-events-none origin-bottom flex justify-center mix-blend-multiply"
                    style={{ width: 'clamp(380px, 50vw, 820px)', height: '92vh' }}
                >
                    <picture>
                        <source srcSet={`${import.meta.env.BASE_URL}pure-mic.webp`} type="image/webp" />
                        <img
                            src={`${import.meta.env.BASE_URL}pure-mic.png`}
                            alt="ASE Voice Retro Microphone Pop Art"
                            className="w-auto h-full max-h-[100%] object-contain object-bottom drop-shadow-xl"
                        />
                    </picture>
                </motion.div>

                {/* Left Side: Logo + Title + CTA */}
                <div className="absolute top-0 bottom-0 left-0 w-[36%] lg:w-[33%] xl:w-[30%] pl-8 md:pl-12 lg:pl-14 xl:pl-18 pb-24 flex flex-col items-start z-40 justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-start gap-4 mb-8 md:mb-12 bg-white p-3 lg:p-4 border-[3px] border-dark shadow-[6px_6px_0_0_rgba(26,26,26,1)] rounded-none w-max"
                    >
                        <div className="flex items-center gap-2 lg:gap-3 pb-2 border-b-2 border-dark/20 w-max">
                            <span className="font-heading font-black text-secondary tracking-wider text-xl lg:text-3xl">ASE</span>
                            <div className="w-2 h-2 rounded-full bg-dark/40"></div>
                            <span className="font-heading font-black text-blue-600 tracking-wider text-xl lg:text-3xl">SPIL</span>
                            <div className="w-2 h-2 rounded-full bg-dark/40"></div>
                            <span className="font-heading font-black text-green-600 tracking-wider text-xl lg:text-3xl">USI</span>
                        </div>
                        <div className="pt-0">
                            <span className="font-heading font-black text-base lg:text-lg text-dark tracking-wide">
                                {t.hero.brandNote}
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative w-full flex justify-start"
                    >
                        <div className="bg-dark text-white pt-8 pb-8 px-6 lg:px-10 transform -rotate-2 relative z-10 inline-block w-max text-left shadow-[10px_10px_0_0_rgba(244,196,98,0.3)] border-4 border-white max-w-full">
                            <div className="absolute -top-5 -left-4 bg-secondary text-white font-heading font-black text-sm lg:text-base py-1 px-4 transform -rotate-2 border-2 border-dark shadow-[3px_3px_0_0_rgba(26,26,26,1)] z-20 whitespace-nowrap">
                                {t.hero.titleLine1} | {t.hero.subtitle}
                            </div>
                            <div className="flex flex-row items-baseline justify-start gap-2 whitespace-nowrap mt-4">
                                <span className="font-heading font-black text-[3.5rem] lg:text-[4.8rem] xl:text-[5.5rem] leading-[0.8] tracking-tighter text-white drop-shadow-[2px_2px_0_#444]">
                                    {t.hero.titleLine2}
                                </span>
                                {t.hero.titleLine2En && (
                                    <span className="font-heading font-black text-[3rem] lg:text-[4.2rem] xl:text-[5rem] leading-[0.8] tracking-tighter text-secondary drop-shadow-[2px_2px_0_#444]">
                                        {t.hero.titleLine2En}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-row items-baseline justify-start gap-2 md:gap-3 mt-4 whitespace-nowrap">
                                <span className="font-heading font-black text-[4rem] lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.8] tracking-tighter text-white drop-shadow-[2px_2px_0_#444]">
                                    {t.hero.titleLine3}
                                </span>
                                {t.hero.titleLine3En && (
                                    <span className="font-heading font-black text-[3.5rem] lg:text-[4.8rem] xl:text-[5.5rem] leading-[0.8] tracking-tighter text-secondary drop-shadow-[2px_2px_0_#444] lg:ml-2">
                                        {t.hero.titleLine3En}
                                    </span>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-12 lg:mt-16 flex flex-col items-start relative z-40 w-full"
                    >
                        <div className="group relative w-max">
                            <div className="absolute -inset-2 bg-gradient-to-r from-[#00F0FF] via-[#0080FF] to-[#00F0FF] rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <a
                                href={`${import.meta.env.BASE_URL}registration.html?lang=${lang}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative flex items-center justify-center w-full bg-gradient-to-r from-[#00E1FF] via-[#0066FF] to-[#002BFF] px-10 md:px-10 lg:px-14 py-4 md:py-5 rounded-2xl border-[3px] border-white shadow-[0_8px_20px_rgba(0,195,255,0.6)] hover:shadow-[0_12px_35px_rgba(0,195,255,1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full group-hover:animate-[shimmer_1s_infinite] transition-transform duration-700"></div>
                                <div className="relative flex items-center justify-center gap-3 font-heading font-black tracking-widest whitespace-nowrap">
                                    <span className="text-[2.2rem] lg:text-[2.6rem] text-white leading-none drop-shadow-[2px_2px_0_rgba(0,43,255,0.8)]">🎤</span>
                                    <span className="text-[2.2rem] lg:text-[2.5rem] text-white leading-none drop-shadow-[2px_2px_0_rgba(0,43,255,0.8)]">{t.nav.register}</span>
                                </div>
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side: AnnouncementBoard */}
                <div className="absolute top-0 bottom-0 right-0 w-[36%] lg:w-[33%] xl:w-[30%] pr-8 md:pr-12 lg:pr-14 xl:pr-18 pb-24 flex flex-col items-end z-50 justify-center pt-20">
                    <AnnouncementBoard />
                </div>
            </div>

            {/* Subdued Bottom Waveform */}
            <div className="absolute bottom-0 inset-x-0 h-16 md:h-24 flex items-end justify-between px-1 md:px-2 gap-0.5 md:gap-1 opacity-20 pointer-events-none z-20">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className={`w-full bg-dark waveform-bar delay-${(i % 5) + 1}`}
                        style={{ height: `${Math.random() * 100}%`, minHeight: '10px' }}
                    ></div>
                ))}
            </div>
        </section>
    );
};

export default Hero;
