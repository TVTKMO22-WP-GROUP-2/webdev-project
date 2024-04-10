import React, { useState, useEffect } from "react";
import axios from "axios";
import "../movies.css";
import api_key from "../../secret/Api";

function DetailPage({ movie_id }) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewContent, setReviewContent] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const apiKey = api_key; // TMDB API key

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}`
        );
        setMovieDetails(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Error fetching movie details. Please try again.");
      }
    };

    fetchMovieDetails();

    return () => {
      setMovieDetails(null);
      setIsLoading(true);
      setError(null);
    };
  }, [movie_id, apiKey]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/reviews/${movie_id}`);
        console.log("Response data:", response.data);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Error fetching reviews. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, [movie_id]);

  console.log(reviews);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/users/status");
        setIsLoggedIn(response.data);
      } catch (error) {
        console.error("Error fetching login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleReviewSubmit = async () => {
    try {
      console.log("Submitting review...");

      // Send review to backend to save
      const submitResponse = await axios.post("http://localhost:3000/reviews", {
        movie_id: movie_id,
        content_text: reviewContent,
        userID: userID
      });
      console.log("Review submitted successfully:", submitResponse.data);

      // Refetch reviews after submission
      const response = await axios.get(`/http://localhost:3000/reviews/${movie_id}`);
      setReviews(response.data);
      setReviewContent(""); // Clear review input field

      console.log("Reviews updated after submission:", response.data);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="detailPageContainer">
      <div className="detailBox">
        <h1 className="title">
          {movieDetails ? movieDetails.title : "Movie Details"}
        </h1>
        <div className="movieDetails">
          <img
            src={`https://image.tmdb.org/t/p/w500${
              movieDetails ? movieDetails.poster_path : ""
            }`}
            alt={movieDetails ? movieDetails.title : "Movie Poster"}
          />
          <div className="details">
            <div className="detailHeader">
              <h2>Overview</h2>
              <p>
                {movieDetails ? movieDetails.overview : "Overview not available"}
              </p>
            </div>
            <div className="detailHeader">
              <h2>Release Date</h2>
              <p>
                {movieDetails
                  ? movieDetails.release_date
                  : "Release date not available"}
              </p>
            </div>
            <div className="detailHeader">
              <h2>Rating</h2>
              <p>
                {movieDetails
                  ? movieDetails.vote_average
                  : "Rating not available"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="reviewsContainer">
        <h2>Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="reviewBox">
              <p className="username"><strong>Username:</strong> {review.userID}</p>
              <p className="date"><strong>Date:</strong> {new Date(review.createdAt).toLocaleString()}</p>
              <p className="content"><strong>Review:</strong> {review.content_text}</p>
            </div>
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </div>
      {isLoggedIn ? (
        <div className="reviewForm">
          <h2>Write a Review</h2>
          <textarea
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
            placeholder="Write your review here..."
          ></textarea>
          <button onClick={handleReviewSubmit}>Submit Review</button>
        </div>
      ) : (
        <p className="loginMessage">Login to write a review</p>
      )}
    </div>
  );
  
  
}

export default DetailPage;
