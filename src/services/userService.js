import http from "./httpService";

const apiEndpoint = "/users";

export async function registerUser(user) {
  return await http.post(apiEndpoint, user);
}
