import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import TrendingMovieCard from "@/components/TrendingMovieCard";
import RecommendedMovies from "@/components/RecommendedMovies";
import MovieIcon from "@/components/Icons/MovieIcon";

const MoviesList = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [toprated, setTopRated] = useState([]);
  const [Upcoming, setUpcoming] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
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

  // Now Playing
  useEffect(() => {
    async function fetchNowPlayingMovies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?language=en&region=IN&api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setNowPlaying(data.results);
        console.log(data);
        console.log(data.results);
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
      }
    }
    fetchNowPlayingMovies();
  }, [API_KEY]);

  // Popular
  useEffect(() => {
    async function fetchPopularMovies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?language=en&region=IN&api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setPopular(data.results);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    }
    fetchPopularMovies();
  }, [API_KEY]);

  // Top rated
  useEffect(() => {
    async function fetchTopRatedMovies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?language=en&region=IN&api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTopRated(data.results);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      }
    }
    fetchTopRatedMovies();
  });

  // Upcoming
  useEffect(() => {
    async function fetchUpcomingMovies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?language=en&region=IN&api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUpcoming(data.results);
        console.log(data);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    }
    fetchUpcomingMovies();
  }, [API_KEY]);

  // Search results
  useEffect(() => {
    async function fetchSearchResults() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${query}&language=en&region=IN&api_key=${API_KEY}`
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

  return (
    <div className="mt-2.5 mx-5 w-full">
      {/* Search bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search for movies"
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
            {/* Now Playing */}
            <div className="mt-5">
              <h1 className="text-white text-xl font-semibold">Now Playing</h1>

              <Carousel
                className="mt-5"
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
              >
                <CarouselContent className="-ml-8">
                  {nowPlaying.map((item, id) => (
                    <CarouselItem
                      key={id}
                      className="md:basis-1/3 lg:basis-1/5 pl-8"
                    >
                      <TrendingMovieCard
                        img={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                        year={
                          item.release_date
                            ? new Date(item.release_date).getFullYear()
                            : "N/A"
                        }
                        icon={<MovieIcon />}
                        type={"Movie"}
                        adult={item.adult}
                        title={item.title || item.original_title}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-[-16px] bg-primary-col1 border-none text-white" />
                <CarouselNext className="right-[-16px] bg-primary-col1 border-none text-white" />
              </Carousel>
            </div>

            {/* Popular */}
            <div className="mt-5">
              <h1 className="text-white text-xl font-semibold">Popular</h1>

              <Carousel
                className="mt-5 grid"
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                infinite
              >
                <CarouselContent className="-ml-8">
                  {popular.map((item, id) => (
                    <CarouselItem
                      key={id}
                      className="md:basis-1/3 lg:basis-1/4 pl-8"
                    >
                      <RecommendedMovies
                        img={item.backdrop_path}
                        year={
                          item.release_date
                            ? new Date(item.release_date).getFullYear()
                            : "N/A"
                        }
                        icon={<MovieIcon />}
                        type={"Movie"}
                        adult={item.adult}
                        title={item.title || item.original_title}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-[-16px] top-[100px] bg-primary-col1 border-none text-white" />
                <CarouselNext className="right-[-16px] top-[100px] bg-primary-col1 border-none text-white" />
              </Carousel>
            </div>

            {/* Top rated */}
            <div className="mt-3">
              <h1 className="text-white text-xl font-semibold">Top Rated</h1>

              <Carousel
                className="mt-5 grid"
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                infinite
              >
                <CarouselContent className="-ml-8">
                  {toprated.map((item, id) => (
                    <CarouselItem
                      key={id}
                      className="md:basis-1/3 lg:basis-1/4 pl-8"
                    >
                      <RecommendedMovies
                        img={item.backdrop_path}
                        year={
                          item.release_date
                            ? new Date(item.release_date).getFullYear()
                            : "N/A"
                        }
                        icon={<MovieIcon />}
                        type={"Movie"}
                        adult={item.adult}
                        title={item.title || item.original_title}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-[-16px] top-[100px] bg-primary-col1 border-none text-white" />
                <CarouselNext className="right-[-16px] top-[100px] bg-primary-col1 border-none text-white" />
              </Carousel>
            </div>

            {/* Upcoming */}
            <div className="mt-3">
              <h1 className="text-white text-xl font-semibold">Upcoming</h1>

              <Carousel
                className="mt-5 grid"
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                infinite
              >
                <CarouselContent className="-ml-8">
                  {Upcoming.map((item, id) => (
                    <CarouselItem
                      key={id}
                      className="md:basis-1/3 lg:basis-1/4 pl-8"
                    >
                      <RecommendedMovies
                        img={item.backdrop_path}
                        year={
                          item.release_date
                            ? new Date(item.release_date).getFullYear()
                            : "N/A"
                        }
                        icon={<MovieIcon />}
                        type={"Movie"}
                        adult={item.adult}
                        title={item.title || item.original_title}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-[-16px] top-[100px] bg-primary-col1 border-none text-white" />
                <CarouselNext className="right-[-16px] top-[100px] bg-primary-col1 border-none text-white" />
              </Carousel>
            </div>
          </>
        )
      ) : (
        // Search results
        <div className="mt-5">
          <h1 className="text-white text-xl font-semibold">Search Results</h1>

          <div className="mt-5 grid grid-cols-4 gap-8">
            {searchResults.map((item, id) => (
              <RecommendedMovies
                key={id}
                img={item.backdrop_path}
                year={
                  item.release_date
                    ? new Date(item.release_date).getFullYear()
                    : "N/A"
                }
                icon={<MovieIcon />}
                type={"Movie"}
                adult={item.adult}
                title={item.title || item.original_title}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviesList;
