import http from "./httpService";
import { getGenres } from "./genreService";
import config from "./../config.json";

const apiEndpoint = config.apiBaseUrlPath + "/movies";

const getMovieUrl = (movieId) => {
  return apiEndpoint + "/" + movieId;
};

export async function getMovies() {
  const { data: movies } = await http.get(apiEndpoint);
  return movies;
}

export async function getMovie(id) {
  const { data: movie } = await http.get(getMovieUrl(id));
  return movie;
}

export async function createMovie(movie) {
  const { data: moviReturned } = await http.post(apiEndpoint, movie);
  return moviReturned;
}

export async function updateMovie(movie, movieId) {
  const { data: moviReturned } = await http.put(getMovieUrl(movieId), movie);
  return moviReturned;
}

export async function deleteMovie(id) {
  await http.delete(getMovieUrl(id));
}
