import "../index.css";
import Card from "../components/Card";

function Movies() {
  return (
    <div className="moviesPageContainer">
      <div className="searchBar">
        <input type="text" />
        <button>Search</button>
      </div>
      <Card></Card>
    </div>
  );
}
export default Movies;
