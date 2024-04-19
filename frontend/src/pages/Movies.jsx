import "../movies.css";
import Card from "../components/Card";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import api_key from "../../secret/Api";

function Movies() {
  // State variables
  const [searchInput, setSearchInput] = useState("");
  const [cardList, setCardList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  // TMDB API key
  const apiKey = api_key;

  // Handler for search input change
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Handler for form submission
  // Handler for form submission
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Construct the base URL for the TMDB API
      let apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchInput}`;

      // Add genre filter if selected
      if (selectedGenre) {
        apiUrl += `&with_genres=${selectedGenre}`;
      }

      // Add release year filter if selected
      if (selectedYear) {
        apiUrl += `&year=${selectedYear}`;
      }

      // Add rating filter if selected
      if (selectedRating) {
        apiUrl += `&vote_average.gte=${selectedRating}`;
      }

      // Fetch movie data from TMDB API
      const response = await axios.get(apiUrl);

      // Extract results from response
      const results = response.data.results;
      console.log();

      // Map results to Card components wrapped in Links
      const cards = results.map((movie) => (
        <Link key={movie.id} to={`/movie/${movie.id}`}>
          <Card
            title={movie.title}
            imgSRC={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          />
        </Link>
      ));

      // Update cardList state with the mapped cards
      setCardList(cards);
    } catch (error) {
      // Log and handle errors
      console.error("Error fetching movies:", error);
    } finally {
      // Set loading state to false after completion
      setIsLoading(false);
    }
  };

  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ];

  const years = Array.from({ length: 30 }, (_, index) => 2022 - index);

  const ratings = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]; // Assuming ratings are from 1 to 10

  // Event handler for genre selection change
  const handleGenreChange = (e) => {
    setSelectedGenre(parseInt(e.target.value));
    console.log(selectedGenre);
  };

  // Event handler for release year selection change
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    console.log(selectedYear);
  };

  // Event handler for rating selection change
  const handleRatingChange = (e) => {
    setSelectedRating(parseInt(e.target.value));
    console.log(selectedRating);
  };

  return (
    <div className="moviesPageContainer">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <button type="button" onClick={handleSubmit}>
          Search
        </button>
        {/* Dropdown menus for filters */}
        <div className="filters">
          <select value={selectedGenre || ""} onChange={handleGenreChange}>
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>

          <select value={selectedYear || ""} onChange={handleYearChange}>
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select value={selectedRating || ""} onChange={handleRatingChange}>
            <option value="">All Ratings</option>
            {ratings.map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </div>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="searchResults">
          {cardList.length === 0 ? (
            <p>No search query provided. Applying filters to all movies.</p>
          ) : (
            cardList
          )}
        </div>
      )}
    </div>
  );
}

export default Movies;
