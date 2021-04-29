import createDataContext from "./createDataContext";
import tmdb, { paths, pathParams } from "../api/tmdb";

const apiReducer = (state, action) => {
  switch (action.type) {
    case "TRENDING":
      return {
        ...state,
        trending: action.payload,
        banner:
          action.payload[Math.floor(Math.random() * action.payload.length)],
      };
    case "NETFLIX_ORIGINALS":
      return { ...state, netflixOriginals: action.payload };
    case "TOP_RATED":
      return { ...state, topRated: action.payload };
    case "ACTION_MOVIES":
      return { ...state, actionMovies: action.payload };
    case "COMEDY_MOVIES":
      return { ...state, comedyMovies: action.payload };
    case "HORROR_MOVIES":
      return { ...state, horrorMovies: action.payload };
    case "ROMANCE_MOVIES":
      return { ...state, romanceMovies: action.payload };
    case "DOCUMENTARIES":
      return { ...state, documentaries: action.payload };
    default:
      return state;
  }
};

const fetchTrending = (dispatch) => {
  return () => {
    tmdb
      .get(paths.fetchTrending, {
        params: {
          language: pathParams.trendingParams,
        },
      })
      .then((res) => {
        dispatch({ type: "TRENDING", payload: res.data.results });
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

const fetchNetflixOriginals = (dispatch) => {
  return () => {
    tmdb
      .get(paths.fetchNetflixOriginals, {
        params: {
          with_networks: pathParams.netflixOriginalsParams,
        },
      })
      .then((res) => {
        dispatch({ type: "NETFLIX_ORIGINALS", payload: res.data.results });
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

const fetchTopRated = (dispatch) => {
  return () => {
    tmdb
      .get(paths.fetchTopRated, {
        params: {
          language: pathParams.topRatedParams,
        },
      })
      .then((res) => {
        dispatch({ type: "TOP_RATED", payload: res.data.results });
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

const fetchActionMovies = (dispatch) => {
  return () => {
    tmdb
      .get(paths.fetchActionMovies, {
        params: {
          with_genres: pathParams.actionMoviesParams,
        },
      })
      .then((res) => {
        dispatch({ type: "ACTION_MOVIES", payload: res.data.results });
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

const fetchComedyMovies = (dispatch) => {
  return () => {
    tmdb
      .get(paths.fetchComedyMovies, {
        params: {
          with_genres: pathParams.comedyMoviesParams,
        },
      })
      .then((res) => {
        dispatch({ type: "COMEDY_MOVIES", payload: res.data.results });
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

const fetchHorrorMovies = (dispatch) => {
  return () => {
    tmdb
      .get(paths.fetchHorrorMovies, {
        params: {
          with_genres: pathParams.horrorMoviesParams,
        },
      })
      .then((res) => {
        dispatch({ type: "HORROR_MOVIES", payload: res.data.results });
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

const fetchRomanceMovies = (dispatch) => {
  return () => {
    tmdb
      .get(paths.fetchRomanceMovies, {
        params: {
          with_genres: pathParams.romanceMoviesParams,
        },
      })
      .then((res) => {
        dispatch({ type: "ROMANCE_MOVIES", payload: res.data.results });
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

const fetchDocumentaries = (dispatch) => {
  return () => {
    tmdb
      .get(paths.fetchDocumentaries, {
        params: {
          with_genres: pathParams.documentariesParams,
        },
      })
      .then((res) => {
        dispatch({ type: "DOCUMENTARIES", payload: res.data.results });
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const { Context, Provider } = createDataContext(
  apiReducer,
  {
    fetchTrending,
    fetchNetflixOriginals,
    fetchTopRated,
    fetchActionMovies,
    fetchComedyMovies,
    fetchHorrorMovies,
    fetchRomanceMovies,
    fetchDocumentaries,
  },
  {
    trending: [],
    netflixOriginals: [],
    topRated: [],
    actionMovies: [],
    comedyMovies: [],
    horrorMovies: [],
    romanceMovies: [],
    documentaries: [],
    banner: null,
  }
);
