import "../index.css";

function Profile() {
  return (
    <div className="profilePageContainer">
      <div className="profilePageHeaderSpacer"></div>
      <div className="profilePageMainContent">
        <div className="profilePageNameAndPic">
          <div className="profilePagePic"></div>
          <h1 className="profilePageUsername">Username</h1>
        </div>
        <div className="profilePageFavoriteMovies">
          <h2>Favorite movies</h2>
        </div>
        <div className="profilePageUserReviews"></div>
      </div>
    </div>
  );
}
export default Profile;
