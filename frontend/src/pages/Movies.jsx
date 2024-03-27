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

  // TMDB API key
  const apiKey = api_key;

  // Handler for search input change
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Handler for form submission
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Fetch movie data from TMDB API
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchInput}`
      );

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


  return (
    <div className="moviesPageContainer">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search"
          onChange={handleSearchInputChange}
        />
        <button type="button" onClick={handleSubmit}>
          Search
        </button>
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
