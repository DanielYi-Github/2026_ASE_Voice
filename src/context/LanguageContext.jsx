import React, { createContext, useContext, useState } from 'react';

const translations = {
    zh: {
        nav: {
            register: "即刻報名",
            title: "日月光投控歌唱比賽",
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
                            - 越文範例：<a href="https://youtu.be/nlEOeIwtYh" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 hover:bg-blue-50 px-1 rounded transition-colors">https://youtu.be/nlEOeIwtYh</a>
                        </span>
                    )
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
                            </span>
                        </span>
                    )
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
        }
    },
    en: {
        nav: {
            register: "Register",
            title: "Singing Competition",
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
                            - Vietnamese Example: <a href="https://youtu.be/nlEOeIwtYh" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 hover:bg-blue-50 px-1 rounded transition-colors">https://youtu.be/nlEOeIwtYh</a>
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
                    details: "Quota: Top 10 from each category, totaling 20 finalists advancing to the Grand Finals."
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
                            </span>
                        </span>
                    )
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
                        "Universal Global Technology Co., Ltd."
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
                "UGT: Aldis Huang, 0963788621, aldis_huang@usiglobal.com (Line ID: catnow)"
            ]
        }
    },
    vi: {
        nav: {
            register: "Đăng ký",
            title: "Cuộc thi Giọng hát hay",
            langSwitch: "VN"
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
                            - Ví dụ tiếng Việt: <a href="https://youtu.be/nlEOeIwtYh" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 hover:bg-blue-50 px-1 rounded transition-colors">https://youtu.be/nlEOeIwtYh</a>
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
                    details: "Tuyển chọn: Bảng Tiếng Hoa và Bảng Ngoại ngữ mỗi bảng chọn ra top 10 thí sinh đứng đầu, tổng cộng có 20 thí sinh được lọt vào Vòng Chung kết."
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
                            </span>
                        </span>
                    )
                },
                {
                    date: "11/9",
                    event: "Vòng Chung kết (Trình diễn trực tiếp)",
                    details: "Thời gian: 14:30 - 17:00\nĐịa điểm: Hội trường Quốc tế Tầng 1, K23, Nhà máy ASE Cao Hùng.\nĐơn vị tổ chức sẽ bố trí ban nhạc đệm trực tiếp. KHÔNG cung cấp máy nhắc chữ, thí sinh phải thuộc lòng lời bài hát!"
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
                        "Công ty Cổ phần Công nghệ Universal Global Technology (UGT)"
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
                "Công ty UGT: Aldis Huang, 0963788621, aldis_huang@usiglobal.com (Line ID: catnow)"
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
