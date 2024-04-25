import { useState, useEffect } from "react";
import axios from "axios";
import api_key from "../../secret/Api";

function AccountPageReviewBox({ review }) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${review.movie_id}?api_key=${api_key}`
        );
        setMovieDetails(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Error fetching movie details. Please try again.");
      }
    };

    fetchMovieDetails();
  }, [review.movie_id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {movieDetails && (
        <>
          <div className="accountPageReviewContent">
            <img
              src={`https://image.tmdb.org/t/p/w200${
                movieDetails.poster_path || ""
              }`}
              alt={movieDetails.title}
            />
            <div className="accountPageReviewTextContent">
              <h1>{movieDetails.title}</h1>
              <div className="accountPageReviewAndDate">
                <p className="accountPageReview">
                  {review.content_text}
                </p>
                <p className="accountPageReviewDate">
                  <strong style={{"font-weight":"100"}}>Written:</strong>{" "}
                  {new Date(review.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AccountPageReviewBox;
