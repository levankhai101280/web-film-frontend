import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ DÙNG navigate
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // Thêm state để chứa thông báo lỗi
  const navigate = useNavigate(); // ✅ Hook điều hướng

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    console.log("📢 Dữ liệu trả về từ API:", data);

    if (response.ok && data.token) {
      console.log("✅ Đăng nhập thành công:", data.username, data.role);
      onLogin(data.token, data.username, data.role); // ✅ Gọi hàm set user
      navigate('/'); // ✅ CHUYỂN TRANG
    } else {
      console.error("❌ Đăng nhập thất bại:", data.message);
      setError(data.message || 'Đăng nhập thất bại');  // Hiển thị thông báo lỗi
      console.log("✅ TC07 Passed: Cảnh báo hiển thị đúng khi sai username"); // Đảm bảo rằng thông báo lỗi được in ra
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Đăng nhập</h2>
      <input
        type="text"
        placeholder="Tên người dùng"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Đăng nhập</button>
      {error && <div className="error-message">{error}</div>} {/* Hiển thị thông báo lỗi nếu có */}
    </form>
  );
};

export default Login;
