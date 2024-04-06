function AlreadyLoggedIn() {
  return (
    <div className="loggedInPageContainer">
      <div>
        <h1 className="loggedInHeaderText">You are logged in!</h1>
      </div>
      <div>
        <h2 className="loggedInSecondaryText">
          You can now write reviews, create and join groups, favorite movies and
          edit your profile.
        </h2>
      </div>
    </div>
  );
}
export default AlreadyLoggedIn;
