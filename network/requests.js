import { API_BASE_URL } from "./utils";

async function getAnimes() {
  let req = await fetch(`${API_BASE_URL}/anime/gogoanime/top-airing`);

  let res = await req.json();
  return res;
}

async function getAnimeGenres() {
  let req = await fetch(`${API_BASE_URL}/genres/anime`);

  let res = await req.json();
  return res;
}

async function getSingleAnime(animeId) {
  let req = await fetch(`${API_BASE_URL}/anime/gogoanime/info/${animeId}`);

  let res = await req.json();
  return res;
}

async function getRandomAnime() {
  let req = await fetch(`${API_BASE_URL}/anime/gogoanime/random`);

  let res = await req.json();
  return res;
}

async function getAnimeCharacters(animeId) {
  let req = await fetch(`${API_BASE_URL}/anime/gogoanime/characters/${animeId}`);

  let res = await req.json();
  return res;
}
async function getSingleCharacter(characterId) {
  let req = await fetch(`${API_BASE_URL}/characters/${characterId}`);

  let res = await req.json();
  return res;
}

async function searchAnimes(searchTerm) {
  let req = await fetch(`${API_BASE_URL}/anime/gogoanime/${encodeURIComponent(searchTerm)}`);

  let res = await req.json();
  return res;
}

async function searchCharacters(searchTerm) {
  let req = await fetch(`${API_BASE_URL}/characters?q=${searchTerm}`);

  let res = await req.json();
  return res;
}

async function getTopAnimes() {
  let req = await fetch(`${API_BASE_URL}/anime/gogoanime/top-airing`);

  let res = await req.json();
  return res;
}

async function getAnimeRecommendations() {
  let req = await fetch(`${API_BASE_URL}/recommendations/anime`);

  let res = await req.json();
  return res;
}

async function getRecommendationsForAnime(animeId) {
  let req = await fetch(`${API_BASE_URL}/anime/gogoanime/recommendations/${animeId}`);

  let res = await req.json();
  return res;
}

async function getAnimeReviews(animeId) {
  let req = await fetch(`${API_BASE_URL}/anime/gogoanime/reviews/${animeId}`);

  let res = await req.json();
  return res;
}

const fetcher = (...args) => fetch(...args).then(res => res.json());

export {
  getAnimes,
  getRandomAnime,
  getAnimeCharacters,
  getRecommendationsForAnime,
  getAnimeGenres,
  getSingleAnime,
  getSingleCharacter,
  searchAnimes,
  searchCharacters,
  getTopAnimes,
  getAnimeRecommendations,
  getAnimeReviews,
  fetcher,
};

