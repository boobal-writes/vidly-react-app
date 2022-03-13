import http from "./httpService";
import jwtDecode from "jwt-decode";
const apiEndpoint = "/auth";

const tokenKey = "jwt";

http.setAuthToken(getAuthToken());

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

function getAuthToken() {
  return localStorage.getItem(tokenKey);
}

const auth = {
  login,
  logout,
  getCurrentUser,
  loginWithJwtToken,
  getAuthToken,
};

export default auth;
