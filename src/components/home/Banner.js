import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context as ApiContext } from "../../context/apiProvider";
import { Context as StreamContext } from "../../context/streamProvider";
import movieTrailer from "movie-trailer";
import { Context as StylesContext } from "../../context/stylesProvider";
import Trailer from "../common/Trailer";

export default function Banner() {
  const baseImageURL = "https://image.tmdb.org/t/p/original/";
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const [trailerURL, setTrailerURL] = useState("");
  const [displayTrailerCard, setDisplayTrailerCard] = useState(false);

  const {
    state: { exploreAllDisplay },
    setBackgroundDark,
  } = useContext(StylesContext);

  const {
    state: { banner },
  } = useContext(ApiContext);

  const {
    state: { searchInput },
  } = useContext(StreamContext);

  const overview =
    banner?.overview.length > 150
      ? `${banner?.overview.substring(0, 150)}...`
      : banner?.overview;

  const displayTrailer = (movieTitle) => {
    setDisplayTrailerCard(true);
    setBackgroundDark(true);
    movieTrailer(movieTitle || "")
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerURL(urlParams.get("v"));
      })
      .catch((err) => console.log(err));
  };

  return (
    <header
      className={
        !searchInput && !exploreAllDisplay ? "banner" : "banner banner-search"
      }
      style={{
        backgroundImage: `url(${baseImageURL + banner?.backdrop_path})`,
      }}
    >
      <div className="banner-dark">
        <div className="banner-details">
          <h1 className="heading-primary">
            {banner?.original_title || banner?.name}
          </h1>
          <p className="para-secondary">
            Ratings: {banner?.vote_average}
            <span>{`(${banner?.original_language})`}</span>
          </p>
          <p className="para-primary">{overview}</p>
          <div className="btn-container">
            <button
              className="btn-primary"
              onClick={() =>
                displayTrailer(banner?.original_title || banner?.name)
              }
            >
              <i className="fas fa-play"></i>Play
            </button>
            <Link to="/message">
              <button className="btn-secondary">
                <i className="fas fa-info-circle"></i>More Info
              </button>
            </Link>
          </div>
        </div>
        {/* <p className="message-developer">
          Developed with ❤️ by Aditya Prem Sharma using React.JS for practice
          purposes.
        </p> */}
      </div>
      <div className="banner-linear-gradient" />
      <Trailer
        displayTrailerCard={displayTrailerCard}
        trailerURL={trailerURL}
        setTrailerURL={setTrailerURL}
        setDisplayTrailerCard={setDisplayTrailerCard}
        setBackgroundDark={setBackgroundDark}
        opts={opts}
        title={banner?.original_title || banner?.name}
      />
    </header>
  );
}
