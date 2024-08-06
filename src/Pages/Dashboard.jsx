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

const Dashboard = () => {
  const [trending, setTrending] = useState([]);
  const [year, setYear] = useState("");

  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, loop: true })
  );

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Njk0MWU0YzNmMjE0YWU3NGM0MWZjMDQ0NjVkNTM5MiIsIm5iZiI6MTcyMjk3MDQ0MC43MTI2NTUsInN1YiI6IjY2YjI2ZjZlYzMyZjkzZTA3N2EwODA4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TiQJzEQMgwKaTOaMMyr5So-XCJHuG4ZRBfEaPxlkwGY",
        },
      };

      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/trending/all/day?language=en-US",
          options
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTrending(data.results);
        const date = new Date(
          data.results[0].release_date || data.results[0].first_air_date
        );
        setYear(date.getFullYear());
        console.log(data);

        // setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    // Call the async function
    fetchMovies();
  }, []);

  return (
    <div className="mt-2.5 mx-5 w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for movies or TV series"
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

      <div className="mt-5">
        <h1 className="text-white text-xl font-semibold">Trending</h1>

        {/* Carousel */}
        <Carousel
          className="mt-5"
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="-ml-8">
            {trending.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="md:basis-1/2 lg:basis-1/3 pl-8"
              >
                <TrendingMovieCard
                  img={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  year={year}
                  type={movie.media_type}
                  adult={movie.adult ? "18+" : "13+"}
                  title={movie.title || movie.name}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-[-16px] bg-primary-col1 border-none text-white" />
          <CarouselNext className="right-[-16px] bg-primary-col1 border-none text-white" />
        </Carousel>
      </div>
    </div>
  );
};

export default Dashboard;
