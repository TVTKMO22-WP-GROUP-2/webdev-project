import "../index.css";
import { Outlet, Link } from "react-router-dom";

function Navigation() {
  return (
    <>
      <nav className="navigation">
        <ul className="navigationUL">
          <li>
            <Link className="navigationLink" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="navigationLink" to="/movies">
              Movies
            </Link>
          </li>
          <li>
            <Link className="navigationLink" to="/at-theaters">
              At Theaters
            </Link>
          </li>
          <li>
            <Link className="navigationLink" to="/groups">
              Groups
            </Link>
          </li>
          <li>
            <Link className="navigationLink" to="/your-reviews">
              Reviews
            </Link>
          </li>
          <li>
            <Link className="navigationLink" to="/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link className="navigationLink" to="/login">
              Log in
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
export default Navigation;
