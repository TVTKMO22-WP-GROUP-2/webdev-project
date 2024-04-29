import "../movies.css";
import Card from "../components/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import api_key from "../../secret/Api";

function Movies() {
  // State variables
  const [searchInput, setSearchInput] = useState("");
  const [cardList, setCardList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("none");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [years, setYears] = useState([]);

  // TMDB API key
  const apiKey = api_key;


  // Fetch genre list from TMDB API
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();

    // Generate an array of years, going back 100 years from the current year
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from(
      { length: 100 },
      (_, index) => currentYear - index
    );
    setYears(yearOptions);
  }, [apiKey]);

  // Handler for search input change
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Handler for form submission
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Construct the API query URL based on selected filter
      let url = "";
      if (selectedFilter === "none") {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchInput}`;
      } else if (selectedFilter === "year") {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&year=${selectedYear}&query=${searchInput}`;
      } else if (selectedFilter === "genre") {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre}&query=${searchInput}`;
      }

      // Fetch movie data from TMDB API
      const response = await axios.get(url);

      // Extract results from response
      const results = response.data.results;

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

  // Event handler for filter selection change
  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    setSelectedGenre("");
  };

  // Event handler for year selection change
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  // Event handler for genre selection change
  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };


  useEffect(() => {
    const adjustTitleFontSize = () => {
      const cards = document.querySelectorAll(".searchResults .card");

      cards.forEach((card) => {
        const title = card.querySelector("h2");
        const titleLength = title.textContent.length;
        const fontSize = Math.max(0.7, 2.2 - titleLength * 0.08); // Adjust the multiplier as needed

        title.style.fontSize = `${fontSize}rem`;
      });
    };

    adjustTitleFontSize();

    // Re-adjust font size when cardList changes
  }, [cardList]);

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
        {/* Filter dropdown menu with title */}
        <div className="filterContainer">
          <label htmlFor="filterDropdown">Filter By:</label>
          <select
            id="filterDropdown"
            className={
              selectedFilter === "year"
                ? "yearDropdown"
                : selectedFilter === "genre"
                ? "genreDropdown"
                : ""
            }
            value={selectedFilter}
            onChange={handleFilterChange}
          >
            <option value="none">None</option>
            <option value="year">Year</option>
            <option value="genre">Genre</option>
          </select>
        </div>
        {/* Additional input/select for year or genre filter */}
        {selectedFilter === "year" && (
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="yearDropdown"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        )}
        {selectedFilter === "genre" && (
          <select
            value={selectedGenre}
            onChange={handleGenreChange}
            className="genreDropdown"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        )}
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="searchResults">{cardList}</div>
      )}
    </div>
  );
}

export default Movies;
