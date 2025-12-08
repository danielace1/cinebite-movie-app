import { tmdbApi } from "./apiConfig";

const normalize = (items, type) =>
  items.map((item) => ({ ...item, media_type: item.media_type || type }));

export const getTrending = async () => {
  const { data } = await tmdbApi.get("/trending/all/day");
  // console.log("Trending", data);
  return normalize(data.results, null);
};

// Movies
export const getPopularMovies = async () => {
  const { data } = await tmdbApi.get("/movie/popular");
  return normalize(data.results, "movie");
};

export const getTopRatedMovies = async () => {
  const { data } = await tmdbApi.get("/movie/top_rated");
  return normalize(data.results, "movie");
};

export const getUpcomingMovies = async () => {
  const { data } = await tmdbApi.get("/movie/upcoming");
  return normalize(data.results, "movie");
};

// TV Shows
export const getPopularTV = async () => {
  const { data } = await tmdbApi.get("/tv/popular");
  return normalize(data.results, "tv");
};

export const getTopRatedTV = async () => {
  const { data } = await tmdbApi.get("/tv/top_rated");
  return normalize(data.results, "tv");
};

export const getAiringToday = async () => {
  const { data } = await tmdbApi.get("/tv/airing_today");
  return normalize(data.results, "tv");
};

// Certifications
export const getCertification = async (item) => {
  try {
    if (item.media_type === "movie") {
      const { data } = await tmdbApi.get(`/movie/${item.id}/release_dates`);
      const regions = ["IN", "US", "GB"];

      for (let region of regions) {
        const found = data.results.find((r) => r.iso_3166_1 === region);
        if (!found) continue;

        const cert = found.release_dates.find((c) => c.certification !== "");
        if (cert) return cert.certification;
      }

      return "NR"; // No rating
    }

    if (item.media_type === "tv") {
      const { data } = await tmdbApi.get(`/tv/${item.id}/content_ratings`);
      const regions = ["IN", "US", "GB"];

      for (let region of regions) {
        const ratingObj = data.results.find((r) => r.iso_3166_1 === region);
        if (ratingObj?.rating) return ratingObj.rating;
      }

      return "NR";
    }
  } catch (error) {
    return "NR";
  }
};

// Search Multi
export const searchMulti = async (query) => {
  if (!query.trim()) return [];

  const { data } = await tmdbApi.get(`/search/multi`, {
    params: { query },
  });

  return data.results.filter(
    (item) => item.media_type === "movie" || item.media_type === "tv"
  );
};
