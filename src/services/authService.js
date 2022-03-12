import http from "./httpService";
import config from "./../config.json";
import jwtDecode from "jwt-decode";
const apiEndpoint = config.apiBaseUrlPath + "/auth";

const tokenKey = "jwt";

async function login(email, password) {
  const { data: token } = await http.post(apiEndpoint, { email, password });
  loginWithJwtToken(token);
}

function loginWithJwtToken(token) {
  localStorage.setItem(tokenKey, token);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function getCurrentUser() {
  try {
    const token = localStorage.getItem(tokenKey);
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}

const auth = {
  login,
  logout,
  getCurrentUser,
  loginWithJwtToken,
};

export default auth;
