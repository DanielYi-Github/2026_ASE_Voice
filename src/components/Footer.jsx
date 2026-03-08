import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone } from 'lucide-react';

const Footer = () => {
    const { lang, t } = useLanguage();

    return (
        <footer className="bg-dark text-white pt-16 pb-8 px-4 md:px-8">
            <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 pb-12 border-b-2 border-gray-700">

                    <div className="max-w-md">
                        <h2 className="text-3xl font-heading font-black mb-4"><span className="text-primary">ASE</span> VOICE</h2>
                        <p className="font-body text-gray-400 mb-2">{t.footer.organizer}</p>
                        <p className="font-body text-gray-500 text-sm">{t.footer.rights}</p>
                    </div>

                    <div className="bg-white/10 p-6 border-l-4 border-primary">
                        <h3 className="font-heading font-bold text-xl mb-4 text-primary">{t.footer.contact}</h3>
                        {lang === 'zh' ? (
                            <ul className="space-y-2 font-body text-sm text-gray-300">
                                <li className="flex items-center gap-2"><Phone size={16} /> 日月光高雄廠：Daniel 0919635167</li>
                                <li className="flex items-center gap-2 text-gray-500">日月光中壢廠：(請洽各廠服務代表)</li>
                                <li className="flex items-center gap-2 text-gray-500">矽品精密工業：(請洽各廠服務代表)</li>
                                <li className="flex items-center gap-2 text-gray-500">環旭電子：(請洽各廠服務代表)</li>
                            </ul>
                        ) : (
                            <ul className="space-y-2 font-body text-sm text-gray-300">
                                <li className="flex items-center gap-2"><Phone size={16} /> ASE Kaohsiung: Daniel 0919635167</li>
                                <li className="flex items-center gap-2 text-gray-500">ASE Chungli: (Contact local rep)</li>
                                <li className="flex items-center gap-2 text-gray-500">SPIL: (Contact local rep)</li>
                                <li className="flex items-center gap-2 text-gray-500">USI: (Contact local rep)</li>
                            </ul>
                        )}
                    </div>
                </div>

                <div className="text-center font-body text-gray-600 text-sm">
                    &copy; 2026 ASE Group. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
