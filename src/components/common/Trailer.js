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
  } = props;
  return (
    displayTrailerCard && (
      <div className="background-dark">
        <div className="video-card">
          <i
            class="fas fa-times"
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
              <p>Trailer for this is not available.</p>
            )}
          </div>
        </div>
      </div>
    )
  );
}
