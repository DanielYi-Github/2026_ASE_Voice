import pandas as pd
import numpy as np

translations = {
    '日月光文教基金會': 'Quỹ Văn hóa và Giáo dục ASE',
    '日月光集團聯合職工福利委員會': 'Ủy ban Phúc lợi Liên hiệp Tập đoàn ASE',
    '日月光半導體製造股份有限公司': 'Công ty Cổ phần Chế tạo Bán dẫn ASE',
    '日月光半導體製造股份有限公司中壢分公司': 'Công ty Cổ phần Chế tạo Bán dẫn ASE - Chi nhánh Trung Lịch',
    '矽品精密工業股份有限公司': 'Công ty Cổ phần Công nghiệp Chính xác Siliconware (SPIL)',
    '廠區': 'Khu vực làm việc / Nhà máy',
    '提示：請選擇您目前所屬的廠區／公司。': 'Lưu ý: Vui lòng chọn khu vực nhà máy / công ty bạn đang làm việc.',
    '日月光高雄廠': 'Nhà máy ASE Cao Hùng',
    '日月光中壢廠': 'Nhà máy ASE Trung Lịch',
    '矽品精密': 'Công ty SPIL (Siliconware Precision)',
    '環鴻科技': 'Công ty USI (Universal Scientific Industrial)',
    '新竹業務辦公室': 'Văn phòng Kinh doanh Tân Trúc',
    '姓名': 'Họ và tên',
    '提示：請填寫身分證或護照上的完整姓名': 'Lưu ý: Vui lòng điền đầy đủ họ và tên như trên CMND/CCCD hoặc Hộ chiếu.',
    '員工編號': 'Mã số nhân viên',
    '提示：請輸入您的所屬公司的員工編號，例如日月光高雄廠的員工編號即為AD工號，如 K16064 ': 'Lưu ý: Vui lòng nhập mã số nhân viên tại công ty bạn đang làm việc. Ví dụ mã số nhân viên của Nhà máy ASE Cao Hùng chính là tài khoản AD, như K16064.',
    '手機號碼': 'Số điện thoại di động',
    '提示：請輸入 10 位數手機號碼（格式如：0912345678）': 'Lưu ý: Vui lòng nhập số điện thoại di động 10 chữ số (định dạng như: 0912345678).',
    '提示：請確認您的 “Line APP 通訊軟體” 已開啟「允許利用 ID 加入好友」，以便主辦單位後續聯繫': 'Lưu ý: Vui lòng đảm bảo ứng dụng LINE của bạn đã bật "Cho phép thêm bạn bằng ID", để ban tổ chức liên hệ thông báo các bước tiếp theo.',
    '報名組別': 'Bảng dự thi',
    '提示：請選擇欲參賽的組別（每人限報名一組': 'Lưu ý: Vui lòng chọn bảng dự thi (mỗi người chỉ được đăng ký một bảng).',
    '華語組': 'Bảng Tiếng Hoa',
    '外語組': 'Bảng Ngoại ngữ',
    '參賽歌曲': 'Bài hát dự thi',
    '提示：請填寫您要演唱的歌曲完整名稱，例如: 徐佳瑩 - 身騎白馬': 'Lưu ý: Vui lòng điền tên đầy đủ của bài hát bạn sẽ trình bày. Ví dụ: Từ Giai Oánh - Cưỡi Ngựa Trắng (Lala Hsu - Riding a White Horse).',
    '原唱參考連結': 'Link tham khảo bài hát gốc',
    '提示：請貼上 YouTube 的歌曲連結': 'Lưu ý: Vui lòng cung cấp link bài hát gốc trên YouTube.',
    '上傳清唱錄音檔': 'Tải lên bản thu âm hát mộc (A Cappella)',
    '提示：': 'Lưu ý:',
    '請上傳您的初賽清唱錄音檔（請勿包含背景音樂或伴奏），檔案格式限 MP4, MOV, WMV 或 AVI ，建議命名為「工號_姓名_歌名」。評分標準將以「最後一個」 檔案（即最新版本）為準。': 'Vui lòng tải lên file ghi âm hát mộc vòng sơ loại của bạn (tuyệt đối không bao gồm nhạc nền hoặc nhạc đệm). Định dạng file được chấp nhận: MP4, MOV, WMV hoặc AVI. Khuyến nghị đặt tên file là "Mã_nhân_viên_Họ_tên_Tên_bài_hát". Việc chấm điểm sẽ được dựa trên file "cuối cùng" được tải lên (phiên bản mới nhất).',
    '【2026 ASE Voice 日月光集團好聲音】': '【2026 ASE Voice Giọng hát hay Tập đoàn ASE】',
    '您好，我們已成功接收您的報名資訊！': 'Xin chào, chúng tôi đã nhận được thông tin đăng ký của bạn thành công!',
    '感謝您對本屆賽事的熱情參與。您的報名資料已進入審核程序，預計將於 7/8 (三) 公告決賽入圍名單，屆時請留意相關通知，預祝您脫穎而出，展現最佳實力！': 'Cảm ơn bạn đã nhiệt tình tham gia cuộc thi năm nay. Dữ liệu đăng ký của bạn đã bước vào quá trình xét duyệt. Danh sách lọt vào vòng chung kết dự kiến sẽ được công bố vào ngày 8/7 (thứ Tư). Xin vui lòng lưu ý các thông báo tiếp theo. Chúc bạn tỏa sáng và thể hiện khả năng xuất sắc nhất!',
    '▍ 報名資料異動說明': '▍ Hướng dẫn thay đổi thông tin đăng ký',
    '為確保您的參賽權益，如需更新或重新上傳錄音檔案，您可透過以下管道進行：': 'Để đảm bảo quyền lợi tham gia của bạn, nếu bạn cần cập nhật hoặc tải lên lại file ghi âm, bạn có thể thực hiện thông qua các kênh sau:',
    '即時修改： 直接點擊下方「修改回覆內容」按鈕。': 'Chỉnh sửa ngay: Bấm trực tiếp vào nút "Chỉnh sửa phản hồi" bên dưới.',
    '後續更新： 透過系統發送之『報名確認信』內附連結進行重新上傳。': 'Cập nhật sau: Sử dụng đường dẫn đính kèm trong thư "Xác nhận đăng ký" được gửi bởi hệ thống để tiến hành tải lên lại.',
    '⚠️ 重要聲明： 評選作業將嚴格以系統接收之「最終上傳版本」為準，請務必於報名截止前確認檔案之完整性與正確性。': '⚠️ Tuyên bố quan trọng: Quá trình chấm điểm sẽ tuân thủ nghiêm ngặt theo "phiên bản tải lên cuối cùng" mà hệ thống nhận được. Vui lòng đảm bảo tính toàn vẹn và độ chính xác của file trước hạn chót đăng ký.',
    '▍ 賽事諮詢與窗口': '▍ Giải đáp thắc mắc và Liên hệ',
    '若有任何疑問，歡迎聯繫各廠區專屬服務窗口：': 'Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ với người phụ trách trực tiếp tại từng khu vực nhà máy:',
    '官方 Q&A 信箱： service@asevoice.org': 'Email Q&A chính thức: service@asevoice.org',
    '日月光高雄廠： 宜德彥 Daniel, 0919635167, daniel_yi@aseglobal.com (Line ID: danyanline)': 'Nhà máy ASE Cao Hùng: Daniel Yi | 0919-635-167 | daniel_yi@aseglobal.com (Line ID: danyanline)',
    '日月光中壢廠： 秦瑞麟 Roy Chin, 0989678600, roy_chin@aseglobal.com (Line ID: roy_chin)': 'Nhà máy ASE Trung Lịch: Roy Chin | 0989-678-600 | roy_chin@aseglobal.com (Line ID: roy_chin)',
    '矽品精密： Jerry Liu, 0978892508, 04-25341525#1557, Jerry0276@spil.com.tw': 'Công ty SPIL: Jerry Liu | 0978-892-508 | 04-2534-1525#1557 | Jerry0276@spil.com.tw',
    '環鴻科技： 黃詩婷 Aldis, 0963788621, aldis_huang@usiglobal.com（Line ID: catnow)': 'Công ty USI: Aldis Huang | 0963-788-621 | aldis_huang@usiglobal.com (Line ID: catnow)',
    '▍ 官方資源': '▍ Nguồn thông tin chính thức',
    '欲了解更多賽事動態或回顧精彩瞬間，請至官方網站：https://asevoice.org': 'Để tìm hiểu thêm chi tiết về cuộc thi hoặc xem lại những khoảnh khắc tuyệt vời, vui lòng truy cập trang web chính thức: https://asevoice.org'
}

file_path = '/Users/danielyi/Documents/ASE_Project/2026 ASE Voice/形象網站/語言對照.xlsx'
df = pd.read_excel(file_path, sheet_name='工作表1')

# Trim spaces in keys for matching just in case
# We'll map by exact string when possible
for i, row in df.iterrows():
    zh_key = str(row['中文']).strip() if pd.notna(row['中文']) else ""
    if zh_key in translations:
        df.at[i, '越南文'] = translations[zh_key]
    else:
        # try without strict trim
        zh_exact = row['中文']
        if pd.notna(zh_exact) and zh_exact in translations:
            df.at[i, '越南文'] = translations[zh_exact]
        elif pd.notna(zh_exact):
            # check contains
            for k, v in translations.items():
                if k.strip() == zh_key or k == zh_exact:
                    df.at[i, '越南文'] = v
                    break

df.to_excel(file_path, sheet_name='工作表1', index=False)
print("Updated successfully")
