import { useState, useEffect } from 'react';
import './MovieList.css'; // Import file CSS
import { Link } from "react-router-dom";


const MovieList = ({ searchResults }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setMovies(searchResults); // Hiển thị kết quả tìm kiếm
    } else {
      // Nếu không tìm kiếm, lấy danh sách phim mặc định
      fetch('http://localhost:5000/api/movies')
        .then(response => response.json())
        .then(data => setMovies(data))
        .catch(error => console.error("Lỗi khi lấy danh sách phim:", error));
    }
  }, [searchResults]);

  return (
    <div className="movie-container">
      <h1>🎬 Danh sách phim</h1>
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie._id} className="movie-card">
              <img src={`http://localhost:5000${movie.image}`} alt={movie.title} className="movie-image" />
              <h3>{movie.title}</h3>
              <p className="genre">{movie.genre}</p>
              <p className="description">{movie.description}</p> {/* Hiển thị mô tả phim */}
              <Link to={`/movie/${movie._id}`} className="btn">
                Xem Chi Tiết
              </Link>

            </div>
          ))
        ) : (
          <p>Không tìm thấy phim nào.</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;
