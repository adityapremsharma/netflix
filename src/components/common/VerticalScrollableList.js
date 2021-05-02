import React, { useState, useContext } from "react";
import Trailer from "../common/Trailer";
import Card from "./Card";
import movieTrailer from "movie-trailer";
import { Context as StylesContext } from "../../context/stylesProvider";

export default function VerticalScrollableList(props) {
  const { goBack, searchHeading, searchData } = props;

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

  const { setBackgroundDark } = useContext(StylesContext);

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
    <div className="vertical-scrollable-list">
      <h2 className="heading-secondary">
        {searchHeading ? searchHeading : null}
      </h2>
      <div className="go-back-button" onClick={goBack}>
        <i className="fas fa-chevron-left"></i>
        <span>Go back</span>
      </div>
      <div className="vertical-scrollable-list-container">
        {searchData.map((item) => (
          <Card
            key={item?.id}
            image={baseImageURL + item?.poster_path}
            title={item?.name || item?.title}
            className="card-search"
            onClick={displayTrailer}
          />
        ))}
      </div>
      <Trailer
        displayTrailerCard={displayTrailerCard}
        trailerURL={trailerURL}
        setTrailerURL={setTrailerURL}
        setDisplayTrailerCard={setDisplayTrailerCard}
        setBackgroundDark={setBackgroundDark}
        opts={opts}
      />
    </div>
  );
}
