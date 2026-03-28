import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, ChevronDown } from 'lucide-react';

const Navbar = () => {
    const { lang, setLanguage, t } = useLanguage();
    const [isLangOpen, setIsLangOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const languages = [
        { code: 'zh', label: '中文 (繁體)' },
        { code: 'en', label: 'English' },
        { code: 'vi', label: 'Tiếng Việt' }
    ];

    const currentLangLabel = languages.find(l => l.code === lang)?.label || 'Language';

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
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsLangOpen(!isLangOpen)}
                        className="flex items-center gap-2 font-body font-bold text-sm bg-light border-2 border-dark px-3 py-1 shadow-[2px_2px_0_0_rgba(26,26,26,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_rgba(26,26,26,1)] transition-all"
                    >
                        <Globe size={16} />
                        <span className="hidden sm:inline">{currentLangLabel}</span>
                        <span className="sm:hidden">{lang.toUpperCase()}</span>
                        <ChevronDown size={14} className={`transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isLangOpen && (
                        <div className="absolute right-0 mt-2 w-36 bg-white border-2 border-dark shadow-[4px_4px_0_0_rgba(26,26,26,1)] flex flex-col z-50 overflow-hidden">
                            {languages.map((l) => (
                                <button
                                    key={l.code}
                                    onClick={() => {
                                        setLanguage(l.code);
                                        setIsLangOpen(false);
                                    }}
                                    className={`text-left px-4 py-2 font-body text-sm font-bold border-b-2 border-dark last:border-b-0 hover:bg-primary transition-colors ${lang === l.code ? 'bg-primary text-dark' : 'text-dark hover:text-dark'}`}
                                >
                                    {l.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

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
