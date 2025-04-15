import { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = () => {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [editingMovie, setEditingMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/movies');
      setMovies(response.data);
    } catch (error) {
      console.error('Lỗi tải danh sách phim:', error);
    }
  };

  const handleSubmit = async () => {
    if (!title || !genre || !description) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('genre', genre);
    formData.append('description', description);
    if (image) formData.append('image', image);
    if (video) formData.append('video', video);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      if (editingMovie) {
        await axios.put(`http://localhost:5000/api/movies/${editingMovie._id}`, formData, config);
      } else {
        await axios.post('http://localhost:5000/api/movies', formData, config);
      }

      fetchMovies();
      resetForm();
    } catch (error) {
      console.error('Lỗi khi lưu phim:', error);
    }
  };

  const handleDeleteMovie = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/movies/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchMovies();
    } catch (error) {
      console.error('Lỗi khi xóa phim:', error);
    }
  };

  const handleEditMovie = (movie) => {
    setEditingMovie(movie);
    setTitle(movie.title);
    setGenre(movie.genre);
    setDescription(movie.description);
    setImage(null);
    setVideo(null);
  };

  const resetForm = () => {
    setTitle('');
    setGenre('');
    setDescription('');
    setImage(null);
    setVideo(null);
    setEditingMovie(null);
  };

  return (
    <div className="admin-panel">
      <h2>Quản lý phim</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tiêu đề" />
      <input value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Thể loại" />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Mô tả" />
      <label>
        Ảnh phim:
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      </label>

      <label>
        Video phim:
        <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />
      </label>
      <button onClick={handleSubmit}>{editingMovie ? 'Cập nhật' : 'Thêm'} phim</button>
      <button className="cancel-btn" onClick={resetForm}>Hủy</button>

      <ul className="movie-list">
        {movies.map(movie => (
          <li key={movie._id}>
            {movie.image && <img src={`http://localhost:5000${movie.image}`} alt={movie.title} />}
            <div>
              <h3>{movie.title}</h3>
              <p>{movie.genre}</p>
              <p>{movie.description}</p>
            </div>
            {movie.video && (
              <video width="180" height="100" controls>
                <source src={`http://localhost:5000${movie.video}`} type="video/mp4" />
                Trình duyệt không hỗ trợ video.
              </video>
            )}
            <div>
              <button onClick={() => handleEditMovie(movie)}>Sửa</button>
              <button className="cancel-btn" onClick={() => handleDeleteMovie(movie._id)}>Xóa</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
