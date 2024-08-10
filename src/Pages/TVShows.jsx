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
import TVIcon from "@/components/Icons/TVShowIcon";

const TVShows = () => {
  const [airing, setAiring] = useState([]);
  const [ontheAir, setOntheAir] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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

  // Airing today
  useEffect(() => {
    async function fetchAiringToday() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/airing_today?language=en&region=IN&api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAiring(data.results);
        console.log("Airing Today :", data);
      } catch (error) {
        console.error("Error fetching airing today TV shows:", error);
      }
    }
    fetchAiringToday();
  }, [API_KEY]);

  // On the air
  useEffect(() => {
    async function fetchOnTheAir() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/on_the_air?language=en&region=IN&api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setOntheAir(data.results);
        console.log(data);
      } catch (error) {
        console.error("Error fetching on the air TV shows:", error);
      }
    }
    fetchOnTheAir();
  }, [API_KEY]);

  // Popular TV shows
  useEffect(() => {
    async function fetchPopularMovies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/tv?language=en&sort_by=popularity.desc&region=IN&page=1&api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPopular(data.results);
        console.log(data);
      } catch (error) {
        console.error("Error fetching popular TV shows:", error);
      }
    }
    fetchPopularMovies();
  }, [API_KEY]);

  // Top rated TV shows
  useEffect(() => {
    async function fetchTopRatedMovies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/top_rated?language=en&region=IN&api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTopRated(data.results);
        console.log(data);
      } catch (error) {
        console.error("Error fetching top rated TV shows:", error);
      }
    }
    fetchTopRatedMovies();
  }, [API_KEY]);

  // Search results
  useEffect(() => {
    async function fetchSearchResults() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/tv?query=${query}&language=en&region=IN&api_key=${API_KEY}`
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
          ...airing,
          ...ontheAir,
          ...popular,
          ...topRated,
          ...searchResults,
        ];

        if (combinedItems.length === 0) {
          setCertifications({});
          return;
        }

        const tvRequests = combinedItems.map((item) =>
          fetch(
            `https://api.themoviedb.org/3/tv/${item.id}/content_ratings?api_key=${API_KEY}`
          ).then((response) => response.json())
        );

        const tvResponses = await Promise.all(tvRequests);

        // Process TV show certifications
        const tvCertifications = tvResponses.reduce((acc, response) => {
          const id = response.id;
          const indiaRelease = response.results.find(
            (r) => r.iso_3166_1 === "IN"
          );

          if (indiaRelease) {
            const rating = indiaRelease.rating.trim();
            acc[id] = rating ? rating : "Unrated";
          } else {
            acc[id] = "Unrated";
          }

          return acc;
        }, {});

        setCertifications(tvCertifications);
        console.log(certifications);
      } catch (error) {
        console.error("Error fetching certifications:", error);
      }
    }
    fetchCertifications();
  }, [airing, ontheAir, popular, topRated, searchResults, API_KEY]);

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
          placeholder="Search for TV Shows"
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
            {/* Airing Today */}
            <div className="mt-5">
              <h1 className="text-white text-xl font-semibold">Airing Today</h1>

              <Carousel
                className="mt-5"
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
              >
                <CarouselContent className="-ml-8">
                  {airing.map((item, id) => (
                    <CarouselItem
                      key={id}
                      className="md:basis-1/3 lg:basis-1/5 pl-8"
                    >
                      <TrendingMovieCard
                        img={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                        year={
                          item.first_air_date
                            ? new Date(item.first_air_date).getFullYear()
                            : "N/A"
                        }
                        icon={<TVIcon />}
                        type={"Movie"}
                        adult={getCertification(item)}
                        title={item.name || item.original_name}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-[-16px] bg-primary-col1 border-none text-white" />
                <CarouselNext className="right-[-16px] bg-primary-col1 border-none text-white" />
              </Carousel>
            </div>

            {/* On the Air */}
            <div className="mt-5">
              <h1 className="text-white text-xl font-semibold">On the Air</h1>

              <Carousel
                className="mt-5 grid"
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
              >
                <CarouselContent className="-ml-8 relative">
                  {ontheAir.map((item, id) => (
                    <CarouselItem
                      key={id}
                      className="md:basis-1/3 lg:basis-1/4 pl-8"
                    >
                      <RecommendedMovies
                        img={item.backdrop_path}
                        year={
                          item.first_air_date
                            ? new Date(item.first_air_date).getFullYear()
                            : "N/A"
                        }
                        icon={<TVIcon />}
                        type={"Movie"}
                        adult={getCertification(item)}
                        title={item.name || item.original_name}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-[-16px] top-[100px] bg-primary-col1 border-none text-white" />
                <CarouselNext className="right-[-16px]  top-[100px] bg-primary-col1 border-none text-white" />
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
                <CarouselContent className="-ml-8">
                  {popular.map((item, id) => (
                    <CarouselItem
                      key={id}
                      className="md:basis-1/3 lg:basis-1/4 pl-8"
                    >
                      <RecommendedMovies
                        img={item.backdrop_path}
                        year={
                          item.first_air_date
                            ? new Date(item.first_air_date).getFullYear()
                            : "N/A"
                        }
                        icon={<TVIcon />}
                        type={"Movie"}
                        adult={getCertification(item)}
                        title={item.name || item.original_name}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-[-16px]  top-[100px] bg-primary-col1 border-none text-white" />
                <CarouselNext className="right-[-16px]  top-[100px] bg-primary-col1 border-none text-white" />
              </Carousel>
            </div>

            {/* Top Rated */}
            <div className="mt-5">
              <h1 className="text-white text-xl font-semibold">Top Rated</h1>

              <Carousel
                className="mt-5 grid"
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
              >
                <CarouselContent className="-ml-8">
                  {topRated.map((item, id) => (
                    <CarouselItem
                      key={id}
                      className="md:basis-1/3 lg:basis-1/4 pl-8"
                    >
                      <RecommendedMovies
                        img={item.backdrop_path}
                        year={
                          item.first_air_date
                            ? new Date(item.first_air_date).getFullYear()
                            : "N/A"
                        }
                        icon={<TVIcon />}
                        type={"Movie"}
                        adult={getCertification(item)}
                        title={item.name || item.original_name}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-[-16px]  top-[100px] bg-primary-col1 border-none text-white" />
                <CarouselNext className="right-[-16px]  top-[100px] bg-primary-col1 border-none text-white" />
              </Carousel>
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
                  item.first_air_date
                    ? new Date(item.first_air_date).getFullYear()
                    : "N/A"
                }
                icon={<TVIcon />}
                type={"Movie"}
                adult={getCertification(item)}
                title={item.name || item.original_name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TVShows;
