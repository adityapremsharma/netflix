import React, { useState, useContext } from "react";
import Card from "./Card";

import movieTrailer from "movie-trailer";
import { Context as StylesContext } from "../../context/stylesProvider";
import Trailer from "../common/Trailer";

export default function List(props) {
  const { title, data, verticalCard } = props;
  const baseImageURL = "https://image.tmdb.org/t/p/original/";

  const {
    state: { backgroundDark },
    setBackgroundDark,
  } = useContext(StylesContext);
  console.log(backgroundDark);

  const [trailerURL, setTrailerURL] = useState("");
  const [displayTrailerCard, setDisplayTrailerCard] = useState(false);

  const opts = {
    height: "390",
    width: "75%",
    playerVars: {
      autoplay: 1,
    },
  };

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
    <div className="list">
      <h1 className="heading-secondary">{title}</h1>
      <div className="list-container">
        {data.map((item) => {
          const imagePath = verticalCard
            ? item.poster_path
            : item.backdrop_path;
          const className = verticalCard ? "card card-vertical" : "card";
          return (
            <Card
              onClick={displayTrailer}
              key={item.id}
              title={item.title || item.name}
              image={baseImageURL + imagePath}
              className={className}
            />
          );
        })}
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
