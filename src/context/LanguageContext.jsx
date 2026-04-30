import React, { createContext, useContext, useState } from 'react';

const translations = {
    zh: {
        nav: {
            register: "即刻報名",
            title: "日月光投控歌唱比賽",
            langSwitch: "EN"
        },
        board: {
            title: "最新賽事公告",
            featured: "🔥 重點消息",
            dates: "比賽時程",
            prizes: "競賽獎金"
        },
        announcement: {
            headline: "🎤 決戰好聲音！唱出你的高光時刻✨",
            description: "萬眾矚目的【2026 日月光投控好聲音】即將強勢開跑！無論你是天生歌姬還是隱藏版麥霸，這都是你閃耀的舞台！✨",
            dates: "📌 初賽收件期間：6/1 - 6/21",
            reminder: "👉 快保養好你的喉嚨，及早備妥 60-90 秒的「純清唱影片」來挑戰吧！"
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
            downloadGuide: "下載活動簡章 (PDF)",
            downloadFile: "2026日月光投控好聲音歌唱比賽簡章_(Security C).pdf",
            purpose: "活動宗旨",
            purposeDesc: "秉持日月光文教基金會「宏揚文化、發展社會教育、培養藝文人才」之宗旨，與集團「社會共融、價值共創」之永續理念。本比賽期望透過音樂的溫暖力量促進交流，為員工提供展現歌唱才華的舞台，藉由正當休閒娛樂活動展現企業活力、增進同仁身心健康，並深化職場中的人際共融與企業向心力。",
            groups: "參賽資格與組別",
            groupsDesc: "【參賽資格】\n- 限日月光投資控股股份有限公司旗下之事業體在職職員均可報名參加。\n- 2025年冠亞軍及佳作選手與2024年冠亞軍，不得報名此屆賽事。\n\n【競賽組別】(本比賽均採個人賽)\n- 華語組：國語、台語、客家、粵語 (限額 200 組)\n- 外語組：英語與其他語言 (限額 200 組)",
            timeline: "完整賽制與時程",
            timelineItems: [
                {
                    date: "6/1 - 6/21",
                    event: "初賽線上海選 (線上影片繳交)",
                    details: (
                        <span>
                            【選曲規定】自選一首曲目，初、決賽皆為同一首，不得更改。{'\n'}
                            【形式規定】採純清唱！嚴禁伴奏、擴音、伴唱或任何數位修音、人聲後製處理。{'\n'}
                            【錄製規範】錄製自選曲之主歌、副歌各一遍。影片總時長限 60 至 90 秒。須正面拍攝，清晰露出臉部、嘴形、半身及腰部。{'\n'}
                            【錄製範例】{'\n'}
                            - 中文範例：<a href="https://youtu.be/4mBwgx77t4I" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 hover:bg-blue-50 px-1 rounded transition-colors">https://youtu.be/4mBwgx77t4I</a>{'\n'}
                            - 英文範例：<a href="https://youtu.be/K7x4SSkpk8A" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 hover:bg-blue-50 px-1 rounded transition-colors">https://youtu.be/K7x4SSkpk8A</a>{'\n'}
                            - 越文範例：<a href="https://youtu.be/nlEOeIwtYhs" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 hover:bg-blue-50 px-1 rounded transition-colors">https://youtu.be/nlEOeIwtYhs</a>
                        </span>
                    )
                },
                {
                    date: "6/22 - 7/4",
                    event: "初賽審評",
                    details: "由評審老師針對清唱影片進行線上評分，參賽者只需靜候結果。\n【評分準則】\n1. 歌唱技巧 (40%)：旋律難度、演唱技巧及方式\n2. 發音咬字 (20%)\n3. 節奏 (20%)\n4. 感情 (10%)\n5. 演繹風格 (10%)：演唱時的形象、表情、肢體語言"
                },
                {
                    date: "7/8",
                    event: "公告決賽名單",
                    details: (
                        <span>
                            錄取名額：華語組與外語組各取前 10 名，共 20 名晉級決賽。{'\n'}
                            <span className="inline-block mt-3 font-heading font-bold bg-dark text-white px-3 py-1 border-2 border-dark text-sm md:text-base tracking-wide shadow-[3px_3px_0_0_rgba(26,26,26,1)] transform hover:-translate-y-1 transition-transform">
                                📢 決賽入圍名單將於本網站首頁公告
                            </span>
                        </span>
                    )
                },
                {
                    date: "7/18 - 8/22",
                    event: "決賽培訓與樂團彩排",
                    details: (
                        <span>
                            為主辦單位安排之專業指導，入圍者需配合出席。若時間無法配合，視為放棄指導機會，不得要求另行安排：{'\n'}
                            - 專業歌唱老師 1對1 個人指導一次 (依排定時間於高雄/中北部地區進行){'\n'}
                            - 與伴奏樂隊進行兩次現場彩排 (依排定時間於高雄/中北部地區進行){'\n'}
                            {'\n'}
                            【培訓與彩排日程】{'\n'}
                            - 7/18(六) - 7/19(日)：歌唱老師個人指導（高雄場）{'\n'}
                            - 7/25(六) - 7/26(日)：歌唱老師個人指導（中北部場）{'\n'}
                            - 8/1(六)、8/15(六)：樂團彩排（高雄場）{'\n'}
                            - 8/8(六)、8/22(六)：樂團彩排（中北部場）{'\n'}
                            {'\n'}
                            <span className="text-sm text-gray-500 mt-1 inline-block">
                                * 註記：中北部地區之培訓與彩排據點，將於初賽後視晉級選手之區域分佈情形定案並公告（如中部或北部選手比例而定）。
                            </span>{'\n'}{'\n'}
                            <span className="text-sm text-amber-700 font-bold mt-2 inline-block border-t border-dashed border-amber-400 pt-2">
                                📌 若與上班時間衝突，將由公司協助安排以公假處理，並負擔所有交通與誤餐費。
                            </span>
                        </span>
                    )
                },
                {
                    date: "9/11",
                    event: "活動總決賽 (現場演唱)",
                    details: (
                        <span>
                            時間：14:30 - 17:00{'\n'}
                            地點：日月光高雄廠 K23 1F 國際會議廳 (楠梓區研發路 66 號){'\n'}
                            現場由主辦方安排專業樂團進行伴奏。比賽現場不提供提詞機，參賽者須背熟歌詞！{'\n'}{'\n'}
                            <span className="text-sm text-amber-700 font-bold mt-2 inline-block border-t border-dashed border-amber-400 pt-2">
                                📌 決賽選手專屬支援：{'\n'}
                                入圍決賽之選手，公司將統一安排公假前往高雄總場參賽。凡至高雄現場參賽之選手，主辦單位將提供以下專屬補助與支援：{'\n'}
                                1. 治裝費補貼{'\n'}
                                2. 專業造型與美妝服務{'\n'}
                                3. 樂團現場彩排{'\n'}
                                4. 交通與相關差旅補助
                            </span>
                        </span>
                    )
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
                { year: "2025", title: "第四屆 決賽" },
                { year: "2024", title: "第三屆 決賽" },
                { year: "2023", title: "第二屆 決賽" },
                { year: "2022", title: "第一屆 決賽" }
            ]
        },
        footer: {
            organizer: [
                {
                    title: "主辦單位：",
                    items: [
                        "財團法人日月光文教基金會",
                        "日月光集團聯合職工福利委員會"
                    ]
                },
                {
                    title: "協辦單位：",
                    items: [
                        "日月光半導體製造股份有限公司",
                        "日月光半導體製造股份有限公司中壢分公司",
                        "矽品精密工業股份有限公司",
                        "環鴻科技股份有限公司"
                    ]
                },
                {
                    title: "承辦單位：",
                    items: ["日月光流行音樂歌唱社"]
                }
            ],
            rights: "決賽評比由專業評審團裁定。評審團決議一經公告即為最終結果，基於對音樂尊重，任何人均不得異議。主辦單位保留修正、終止或解釋本活動之最終權利。",
            contactTitle: "聯絡窗口 (比賽期間可諮詢各區窗口)",
            qaEmail: "Q&A信箱：service@asevoice.org",
            contacts: [
                "日月光高雄廠：宜德彥 Daniel, 0919635167, daniel_yi@aseglobal.com (Line ID: danyanline)",
                "日月光中壢廠：秦瑞麟 Roy Chin, 0989678600, roy_chin@aseglobal.com (Line ID:roy_chin)",
                "矽品精密：劉旻杰 Jerry Liu, 0978892508, 04-25341525#1557, Jerry0276@spil.com.tw",
                "環鴻科技：黃詩婷 Aldis, 0963788621, aldis_huang@usiglobal.com ( Line ID: catnow )"
            ]
        },
        qa: {
            title: "常見問題",
            subtitle: "關於比賽的各種疑問，都可以在這裡找到解答！",
            showBtn: "查看 Q&A",
            hideBtn: "收起 Q&A",
            contactTitle: "還有問題？聯繫我們",
            contactInfo: "Q&A信箱：service@asevoice.org\n\n日月光高雄廠：宜德彥 Daniel, 0919635167, daniel_yi@aseglobal.com (Line ID: danyanline)\n日月光中壢廠：秦瑞麟 Roy Chin, 0989678600, roy_chin@aseglobal.com (Line ID: roy_chin)\n矽品精密：劉旻杰 Jerry Liu, 0978892508, 04-25341525#1557, Jerry0276@spil.com.tw\n環鴻科技：黃詩婷 Aldis, 0963788621, aldis_huang@usiglobal.com (Line ID: catnow)",
            items: [
                { q: "誰可以報名？", a: "僅限日月光投資控股股份有限公司所屬各事業體之在職員工。" },
                { q: "哪些人不能報名？", a: "2025 年好聲音冠軍、亞軍、佳作，以及 2024 年好聲音冠軍、亞軍，不得報名。" },
                { q: "比賽是個人還是團體？", a: "本比賽採個人賽。" },
                { q: "有哪些組別？", a: "分為華語組與外語組；華語組為國語、台語、客家、粵語，外語組為英語與其他語言。" },
                { q: "報名時間到什麼時候？", a: "2026/6/1（一）至 2026/6/21（日）。" },
                { q: "要怎麼報名？", a: "採個人線上報名，請使用官方網站：https://asevoice.org" },
                { q: "初賽需要到現場嗎？", a: "不用，初賽為線上影片審核。" },
                { q: "初賽影片要怎麼錄？", a: "錄製自選曲的主歌、副歌各一遍，影片總時長 60 至 90 秒，並須正面拍攝，清晰露出臉部、嘴形、半身及腰部。" },
                { q: "初賽影片可以有伴奏、伴唱、修音或後製嗎？", a: "不可以，初賽影片必須為純清唱，嚴禁伴奏、擴音、伴唱及數位修音等後製處理。" },
                { q: "初賽和決賽可以換歌嗎？", a: "不可以，初、決賽皆為同一首曲目，不得更改。" },
                { q: "初賽線上影片有參考範例嗎？", a: "有的。\n中文範例：https://youtu.be/4mBwgx77t4I\n英文範例：https://youtu.be/K7x4SSkpk8A\n越文範例：https://youtu.be/nlEOeIwtYhs" },
                { q: "什麼時候公布決賽名單？", a: "2026/7/8（三）。" },
                { q: "會有多少人晉級決賽？", a: "華語組與外語組各取前 10 名，共 20 名。" },
                { q: "決賽在哪裡、什麼時候？", a: "2026/9/11（五）14:30–17:00，於日月光高雄廠 K23 1F 國際會議廳舉行。" },
                { q: "決賽有伴奏嗎？有提詞機嗎？", a: "決賽由主辦單位安排專業樂團現場伴奏；現場不提供提詞機，參賽者須背熟歌詞。" },
                { q: "晉級決賽後需要配合培訓和彩排嗎？", a: "需要；晉級者須配合 1 次歌唱老師 1 對 1 指導及 2 次現場彩排，若時間無法配合，視為放棄指導機會，不得要求另行安排。" },
                { q: "晉級決賽後需要配合培訓與彩排地點在哪裡？", a: "專業歌唱老師 1對1 個人指導、伴奏樂隊進行兩次現場彩排於高雄/中北部地區。\n\n註記：中北部地區之培訓與彩排據點，將於初賽後視晉級選手之區域分佈情形定案並公告（如中部或北部選手比例而定）。" },
                { q: "評分標準是什麼？", a: "歌唱技巧 40%、發音咬字 20%、節奏 20%、感情 10%、演繹風格 10%。" },
                { q: "各組獎金怎麼發？", a: "冠軍 20,000 元、亞軍 15,000 元、季軍 10,000 元、佳作每名 3,000 元；並依名次頒發獎盃或獎牌。" },
                { q: "得獎需要繳稅嗎？", a: "需要，依中華民國相關稅法規定辦理。" },
                { q: "如果被查到代唱、冒名頂替、修音或違規後製會怎樣？", a: "主辦單位有權立即取消參賽資格；若頒獎後查證屬實，將撤銷得獎資格並追回全數獎金及獎座（牌），缺額原則上不遞補。" },
                { q: "主辦單位會使用我的照片、聲音或影片嗎？", a: "會；參賽者同意主辦單位及其關係企業於活動期間錄影、攝影，並得將含有其肖像、聲音及演出畫面之照片與影片，用於內部平台、對外刊物、文宣及活動相關宣傳。" },
                { q: "活動辦法如果後續有更新，要看哪裡？", a: "以官方網站為主，不另行個別通知。" },
                { q: "有問題要找誰？", a: "Q&A信箱：service@asevoice.org\n\n日月光高雄廠：宜德彥 Daniel, 0919635167, daniel_yi@aseglobal.com (Line ID: danyanline)\n日月光中壢廠：秦瑞麟 Roy Chin, 0989678600, roy_chin@aseglobal.com (Line ID: roy_chin)\n矽品精密：劉旻杰 Jerry Liu, 0978892508, 04-25341525#1557, Jerry0276@spil.com.tw\n環鴻科技：黃詩婷 Aldis, 0963788621, aldis_huang@usiglobal.com (Line ID: catnow)" }
            ]
        }
    },
    en: {
        nav: {
            register: "Register",
            title: "Singing Competition",
            langSwitch: "中文"
        },
        board: {
            title: "BULLETIN BOARD",
            featured: "🔥 FEATURED",
            dates: "KEY DATES",
            prizes: "TOP PRIZES"
        },
        announcement: {
            headline: "🎤 Battle for the Best Voice! Sing Your Shining Moment✨",
            description: "The highly anticipated [2026 ASE Voice] is about to begin! This is your stage to shine! ✨",
            dates: "📌 Video Submission: Jun 1 - Jun 21",
            reminder: "👉 Warm up your vocal cords and prepare a 60-90s A Cappella video to join the challenge!"
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
            downloadGuide: "Download Guidelines (PDF)",
            downloadFile: "2026 ASE Voice Singing Competition Rules and Regulations_(Security C).pdf",
            purpose: "Event Purpose",
            purposeDesc: "In upholding the mission of the ASE Cultural & Educational Foundation — \"promoting culture, advancing social education, and nurturing artistic talent\" — and the Group's sustainability philosophy of \"social inclusion and shared value creation,\" this competition aims to foster communication through the warm power of music, provide employees with a stage to showcase their singing talents, demonstrate corporate vitality through wholesome recreational activities, promote the physical and mental well-being of employees, and deepen interpersonal inclusion and corporate cohesion in the workplace.",
            groups: "Eligibility & Categories",
            groupsDesc: "[Eligibility]\n- Open to current employees of ASE Technology Holding subsidiaries.\n- 2024/2025 Champions and Runners-up (and 2025 Merit winners) may not participate.\n\n[Categories] (Individual entries only)\n- Mandarin Group: Mandarin, Taiwanese, Hakka, Cantonese (Limit: 200 entries)\n- Foreign Language Group: English & Others (Limit: 200 entries)",
            timeline: "Competition Formats & Timeline",
            timelineItems: [
                {
                    date: "Jun 1 - Jun 21",
                    event: "Online preliminary audition (Video Submission)",
                    details: (
                        <span>
                            [Song] One selected song for both Audition & Finals. No mid-competition changes allowed.{'\n'}
                            [Format] A Cappella ONLY! No instrumental backing, vocal effects, or post-production audio tuning.{'\n'}
                            [Video] Record one Verse and one Chorus. Total length: 60-90 seconds. Must shoot clearly showing face, mouth, and upper body from the waist up.{'\n'}
                            [Recording Examples]{'\n'}
                            - Chinese Example: <a href="https://youtu.be/4mBwgx77t4I" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 hover:bg-blue-50 px-1 rounded transition-colors">https://youtu.be/4mBwgx77t4I</a>{'\n'}
                            - English Example: <a href="https://youtu.be/K7x4SSkpk8A" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 hover:bg-blue-50 px-1 rounded transition-colors">https://youtu.be/K7x4SSkpk8A</a>{'\n'}
                            - Vietnamese Example: <a href="https://youtu.be/nlEOeIwtYhs" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 hover:bg-blue-50 px-1 rounded transition-colors">https://youtu.be/nlEOeIwtYhs</a>
                        </span>
                    )
                },
                {
                    date: "Jun 22 - Jul 4",
                    event: "Preliminary Judges",
                    details: "Professional judges will review a cappella videos online.\n[Judging Criteria]\n1. Vocal Skills (40%): Melody difficulty, technique\n2. Pronunciation & Articulation (20%)\n3. Rhythm (20%)\n4. Emotion (10%)\n5. Performance Style (10%): Persona, expressions, body language"
                },
                {
                    date: "Jul 8",
                    event: "Finalists Announced",
                    details: (
                        <span>
                            Quota: Top 10 from each category, totaling 20 finalists advancing to the Grand Finals.{'\n'}
                            <span className="inline-block mt-3 font-heading font-bold bg-dark text-white px-3 py-1 border-2 border-dark text-sm md:text-base tracking-wide shadow-[3px_3px_0_0_rgba(26,26,26,1)] transform hover:-translate-y-1 transition-transform">
                                📢 The list of finalists will be officially announced on this website
                            </span>
                        </span>
                    )
                },
                {
                    date: "Jul 18 - Aug 22",
                    event: "Finals Training & Band Rehearsals",
                    details: (
                        <span>
                            To help finalists improve their performance, professional coaching will be arranged. Finalists MUST attend. If unable to attend at the scheduled time, it shall be deemed as a voluntary waiver, and no rescheduling will be arranged:{'\n'}
                            - One 1-on-1 session with a professional vocal coach (in Kaohsiung/Central-Northern Region){'\n'}
                            - Two live rehearsals with the accompaniment band (in Kaohsiung/Central-Northern Region){'\n'}
                            {'\n'}
                            [Training & Rehearsal Schedule]{'\n'}
                            - Jul 18(Sat) - Jul 19(Sun): Vocal Coaching (Kaohsiung){'\n'}
                            - Jul 25(Sat) - Jul 26(Sun): Vocal Coaching (Central-Northern Region){'\n'}
                            - Aug 1(Sat) & Aug 15(Sat): Band Rehearsals (Kaohsiung){'\n'}
                            - Aug 8(Sat) & Aug 22(Sat): Band Rehearsals (Central-Northern Region){'\n'}
                            {'\n'}
                            <span className="text-sm text-gray-500 mt-1 inline-block">
                                * Note: The specific training and rehearsal locations for the Central-Northern Region will be finalized and announced after the preliminary results, based on the geographical distribution of the finalists (e.g., concentration of contestants from the Northern or Central regions).
                            </span>{'\n'}{'\n'}
                            <span className="text-sm text-amber-700 font-bold mt-2 inline-block border-t border-dashed border-amber-400 pt-2">
                                📌 If the schedule conflicts with working hours, the company will assist in arranging official leave and cover all transportation and meal allowances.
                            </span>
                        </span>
                    )
                },
                {
                    date: "Sep 11",
                    event: "Grand Finals (Live)",
                    details: (
                        <span>
                            Time: 14:30 - 17:00{'\n'}
                            Location: ASE Kaohsiung K23 1F Int'l Conference Hall.{'\n'}
                            Live band accompaniment will be provided. NO TELEPROMPTERS allowed. Memorize your lyrics!{'\n'}{'\n'}
                            <span className="text-sm text-amber-700 font-bold mt-2 inline-block border-t border-dashed border-amber-400 pt-2">
                                📌 Exclusive Support for Finalists:{'\n'}
                                Finalists will be granted official leave to participate in the Grand Finals in Kaohsiung. The following exclusive support and subsidies will be provided to all on-site contestants:{'\n'}
                                1. Wardrobe & Outfit Allowance{'\n'}
                                2. Professional Makeup & Styling Services{'\n'}
                                3. Live Band Rehearsal{'\n'}
                                4. Transportation & Travel Subsidies
                            </span>
                        </span>
                    )
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
                { year: "2025", title: "4th Ed. Finals" },
                { year: "2024", title: "3rd Ed. Finals" },
                { year: "2023", title: "2nd Ed. Finals" },
                { year: "2022", title: "1st Ed. Finals" }
            ]
        },
        footer: {
            organizer: [
                {
                    title: "Organizers:",
                    items: [
                        "ASE Cultural & Educational Foundation",
                        "ASE Group Welfare Committee"
                    ]
                },
                {
                    title: "Co-organizers:",
                    items: [
                        "Advanced Semiconductor Engineering, Inc.",
                        "Advanced Semiconductor Engineering, Inc., ChungLi Branch",
                        "Siliconware Precision Industries Co., Ltd.",
                        "Universal Global Scientific Industrial Co. Ltd"
                    ]
                },
                {
                    title: "Executive Organizer:",
                    items: ["ASE Pop Music and Singing Club"]
                }
            ],
            rights: "The judge's panel's decision is final upon announcement. Subject to music professionalism rulings. The organizer reserves the right to modify, suspend, or interpret this event.",
            contactTitle: "Contacts (Reach out to regional reps)",
            qaEmail: "Q&A Email: service@asevoice.org",
            contacts: [
                "ASE Kaohsiung: Daniel Yi, 0919635167, daniel_yi@aseglobal.com (Line ID: danyanline)",
                "ASE ChungLi: Roy Chin, 0989678600, roy_chin@aseglobal.com (Line ID: roy_chin)",
                "SPIL: Jerry Liu, 0978892508, 04-25341525#1557, Jerry0276@spil.com.tw",
                "USI: Aldis Huang, 0963788621, aldis_huang@usiglobal.com (Line ID: catnow)"
            ]
        },
        qa: {
            title: "FAQ",
            subtitle: "Find answers to all your questions about the competition here!",
            showBtn: "View Q&A",
            hideBtn: "Hide Q&A",
            contactTitle: "Still Have Questions? Contact Us",
            contactInfo: "Q&A Email: service@asevoice.org\n\nASE Kaohsiung: Daniel Yi, 0919635167, daniel_yi@aseglobal.com (Line ID: danyanline)\nASE ChungLi: Roy Chin, 0989678600, roy_chin@aseglobal.com (Line ID: roy_chin)\nSPIL: Jerry Liu, 0978892508, 04-25341525#1557, Jerry0276@spil.com.tw\nUSI: Aldis Huang, 0963788621, aldis_huang@usiglobal.com (Line ID: catnow)",
            items: [
                { q: "Who is eligible to register?", a: "Only current employees of all business units under ASE Technology Holding Co., Ltd. are eligible to register." },
                { q: "Who is not eligible to register?", a: "The 2025 ASE Voice First Place winner, Second Place winner, Merit Award winners, as well as the 2024 ASE Voice First Place winner and Second Place winner, are not eligible to register." },
                { q: "Is the competition individual or group-based?", a: "This competition is an individual contest." },
                { q: "What categories are available?", a: "The competition is divided into Mandarin and Foreign Language categories. The Mandarin category includes Mandarin, Taiwanese, Hakka, and Cantonese; the Foreign Language category includes English and other languages." },
                { q: "What is the registration period?", a: "From June 1, 2026 (Monday) to June 21, 2026 (Sunday)." },
                { q: "How do I register?", a: "For individual online registration, please use the official website: https://asevoice.org" },
                { q: "Is on-site attendance required for the preliminary round?", a: "No, the preliminary round is conducted through online video review." },
                { q: "How should the preliminary video be recorded?", a: "Record one verse and one chorus of a self-selected song. The total video duration should be 60 to 90 seconds. The video must be filmed from the front, clearly showing the face, mouth movements, upper body, and waist." },
                { q: "Can the preliminary video include accompaniment, backing vocals, audio enhancement, or post-production?", a: "No. The preliminary video must be pure a cappella. Any accompaniment, amplification, backing vocals, or digital audio enhancement and post-production are strictly prohibited." },
                { q: "Can I change the song between the preliminary round and the finals?", a: "No. The same song must be used for both the preliminary round and the finals, and it cannot be changed." },
                { q: "Are there any reference examples for the preliminary round online video?", a: "Yes.\nChinese Example: https://youtu.be/4mBwgx77t4I\nEnglish Example: https://youtu.be/K7x4SSkpk8A\nVietnamese Example: https://youtu.be/nlEOeIwtYhs" },
                { q: "When will the finalists be announced?", a: "July 8, 2026 (Wednesday)." },
                { q: "How many participants will advance to the finals?", a: "The top 10 from each category (Mandarin and Foreign Language) will advance, for a total of 20 finalists." },
                { q: "When and where will the finals be held?", a: "September 11, 2026 (Friday), from 14:30 to 17:00, ASE Kaohsiung Plant K23 1F International Conference Hall." },
                { q: "Will there be accompaniment and a teleprompter in the finals?", a: "A professional live band will be arranged by the organizer for accompaniment. No teleprompter will be provided; participants must memorize the lyrics." },
                { q: "Do finalists need to attend training and rehearsals?", a: "Yes. Finalists must attend one one-on-one coaching session with a vocal instructor and two on-site rehearsals. If unable to attend, it will be considered a forfeiture of the coaching opportunity, and no alternative arrangements will be made." },
                { q: "Where will the training and rehearsals be held after advancing to the finals?", a: "One session of one-on-one professional vocal coaching and two live rehearsals with the accompaniment band will be held in Kaohsiung or the Central-Northern Region.\n\nNote: The specific training and rehearsal locations in the Central-Northern Region will be finalized and announced after the preliminary results, based on the geographical distribution of the finalists." },
                { q: "What are the judging criteria?", a: "Vocal Technique (40%): melodic difficulty, singing technique, and style; Pronunciation and Articulation (20%); Rhythm (20%); Emotion (10%); Performance Style (10%): stage presence, facial expressions, and body language during the performance." },
                { q: "What are the prizes for each category?", a: "First Place: NT$20,000; Second Place: NT$15,000; Third Place: NT$10,000; Merit Award: NT$3,000 per winner. Trophies or medals will be awarded according to placement." },
                { q: "Are prizes subject to tax?", a: "Yes, in accordance with the tax regulations of the Republic of China (Taiwan)." },
                { q: "What happens if cheating, impersonation, audio enhancement, or other violations are discovered?", a: "The organizer reserves the right to immediately disqualify the participant. If violations are confirmed after awards have been given, the awards will be revoked, and all prize money and trophies (or medals) must be returned. Vacancies will generally not be filled." },
                { q: "Will the organizer use my photos, voice, or video?", a: "Yes. Participants agree that the organizer and its affiliated companies may record and photograph during the event, and may use images, voice, and performance footage containing the participant for internal platforms, external publications, promotional materials, and event-related publicity." },
                { q: "Where can I check for updates to the event rules?", a: "Please refer to the official website at https://asevoice.org for any updates to the event rules. No individual notifications will be provided." },
                { q: "Who should I contact if I have questions?", a: "Q&A Email: service@asevoice.org\n\nASE Kaohsiung: Daniel Yi, 0919635167, daniel_yi@aseglobal.com (Line ID: danyanline)\nASE ChungLi: Roy Chin, 0989678600, roy_chin@aseglobal.com (Line ID: roy_chin)\nSPIL: Jerry Liu, 0978892508, 04-25341525#1557, Jerry0276@spil.com.tw\nUSI: Aldis Huang, 0963788621, aldis_huang@usiglobal.com (Line ID: catnow)" }
            ]
        }
    },
    vi: {
        nav: {
            register: "Đăng ký",
            title: "Cuộc thi Giọng hát hay",
            langSwitch: "VN"
        },
        board: {
            title: "BẢNG TIN",
            featured: "🔥 NỔI BẬT",
            dates: "LỊCH TRÌNH",
            prizes: "GIẢI THƯỞNG"
        },
        announcement: {
            headline: "🎤 Cuộc Chiến Giọng Hát! Hát Lên Khoảnh Khắc Tỏa Sáng Của Bạn✨",
            description: "Sự kiện được mong đợi nhất [Giọng hát hay ASE 2026] sắp bắt đầu! Đây là sân khấu để bạn tỏa sáng! ✨",
            dates: "📌 Nộp Video Sơ Loại: 1/6 - 21/6",
            reminder: "👉 Hãy chuẩn bị giọng hát và video hát mộc 60-90 giây của bạn ngay từ bây giờ!"
        },
        hero: {
            brandNote: "Sự tham gia chung của các thành viên Tập đoàn ASE",
            titleLine1: "LẦN THỨ 5",
            titleLine2: "日月光",
            titleLine2En: "ASE",
            titleLine3: "Giọng hát hay",
            titleLine3En: "VOICE",
            subtitle: "Cuộc thi ca hát toàn quốc đầu tiên mở cho nhân viên tập đoàn",
            registerBtn: "ĐĂNG KÝ NGAY",
            registerPrefix: "Đăng ký trực tuyến. ",
            registerNote: "* Lưu ý: Yêu cầu đăng nhập tài khoản Google",
        },
        info: {
            title: "Hình thức & Tiêu chí",
            downloadGuide: "Tải xuống Thể lệ (PDF)",
            downloadFile: "2026 ASE Voice - Thể lệ Cuộc thi Ca hát Giọng hát hay Tập đoàn ASE_(Security C).pdf",
            purpose: "Mục đích",
            purposeDesc: "Nêu cao tôn chỉ \"Hoằng dương văn hóa, Phát triển giáo dục xã hội, Bồi dưỡng nhân tài nghệ thuật\" của Quỹ Văn hóa và Giáo dục ASE, cùng với triết lý phát triển bền vững \"Hòa nhập xã hội, Cùng nhau sáng tạo giá trị\" của Tập đoàn. Cuộc thi này kỳ vọng thông qua sức mạnh ấm áp của âm nhạc để thúc đẩy giao lưu, tạo sân chơi cho nhân viên thể hiện tài năng ca hát. Qua các hoạt động giải trí lành mạnh để thể hiện sức sống của doanh nghiệp, nâng cao sức khỏe thể chất và tinh thần cho đồng nghiệp, cũng như làm sâu sắc thêm sự gắn kết nhân sự trong môi trường làm việc và tinh thần hướng về doanh nghiệp.",
            groups: "Đối tượng & Bảng",
            groupsDesc: "[Đối tượng tham gia]\n- Chỉ giới hạn cho nhân viên đang làm việc tại các đơn vị sự nghiệp trực thuộc Công ty Cổ phần Đầu tư Công nghiệp Công nghệ ASE (ASE Technology Holding Co., Ltd.) đăng ký tham gia.\n- Quán quân, Á quân, và Thí sinh đạt giải Khuyến khích của Cuộc thi Giọng hát hay ASE năm 2025 cùng Quán quân, Á quân của năm 2024 không được đăng ký tham gia cuộc thi năm nay.\n\n[Bảng thi đấu] (hoàn toàn là thi đấu cá nhân)\n- Bảng Tiếng Hoa: Tiếng Phổ thông, Tiếng Đài Loan, Tiếng Khách Gia, Tiếng Quảng Đông (Giới hạn 200 lượt)\n- Bảng Ngoại ngữ: Tiếng Anh và các ngôn ngữ khác (Giới hạn 200 lượt)",
            timeline: "Hình thức và Thời gian",
            timelineItems: [
                {
                    date: "1/6 - 21/6",
                    event: "Vòng Sơ loại trực tuyến (Nộp video)",
                    details: (
                        <span>
                            [Quy định chọn bài] Tự chọn một bài, Vòng Sơ loại và Vòng Chung kết phải cùng một bài, không thay đổi.{'\n'}
                            [Hình thức] Chỉ hát mộc (A Cappella)! Nghiêm cấm nhạc đệm, loa khuếch đại, hát nhép hoặc chỉnh âm kỹ thuật số.{'\n'}
                            [Quy cách quay video] Hát phần verse và chorus. Độ dài từ 60 đến 90 giây. Quay góc chính diện thấy rõ mặt, khẩu hình và nửa thân trên.{'\n'}
                            [Video mẫu]{'\n'}
                            - Ví dụ tiếng Trung: <a href="https://youtu.be/4mBwgx77t4I" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 hover:bg-blue-50 px-1 rounded transition-colors">https://youtu.be/4mBwgx77t4I</a>{'\n'}
                            - Ví dụ tiếng Anh: <a href="https://youtu.be/K7x4SSkpk8A" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 hover:bg-blue-50 px-1 rounded transition-colors">https://youtu.be/K7x4SSkpk8A</a>{'\n'}
                            - Ví dụ tiếng Việt: <a href="https://youtu.be/nlEOeIwtYhs" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 hover:bg-blue-50 px-1 rounded transition-colors">https://youtu.be/nlEOeIwtYhs</a>
                        </span>
                    )
                },
                {
                    date: "22/6 - 4/7",
                    event: "Chấm điểm sơ loại",
                    details: "Giám khảo sẽ chấm điểm trực tuyến dựa trên các video hát mộc.\n[Tiêu chí Chấm điểm]\n1. Kỹ năng thanh nhạc (40%): Độ khó của giai điệu, kỹ thuật\n2. Phát âm và nhả chữ (20%)\n3. Nhịp điệu (20%)\n4. Cảm xúc (10%)\n5. Phong cách trình diễn (10%): Hình ảnh, biểu cảm, ngôn ngữ cơ thể"
                },
                {
                    date: "8/7",
                    event: "Công bố danh sách Chung kết",
                    details: (
                        <span>
                            Tuyển chọn: Bảng Tiếng Hoa và Bảng Ngoại ngữ mỗi bảng chọn ra top 10 thí sinh đứng đầu, tổng cộng có 20 thí sinh được lọt vào Vòng Chung kết.{'\n'}
                            <span className="inline-block mt-3 font-heading font-bold bg-dark text-white px-3 py-1 border-2 border-dark text-sm md:text-base tracking-wide shadow-[3px_3px_0_0_rgba(26,26,26,1)] transform hover:-translate-y-1 transition-transform">
                                📢 Danh sách thí sinh vào Chung kết sẽ được công bố chính thức trên trang web này
                            </span>
                        </span>
                    )
                },
                {
                    date: "18/7 - 22/8",
                    event: "Đào tạo & Tổng duyệt",
                    details: (
                        <span>
                            Nhằm hỗ trợ thí sinh nâng cao hiệu suất, sẽ có hướng dẫn chuyên nghiệp. Thí sinh bắt buộc tham dự. Nếu thời gian không phù hợp, xem như tự động từ bỏ cơ hội và không được yêu cầu sắp xếp bù giờ khác:{'\n'}
                            - Hướng dẫn cá nhân 1 kèm 1 với giáo viên thanh nhạc (tại Cao Hùng/Khu vực Miền Trung-Bắc){'\n'}
                            - Tổng duyệt trực tiếp với ban nhạc hai lần (tại Cao Hùng/Khu vực Miền Trung-Bắc){'\n'}
                            {'\n'}
                            [Lịch Đào tạo & Tổng duyệt]{'\n'}
                            - 18/7(T7) - 19/7(CN): Hướng dẫn thanh nhạc (Cao Hùng){'\n'}
                            - 25/7(T7) - 26/7(CN): Hướng dẫn thanh nhạc (Khu vực Miền Trung-Bắc){'\n'}
                            - 1/8(T7), 15/8(T7): Tổng duyệt ban nhạc (Cao Hùng){'\n'}
                            - 8/8(T7), 22/8(T7): Tổng duyệt ban nhạc (Khu vực Miền Trung-Bắc){'\n'}
                            {'\n'}
                            <span className="text-sm text-gray-500 mt-1 inline-block">
                                * Lưu ý: Địa điểm tổng duyệt và hướng dẫn thanh nhạc tại khu vực Miền Trung-Bắc sẽ được quyết định và thông báo chính thức sau vòng sơ loại, dựa trên sự phân bổ vùng miền của các thí sinh lọt vào chung kết (ví dụ: mức độ tập trung của thí sinh khu vực phía Bắc hoặc Miền Trung).
                            </span>{'\n'}{'\n'}
                            <span className="text-sm text-amber-700 font-bold mt-2 inline-block border-t border-dashed border-amber-400 pt-2">
                                📌 Nếu lịch trình trùng với giờ làm việc, công ty sẽ hỗ trợ sắp xếp nghỉ phép có lương và chi trả toàn bộ chi phí đi lại và ăn uống.
                            </span>
                        </span>
                    )
                },
                {
                    date: "11/9",
                    event: "Vòng Chung kết (Trình diễn trực tiếp)",
                    details: (
                        <span>
                            Thời gian: 14:30 - 17:00{'\n'}
                            Địa điểm: Hội trường Quốc tế Tầng 1, K23, Nhà máy ASE Cao Hùng.{'\n'}
                            Đơn vị tổ chức sẽ bố trí ban nhạc đệm trực tiếp. KHÔNG cung cấp máy nhắc chữ, thí sinh phải thuộc lòng lời bài hát!{'\n'}{'\n'}
                            <span className="text-sm text-amber-700 font-bold mt-2 inline-block border-t border-dashed border-amber-400 pt-2">
                                📌 Hỗ trợ đặc biệt dành cho thí sinh Chung kết:{'\n'}
                                Các thí sinh lọt vào vòng chung kết sẽ được công ty sắp xếp nghỉ phép công để tham gia thi đấu tại Cao Hùng. Ban tổ chức sẽ cung cấp các khoản hỗ trợ và dịch vụ độc quyền sau:{'\n'}
                                1. Hỗ trợ chi phí trang phục{'\n'}
                                2. Dịch vụ trang điểm và tạo hình chuyên nghiệp{'\n'}
                                3. Tổng duyệt trực tiếp với ban nhạc{'\n'}
                                4. Hỗ trợ chi phí đi lại và công tác phí liên quan
                            </span>
                        </span>
                    )
                }
            ],
            prizes: "Cơ cấu Giải thưởng",
            prizeCategories: {
                mandarin: "Giải Bảng Tiếng Hoa",
                foreign: "Giải Bảng Ngoại ngữ"
            },
            rulesAndObligations: "Quyền Lợi, Nghĩa Vụ & Lưu Ý",
            rulesDesc: "[Bản quyền] Tuyệt đối nghiêm cấm sử dụng MV/nhạc đệm thương mại không được ủy quyền. Quyền tác giả cải biên tại Vòng Chung kết theo tư vấn của giáo viên thuộc Đơn vị Tổ chức.\n[Quyền Hình Ảnh] Thí sinh ủy quyền vô điều kiện trọn đời tài liệu ghi hình cho Đơn vị Quản lý để sử dụng cho nền tảng nội bộ (như GoTube) và quảng bá đối ngoại.\n[Bảo Vệ Thông Tin] Khi đăng ký, thí sinh đồng ý Đơn vị tổ chức sử dụng thông tin cá nhân trong phạm vi phục vụ hoạt động cuộc thi.\n[Tính công bằng] Nghiêm cấm các trường hợp nhờ người hát thay, hát nhép, hậu kỳ chỉnh sửa giọng; nếu phát hiện sau Lễ Trao Giải, sẽ lập tức thu hồi toàn bộ tiền thưởng và cúp.\n[Bất khả kháng] Trong các trường hợp thiên tai hay dịch bệnh, Ban tổ chức bảo lưu quyền thay đổi, tạm dừng hoặc hủy bỏ cuộc thi.",
            prizesList: [
                { title: "Quán quân (1)", amount: "NT$ 20,000", extra: "Cúp lưu niệm" },
                { title: "Á quân (1)", amount: "NT$ 15,000", extra: "Cúp lưu niệm" },
                { title: "Hạng ba (1)", amount: "NT$ 10,000", extra: "Cúp lưu niệm" },
                { title: "Khuyến khích (7)", amount: "NT$ 3,000", extra: "Huy chương" }
            ]
        },
        highlights: {
            title: "Những Điểm Nhấn Nổi Bật",
            videos: [
                { year: "2025", title: "Lần 4 Chung kết" },
                { year: "2024", title: "Lần 3 Chung kết" },
                { year: "2023", title: "Lần 2 Chung kết" },
                { year: "2022", title: "Lần 1 Chung kết" }
            ]
        },
        footer: {
            organizer: [
                {
                    title: "Đơn vị tổ chức:",
                    items: [
                        "Quỹ Văn hóa và Giáo dục ASE",
                        "Ủy ban Phúc lợi Liên hiệp Tập đoàn ASE"
                    ]
                },
                {
                    title: "Đơn vị đồng tổ chức:",
                    items: [
                        "Công ty Cổ phần Chế tạo Bán dẫn ASE",
                        "Công ty Cổ phần Chế tạo Bán dẫn ASE - Chi nhánh Trung Lịch",
                        "Công ty Cổ phần Công nghiệp Chính xác Siliconware (SPIL)",
                        "Công ty Cổ phần Công nghệ Universal Global (USI)"
                    ]
                },
                {
                    title: "Đơn vị thực hiện:",
                    items: ["Câu lạc bộ Ca hát và Âm nhạc Pop ASE"]
                }
            ],
            rights: "Số điểm Vòng Chung kết được quyết định bởi Ban giám khảo chuyên môn. Kết quả công bố là cuối cùng, dựa trên sự tôn trọng tính chuyên môn. Ban tổ chức có quyền điều chỉnh bổ sung, thay thế, tạm dừng cuộc thi.",
            contactTitle: "Liên Hệ Chúng Tôi",
            qaEmail: "Q&A Email: service@asevoice.org",
            contacts: [
                "Nhà máy ASE Cao Hùng: Daniel Yi, 0919635167, daniel_yi@aseglobal.com (Line ID: danyanline)",
                "Nhà máy ASE Trung Lịch: Roy Chin, 0989678600, roy_chin@aseglobal.com (Line ID: roy_chin)",
                "Công ty SPIL: Jerry Liu, 0978892508, 04-25341525#1557, Jerry0276@spil.com.tw",
                "Công ty USI: Aldis Huang, 0963788621, aldis_huang@usiglobal.com (Line ID: catnow)"
            ]
        },
        qa: {
            title: "Câu Hỏi Thường Gặp",
            subtitle: "Tìm câu trả lời cho mọi thắc mắc của bạn về cuộc thi tại đây!",
            showBtn: "Xem Q&A",
            hideBtn: "Ẩn Q&A",
            contactTitle: "Còn Thắc Mắc? Liên Hệ Chúng Tôi",
            contactInfo: "Hộp thư Q&A: service@asevoice.org\n\nNhà máy ASE Cao Hùng: Daniel Yi, 0919635167, daniel_yi@aseglobal.com (Line ID: danyanline)\nNhà máy ASE Trung Lịch: Roy Chin, 0989678600, roy_chin@aseglobal.com (Line ID: roy_chin)\nCông ty SPIL: Jerry Liu, 0978892508, 04-25341525#1557, Jerry0276@spil.com.tw\nCông ty USI: Aldis Huang, 0963788621, aldis_huang@usiglobal.com (Line ID: catnow)",
            items: [
                { q: "Ai có thể đăng ký tham gia?", a: "Chỉ giới hạn cho nhân viên đang làm việc tại các đơn vị sự nghiệp trực thuộc Công ty Cổ phần Đầu tư Công nghiệp Công nghệ ASE (ASE Technology Holding Co., Ltd.) đăng ký tham gia." },
                { q: "Những ai không được đăng ký tham gia?", a: "Quán quân, Á quân, và thí sinh đạt giải Khuyến khích của Cuộc thi Giọng hát hay ASE năm 2025 cùng Quán quân, Á quân của năm 2024 không được đăng ký tham gia cuộc thi năm nay." },
                { q: "Cuộc thi là thi cá nhân hay theo nhóm?", a: "Cuộc thi này hoàn toàn là thi đấu cá nhân." },
                { q: "Có những bảng thi nào?", a: "Cuộc thi được chia thành Bảng Tiếng Hoa và Bảng Ngoại ngữ; Bảng Tiếng Hoa gồm Tiếng Phổ thông (Quan Thoại), Tiếng Đài Loan, Tiếng Khách Gia (Hakka), và Tiếng Quảng Đông; Bảng Ngoại ngữ gồm Tiếng Anh và các ngôn ngữ khác." },
                { q: "Thời gian đăng ký đến khi nào?", a: "Từ ngày 1/6/2026 (Thứ Hai) đến ngày 21/6/2026 (Chủ Nhật)." },
                { q: "Đăng ký như thế nào?", a: "Áp dụng đăng ký trực tuyến cá nhân, vui lòng sử dụng trang web chính thức: https://asevoice.org" },
                { q: "Vòng Sơ loại có cần đến hiện trường không?", a: "Không cần, Vòng Sơ loại được xét duyệt qua video trực tuyến." },
                { q: "Video Vòng Sơ loại phải quay như thế nào?", a: "Hát phần phiên khúc và điệp khúc của bài hát tự chọn, mỗi phần một lần; tổng thời lượng video từ 60 đến 90 giây, đồng thời phải quay ở góc chính diện, thấy rõ khuôn mặt, khẩu hình, nửa thân trên và eo." },
                { q: "Video Vòng Sơ loại có được dùng nhạc đệm, bè, chỉnh âm hoặc hậu kỳ không?", a: "Không được. Video Vòng Sơ loại phải là hát mộc hoàn toàn; nghiêm cấm sử dụng nhạc đệm, loa khuếch đại, hát bè hoặc các xử lý chỉnh âm kỹ thuật số và hậu kỳ." },
                { q: "Có thể đổi bài hát giữa Vòng Sơ loại và Vòng Chung kết không?", a: "Không được. Bài hát ở Vòng Sơ loại và Vòng Chung kết phải là cùng một bài, không được thay đổi." },
                { q: "Có video mẫu tham khảo cho Vòng Sơ loại trực tuyến không?", a: "Có.\nVí dụ tiếng Trung: https://youtu.be/4mBwgx77t4I\nVí dụ tiếng Anh: https://youtu.be/K7x4SSkpk8A\nVí dụ tiếng Việt: https://youtu.be/nlEOeIwtYhs" },
                { q: "Khi nào công bố danh sách vào Vòng Chung kết?", a: "Ngày 8/7/2026 (Thứ Tư)." },
                { q: "Sẽ có bao nhiêu người được vào Vòng Chung kết?", a: "Bảng Tiếng Hoa và Bảng Ngoại ngữ mỗi bảng chọn top 10, tổng cộng 20 thí sinh vào Vòng Chung kết." },
                { q: "Vòng Chung kết được tổ chức ở đâu, khi nào?", a: "Từ 14:30 đến 17:00 ngày 11/9/2026 (Thứ Sáu), tổ chức tại Hội trường Quốc tế Tầng 1, Tòa nhà K23, Nhà máy ASE Cao Hùng." },
                { q: "Vòng Chung kết có nhạc đệm không? Có máy nhắc chữ không?", a: "Ban tổ chức sẽ bố trí ban nhạc chuyên nghiệp biểu diễn nhạc đệm trực tiếp; tại hiện trường không cung cấp máy nhắc chữ, thí sinh phải thuộc lòng lời bài hát." },
                { q: "Sau khi vào Vòng Chung kết có cần phối hợp tham gia huấn luyện và tổng duyệt không?", a: "Có. Thí sinh vào Vòng Chung kết phải phối hợp tham gia 1 buổi hướng dẫn 1 kèm 1 với giáo viên thanh nhạc và 2 buổi tổng duyệt trực tiếp. Nếu không thể phối hợp về thời gian, sẽ được xem là tự nguyện từ bỏ cơ hội được hướng dẫn và không được yêu cầu sắp xếp lại." },
                { q: "Địa điểm huấn luyện và tổng duyệt sau khi vào Vòng Chung kết ở đâu?", a: "Hướng dẫn cá nhân 1 kèm 1 với giáo viên thanh nhạc và hai buổi tổng duyệt trực tiếp với ban nhạc đệm sẽ được tổ chức tại Cao Hùng hoặc khu vực Miền Trung-Bắc.\n\nLưu ý: Địa điểm huấn luyện và tổng duyệt tại khu vực Miền Trung-Bắc sẽ được quyết định và công bố sau vòng sơ loại, tùy theo tỷ lệ thí sinh vào chung kết đến từ khu vực miền Trung hoặc miền Bắc." },
                { q: "Tiêu chí chấm điểm là gì?", a: "Kỹ năng thanh nhạc 40%, phát âm và nhả chữ 20%, nhịp điệu 20%, cảm xúc 10%, phong cách trình diễn 10%." },
                { q: "Giải thưởng của mỗi bảng được trao như thế nào?", a: "Quán quân 20.000 Đài tệ, Á quân 15.000 Đài tệ, Quý quân 10.000 Đài tệ, giải Khuyến khích mỗi giải 3.000 Đài tệ; đồng thời trao cúp hoặc huy chương theo thứ hạng." },
                { q: "Nhận giải có cần nộp thuế không?", a: "Có, thực hiện theo các quy định liên quan của pháp luật thuế Trung Hoa Dân Quốc." },
                { q: "Nếu bị phát hiện hát thay, mạo danh, chỉnh âm hoặc hậu kỳ vi phạm thì sẽ thế nào?", a: "Ban tổ chức có quyền lập tức hủy tư cách tham gia; nếu được xác minh là vi phạm sau khi trao giải, ban tổ chức sẽ hủy tư cách đạt giải và thu hồi toàn bộ tiền thưởng cùng cúp/huy chương, về nguyên tắc sẽ không bổ sung người thay thế." },
                { q: "Ban tổ chức có sử dụng hình ảnh, giọng nói hoặc video của tôi không?", a: "Có. Thí sinh đồng ý để ban tổ chức và các đơn vị liên kết quay phim, chụp ảnh trong thời gian diễn ra hoạt động, đồng thời có thể sử dụng hình ảnh, giọng nói và phần biểu diễn của thí sinh trong các nền tảng nội bộ, ấn phẩm đối ngoại, tài liệu tuyên truyền và các hoạt động quảng bá liên quan." },
                { q: "Nếu thể lệ hoạt động có cập nhật sau này thì xem ở đâu?", a: "Lấy trang web chính thức làm chuẩn, sẽ không gửi thông báo riêng từng người." },
                { q: "Nếu có vấn đề thắc mắc thì liên hệ ai?", a: "Hộp thư Q&A: service@asevoice.org\n\nNhà máy ASE Cao Hùng: Daniel Yi, 0919635167, daniel_yi@aseglobal.com (Line ID: danyanline)\nNhà máy ASE Trung Lịch: Roy Chin, 0989678600, roy_chin@aseglobal.com (Line ID: roy_chin)\nCông ty SPIL: Jerry Liu, 0978892508, 04-25341525#1557, Jerry0276@spil.com.tw\nCông ty USI: Aldis Huang, 0963788621, aldis_huang@usiglobal.com (Line ID: catnow)" }
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
        setLang(prev => {
            if (prev === 'zh') return 'en';
            if (prev === 'en') return 'vi';
            return 'zh';
        });
    };

    const setLanguage = (newLang) => {
        if (['zh', 'en', 'vi'].includes(newLang)) {
            setLang(newLang);
        }
    };

    const t = translations[lang] || translations['zh'];

    return (
        <LanguageContext.Provider value={{ lang, toggleLanguage, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
