import React from "react";
import YouTube from "react-youtube";

export default function Trailer(props) {
  const {
    displayTrailerCard,
    trailerURL,
    setTrailerURL,
    setDisplayTrailerCard,
    setBackgroundDark,
    opts,
    title,
  } = props;
  return (
    displayTrailerCard && (
      <div className="background-dark">
        <div className="video-card">
          <i
            className="fas fa-times"
            onClick={() => {
              setTrailerURL("");
              setDisplayTrailerCard(false);
              setBackgroundDark(false);
            }}
          ></i>
          <div className="video-center">
            {trailerURL ? (
              <YouTube videoId={trailerURL} opts={opts} />
            ) : (
              <p>
                Oops! Trailer for {title} is not available. Try some other
                trailers.
              </p>
            )}
          </div>
        </div>
      </div>
    )
  );
}
