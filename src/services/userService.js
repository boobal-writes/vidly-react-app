import http from "./httpService";
import config from "./../config.json";

const apiEndpoint = config.apiBaseUrlPath + "/users";

export async function registerUser(user) {
  return await http.post(apiEndpoint, user);
}
