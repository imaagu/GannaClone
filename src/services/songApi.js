import http from "./httpService";
import { apiUrl } from "../config.json";

/**
 * Get All Songs
 */
export async function getSongs() {
  try {
    let url = apiUrl + "/getsongs";
    const { data } = await http.get(url);
    return data;
  } catch (ex) {
    return [];
  }
}

/**
 * Get Song List
 */
export async function getSongList() {
  try {
    let url = apiUrl + "/getsonglist";
    const { data } = await http.get(url);
    return data;
  } catch (ex) {
    return [];
  }
}

/**
 * Get Like Song
 */
export async function likeSong(name, liked) {
  try {
    let url = apiUrl + "/likesong";
    const { data } = await http.post(url, { name, liked });
    return data;
  } catch (ex) {
    return [];
  }
}

/**
 * Add Songs
 */
export async function addNewSong(
  track,
  name,
  img,
  song,
  director,
  studio,
  year,
  likes,
  duration,
  top_carts,
  top_picks,
  trending,
  liked
) {
  try {
    let url = apiUrl + "/addnewsong";

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
      top_carts,
      top_picks,
      trending,
      liked,
    });

    return data;
  } catch (ex) {
    return [];
  }
}

/**
 * Edit Songs
 */
export async function editSong(
  prev,
  track,
  name,
  img,
  song,
  director,
  studio,
  year,
  likes,
  duration,
  top_carts,
  top_picks,
  trending,
  liked
) {
  let url = apiUrl + "/editsong";

  const { data } = await http.post(url, {
    prev,
    track,
    name,
    img,
    song,
    director,
    studio,
    year,
    likes,
    duration,
    top_carts,
    top_picks,
    trending,
    liked,
  });

  return data;
}

/**
 * Search Count
 */
export async function searchCount(search) {
  let url = apiUrl + "/searchSong";
  const { data } = await http.post(url, { search });
  return data;
}

/**
 * Play Count
 */
export async function playCount(name) {
  let url = apiUrl + "/playCount";
  const { data } = await http.post(url, { name });
  return data;
}

/**
 * Add Song Using CSV
 */
export async function addSongUsingCSV(file) {
  let url = apiUrl + "/addCSVintoSongs";
  const { data } = await http.post(url, { file });
  return data;
}

export default {
  getSongs,
  getSongList,
  likeSong,
  addNewSong,
  editSong,
  searchCount,
  playCount,
  addSongUsingCSV,
};
