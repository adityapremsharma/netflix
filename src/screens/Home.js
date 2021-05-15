import React, { useState, useContext, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import Banner from "../components/home/Banner";
import HorizontalScrollableList from "../components/common/HorizontalScrollableList";
import { Context as ApiContext } from "../context/apiProvider";
import { Context as StreamContext } from "../context/streamProvider";
import { Context as StylesContext } from "../context/stylesProvider";
import VerticalScrollableList from "../components/common/VerticalScrollableList";
import NoInternet from "../components/common/NoInternet";

export default function Home() {
  const [searchData, setSearchData] = useState([]);
  const [searchHeading, setSearchHeading] = useState("");

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
    setSearchInput,
  } = useContext(StreamContext);

  const {
    state: { exploreAllDisplay },
    setExploreAllDisplay,
  } = useContext(StylesContext);

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
    setSearchHeading("");
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

  const getExploreAllData = (data, title) => {
    window.scrollTo(0, 0);

    setSearchHeading(title);
    setSearchData(data);
    setExploreAllDisplay(true);
  };

  const goBack = () => {
    setExploreAllDisplay(false);
    setSearchInput("");
  };

  return (
    <div>
      <Navbar />
      <Banner />
      <NoInternet />
      <div
        className={
          !searchInput && !exploreAllDisplay
            ? "list-lift-up"
            : "list-lift-up list-lift-up-search"
        }
      >
        {!searchInput && !exploreAllDisplay ? (
          <>
            <HorizontalScrollableList
              title="Trending Now"
              data={trending}
              onClick={getExploreAllData}
              verticalCard
            />
            <HorizontalScrollableList
              title="Netflix Originals"
              data={netflixOriginals}
              onClick={getExploreAllData}
              verticalCard
            />
            <HorizontalScrollableList
              title="Top Rated"
              data={topRated}
              onClick={getExploreAllData}
              verticalCard
            />
            <HorizontalScrollableList
              title="Action"
              data={actionMovies}
              onClick={getExploreAllData}
              verticalCard
            />
            <HorizontalScrollableList
              title="Comedy"
              data={comedyMovies}
              onClick={getExploreAllData}
              verticalCard
            />
            <HorizontalScrollableList
              title="Horror"
              data={horrorMovies}
              onClick={getExploreAllData}
              verticalCard
            />
            <HorizontalScrollableList
              title="Romance"
              data={romanceMovies}
              onClick={getExploreAllData}
              verticalCard
            />
            <HorizontalScrollableList
              title="Documentaries"
              data={documentaries}
              onClick={getExploreAllData}
              verticalCard
            />
          </>
        ) : (
          <VerticalScrollableList
            goBack={goBack}
            searchHeading={searchHeading}
            searchData={searchData}
            searchInput={searchInput}
          />
        )}
      </div>
    </div>
  );
}
