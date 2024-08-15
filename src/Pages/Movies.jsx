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
import { Link } from "react-router-dom";

const MoviesList = () => {
  const [isloading, setIsLoading] = useState(false);

  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [toprated, setTopRated] = useState([]);
  const [Upcoming, setUpcoming] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [certifications, setCertifications] = useState({});

  const plugin = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: true,
      loop: true,
      stopOnLastSnap: false,
    })
  );

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // Fetching Datas
  useEffect(() => {
    async function fetchMovies() {
      try {
        // Fetch now playing movies
        const nowPlaying = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?language=en&region=IN&api_key=${API_KEY}`
        );

        // Fetch top rated movies
        const topRated = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?language=en&region=IN&api_key=${API_KEY}`
        );

        // Fetch upcoming movies
        const Upcoming = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?language=en&region=IN&api_key=${API_KEY}`
        );

        // Fetch Popular movies
        const popular = await fetch(
          `https://api.themoviedb.org/3/movie/popular?language=en&region=IN&api_key=${API_KEY}`
        );

        // Check if response is ok
        if (!nowPlaying.ok || !topRated.ok || !Upcoming.ok || !popular.ok) {
          throw new Error(`HTTP error! Status: ${nowPlaying.status}`);
        }

        const nowPlayingData = await nowPlaying.json();
        const topRatedData = await topRated.json();
        const upcomingData = await Upcoming.json();
        const popularData = await popular.json();

        setTopRated(topRatedData.results);
        setUpcoming(upcomingData.results);
        setNowPlaying(nowPlayingData.results);
        setPopular(popularData.results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    fetchMovies();
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

        setSearchResults(data.results);
        console.log(data);
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
    async function fetchCertifications() {
      try {
        const combinedItems = [
          ...nowPlaying,
          ...popular,
          ...toprated,
          ...Upcoming,
          ...searchResults,
        ];

        if (combinedItems.length === 0) {
          setCertifications({});
          return;
        }

        // Fetch movie release dates
        const movieRequests = combinedItems.map((item) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${item.id}/release_dates?api_key=${API_KEY}`
          ).then((response) => response.json())
        );

        const movieResponses = await Promise.all(movieRequests);

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

        setCertifications(movieCertifications);
      } catch (error) {
        console.error("Error fetching certifications:", error);
      }
    }
    fetchCertifications();
  }, [nowPlaying, popular, toprated, Upcoming, searchResults, API_KEY]);

  // Function to get certification based on item type and id
  const getCertification = (item) => {
    return certifications[item.id] || "Unrated";
  };

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

      {isloading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-10 h-10 border-4 border-white rounded-full animate-spin border-t-transparent" />
        </div>
      ) : (
        <>
          {query.length > 0 ? (
            searchResults.length === 0 ? (
              <div className="mt-5">
                <h1 className="text-white text-xl font-semibold">
                  No Results found
                </h1>
              </div>
            ) : (
              <div className="mt-5">
                <h1 className="text-white text-xl font-semibold">
                  Found {searchResults.length} result
                  {searchResults.length !== 1 ? "s" : ""} for &lsquo;{query}
                  &rsquo;
                </h1>

                <div className="mt-5 grid grid-cols-4 gap-8">
                  {searchResults.map((item, id) => (
                    <Link key={id} to={`${item.id}/details`}>
                      <RecommendedMovies
                        img={item.backdrop_path}
                        year={
                          item.release_date
                            ? new Date(item.release_date).getFullYear()
                            : "N/A"
                        }
                        icon={<MovieIcon />}
                        type={"Movie"}
                        adult={getCertification(item)}
                        title={item.title || item.original_title}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )
          ) : (
            <>
              {/* Now Playing */}
              <div className="mt-5">
                <h1 className="text-white text-xl font-semibold">
                  Now Playing
                </h1>

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
                        <Link to={`${item.id}/details`}>
                          <TrendingMovieCard
                            img={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                            year={
                              item.release_date
                                ? new Date(item.release_date).getFullYear()
                                : "N/A"
                            }
                            icon={<MovieIcon />}
                            type={"Movie"}
                            adult={getCertification(item)}
                            title={item.title || item.original_title}
                          />
                        </Link>
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
                >
                  <CarouselContent className="-ml-8 relative">
                    {popular.map((item, id) => (
                      <CarouselItem
                        key={id}
                        className="md:basis-1/3 lg:basis-1/4 pl-8"
                      >
                        <Link to={`${item.id}/details`}>
                          <RecommendedMovies
                            img={item.backdrop_path}
                            year={
                              item.release_date
                                ? new Date(item.release_date).getFullYear()
                                : "N/A"
                            }
                            icon={<MovieIcon />}
                            type={"Movie"}
                            adult={getCertification(item)}
                            title={item.title || item.original_title}
                          />
                        </Link>
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
                >
                  <CarouselContent className="-ml-8">
                    {toprated.map((item, id) => (
                      <CarouselItem
                        key={id}
                        className="md:basis-1/3 lg:basis-1/4 pl-8"
                      >
                        <Link to={`${item.id}/details`}>
                          <RecommendedMovies
                            img={item.backdrop_path}
                            year={
                              item.release_date
                                ? new Date(item.release_date).getFullYear()
                                : "N/A"
                            }
                            icon={<MovieIcon />}
                            type={"Movie"}
                            adult={getCertification(item)}
                            title={item.title || item.original_title}
                          />
                        </Link>
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
                >
                  <CarouselContent className="-ml-8">
                    {Upcoming.map((item, id) => (
                      <CarouselItem
                        key={id}
                        className="md:basis-1/3 lg:basis-1/4 pl-8"
                      >
                        <Link to={`${item.id}/details`}>
                          <RecommendedMovies
                            img={item.backdrop_path}
                            year={
                              item.release_date
                                ? new Date(item.release_date).getFullYear()
                                : "N/A"
                            }
                            icon={<MovieIcon />}
                            type={"Movie"}
                            adult={getCertification(item)}
                            title={item.title || item.original_title}
                          />
                        </Link>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-[-16px] top-[100px] bg-primary-col1 border-none text-white" />
                  <CarouselNext className="right-[-16px] top-[100px] bg-primary-col1 border-none text-white" />
                </Carousel>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MoviesList;
