import React, { createContext, useContext, useState } from 'react';

const translations = {
    zh: {
        nav: { register: "即刻報名" },
        hero: {
            titleLine1: "第五屆",
            titleLine2: "日月光",
            titleLine3: "好聲音",
            subtitle: "開放集團全台同仁報名",
            registerBtn: "即刻報名",
            registerNote: "* 註：需使用 Google 帳號進行登入",
        },
        info: {
            title: "活動資訊",
            groups: "參賽資格與組別",
            groupsDesc: "限日月光投控旗下事業體在職職員報名 (2024、2025年冠亞軍除外)。\n\n華語組：國台客粵等 (限額 200 組)\n外語組：英語與其他語言 (限額 200 組)",
            timeline: "完整賽制與時程",
            timelineItems: [
                {
                    date: "6/1 - 6/21",
                    event: "初賽報名 (線上影片繳交)",
                    details: "拍攝並上傳 60-90 秒「純清唱」自選曲影片 (含主副歌各一遍)。嚴禁後製修音，須露臉拍攝半身。"
                },
                {
                    date: "6/22 - 7/4",
                    event: "線上初審",
                    details: "由專業評審進行純線上評核。評分標準：歌唱技巧 40%, 發音咬字 20%, 節奏 20%, 感情 10%, 演繹風格 10%。"
                },
                {
                    date: "7/8",
                    event: "公告決賽名單",
                    details: "華語組與外語組各取前 10 名，共 20 名晉級決賽。"
                },
                {
                    date: "7/18 - 8/22",
                    event: "決賽培訓與樂團彩排",
                    details: "主辦單位將於週末安排專業導師 1對1 指導及兩次樂團現場彩排。"
                },
                {
                    date: "9/11",
                    event: "活動總決賽 (現場演唱)",
                    details: "地點：日月光高雄廠 K23 1F 國際會議廳。將由專業樂團現場伴奏，不提供提詞機。(15:00 - 17:00)"
                }
            ],
            prizes: "競賽獎項 (各組)",
            prizesList: [
                { title: "冠軍", amount: "NT$ 20,000", extra: "獎盃乙座" },
                { title: "亞軍", amount: "NT$ 15,000", extra: "獎盃乙座" },
                { title: "季軍", amount: "NT$ 10,000", extra: "獎盃乙座" },
                { title: "佳作", amount: "NT$ 3,000", extra: "各組取8名" }
            ]
        },
        highlights: {
            title: "歷屆精彩回顧"
        },
        footer: {
            organizer: "主辦單位：日月光文教基金會、日月光集團聯合職工福利委員會\n協辦單位：日月光半島體中壢分公司、矽品精密、環旭電子",
            rights: "主辦單位將保留修正、終止或解釋本活動之最終權利。",
            contact: "聯絡窗口"
        }
    },
    en: {
        nav: { register: "Register" },
        hero: {
            titleLine1: "5TH",
            titleLine2: "ASE",
            titleLine3: "VOICE",
            subtitle: "Open for Registration Worldwide",
            registerBtn: "REGISTER NOW",
            registerNote: "* Note: Google account login required",
        },
        info: {
            title: "Competition Info",
            groups: "Categories & Eligibility",
            groupsDesc: "Open to current employees of ASE Technology Holding subsidiaries (excluding 2024/2025 Top 2).\n\nMandarin: (Max 200 entries)\nForeign Lang: (Max 200 entries)",
            timeline: "Competition Rules & Timeline",
            timelineItems: [
                {
                    date: "Jun 1 - Jun 21",
                    event: "Online Audition (Video Submission)",
                    details: "Upload a 60-90s a cappella video of a song of your choice. No background music or vocal effects allowed. Must show face/upper body clearly."
                },
                {
                    date: "Jun 22 - Jul 4",
                    event: "Online Judging",
                    details: "Professional judging based on: Vocal skills 40%, Pronunciation 20%, Rhythm 20%, Emotion 10%, Style/Performance 10%."
                },
                {
                    date: "Jul 8",
                    event: "Finalists Announced",
                    details: "Top 10 from each category (20 total) advance to the Grand Finals."
                },
                {
                    date: "Jul 18 - Aug 22",
                    event: "Training & Band Rehearsals",
                    details: "1-on-1 vocal coaching and two live band rehearsals arranged on weekends."
                },
                {
                    date: "Sep 11",
                    event: "Grand Finals (Live Performance)",
                    details: "Location: ASE Kaohsiung K23 1F. Live band accompaniment. No teleprompters allowed. (15:00 - 17:00)"
                }
            ],
            prizes: "Prizes (Per Category)",
            prizesList: [
                { title: "Champion", amount: "NT$ 20,000", extra: "+ Trophy" },
                { title: "Runner-up", amount: "NT$ 15,000", extra: "+ Trophy" },
                { title: "3rd Place", amount: "NT$ 10,000", extra: "+ Trophy" },
                { title: "Merit", amount: "NT$ 3,000", extra: "8 winners" }
            ]
        },
        highlights: {
            title: "Past Highlights"
        },
        footer: {
            organizer: "Organizers: ASE Educational Foundation, ASE Group Joint Welfare Committee",
            rights: "The organizer reserves the right to modify, suspend, or interpret this event.",
            contact: "Contact Information"
        }
    }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState('zh');

    const toggleLanguage = () => {
        setLang(prev => prev === 'zh' ? 'en' : 'zh');
    };

    const t = translations[lang];

    return (
        <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
