import React, { useState } from "react";
import Card from "./Card";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

export default function List(props) {
  const { title, data, verticalCard } = props;
  const baseImageURL = "https://image.tmdb.org/t/p/original/";
  const [trailerURL, setTrailerURL] = useState("");

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const displayTrailer = (movieTitle) => {
    if (trailerURL) {
      setTrailerURL("");
    } else {
      movieTrailer(movieTitle || "")
        .then((url) => {
          console.log(url);
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerURL(urlParams.get("v"));
        })
        .catch((err) => console.log(err));
    }
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
      {trailerURL && <YouTube videoId={trailerURL} opts={opts} />}
    </div>
  );
}
