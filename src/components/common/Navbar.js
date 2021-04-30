import React, { useRef, useContext } from "react";
import netflixLogo from "../../media/images/netflix-logo.svg";
import netflixMenuLogo from "../../media/images/netflix-logo.png";
import { Context as StreamContext } from "../../context/streamProvider";

export default function Navbar() {
  let focusInput = useRef(null);
  // const [showNavbarBackground, setShowNavbarBackground] = useState(false);

  const {
    state: { searchInput },
    setSearchInput,
  } = useContext(StreamContext);

  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     if (window.scrollY !== 0) {
  //       setShowNavbarBackground(true);
  //     } else {
  //       setShowNavbarBackground(false);
  //     }
  //   });
  //   return () => {
  //     window.removeEventListener("scroll");
  //   };
  // }, []);

  console.log(searchInput);

  return (
    <div>
      <input type="checkbox" id="navbar" className="netflix-menu-checkbox" />
      <label htmlFor="navbar" className="netflix-menu-icon">
        <img
          src={netflixMenuLogo}
          alt="netflix-logo"
          className="netflix-menu-logo"
        />
      </label>
      <input
        type="checkbox"
        id="search-mobile"
        className="search-checkbox search-checkbox-mobile"
      />
      <label
        htmlFor="search-mobile"
        className="search-icon-mobile"
        onClick={() => {
          setSearchInput("");
        }}
      >
        <i className="fas fa-search"></i>
      </label>
      <input
        type="text"
        placeholder="Titles, People, Genres"
        className="input-search input-search-mobile"
        ref={focusInput}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
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
          <label
            htmlFor="search"
            className="search-icon"
            onClick={() => {
              setSearchInput("");
              setTimeout(() => {
                focusInput.current.focus();
              }, 200);
            }}
          >
            <i className="fas fa-search"></i>
          </label>

          <input
            type="text"
            placeholder="Titles, People, Genres"
            className="input-search"
            ref={focusInput}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <p>CHILDREN</p>
          <i className="fas fa-gift"></i>
          <i className="fas fa-bell"></i>
          <i className="fas fa-user"></i>
        </div>
      </nav>
    </div>
  );
}
