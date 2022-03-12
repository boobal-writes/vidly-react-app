import http from "./httpService";
import config from "./../config.json";
const apiEndpoint = config.apiBaseUrlPath + "/auth";

export function login(email, password) {
  return http.post(apiEndpoint, { email, password });
}
