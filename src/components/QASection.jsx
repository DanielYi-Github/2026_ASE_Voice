import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { HelpCircle, ChevronDown, MessageCircleQuestion, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QASection = () => {
    const { t } = useLanguage();
    const [isQAVisible, setIsQAVisible] = useState(false);
    const [openIndex, setOpenIndex] = useState(null);

    const toggleQA = () => {
        setIsQAVisible(prev => !prev);
        if (isQAVisible) {
            setOpenIndex(null);
        }
    };

    const toggleQuestion = (index) => {
        setOpenIndex(prev => prev === index ? null : index);
    };

    return (
        <section className="section-padding bg-dark border-b-4 border-dark overflow-hidden relative" id="qa">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 35px,
                        rgba(245,184,65,1) 35px,
                        rgba(245,184,65,1) 36px
                    )`
                }}></div>
            </div>

            <div className="container mx-auto max-w-[100rem] relative z-10 px-3 md:px-8 lg:px-12">
                {/* Section Header */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="text-center mb-12 md:mb-16"
                >
                    <div className="flex flex-col items-center justify-center gap-8">
                        <div className="inline-block relative">
                            <div className="absolute -inset-2 bg-secondary transform -rotate-2"></div>
                            <h2 className="relative inline-block text-5xl md:text-7xl font-heading font-black bg-primary text-dark px-10 py-5 border-[5px] border-dark rotate-1 tracking-tight">
                                {t.qa.title}
                            </h2>
                        </div>
                        <p className="text-white/70 font-body font-bold text-lg md:text-xl max-w-2xl">
                            {t.qa.subtitle}
                        </p>

                        {/* Toggle Button */}
                        <button
                            onClick={toggleQA}
                            className={`
                                group relative inline-flex items-center gap-4 
                                font-heading font-black tracking-wide text-xl md:text-2xl 
                                px-10 py-5 border-[5px] border-dark 
                                transition-all duration-300 cursor-pointer
                                ${isQAVisible
                                    ? 'bg-secondary text-white shadow-[0px_0px_0_0_rgba(26,26,26,1)] translate-x-1 translate-y-1'
                                    : 'bg-primary text-dark shadow-[8px_8px_0_0_rgba(26,26,26,1)] hover:shadow-[4px_4px_0_0_rgba(26,26,26,1)] hover:translate-x-1 hover:translate-y-1'
                                }
                            `}
                        >
                            {isQAVisible ? (
                                <>
                                    <X className="w-7 h-7" />
                                    {t.qa.hideBtn}
                                </>
                            ) : (
                                <>
                                    <MessageCircleQuestion className="w-7 h-7 group-hover:animate-bounce" />
                                    {t.qa.showBtn}
                                    <span className="animate-bounce-x inline-block">→</span>
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>

                {/* QA Content - Accordion */}
                <AnimatePresence>
                    {isQAVisible && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="overflow-hidden"
                        >
                            <div className="space-y-4 md:space-y-5 max-w-5xl mx-auto pb-8">
                                {t.qa.items.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ x: index % 2 === 0 ? -60 : 60, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.04, duration: 0.4, ease: 'easeOut' }}
                                    >
                                        <div
                                            className={`
                                                border-[4px] border-dark transition-all duration-300
                                                ${openIndex === index
                                                    ? 'bg-primary shadow-[0px_0px_0_0_rgba(26,26,26,1)] translate-x-1 translate-y-1'
                                                    : 'bg-white shadow-[6px_6px_0_0_rgba(26,26,26,1)] hover:shadow-[3px_3px_0_0_rgba(26,26,26,1)] hover:translate-x-[3px] hover:translate-y-[3px]'
                                                }
                                            `}
                                        >
                                            {/* Question Header */}
                                            <button
                                                onClick={() => toggleQuestion(index)}
                                                className="w-full flex items-center gap-3 md:gap-5 p-4 md:p-6 text-left cursor-pointer group"
                                            >
                                                <span className={`
                                                    shrink-0 flex items-center justify-center 
                                                    w-10 h-10 md:w-14 md:h-14 
                                                    border-[3px] md:border-[4px] border-dark 
                                                    font-heading font-black text-sm md:text-lg
                                                    transition-all duration-300
                                                    ${openIndex === index
                                                        ? 'bg-secondary text-white rotate-6 shadow-[2px_2px_0_0_rgba(26,26,26,1)]'
                                                        : 'bg-dark text-primary shadow-[3px_3px_0_0_rgba(227,38,38,1)]'
                                                    }
                                                `}>
                                                    Q{index + 1}
                                                </span>
                                                <span className={`
                                                    font-heading font-bold text-base md:text-xl uppercase tracking-tight flex-1
                                                    ${openIndex === index ? 'text-dark' : 'text-dark'}
                                                `}>
                                                    {item.q}
                                                </span>
                                                <ChevronDown
                                                    className={`
                                                        w-6 h-6 md:w-8 md:h-8 shrink-0 transition-transform duration-300
                                                        ${openIndex === index ? 'rotate-180 text-secondary' : 'text-gray-400'}
                                                    `}
                                                />
                                            </button>

                                            {/* Answer */}
                                            <AnimatePresence>
                                                {openIndex === index && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-4 md:px-6 pb-5 md:pb-7 pt-0">
                                                            <div className="bg-white border-[3px] border-dark p-4 md:p-6 shadow-inner">
                                                                <p className="font-body font-bold text-gray-800 text-sm md:text-lg leading-[1.8] whitespace-pre-line">
                                                                    {item.a}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Contact info at bottom */}
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="max-w-5xl mx-auto"
                            >
                                <div className="bg-secondary border-[5px] border-dark shadow-[8px_8px_0_0_rgba(245,184,65,1)] p-6 md:p-10">
                                    <div className="flex items-center gap-4 mb-5 border-b-[3px] border-white/30 pb-4">
                                        <HelpCircle className="text-white w-8 h-8" />
                                        <h3 className="text-2xl md:text-3xl font-heading font-black text-white uppercase tracking-tight">
                                            {t.qa.contactTitle}
                                        </h3>
                                    </div>
                                    <div className="font-body font-bold text-white/90 text-base md:text-lg leading-[1.9] whitespace-pre-line">
                                        {t.qa.contactInfo}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default QASection;
