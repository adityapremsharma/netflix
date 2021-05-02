import React, { useState, useEffect, useContext } from "react";
import Card from "./Card";

import movieTrailer from "movie-trailer";
import { Context as StylesContext } from "../../context/stylesProvider";
import { Context as StreamContext } from "../../context/streamProvider";
import Trailer from "./Trailer";

export default function List(props) {
  const { title, data, onClick, verticalCard } = props;
  const baseImageURL = "https://image.tmdb.org/t/p/original/";

  const { setBackgroundDark } = useContext(StylesContext);

  const {
    state: { searchInput },
  } = useContext(StreamContext);

  const [trailerURL, setTrailerURL] = useState("");
  const [displayTrailerCard, setDisplayTrailerCard] = useState(false);
  const [displayData, setDisplayData] = useState([]);
  const [movieTitle, seMovieTitle] = useState("");

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    if (searchInput === "") {
      setDisplayData(data);
    } else {
      const filteredData = data.filter((ele) => {
        const name = ele?.name || ele?.title;
        return name.toLowerCase().includes(searchInput.toLowerCase());
      });
      setDisplayData(filteredData);
    }
  }, [searchInput, data]);

  const displayTrailer = (movieTitle) => {
    seMovieTitle(movieTitle);
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
    <div className="horizontal-scrollbar-list">
      <h2 className="heading-secondary">
        {title}

        <span className="explore-button" onClick={() => onClick(data, title)}>
          <span>Explore all</span>
          <i className="fas fa-chevron-right"></i>
        </span>
      </h2>

      <div className="horizontal-scrollbar-list-container">
        {displayData.map((item) => {
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
        title={movieTitle}
      />
    </div>
  );
}
