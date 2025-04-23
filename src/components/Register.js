import { useState } from 'react';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // ✅ Kiểm tra dữ liệu đầu vào
    if (!username.trim()) {
      alert('Vui lòng nhập tên người dùng');
      return;
    }
    if (!password.trim()) {
      alert('Vui lòng nhập mật khẩu');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      console.log('Phản hồi từ server:', data);

      if (response.ok) {
        alert('Đăng ký thành công, hãy đăng nhập!');
        setUsername('');
        setPassword('');
      } else {
        alert(data.message || 'Đăng ký thất bại');
      }
    } catch (err) {
      alert('Lỗi kết nối đến server');
    }
  };

  return (
    <form className="register-form" onSubmit={handleRegister}>
      <h3>Đăng ký tài khoản mới</h3>
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
      <button type="submit">Đăng ký</button>
    </form>
  );
};

export default Register;
