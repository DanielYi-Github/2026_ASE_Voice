import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

const Navbar = () => {
    const { lang, toggleLanguage, t } = useLanguage();

    return (
        <nav className="fixed w-full top-0 z-50 bg-white border-b-4 border-dark flex justify-between items-center px-4 md:px-8 py-3">
            <div className="flex items-center gap-2">
                <div className="font-heading font-black text-xl md:text-3xl tracking-tighter flex items-center flex-wrap gap-x-1">
                    <span className="text-dark">2026</span>
                    <span className="text-secondary ml-1">ASE</span> VOICE
                    <span className="text-dark ml-2 md:ml-3 hidden sm:inline">{t.nav.title}</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 font-body font-bold text-sm bg-light border-2 border-dark px-3 py-1 shadow-[2px_2px_0_0_rgba(26,26,26,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_rgba(26,26,26,1)] transition-all"
                >
                    <Globe size={16} />
                    {t.nav.langSwitch}
                </button>

                <a
                    href="https://reurl.cc/qpzKog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden md:inline-flex btn-brutal btn-primary px-4 py-2 text-sm"
                >
                    {t.nav.register}
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
