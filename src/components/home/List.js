import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";

import movieTrailer from "movie-trailer";
import { Context as StylesContext } from "../../context/stylesProvider";
import { Context as StreamContext } from "../../context/streamProvider";
import Trailer from "../common/Trailer";

export default function List(props) {
  const { title, data, verticalCard } = props;
  const baseImageURL = "https://image.tmdb.org/t/p/original/";

  const { setBackgroundDark } = useContext(StylesContext);

  const {
    state: { searchInput },
  } = useContext(StreamContext);

  const [trailerURL, setTrailerURL] = useState("");
  const [displayTrailerCard, setDisplayTrailerCard] = useState(false);
  const [displayData, setDisplayData] = useState([]);

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
        return ele.name?.toLowerCase().includes(searchInput.toLowerCase());
      });
      setDisplayData(filteredData);
    }
  }, [searchInput, data]);

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
      {!searchInput && (
        <h1 className="heading-secondary">
          {title}
          <Link to="/message">
            <span className="explore-button">
              <span>Explore all</span>
              <i class="fas fa-chevron-right"></i>
            </span>
          </Link>
        </h1>
      )}
      <div className="list-container">
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
      />
    </div>
  );
}
