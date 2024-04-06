import React from "react";

function Burgermenu() {
  let btn = document.querySelector("#btn");
  let sidebar = document.querySelector(".sidebar");

  btn.onclick = function () {
    sidebar.classList.toggle("active");
  };
  return (
    <>
      <div class="sidebar">
        <div class="top">
          <div class="logo">
            <i class="bx bxl-codepen"></i>
            <span>Movie Website</span>
          </div>
          <i class="bx bx-menu" id="btn"></i>
        </div>
        <ul>
          <li>
            <a href="#">
              <i class="bx bx-home-alt-2"></i>
              <span class="nav-item">Home</span>
            </a>
            <span class="tooltip">Home</span>
          </li>
          <li>
            <a href="#">
              <i class="bx bx-movie"></i>
              <span class="nav-item">Movies</span>
            </a>
            <span class="tooltip">Movies</span>
          </li>
          <li>
            <a href="#">
              <i class="bx bx-location-plus"></i>
              <span class="nav-item">At Theaters</span>
            </a>
            <span class="tooltip">At Theaters</span>
          </li>
          <li>
            <a href="#">
              <i class="bx bx-group"></i>
              <span class="nav-item">Groups</span>
            </a>
            <span class="tooltip">Groups</span>
          </li>
          <li>
            <a href="#">
              <i class="bx bx-like"></i>
              <span class="nav-item">Reviews</span>
            </a>
            <span class="tooltip">Reviews</span>
          </li>
          <li>
            <a href="#">
              <i class="bx bxs-user-account"></i>
              <span class="nav-item">Account</span>
            </a>
            <span class="tooltip">Account</span>
          </li>
          <li>
            <Link className="navigationLink" to="/login">
              <i class="bx bxs-log-in"></i>
              <span class="nav-item">Login</span>
            </Link>
            <span class="tooltip">Login</span>
          </li>
        </ul>
      </div>

      <div class="main-content">
        <div class="container">
          <h1>Movie Website</h1>
          <h1>Right Side</h1>
        </div>
      </div>
    </>
  );
}

export default Burgermenu;
