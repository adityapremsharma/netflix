import axios from "axios";

const APIKEY = "82e9634f64c867f4dc0c13bd02f37a5b";

export const paths = {
  fetchTrending: "/trending/all/week",
  fetchNetflixOriginals: "/discover/tv",
  fetchTopRated: "/movie/top_rated",
  fetchActionMovies: "/discover/movie",
  fetchComedyMovies: "/discover/movie",
  fetchHorrorMovies: "/discover/movie",
  fetchRomanceMovies: "/discover/movie",
  fetchDocumentaries: "/discover/movie",
};

export const pathParams = {
  trendingParams: "en-US",
  netflixOriginalsParams: "213",
  topRatedParams: "en-US",
  actionMoviesParams: "28",
  comedyMoviesParams: "35",
  horrorMoviesParams: "27",
  romanceMoviesParams: "10749",
  documentariesParams: "99",
};

export default axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: APIKEY,
  },
});
