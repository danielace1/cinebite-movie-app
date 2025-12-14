import { tmdbApi } from "./apiConfig";

const normalize = (items, type) =>
  items.map((item) => ({ ...item, media_type: item.media_type || type }));

export const getTrending = async () => {
  const { data } = await tmdbApi.get("/trending/all/day");
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

export const getNowPlayingMovies = async () => {
  const { data } = await tmdbApi.get("/movie/now_playing", {
    params: { region: "IN" },
  });
  return normalize(data.results, "movie");
};

export const searchMovies = async (query) => {
  if (!query.trim()) return [];
  const { data } = await tmdbApi.get("/search/movie", {
    params: { query, region: "IN" },
  });
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

export const getOnTheAirTV = async () => {
  const { data } = await tmdbApi.get("/tv/on_the_air", {
    params: { region: "IN" },
  });

  return normalize(data.results, "tv");
};

export const searchTVShows = async (query) => {
  if (!query.trim()) return [];
  const { data } = await tmdbApi.get("/search/tv", {
    params: { query, region: "IN" },
  });
  return normalize(data.results, "tv");
};

// Certifications
export const getCertification = async (item) => {
  try {
    if (item.media_type === "movie") {
      const { data } = await tmdbApi.get(`/movie/${item.id}/release_dates`);

      // major regions certifications
      const regions = ["IN", "US", "GB"];

      for (let region of regions) {
        const found = data.results.find((r) => r.iso_3166_1 === region);
        if (!found) continue;

        const cert = found.release_dates.find((c) => c.certification !== "");
        if (cert) return cert.certification;
      }

      return "NR";
    }

    if (item.media_type === "tv") {
      const { data } = await tmdbApi.get(`/tv/${item.id}/content_ratings`);

      // major regions certifications
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

// Movie Details
export const getMovieDetails = async (id) => {
  const { data } = await tmdbApi.get(`/movie/${id}`, {
    params: {
      append_to_response:
        "credits,videos,images,reviews,recommendations,release_dates,watch/providers",
    },
  });

  const trailer =
    data.videos.results.find(
      (v) =>
        (v.name.includes("Final Trailer") ||
          v.name.includes("Official Trailer")) &&
        v.type === "Trailer"
    ) ||
    data.videos.results.find((v) => v.type === "Trailer") ||
    null;

  const watchProviders = data["watch/providers"]?.results?.IN || null;

  const cert = await getCertification({
    id: data.id,
    media_type: "movie",
  });

  const percentage = Math.round((data.vote_average / 10) * 100);

  const runtimeText = (() => {
    if (!data.runtime) return null;
    const h = Math.floor(data.runtime / 60);
    const m = data.runtime % 60;
    return `${h}h ${m}m`;
  })();

  const backdrops = data.images.backdrops.slice(0, 20);
  const posters = data.images.posters.slice(0, 20);

  return {
    details: data,
    trailer,
    watchProviders,
    cert,
    credits: data.credits.cast,
    reviews: data.reviews.results,
    videos: data.videos.results,
    backdrops,
    posters,
    recommendations: data.recommendations.results,
    percentage,
    runtimeText,
  };
};

// TV Details
export const getTVDetails = async (id) => {
  const { data } = await tmdbApi.get(`/tv/${id}`, {
    params: {
      append_to_response:
        "credits,videos,images,reviews,recommendations,content_ratings,watch/providers",
    },
  });

  const trailer =
    data.videos.results.find(
      (v) =>
        (v.name.includes("Official Trailer") ||
          v.name.includes("Final Trailer")) &&
        v.type === "Trailer"
    ) ||
    data.videos.results.find((v) => v.type === "Trailer") ||
    null;

  const watchProviders = data["watch/providers"]?.results?.IN || null;

  const cert = await getCertification({
    id: data.id,
    media_type: "tv",
  });

  const percentage = Math.round((data.vote_average / 10) * 100);

  const runtimeText = (() => {
    const runtime = data.episode_run_time?.[0];
    if (!runtime) return null;

    const h = Math.floor(runtime / 60);
    const m = runtime % 60;
    return h ? `${h}h ${m}m` : `${m}m`;
  })();

  const backdrops = data.images.backdrops.slice(0, 20);
  const posters = data.images.posters.slice(0, 20);

  return {
    details: data,
    trailer,
    watchProviders,
    cert,
    credits: data.credits.cast,
    reviews: data.reviews.results,
    videos: data.videos.results,
    backdrops,
    posters,
    recommendations: data.recommendations.results,
    percentage,
    runtimeText,
  };
};
