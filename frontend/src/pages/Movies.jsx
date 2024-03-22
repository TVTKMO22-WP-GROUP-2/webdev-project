import "../index.css";
import Card from "../components/Card";
import { useState } from "react";

function Movies() {
  const [searchInput, setSearchInput] = useState("");
  const [title, setTitle] = useState("PLACEHOLDER");
  const [src, setSRC] = useState("https://via.placeholder.com/150");
  const [cardList, setCardList] = useState([]);

  // sets searchInput variable
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    setIsError(false);
  };

  const handleSubmit = () => {
    setCardList(cardList.concat(<Card title={searchInput} imgSRC={src} />))
  };

  return (
    <div className="moviesPageContainer">
      <div className="searchBar">
        <input type="text" placeholder="Search" onChange={handleSearchInputChange}/>
        <button type="button" onClick={handleSubmit}>Search</button>
      </div>
      <div className="searchResults">
        {cardList}
      </div>
    </div>
  );
}
export default Movies;
