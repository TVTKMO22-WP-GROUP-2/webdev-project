import "../index.css";
import Navigation from "./Navigation.jsx";
import Sidebar from "./Sidebar.jsx";


function Header() {
  return (
    <header>
      <Navigation />
      <Sidebar />
    </header>
  );
}
export default Header;
