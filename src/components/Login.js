import { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
  
    const data = await response.json();
    console.log("📢 Dữ liệu trả về từ API:", data); // Debug API trả về
  
    if (response.ok && data.token) {
      console.log("✅ Đăng nhập thành công:", data.username, data.role);
      onLogin(data.token, data.username, data.role);
    } else {
      console.error("❌ Đăng nhập thất bại:", data.message);
      alert(data.message || 'Đăng nhập thất bại');
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
    </form>
  );
};

export default Login;
