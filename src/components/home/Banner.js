import React, { useContext } from "react";
import { Context as ApiContext } from "../../context/apiProvider";

export default function Banner() {
  const baseImageURL = "https://image.tmdb.org/t/p/original/";
  const {
    state: { banner },
  } = useContext(ApiContext);

  // console.log(banner);

  const overview =
    banner?.overview.length > 150
      ? `${banner?.overview.substring(0, 150)}...`
      : banner?.overview;

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(${baseImageURL + banner?.backdrop_path})`,
      }}
    >
      <div className="banner-dark">
        <div className="banner-details">
          <h1 className="heading-primary">
            {banner?.original_title || banner?.name}
          </h1>
          <p className="para-secondary">Ratings: {banner?.vote_average}</p>
          <p className="para-primary">{overview}</p>
          <div className="btn-container">
            <button className="btn-primary">
              <i className="fas fa-play"></i>Play
            </button>
            <button className="btn-secondary">
              <i className="fas fa-info-circle"></i>More Info
            </button>
          </div>
        </div>
      </div>
      <div className="banner-linear-gradient" />
    </header>
  );
}
