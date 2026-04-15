import pandas as pd
import numpy as np

translations = {
    '環鴻科技股份有限公司': 'Công ty Cổ phần Điện tử Universal Scientific Industrial (USI)',
    '2026 日月光集團好聲音 歌唱比賽報名表': 'Phiếu đăng ký cuộc thi ca hát Giọng hát hay Tập đoàn ASE 2026',
    '初賽上傳影片規定與注意事項': 'Quy định và Lưu ý về việc tải video Vòng sơ loại',
    '報名組別：': 'Bảng dự thi:',
    '一、華語組：國語、台語、客家、粵語': '1. Bảng Tiếng Hoa: Tiếng Phổ thông, Tiếng Đài Loan, Tiếng Khách Gia, Tiếng Quảng Đông',
    '二、外語組：英語與其他': '2. Bảng Ngoại ngữ: Tiếng Anh và các ngôn ngữ khác',
    '正副歌唱一遍之清唱影片(以不超過1分30秒為限)，聲音不可經過數位後製處理': 'Video hát mộc phần verse và chorus (giới hạn không quá 1 phút 30 giây), âm thanh không được qua xử lý hậu kỳ kỹ thuật số',
    '清唱影片即為無伴唱、無伴奏、無擴音、無修音': 'Video hát mộc là không có nhạc nền, không có nhạc đệm, không dùng loa khuếch đại, không chỉnh âm',
    '影片畫面應為正面、露出臉與嘴型、半身及腰': 'Phải quay góc chính diện, thấy rõ mặt và khẩu hình, cùng nửa thân trên từ eo trở lên',
    '示範影片youtube網址：https://youtu.be/4mBwgx77t4I': 'Link video mẫu trên YouTube: https://youtu.be/4mBwgx77t4I',
    '僅接受影片檔格式(限mp4/mov/wmv/avi)': 'Chỉ chấp nhận các định dạng video (giới hạn mp4/mov/wmv/avi)',
    '評分標準：': 'Tiêu chí chấm điểm:',
    '1.歌唱技巧(佔40%，指旋律難度、演唱技巧及方式)': '1. Kỹ năng thanh nhạc (40%, bao gồm độ khó của giai điệu, kỹ thuật và phong cách thể hiện)',
    '2.發音咬字(佔20%)': '2. Phát âm và nhả chữ (20%)',
    '3.節奏(佔20%)': '3. Nhịp điệu (20%)',
    '4.感情(佔10%)': '4. Cảm xúc (10%)',
    '5.演繹風格(佔10%，指演唱時的形象、表情、肢體語言)': '5. Phong cách trình diễn (10%, bao gồm hình ảnh, biểu cảm, ngôn ngữ cơ thể)',
    '初賽選定的歌曲將作為決賽的演唱曲目，不得更換': 'Bài hát đã chọn tại vòng sơ loại sẽ là bài hát dự thi vòng chung kết và không được thay đổi',
    '不符合規定者將取消參賽資格': 'Thí sinh không tuân thủ các quy định sẽ bị hủy tư cách tham gia',
    '初賽影片版權由ASE集團所有，並可公開播放宣傳': 'Bản quyền video vòng sơ loại thuộc về Tập đoàn ASE và có thể được sử dụng để phát chung quảng bá',
    '如有任何填寫或上傳影片的問題請來信詢問或聯繫各公司代表負責人進行洽詢：': 'Nếu có bất kỳ câu hỏi nào về việc điền đơn hoặc tải video, vui lòng gửi email hoặc liên hệ với người phụ trách của từng công ty:',
    'Ｑ＆Ａ信箱：service@asevoice.org': 'Email Q&A: service@asevoice.org',
    '日月光高雄廠：宜德彥 Daniel, 0919635167, daniel_yi@aseglobal.com (Line ID: danyanline)': 'Nhà máy ASE Cao Hùng: Daniel Yi, 0919635167, daniel_yi@aseglobal.com (Line ID: danyanline)',
    '日月光中壢廠：秦瑞麟 Roy Chin, 0989678600, roy_chin@aseglobal.com (Line ID: roy_chin)': 'Nhà máy ASE Trung Lịch: Roy Chin, 0989678600, roy_chin@aseglobal.com (Line ID: roy_chin)',
    '矽品精密：劉旻杰 Jerry Liu, 0978892508, 04-25341525#1557, Jerry0276@spil.com.tw': 'Công ty SPIL: Jerry Liu, 0978892508, 04-25341525#1557, Jerry0276@spil.com.tw',
    '環鴻科技：黃詩婷 Aldis, 0963788621, aldis_huang@usiglobal.com（Line ID: catnow)': 'Công ty USI: Aldis Huang, 0963788621, aldis_huang@usiglobal.com (Line ID: catnow)',
    '公司別': 'Công ty'
}

file_path = '/Users/danielyi/Documents/ASE_Project/2026 ASE Voice/形象網站/語言對照.xlsx'
df = pd.read_excel(file_path, sheet_name='工作表1')

for i, row in df.iterrows():
    zh_exact = row['中文']
    if pd.isna(row['越南文']) or str(row['越南文']).strip() in ['', 'nan']:
        if pd.notna(zh_exact):
            # Try to match with exact or exact stripped
            key_exact = str(zh_exact)
            key_strip = key_exact.strip()
            
            matched = False
            for k, v in translations.items():
                if k == key_exact or k == key_strip:
                    df.at[i, '越南文'] = v
                    matched = True
                    break
            
            # Use 'in' as fallback for tricky whitespace issues (like NBSP \xA0)
            if not matched:
                if '請上傳您的初賽清唱錄音檔' in key_exact:
                    df.at[i, '越南文'] = 'Vui lòng tải lên file ghi âm hát mộc vòng sơ loại của bạn (tuyệt đối không bao gồm nhạc nền hoặc nhạc đệm). Định dạng file được chấp nhận: MP4, MOV, WMV hoặc AVI. Khuyến nghị đặt tên file là "Mã_nhân_viên_Họ_tên_Tên_bài_hát". Việc chấm điểm sẽ được dựa trên file "cuối cùng" được tải lên (phiên bản mới nhất).'

df.to_excel(file_path, sheet_name='工作表1', index=False)
print("Updated missing successfully")
