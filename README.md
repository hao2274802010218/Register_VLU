# Register_VLU

**Register_VLU** là một công cụ giúp bạn đăng ký học phần nhanh chóng mà không cần phải chờ đợi. Khi cả trường cùng truy cập vào hệ thống đăng ký của trường, tình trạng quá tải có thể khiến trang web bị lag. Công cụ này được thiết kế để tối ưu hóa quá trình đăng ký, giúp bạn tiết kiệm thời gian và tránh phiền phức.

## Tính năng chính
- Đăng ký học phần nhanh hơn
- Giảm thiểu thời gian chờ đợi khi hệ thống bị quá tải

## Hướng dẫn sử dụng

1. **Tải xuống công cụ**:
   - Sử dụng lệnh sau để tải về công cụ từ GitHub:
     ```bash
     git clone https://github.com/hao2274802010218/Register_VLU
     ```

2. **Cấu hình thông tin cá nhân**:
   - Mở tệp `config.json` trong thư mục công cụ.
   - Điền thông tin **username** và **password** của bạn từ cổng thông tin đào tạo VLU.

3. **Cấu hình mã lớp học phần**:
   - Mở tệp `MaLopHocPhan.txt`.
   - Nhập tất cả mã lớp học phần mà bạn muốn đăng ký (bao gồm cả mã lớp lý thuyết và thực hành).
   - Mỗi mã lớp học phần nên được nhập trên một dòng riêng biệt.

4. **Chạy công cụ**:
   - Sau khi hoàn tất cấu hình, bạn chỉ cần chạy công cụ bằng lệnh:
     ```bash
     node app.js
     ```

## Lưu ý
- Hãy tuân thủ các quy định của nhà trường khi sử dụng công cụ này.
- Công cụ này chỉ dành cho mục đích học tập và giúp đỡ trong quá trình đăng ký học phần.
- Đảm bảo rằng bạn đã nhập chính xác thông tin tài khoản và mã lớp học phần để tránh gặp sự cố trong quá trình sử dụng.

---

Chúc bạn đăng ký học phần thành công!
