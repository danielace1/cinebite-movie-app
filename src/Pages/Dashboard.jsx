// APi key 96941e4c3f214ae74c41fc04465d5392

import { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import TrendingMovieCard from "@/components/TrendingMovieCard";
import RecommendedMovies from "@/components/RecommendedMovies";
import MovieIcon from "@/components/Icons/MovieIcon";
import TVIcon from "@/components/Icons/TVShowIcon";

const Dashboard = () => {
  const [isloading, setIsLoading] = useState(true);

  const [trending, setTrending] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [movieId, setMovieId] = useState([]);
  const [seriesId, setSeriesId] = useState([]);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [certifications, setCertifications] = useState({
    movies: {},
    tvShows: {},
  });

  const plugin = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: true,
      loop: true,
      stopOnLastSnap: false,
    })
  );

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // Trending movies and series
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/all/day?language=en&region=IN&api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTrending(data.results);

        // Extract movie and series IDs
        const movies = data.results.filter(
          (item) => item.media_type === "movie"
        );
        const series = data.results.filter((item) => item.media_type === "tv");
        setMovieId(movies.map((movie) => movie.id));
        setSeriesId(series.map((series) => series.id));

        // console.log(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchTrending();
  }, [API_KEY]);

  // Recommendations
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Fetch movie recommendations
        const movieRequests = movieId.map((id) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en&region=IN&api_key=${API_KEY}`
          ).then((response) => response.json())
        );

        // Fetch series recommendations
        const seriesRequests = seriesId.map((id) =>
          fetch(
            `https://api.themoviedb.org/3/tv/${id}/recommendations?language=en&region=IN&api_key=${API_KEY}`
          ).then((response) => response.json())
        );

        const [movieResponses, seriesResponses] = await Promise.all([
          Promise.all(movieRequests),
          Promise.all(seriesRequests),
        ]);

        // Combine recommendations
        const combinedRecommendations = [
          ...movieResponses.flatMap((response) => response.results),
          ...seriesResponses.flatMap((response) => response.results),
        ];

        // Use a Set to store unique items by their ID
        const uniqueRecommendations = Array.from(
          new Map(
            combinedRecommendations.map((item) => [item.id, item])
          ).values()
        );

        setRecommended(uniqueRecommendations);
        // console.log(uniqueRecommendations);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    if (movieId.length > 0 || seriesId.length > 0) {
      fetchRecommendations();
    }
  }, [movieId, seriesId, API_KEY]);

  // Search results
  useEffect(() => {
    async function fetchSearchResults() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?query=${query}&language=en&region=IN&api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Process each result
        const processedResults = data.results.flatMap((item) => {
          const directResult =
            item.media_type === "movie" || item.media_type === "tv"
              ? item
              : null;

          const knownForResults =
            item.original_item && item.original_item.known_for
              ? item.original_item.known_for.map((knownItem) => ({
                  ...knownItem,
                  original_item: item.original_item,
                }))
              : [];

          return [directResult, ...knownForResults].filter(Boolean);
        });

        const filteredResults = processedResults.filter(
          (item) => item.media_type === "movie" || item.media_type === "tv"
        );

        setSearchResults(filteredResults);
        // console.log("Filtered Search Results:", filteredResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }

    if (query) {
      fetchSearchResults();
    }
  }, [API_KEY, query]);

  // Fetch certifications
  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const combinedItems = [...trending, ...recommended, ...searchResults];

        if (combinedItems.length === 0) return;

        // Fetch movie release dates
        const movieRequests = combinedItems
          .filter((item) => item.media_type === "movie")
          .map((item) =>
            fetch(
              `https://api.themoviedb.org/3/movie/${item.id}/release_dates?api_key=${API_KEY}`
            ).then((response) => response.json())
          );

        // Fetch TV show content ratings
        const tvShowRequests = combinedItems
          .filter((item) => item.media_type === "tv")
          .map((item) =>
            fetch(
              `https://api.themoviedb.org/3/tv/${item.id}/content_ratings?api_key=${API_KEY}`
            ).then((response) => response.json())
          );

        const [movieResponses, tvShowResponses] = await Promise.all([
          Promise.all(movieRequests),
          Promise.all(tvShowRequests),
        ]);

        // Process movie certifications
        const movieCertifications = movieResponses.reduce((acc, response) => {
          const id = response.id;
          const data =
            response.results.find((r) => r.iso_3166_1 === "IN") ||
            response.results.find((r) => r.iso_3166_1 === "US") ||
            response.results.find((r) => r.iso_3166_1 === "GB");

          if (data) {
            const certification = data.release_dates.find(
              (r) => r.certification.trim() !== ""
            );

            // Check if certification is empty but data is from "IN", then try other regions
            if (!certification && data.iso_3166_1 === "IN") {
              const fallbackData = [
                response.results.find((r) => r.iso_3166_1 === "US"),
                response.results.find((r) => r.iso_3166_1 === "GB"),
              ].find(
                (r) =>
                  r &&
                  r.release_dates.some((rd) => rd.certification.trim() !== "")
              );

              if (fallbackData) {
                const fallbackCertification = fallbackData.release_dates.find(
                  (r) => r.certification.trim() !== ""
                );
                acc[id] = fallbackCertification
                  ? fallbackCertification.certification
                  : "Unrated";
              } else {
                acc[id] = "Unrated";
              }
            } else {
              acc[id] = certification ? certification.certification : "Unrated";
            }
          } else {
            // console.log(
            //   `No data found for movie ID ${id}, setting as "Unrated"`
            // );
            acc[id] = "Unrated";
          }
          return acc;
        }, {});

        // Process TV show certifications
        const tvCertifications = tvShowResponses.reduce((acc, response) => {
          const id = response.id;
          const preferredData =
            response.results.find((r) => r.iso_3166_1 === "IN") ||
            response.results.find((r) => r.iso_3166_1 === "US") ||
            response.results.find((r) => r.iso_3166_1 === "GB");

          // If no preferred data, use the first available data
          const fallbackData = response.results[0];

          const data = preferredData || fallbackData;

          if (data) {
            const rating = data.rating.trim();

            // If rating is empty, check other regions
            if (!rating && data.iso_3166_1 === "IN") {
              const fallbackRating = [
                response.results.find((r) => r.iso_3166_1 === "US"),
                response.results.find((r) => r.iso_3166_1 === "GB"),
              ].find((r) => r && r.rating.trim() !== "");

              acc[id] = fallbackRating ? fallbackRating.rating : "Unrated";
            } else {
              acc[id] = rating ? rating : "Unrated";
            }
          } else {
            console.log(
              `No data found for TV show ID ${id}, setting as "Unrated"`
            );
            acc[id] = "Unrated";
          }

          return acc;
        }, {});

        setCertifications({
          movies: movieCertifications,
          tvShows: tvCertifications,
        });

        // console.log("Movie Certifications:", movieCertifications);
        // console.log("TV Ratings:", tvShowRatings);
      } catch (error) {
        console.error("Error fetching certifications:", error);
      }
    };

    fetchCertifications();
  }, [trending, recommended, searchResults, API_KEY]);

  // Function to get certification
  const getCertification = (item) => {
    if (item.media_type === "tv") {
      return certifications.tvShows[item.id] || "Unrated";
    }
    if (item.media_type === "movie") {
      return certifications.movies[item.id] || "Unrated";
    }
    return "Unrated";
  };

  return (
    <div className="mt-2.5 mx-5 w-full">
      {/* Search bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search for movies or TV series"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="outline-none w-full px-12 py-2.5 bg-transparent text-white rounded-lg focus:border focus:border-slate-700"
        />
        <div className="absolute top-2.5 left-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            className="fill-current text-white"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"
            />
          </svg>
        </div>
      </div>

      {searchResults.length === 0 ? (
        query.length > 0 ? (
          <div className="mt-5">
            <h1 className="text-white text-xl font-semibold">
              No Results found
            </h1>
          </div>
        ) : (
          <>
            {/* Trending Carousel */}
            <div className="mt-5">
              <h1 className="text-white text-xl font-semibold">Trending</h1>

              <Carousel
                className="mt-5"
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
              >
                <CarouselContent className="-ml-8">
                  {trending.map((item, id) => (
                    <CarouselItem
                      key={id}
                      className="md:basis-1/2 lg:basis-1/3 pl-8"
                    >
                      <TrendingMovieCard
                        img={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                        year={
                          item.release_date || item.first_air_date
                            ? new Date(item.release_date).getFullYear() ||
                              new Date(item.first_air_date).getFullYear()
                            : "N/A"
                        }
                        icon={
                          item.media_type === "movie" ? (
                            <MovieIcon />
                          ) : (
                            <TVIcon />
                          )
                        }
                        type={
                          item.media_type === "movie" ? "Movie" : "TV Series"
                        }
                        adult={getCertification(item)}
                        title={item.title || item.name || item.original_title}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-[-16px] bg-primary-col1 border-none text-white" />
                <CarouselNext className="right-[-16px] bg-primary-col1 border-none text-white" />
              </Carousel>
            </div>

            {/* Recommendations */}
            <div className="mt-10">
              <h1 className="text-white text-xl font-semibold">
                Recommended for you
              </h1>

              <div className="mt-5 grid grid-cols-4 gap-8">
                {recommended.map((item, id) => (
                  <RecommendedMovies
                    key={id}
                    img={item.backdrop_path}
                    year={
                      item.release_date || item.first_air_date
                        ? new Date(item.release_date).getFullYear() ||
                          new Date(item.first_air_date).getFullYear()
                        : "N/A"
                    }
                    icon={
                      item.media_type === "movie" ? <MovieIcon /> : <TVIcon />
                    }
                    type={item.media_type === "movie" ? "Movie" : "TV Series"}
                    adult={getCertification(item)}
                    title={item.title || item.name || item.original_title}
                  />
                ))}
              </div>
            </div>
          </>
        )
      ) : (
        // Search results
        <div className="mt-5">
          <h1 className="text-white text-xl font-semibold">
            Found {searchResults.length} result
            {searchResults.length !== 1 ? "s" : ""} for &lsquo;{query}&rsquo;
          </h1>

          <div className="mt-5 grid grid-cols-4 gap-8">
            {searchResults.map((item, id) => (
              <RecommendedMovies
                key={id}
                img={item.backdrop_path}
                year={
                  item.release_date || item.first_air_date
                    ? new Date(item.release_date).getFullYear() ||
                      new Date(item.first_air_date).getFullYear()
                    : "N/A"
                }
                icon={item.media_type === "movie" ? <MovieIcon /> : <TVIcon />}
                type={item.media_type === "movie" ? "Movie" : "TV Series"}
                adult={getCertification(item)}
                title={item.title || item.name || item.original_title}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
