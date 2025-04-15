import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2 className="logo">
            KHAIPRO.NET
          </h2>
          <p>
            <strong>Phimmoi</strong> - Trang xem phim Online với giao diện mới. 
            Nguồn phim được tổng hợp từ các website lớn với đa dạng các đầu phim và thể loại vô cùng phong phú.
          </p>
          <p>Contact: <a href="tel:+84388985684">Call Now</a></p>
          <p className="tags">
            anime, animetv, anime hay, anime vietsub, xem anime, anime tv, phim anime...
          </p>
        </div>

        <div className="footer-section">
          <h3>Phim mới</h3>
          <ul>
            <li><a href="#">Phim Khoa Học</a></li>
            <li><a href="#">Phim Kinh Dị</a></li>
            <li><a href="#">Phim Chiếu Rạp</a></li>
            <li><a href="#">Phim Hình Sự</a></li>
            <li><a href="#">Phim Hành Động</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Phim hay</h3>
          <ul>
            <li><a href="#">Phim Âu Mỹ</a></li>
            <li><a href="#">Phim Hàn Quốc</a></li>
            <li><a href="#">Phim Trung Quốc</a></li>
            <li><a href="#">Phim Nhật Bản</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Thông tin</h3>
          <ul>
            <li><a href="#">Giới thiệu</a></li>
            <li><a href="#">Liên hệ chúng tôi</a></li>
            <li><a href="#">Điều khoản sử dụng</a></li>
            <li><a href="#">Chính sách riêng tư</a></li>
            <li><a href="#">Khiếu nại bản quyền</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© KhaiWapVipPro</p>
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;