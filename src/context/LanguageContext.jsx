import React, { createContext, useContext, useState } from 'react';

const translations = {
    zh: {
        nav: {
            register: "即刻報名",
            title: "全國性日月光集團歌唱比賽",
            langSwitch: "EN"
        },
        hero: {
            brandNote: "日月光投控集團成員共同參與",
            titleLine1: "第五屆",
            titleLine2: "日月光",
            titleLine2En: "ASE",
            titleLine3: "好聲音",
            titleLine3En: "VOICE",
            subtitle: "首次全國性開放集團同仁報名",
            registerBtn: "即刻報名",
            registerPrefix: "活動採線上報名，",
            registerNote: "* 註：需使用 Google 帳號進行登入",
        },
        info: {
            title: "活動資訊與規範",
            purpose: "活動宗旨",
            purposeDesc: "秉持日月光文教基金會「宏揚文化、發展社會教育、培養藝文人才」之宗旨，與集團「社會共融、價值共創」之永續理念。期望透過音樂的溫暖力量廣結善緣，為員工提供展現歌唱才華的舞台，藉由正當休閒娛樂活動倡導企業活力、增進同仁身心健康，並深化職場中的人際共融與企業向心力。",
            groups: "參賽資格與組別",
            groupsDesc: "【參賽資格】\n- 限日月光投資控股股份有限公司旗下之事業體在職職員均可報名參加。\n- 2025年冠亞軍及佳作選手與2024年冠亞軍，不得報名此屆賽事。\n\n【競賽組別】(本比賽均採個人賽)\n- 華語組：國語、台語、客家、粵語 (限額 200 組)\n- 外語組：英語與其他語言 (限額 200 組)",
            timeline: "完整賽制與時程",
            timelineItems: [
                {
                    date: "6/1 - 6/21",
                    event: "初賽線上海選 (線上影片繳交)",
                    details: "【選曲規定】自選一首曲目，初、決賽皆為同一首，不得更改。\n【形式規定】採純清唱！嚴禁伴奏、擴音、伴唱或任何數位修音、人聲後製處理。\n【錄製規範】錄製自選曲之主歌、副歌各一遍。影片總時長限 60 至 90 秒。須正面拍攝，清晰露出臉部、嘴形、半身及腰部。"
                },
                {
                    date: "6/22 - 7/4",
                    event: "初賽評審",
                    details: "由評審老師針對清唱影片進行線上評分，參賽者只需靜候結果。\n【評分準則】\n1. 歌唱技巧 (40%)：旋律難度、演唱技巧及方式\n2. 發音咬字 (20%)\n3. 節奏 (20%)\n4. 感情 (10%)\n5. 演繹風格 (10%)：演唱時的形象、表情、肢體語言"
                },
                {
                    date: "7/8",
                    event: "公告決賽名單",
                    details: "錄取名額：華語組與外語組各取前 10 名，共 20 名晉級決賽。"
                },
                {
                    date: "7/18 - 8/22",
                    event: "決賽培訓與樂團彩排",
                    details: "為主辦單位安排之專業指導，入圍者需配合出席，時間無法配合視同放棄：\n- 專業歌唱老師 1對1 個人指導一次 (依排定於高雄/台中進行)\n- 與伴奏樂隊進行兩次現場彩排 (依排定於高雄/台中進行)"
                },
                {
                    date: "9/11",
                    event: "活動總決賽 (現場演唱)",
                    details: "時間：14:30 - 17:00\n地點：日月光高雄廠 K23 1F 國際會議廳 (楠梓區研發路 66 號)\n現場由主辦方安排專業樂團進行伴奏。比賽現場不提供提詞機，參賽者須背熟歌詞！"
                }
            ],
            prizes: "競賽獎項",
            prizeCategories: {
                mandarin: "華語組獎項",
                foreign: "外語組獎項"
            },
            rulesAndObligations: "權利與義務 / 注意事項",
            rulesDesc: "【著作權與合法性擔保】影片中嚴禁使用未經授權之商業 MV、伴奏。決賽演出若含大會指導之改編，版權歸主辦方所有。\n【肖像權授權】參賽者同意授權主辦方於活動期間錄影攝影，並同意永久無償授權內部平台(如GoTube)或外宣使用其肖像與聲音。\n【個資聲明】參賽者報名即同意個資於活動特定目的內合理使用。\n【公平性與違規】若查出冒名頂替、代唱、清唱過度後製，將立即取消資格。若已頒獎將追回全數獎金與獎盃。\n【不可抗力】若遇天災或疫情，主辦單位保留修改、變更、暫停延遲活動之最終權利。",
            prizesList: [
                { title: "冠軍 (1名)", amount: "NT$ 20,000", extra: "獎盃乙座" },
                { title: "亞軍 (1名)", amount: "NT$ 15,000", extra: "獎盃乙座" },
                { title: "季軍 (1名)", amount: "NT$ 10,000", extra: "獎盃乙座" },
                { title: "佳作 (7名)", amount: "NT$ 3,000", extra: "獎牌乙枚" }
            ]
        },
        highlights: {
            title: "歷屆精彩回顧",
            videos: [
                { year: "2022", title: "第一屆 決賽" },
                { year: "2023", title: "第二屆 決賽" },
                { year: "2024", title: "第三屆 決賽" },
                { year: "2025", title: "第四屆 決賽" }
            ]
        },
        footer: {
            organizer: "主辦單位：日月光文教基金會、日月光集團聯合職工福利委員會\n協辦單位：日月光半導體製造股份有限公司、日月光半導體製造股份有限公司中壢分公司、矽品精密工業股份有限公司、環旭電子股份有限公司",
            rights: "決賽評比由專業評審團裁定。評審團決議一經公告即為最終結果，基於對音樂尊重，任何人均不得異議。主辦單位保留修正、終止或解釋本活動之最終權利。",
            contactTitle: "聯絡窗口 (比賽期間可諮詢各區窗口)",
            contacts: [
                "日月光高雄廠：Daniel 0919635167",
                "日月光中壢廠：(請洽各廠服務代表)",
                "矽品精密工業：(請洽各廠服務代表)",
                "環旭電子：(請洽各廠服務代表)"
            ]
        }
    },
    en: {
        nav: {
            register: "Register",
            title: "ASE VOICE",
            langSwitch: "中文"
        },
        hero: {
            brandNote: "Joint Participation by ASE Holdings Members",
            titleLine1: "THE 5TH",
            titleLine2: "日月光",
            titleLine2En: "ASE",
            titleLine3: "好聲音",
            titleLine3En: "VOICE",
            subtitle: "First Nationwide Corporate Singing Competition",
            registerBtn: "REGISTER NOW",
            registerPrefix: "Online registration only. ",
            registerNote: "* Note: Google account login required",
        },
        info: {
            title: "Information & Rules",
            purpose: "Event Purpose",
            purposeDesc: "Upholding the ASE Cultural & Educational Foundation's mission of promoting culture and cultivating artistic talents, alongside the Group's sustainability vision of 'Social Inclusion and Value Co-creation'. This event uses the warmth of music to build connections, providing employees a stage to showcase vocal talents, promoting healthy recreation, and strengthening corporate cohesion.",
            groups: "Eligibility & Categories",
            groupsDesc: "[Eligibility]\n- Open to current employees of ASE Technology Holding subsidiaries.\n- 2024/2025 Champions and Runners-up (and 2025 Merit winners) may not participate.\n\n[Categories] (Individual entries only)\n- Mandarin Group: Mandarin, Taiwanese, Hakka, Cantonese (Limit: 200 entries)\n- Foreign Language Group: English & Others (Limit: 200 entries)",
            timeline: "Competition Formats & Timeline",
            timelineItems: [
                {
                    date: "Jun 1 - Jun 21",
                    event: "Online preliminary audition (Video Submission)",
                    details: "[Song] One selected song for both Audition & Finals. No mid-competition changes allowed.\n[Format] A Cappella ONLY! No instrumental backing, vocal effects, or post-production audio tuning.\n[Video] Record one Verse and one Chorus. Total length: 60-90 seconds. Must shoot clearly showing face, mouth, and upper body from the waist up."
                },
                {
                    date: "Jun 22 - Jul 4",
                    event: "Preliminary Judges",
                    details: "Professional judges will review a cappella videos online.\n[Judging Criteria]\n1. Vocal Skills (40%): Melody difficulty, technique\n2. Pronunciation & Articulation (20%)\n3. Rhythm (20%)\n4. Emotion (10%)\n5. Performance Style (10%): Persona, expressions, body language"
                },
                {
                    date: "Jul 8",
                    event: "Finalists Announced",
                    details: "Quota: Top 10 from each category, totaling 20 finalists advancing to the Grand Finals."
                },
                {
                    date: "Jul 18 - Aug 22",
                    event: "Finals Training & Band Rehearsals",
                    details: "Finalists MUST attend organized training:\n- One 1-on-1 session with a professional vocal coach (in Kaohsiung/Taichung)\n- Two organized live band rehearsals (in Kaohsiung/Taichung). Failure to attend forfeits the opportunity."
                },
                {
                    date: "Sep 11",
                    event: "Grand Finals (Live)",
                    details: "Time: 14:30 - 17:00\nLocation: ASE Kaohsiung K23 1F Int'l Conference Hall.\nLive band accompaniment will be provided. NO TELEPROMPTERS allowed. Memorize your lyrics!"
                }
            ],
            prizes: "Prizes",
            prizeCategories: {
                mandarin: "Mandarin Category Prizes",
                foreign: "Foreign Language Category Prizes"
            },
            rulesAndObligations: "Rights, Obligations & Notices",
            rulesDesc: "[Copyright] Strict ban on unauthorized commercial MVs/backing tracks. Performance copyrights adapted with coach advice belong to organizers.\n[Portrait Rights] Participants authorize permanent, regional-free use of recordings and imaging for internal (e.g., GoTube) and external promo uses.\n[Data Privacy] Registration counts as consent to use personal data specifically for this event's operations.\n[Fairness] Identity fraud, lip-syncing, or vocal editing in auditions will result in immediate disqualification and prize revocation.\n[Force Majeure] Organizers reserve the right to suspend or modify the event due to unforeseen natural disasters or pandemics.",
            prizesList: [
                { title: "Champion", amount: "NT$ 20,000", extra: "Trophy" },
                { title: "Runner-up", amount: "NT$ 15,000", extra: "Trophy" },
                { title: "3rd Place", amount: "NT$ 10,000", extra: "Trophy" },
                { title: "Merit (7)", amount: "NT$ 3,000", extra: "Medal" }
            ]
        },
        highlights: {
            title: "Past Highlights",
            videos: [
                { year: "2022", title: "1st Ed. Finals" },
                { year: "2023", title: "2nd Ed. Finals" },
                { year: "2024", title: "3rd Ed. Finals" },
                { year: "2025", title: "4th Ed. Finals" }
            ]
        },
        footer: {
            organizer: "Organizers: ASE Cultural & Educational Foundation, ASE Group Welfare Committee\nCo-organizers: Advanced Semiconductor Engineering, Inc., ASE Chungli, SPIL, USI",
            rights: "The judge's panel's decision is final upon announcement. Subject to music professionalism rulings. The organizer reserves the right to modify, suspend, or interpret this event.",
            contactTitle: "Contacts (Reach out to regional reps)",
            contacts: [
                "ASE Kaohsiung: Daniel 0919635167",
                "ASE Chungli: (Contact local rep)",
                "SPIL: (Contact local rep)",
                "USI: (Contact local rep)"
            ]
        }
    }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(() => {
        if (typeof window !== 'undefined' && navigator.language) {
            const browserLang = navigator.language.toLowerCase();
            return browserLang.includes('zh') ? 'zh' : 'en';
        }
        return 'zh';
    });

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
