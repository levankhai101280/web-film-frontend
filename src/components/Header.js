import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";

const Header = ({ userRole, username, onLogout, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleHomeClick = () => {
    setSearchTerm('');  // Xóa ô tìm kiếm
    if (onSearch) {
      onSearch(''); // Gửi tìm kiếm rỗng để hiển thị tất cả phim
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm); // Gọi hàm tìm kiếm từ `App.js`
    } else {
      console.error("onSearch is not defined");
    }
  };

  return (
    <header>
      <nav>
      <Link to="/" onClick={handleHomeClick}>Trang chủ</Link>
        <Link to="/login">Đăng nhập</Link>
        <Link to="/register">Đăng ký</Link>
        {userRole === 'admin' && <Link to="/admin">Admin Panel</Link>}
        {username && (
          <span style={{ marginLeft: '20px' }}>
            Chào, {username}! <button onClick={onLogout}>Đăng xuất</button>
          </span>
        )}
        {/* Form tìm kiếm */}
        <form onSubmit={handleSearch} style={{ display: 'inline-block', marginLeft: '20px' }}>
          <input
            type="text"
            placeholder="Tìm phim..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>
      </nav>
    </header>
  );
};

export default Header;
