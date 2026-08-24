import React, { useState, useEffect } from 'react';
import { getTimeRemaining } from '../utils/registrationUtils';
import { useLanguage } from '../context/LanguageContext';

const RegistrationCountdown = ({ onFinish }) => {
    const { t } = useLanguage();
    const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

    useEffect(() => {
        const timer = setInterval(() => {
            const remaining = getTimeRemaining();
            setTimeLeft(remaining);

            if (remaining.total <= 0) {
                clearInterval(timer);
                if (onFinish) onFinish();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [onFinish]);

    if (timeLeft.total <= 0) return null;

    const TimeUnit = ({ value, label }) => (
        <div className="flex flex-col items-center">
            <div className="bg-dark text-white w-12 h-12 md:w-16 md:h-16 rounded-lg flex items-center justify-center border-2 border-white/20 shadow-[4px_4px_0_0_rgba(26,26,26,0.3)] mb-1">
                <span className="font-heading font-black text-xl md:text-2xl lg:text-3xl">
                    {value.toString().padStart(2, '0')}
                </span>
            </div>
            <span className="text-[10px] md:text-xs font-bold text-dark/60 uppercase tracking-tighter">
                {label}
            </span>
        </div>
    );

    return (
        <div className="flex flex-col items-center mt-6 animate-fade-in">
            <span className="font-heading font-black text-dark/80 text-sm md:text-base mb-3 tracking-widest bg-white/50 px-3 py-0.5 rounded-full border border-dark/10">
                {t.nav.countdownTitle || "REGISTRATION STARTS IN"}
            </span>
            <div className="flex items-start gap-2 md:gap-4">
                <TimeUnit value={timeLeft.days} label={t.nav.days || "Days"} />
                <div className="pt-3 md:pt-4 font-black text-dark/40">:</div>
                <TimeUnit value={timeLeft.hours} label={t.nav.hours || "Hours"} />
                <div className="pt-3 md:pt-4 font-black text-dark/40">:</div>
                <TimeUnit value={timeLeft.minutes} label={t.nav.mins || "Mins"} />
                <div className="pt-3 md:pt-4 font-black text-dark/40">:</div>
                <TimeUnit value={timeLeft.seconds} label={t.nav.secs || "Secs"} />
            </div>
        </div>
    );
};

export default RegistrationCountdown;
