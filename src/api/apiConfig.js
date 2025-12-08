import axios from "axios";

export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});
