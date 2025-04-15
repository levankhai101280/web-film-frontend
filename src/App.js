import './App.css'; // <== Đảm bảo bạn import file CSS
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import MovieList from './components/MovieList';
import Login from './components/Login';
import Register from './components/Register';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import MovieDetail from './components/MovieDetail';

const AppContent = () => {
  const [userRole, setUserRole] = useState(localStorage.getItem('role') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  // Hiển thị loading khi chuyển route
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300); // thời gian giả lập loading
    return () => clearTimeout(timer);
  }, [location]);

  const handleSearch = async (keyword) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/movies/search?search=${encodeURIComponent(keyword.trim())}`);
      const movies = await response.json();
      console.log("🎬 Kết quả tìm kiếm:", movies);
      setSearchResults(movies);
    } catch (error) {
      console.error("Lỗi tìm kiếm phim:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (token, username, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);
    setUserRole(role);
    setUsername(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    setUserRole('');
    setUsername('');
  };

  return (
    <>
      <Header userRole={userRole} username={username} onLogout={handleLogout} onSearch={handleSearch} />

      {loading && (
        <div style={{ textAlign: 'center', padding: '30px' }}>
          <div className="spinner"></div>
          <p style={{ marginTop: '10px', color: '#555' }}>Đang tải dữ liệu...</p>
        </div>
      )}

      <Routes>
        <Route path="/" element={<MovieList searchResults={searchResults} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={userRole === 'admin' ? <AdminPanel /> : <Navigate to="/login" />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>

      <Footer />
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
