import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ toggleSidebar }) => {
  useEffect(() => {
    const btn = document.getElementById('btn');
    const sidebar = document.querySelector('.sidebar');

    const toggleSidebarVisibility = () => {
      sidebar.classList.toggle('active');
    };

    btn.addEventListener('click', toggleSidebarVisibility);

    return () => {
      btn.removeEventListener('click', toggleSidebarVisibility);
    };
  }, []); // Empty dependency array ensures this effect runs only once when component mounts

  return (
    <div className="sidebar">
      <div className="top">
        <div className="logo">
          <i className="bx bxl-codepen"></i>
          <span>Movie Website</span>
        </div>
        <i className="bx bx-menu" id="btn" onClick={toggleSidebar}></i>
      </div>
      <ul>
        <li>
          <Link to="/">
            <i className="bx bx-home-alt-2"></i>
            <span className="nav-item">Home</span>
          </Link>
          <span className="tooltip">Home</span>
        </li>
        <li>
          <Link to="/movies">
            <i className="bx bx-movie"></i>
            <span className="nav-item">Movies</span>
          </Link>
          <span className="tooltip">Movies</span>
        </li>
        <li>
          <Link to="/at-theaters">
            <i className="bx bx-film"></i>
            <span className="nav-item">Theaters</span>
          </Link>
          <span className="tooltip">Theaters</span>
        </li>
        <li>
          <Link to="/groups">
            <i className="bx bx-group"></i>
            <span className="nav-item">Groups</span>
          </Link>
          <span className="tooltip">Groups</span>
        </li>
        <li>
          <Link to="/account">
            <i className="bx bxs-user-account"></i>
            <span className="nav-item">Account</span>
          </Link>
          <span className="tooltip">Account</span>
        </li>
        <li>
          <Link to="/login">
            <i className="bx bxs-log-in"></i>
            <span className="nav-item">Login</span>
          </Link>
          <span className="tooltip">Login</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
