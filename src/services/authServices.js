import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";

/**
 * Login
 */
export async function login(email, password) {
  try {
    let url = apiUrl + "/login";
    const { data } = await http.post(url, {
      email,
      password,
    });
    localStorage.setItem("token", data);

    return await data;
  } catch (ex) {
    return null;
  }
}

/**
 * Sign Up
 */
export async function register(dob, age, email, name, mobile, password) {
  let url = apiUrl + "/signup";
  const { data } = await http.post(url, {
    dob,
    age,
    email,
    name,
    mobile,
    password,
  });
  return data;
}

/**
 * Get User Song List
 */
export async function getPlaylist(email) {
  let url = apiUrl + "/getUserlist";
  const { data } = await http.post(url, {
    email,
  });
  return data;
}

/**
 * Get Queue
 */
export async function getqueue() {
  let url = apiUrl + "/getqueue";
  const { data } = await http.get(url);
  return data;
}

/**
 * Add to User List
 */
export async function addintoPlaylist(
  email,
  listname,
  track,
  name,
  img,
  song,
  director,
  studio,
  year,
  likes,
  duration
) {
  let url = apiUrl + "/addtoUserlist";

  const { data } = await http.post(url, {
    email,
    listname,
    track,
    name,
    img,
    song,
    director,
    studio,
    year,
    likes,
    duration,
  });
  return data;
}

/**
 * Add Song to Queue
 */
export async function addintoQueue(
  track,
  name,
  img,
  song,
  director,
  studio,
  year,
  likes,
  duration
) {
  let url = apiUrl + "/addintoQueue";

  const { data } = await http.post(url, {
    track,
    name,
    img,
    song,
    director,
    studio,
    year,
    likes,
    duration,
  });
  return data;
}

/**
 * Logout
 */
export function logout() {
  localStorage.removeItem("token");
}

/**
 * Get Current User
 */
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    let details = jwtDecode(jwt);

    return details.user;
  } catch (ex) {
    return null;
  }
}

/**
 * Get Current User
 */
export async function getUsers() {
  let url = apiUrl + "/getalluser";
  const { data } = await http.get(url);
  return data;
}

/**
 * Remove Like
 */
export async function removelike() {
  let url = apiUrl + "/removelike";
  const { data } = await http.get(url);
  return data;
}

/*
 * Convert User List into CSV
 */
export async function convertToCSV(name, user) {
  let url = apiUrl + "/convertCSV";
  const { data } = await http.post(url, { name, user });
  return data;
}

export async function convertAllToCSV() {
  let url = apiUrl + "/convertAllCSV";
  const { data } = await http.get(url);
  return data;
}

export default {
  register,
  login,
  logout,
  getCurrentUser,
  getPlaylist,
  addintoPlaylist,
  addintoQueue,
  getqueue,
  getUsers,
  convertToCSV,
  removelike,
  convertAllToCSV,
};
