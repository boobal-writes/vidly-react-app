import http from "./httpService";
import config from "./../config.json";
import { defaults } from "lodash";

export async function getGenres() {
  const { data: genres } = await http.get(config.apiBaseUrlPath + "/genres");
  return genres;
}
