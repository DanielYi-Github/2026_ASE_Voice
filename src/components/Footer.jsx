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
                        <p className="font-body text-gray-400 mb-2 whitespace-pre-line">{t.footer.organizer}</p>
                        <p className="font-body text-gray-500 text-sm">{t.footer.rights}</p>
                    </div>

                    <div className="bg-white/10 p-6 border-l-4 border-primary">
                        <h3 className="font-heading font-bold text-xl mb-4 text-primary">{t.footer.contactTitle}</h3>
                        <ul className="space-y-2 font-body text-sm text-gray-300">
                            {t.footer.contacts.map((contact, i) => (
                                <li key={i} className={`flex items-center gap-2 ${i > 0 ? 'text-gray-500' : ''}`}>
                                    {i === 0 && <Phone size={16} />} {contact}
                                </li>
                            ))}
                        </ul>
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
