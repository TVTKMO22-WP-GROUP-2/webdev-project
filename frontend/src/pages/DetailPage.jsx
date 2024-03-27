import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../movies.css";
import api_key from '../../secret/Api';

// State variables to manage movie details, loading state, and errors
function DetailPage({ movie_id }) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = api_key; // TMDB API key


  // Effect hook to fetch movie details when component mounts or when movie_id changes
  useEffect(() => {
      // Function to fetch movie details from TMDB API
    const fetchMovieDetails = async () => {
      try {
        // Fetch movie details from TMDB API using movie_id and apiKey
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}`
        );


        // Set fetched movie details to state
        setMovieDetails(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Error fetching movie details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();


    // Cleanup function to reset state when component unmounts or when movie_id changes
    return () => {
      setMovieDetails(null);
      setIsLoading(true);
      setError(null);
    };
  }, [movie_id, apiKey]); // Dependency array to trigger effect when movie_id or apiKey changes


   // Conditional rendering based on loading state, error, or movieDetails availability
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!movieDetails) {
    return <p>No movie details available.</p>;
  }

  return (
    <div className="detailPageContainer">
      <div className='detailBox'>
        <h1 className="title">{movieDetails ? movieDetails.title : 'Movie Details'}</h1>
        <div className="movieDetails">
          <img src={`https://image.tmdb.org/t/p/w500${movieDetails ? movieDetails.poster_path : ''}`} alt={movieDetails ? movieDetails.title : 'Movie Poster'} />
          <div className="details">
            <p><strong>Overview:</strong> {movieDetails ? movieDetails.overview : 'Overview not available'}</p>
            <p><strong>Release Date:</strong> {movieDetails ? movieDetails.release_date : 'Release date not available'}</p>
            <p><strong>Rating:</strong> {movieDetails ? movieDetails.vote_average : 'Rating not available'}</p>
            {/* Add more movie details as needed */}
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default DetailPage;
