import React, { useContext, useEffect } from "react";
import Banner from "../components/home/Banner";
import List from "../components/home/List";

import { Context as ApiContext } from "../context/apiProvider";

export default function Home() {
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
    },
    fetchTrending,
    fetchNetflixOriginals,
    fetchTopRated,
    fetchActionMovies,
    fetchComedyMovies,
    fetchHorrorMovies,
    fetchRomanceMovies,
    fetchDocumentaries,
  } = useContext(ApiContext);

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

  //   console.log(horrorMovies);
  return (
    <div>
      <Banner />
      <div className="list-lift-up">
        <List title="Trending Now" data={trending} verticalCard />
        <List title="Netflix Originals" data={netflixOriginals} verticalCard />
        <List title="Top Rated" data={topRated} />
        <List title="Action" data={actionMovies} />
        <List title="Comedy" data={comedyMovies} />
        <List title="Horror" data={horrorMovies} />
        <List title="Romance" data={romanceMovies} />
        <List title="Documentaries" data={documentaries} />
      </div>
    </div>
  );
}
