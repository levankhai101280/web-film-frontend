import { useState, useEffect } from 'react';
import './MovieList.css';
import { Link } from "react-router-dom";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/movies');
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        console.error('Lỗi khi tải danh sách phim:', error);
      }
    };

    fetchMovies();
  }, []);

  // Lọc phim theo tiêu đề và thể loại
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const singleMovies = filteredMovies.filter(movie => movie.genre.toLowerCase() === 'phim lẻ');
  const seriesMovies = filteredMovies.filter(movie => movie.genre.toLowerCase() === 'phim bộ');

  const renderMovieSection = (title, movies) => (
    <div className="genre-section">
      <div className="section-header">
        <h2>{title}</h2>
      </div>
      
      <div className="movie-list">
        {movies.map(movie => (
          <Link to={`/movie/${movie._id}`} key={movie._id} className="movie-card">
            <img src={`http://localhost:5000${movie.image}`} alt={movie.title} />
            <h3>{movie.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div className="movie-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Tìm kiếm phim..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Hiển thị phim bộ khi có từ khóa tìm kiếm */}
      {searchTerm && seriesMovies.length > 0 && renderMovieSection("Phim Bộ", seriesMovies)}

      {/* Hiển thị phim lẻ khi có từ khóa tìm kiếm */}
      {searchTerm && singleMovies.length > 0 && renderMovieSection("Phim Lẻ", singleMovies)}
      
      {/* Thông báo nếu không tìm thấy phim */}
      {searchTerm && filteredMovies.length === 0 && (
        <div className="not-found-message">Không tìm thấy phim nào</div>
      )}

      {/* Hiển thị đầy đủ phim bộ và phim lẻ khi không tìm kiếm */}
      {!searchTerm && renderMovieSection("Phim Lẻ", singleMovies)}
      {!searchTerm && renderMovieSection("Phim Bộ", seriesMovies)}
    </div>
  );
};

export default MovieList;
