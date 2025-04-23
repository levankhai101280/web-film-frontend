import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import "./MovieDetail.css";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [userReview, setUserReview] = useState({ rating: 0, comment: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false); // Track loading state for video
  const [isVideoVisible, setIsVideoVisible] = useState(false); // Track if video is visible
  const username = localStorage.getItem("username"); // Lấy username từ localStorage

  // Lấy chi tiết phim từ server
  useEffect(() => {
    fetch(`http://localhost:5000/api/movies/detail/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error("❌ Lỗi khi lấy chi tiết phim:", error));
  }, [id]);

  if (!movie) return <p className="text-center text-gray-400">Đang tải...</p>;

  // Hàm hiển thị sao dựa trên điểm đánh giá
  const renderStars = (rating, setRating = null) => {
    return [...Array(10)].map((_, i) => (
      <span key={i} onClick={() => setRating && setRating(i + 1)}>
        {i < rating ? (
          <FaStar className="text-yellow-400 cursor-pointer" />
        ) : (
          <FaRegStar className="text-gray-500 cursor-pointer" />
        )}
      </span>
    ));
  };

  // Gửi đánh giá lên server
  const submitReview = async () => {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    console.log("Token được gửi:", token); // Debug token

    if (!token) {
      console.error("Bạn cần đăng nhập để đánh giá");
      return;
    }

    setIsSubmitting(true); // Bắt đầu hiển thị loading

    try {
      const response = await fetch(`http://localhost:5000/api/movies/review/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Gửi token kèm request
        },
        body: JSON.stringify({
          rating: userReview.rating,
          comment: userReview.comment
        })
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message || "Lỗi khi gửi đánh giá");
      }

      const data = await response.json();
      console.log("Đánh giá thành công:", data);

      // Cập nhật lại danh sách review
      setMovie((prev) => ({
        ...prev,
        reviews: data.reviews
      }));

      // Reset form đánh giá
      setUserReview({ rating: 0, comment: "" });
    } catch (error) {
      console.error("❌ Lỗi khi gửi đánh giá:", error);
    } finally {
      // Giữ loading trong 1 giây trước khi tắt spinner
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    }
  };

  // Hàm xử lý nhấn vào "Xem phim"
  const handlePlayVideo = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn cần đăng nhập để xem phim.");
      return;
    }
  
    setIsVideoLoading(true);
    setTimeout(() => {
      setIsVideoVisible(true); // Hiển thị video
      setIsVideoLoading(false); // Tắt loading
    }, 2000);
  };

  return (
    <div className="movie-detail-container">
      <div className="movie-header">
        <h1>{movie.title}</h1>
      </div>

      <div className="movie-info">
        <img src={`http://localhost:5000${movie.image}`} alt={movie.title} className="movie-poster" />

        <div className="movie-details">
          <div className="movie-tags">
            <span className="movie-tag genres">{movie.genre}</span>
            <span className="movie-tag release-date">{movie.releaseDate}</span>
          </div>

          <p className="movie-description">{movie.description}</p>

          {/* Nút "Xem phim" */}
          {movie.video && !isVideoVisible && (
            <div className="movie-video">
              <button onClick={handlePlayVideo} className="play-video-button">
                Xem phim
              </button>
              {isVideoLoading && <p>Đang tải video...</p>}
            </div>
          )}

          {/* Phần hiển thị video */}
          {isVideoVisible && (
            <div className="movie-video">
              <h3>Video Trailer</h3>
              <video controls width="100%">
                <source src={`http://localhost:5000${movie.video}`} type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ thẻ video.
              </video>
            </div>
          )}

          <div className="movie-rating">
            {renderStars(movie.rating)}
            <span>{movie.rating} / 10</span>
          </div>

          <div className="review-section">
            <h2>Đánh giá phim</h2>
            {username ? (
              <div className="review-input">
                <div className="flex gap-2 mt-2">
                  {renderStars(userReview.rating, (rating) =>
                    setUserReview({ ...userReview, rating })
                  )}
                </div>
                <textarea
                  className="review-textarea"
                  rows="3"
                  placeholder="Nhập nhận xét của bạn..."
                  value={userReview.comment}
                  onChange={(e) =>
                    setUserReview({ ...userReview, comment: e.target.value })
                  }
                />
                <button
                  className="review-submit"
                  onClick={submitReview}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
                </button>
                {isSubmitting && <div className="spinner"></div>}
              </div>
            ) : (
              <p>Bạn cần đăng nhập để đánh giá.</p>
            )}

            <div className="review-list">
              <h2>Đánh giá người dùng:</h2>
              {movie.reviews?.length > 0 ? (
                movie.reviews.map((review, index) => (
                  <div key={index} className="review-item">
                    <p>
                      <strong>{review.user?.username || "Ẩn danh"}:</strong>{" "}
                      {review.comment}
                    </p>
                    <p>
                      Đánh giá: {"⭐".repeat(review.rating)}
                      {"☆".repeat(10 - review.rating)}
                    </p>
                  </div>
                ))
              ) : (
                <p>Chưa có đánh giá nào.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
