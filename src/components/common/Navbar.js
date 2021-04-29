import React from "react";
import netflixLogo from "../../media/images/netflix-logo.svg";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="left-side">
        <img src={netflixLogo} alt="netflix-logo" className="netflix-logo" />
        <p>Home</p>
        <p>TV Shows</p>
        <p>Movies</p>
        <p>News & Popular</p>
        <p>My List</p>
      </div>
      <div className="right-side">
        <input type="checkbox" id="search" className="search-checkbox" />
        <label htmlFor="search" className="search-icon">
          <i className="fas fa-search"></i>
        </label>

        <input
          type="text"
          placeholder="Titles, People, Genres"
          className="input-search"
        />
        <p>CHILDREN</p>
        <i className="fas fa-gift"></i>
        <i className="fas fa-bell"></i>
        <i className="fas fa-user"></i>
      </div>
    </nav>
  );
}
