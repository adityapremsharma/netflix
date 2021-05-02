import React, { useState, useContext, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import Banner from "../components/home/Banner";
import List from "../components/home/List";
import Trailer from "../components/common/Trailer";
import movieTrailer from "movie-trailer";

import { Context as ApiContext } from "../context/apiProvider";
import { Context as StreamContext } from "../context/streamProvider";
import { Context as StylesContext } from "../context/stylesProvider";

export default function Home() {
  const baseImageURL = "https://image.tmdb.org/t/p/original/";

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const [searchData, setSearchData] = useState([]);
  const [trailerURL, setTrailerURL] = useState("");
  const [displayTrailerCard, setDisplayTrailerCard] = useState(false);

  const {
    state: {
      trending,
      netflixOriginals,
      topRated,
      actionMovies,
      comedyMovies,
      horrorMovies,
      romanceMovies,
      documentaries,
      allData,
    },
    fetchTrending,
    fetchNetflixOriginals,
    fetchTopRated,
    fetchActionMovies,
    fetchComedyMovies,
    fetchHorrorMovies,
    fetchRomanceMovies,
    fetchDocumentaries,
    getAllData,
  } = useContext(ApiContext);

  const {
    state: { searchInput },
  } = useContext(StreamContext);

  const { setBackgroundDark } = useContext(StylesContext);

  useEffect(() => {
    fetchTrending();
    fetchNetflixOriginals();
    fetchTopRated();
    fetchActionMovies();
    fetchComedyMovies();
    fetchHorrorMovies();
    fetchRomanceMovies();
    fetchDocumentaries();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getAllData();
    // eslint-disable-next-line
  }, [
    trending,
    netflixOriginals,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (searchInput === "") {
      setSearchData(allData);
    } else {
      const filteredData = allData.filter((ele) => {
        const name = ele?.name || ele?.title;
        return name.toLowerCase().includes(searchInput.toLowerCase());
      });
      setSearchData(filteredData);
    }
    // eslint-disable-next-line
  }, [searchInput]);

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

  console.log(allData);

  return (
    <div>
      <Navbar />
      <Banner />
      <div
        className={
          !searchInput ? "list-lift-up" : "list-lift-up list-lift-up-search"
        }
      >
        {!searchInput ? (
          <>
            <List title="Trending Now" data={trending} verticalCard />
            <List
              title="Netflix Originals"
              data={netflixOriginals}
              verticalCard
            />
            <List title="Top Rated" data={topRated} verticalCard />
            <List title="Action" data={actionMovies} verticalCard />
            <List title="Comedy" data={comedyMovies} verticalCard />
            <List title="Horror" data={horrorMovies} verticalCard />
            <List title="Romance" data={romanceMovies} verticalCard />
            <List title="Documentaries" data={documentaries} verticalCard />
          </>
        ) : (
          <>
            <div className="card-search-container">
              {searchData.map((item) => (
                <img
                  key={item?.id}
                  src={baseImageURL + item?.poster_path}
                  alt={item?.name || item?.title}
                  className="card-search"
                  onClick={() => displayTrailer(item?.name || item?.title)}
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
          </>
        )}
      </div>
    </div>
  );
}
