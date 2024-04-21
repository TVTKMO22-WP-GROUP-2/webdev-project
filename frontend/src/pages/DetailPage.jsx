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
  const [username, setUsername] = useState();

  const apiKey = api_key; // TMDB API key


  // Effect hook to fetch movie details when the movie_id or apiKey changes
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
 // Cleanup function to reset state when unmounting
    return () => {
      setMovieDetails(null);
      setIsLoading(true);
      setError(null);
    };
  }, [movie_id, apiKey]);

  
// Effect hook to fetch reviews when the movie_id changes
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/reviews/${movie_id}`
        );
       // console.log("Response data:", response.data);
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

  //console.log(reviews);


  // Effect hook to fetch username when the component mounts
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users/username", {
          withCredentials: true
        });
        if (response.data.username) {
          setIsLoggedIn(true);
          setUsername(response.data.username);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchUsername();
  }, []);
  

    // Handler function to submit a review
  const handleReviewSubmit = async () => {
    try {
      console.log("Submitting review...");
  
      if (!username) {
        console.error("Username not available"); // Check if username is available
        return;
      }

      if (!reviewContent.trim()) {
        console.error("Review content is empty"); // content cant be empty
        return;
      }
  
      // Send review to backend to save
      const submitResponse = await axios.post("http://localhost:3000/reviews", {
        movie_id: movie_id,
        content_text: reviewContent,
        userID: username,
      });
      console.log("Review submitted successfully:", submitResponse.data);
  
      // Refetch reviews after submission
      const updatedResponse = await axios.get(
        `http://localhost:3000/reviews/${movie_id}`
      );
      // Update reviews state with the fetched reviews
      setReviews(updatedResponse.data);
      setReviewContent(""); // Clear review input field
  
      console.log("Reviews updated after submission:", updatedResponse.data);
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
                {movieDetails
                  ? movieDetails.overview
                  : "Overview not available"}
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
        {reviews && reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="reviewBox">
              <p className="username">
                <strong>Username:</strong> {review.userID}
              </p>
              <p className="date">
                <strong>Date:</strong>{" "}
                {new Date(review.createdAt).toLocaleString()}
              </p>
              <p className="content">
                <strong>Review:</strong> {review.content_text}
              </p>
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
