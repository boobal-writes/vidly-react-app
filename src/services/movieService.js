import http from "./httpService";
import { getGenres } from "./genreService";
import config from "./../config.json";

export async function getMovies() {
  const { data: movies } = await http.get(config.apiEndpoint + "/movies");
  return movies;
}

export async function getMovie(id) {
  const { data: movie } = await http.get(config.apiEndpoint + "/movies/" + id);
  return movie;
}

export async function createMovie(movie) {
  const { data: moviReturned } = await http.post(
    config.apiEndpoint + "/movies",
    movie
  );
  return moviReturned;
}

export async function updateMovie(movie, movieId) {
  const { data: moviReturned } = await http.put(
    config.apiEndpoint + "/movies/" + movieId,
    movie
  );
  return moviReturned;
}

export async function deleteMovie(id) {
  await http.delete(config.apiEndpoint + "/movies/" + id);
}
