import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Play, Info, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { getCertification } from "@/api/tmdbService";

const HeroCarousel = ({ movies }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [movies.length]);

  const goNext = () => setIndex((prev) => (prev + 1) % movies.length);
  const goPrev = () =>
    setIndex((prev) => (prev - 1 + movies.length) % movies.length);

  return (
    <section className="mt-5 relative w-full">
      <h2 className="text-white text-2xl sm:text-3xl font-bold mb-3">
        Now Playing
      </h2>

      <div className="relative h-[300px] sm:h-[380px] lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl">
        {movies.map((movie, i) => (
          <FadeSlide key={movie.id} movie={movie} isActive={index === i} />
        ))}

        <button
          onClick={goPrev}
          className="absolute left-0 md:left-1 top-1/2 -translate-y-1/2 z-40 bg-black/40 backdrop-blur-md hover:bg-black/60 text-white p-2 rounded-full transition shadow-lg"
        >
          <ChevronLeft className="size-4 md:size-6 lg:size-7" />
        </button>

        <button
          onClick={goNext}
          className="absolute right-0 md:right-1 top-1/2 -translate-y-1/2 z-40 bg-black/40 backdrop-blur-md hover:bg-black/60 text-white p-2 rounded-full transition shadow-lg"
        >
          <ChevronRight className="size-4 md:size-6 lg:size-7" />
        </button>
      </div>
    </section>
  );
};

HeroCarousel.propTypes = {
  movies: PropTypes.array,
};

export default HeroCarousel;

// FadeSlide Component
const FadeSlide = ({ movie, isActive }) => {
  const [cert, setCert] = useState("");

  useEffect(() => {
    (async () => {
      const rating = await getCertification(movie);
      setCert(rating || "NR");
    })();
  }, [movie]);

  const img = movie.backdrop_path || movie.poster_path;
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out 
      ${isActive ? "opacity-100 z-30" : "opacity-0 z-0"}`}
    >
      <img
        src={`https://image.tmdb.org/t/p/original${img}`}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent backdrop-blur-[1px] z-10 pointer-events-none" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 z-10 pointer-events-none" />

      <div className="relative z-20 px-[40px] md:px-16 max-w-3xl h-full flex flex-col justify-center space-y-6">
        <div className="flex items-center gap-3 text-gray-300 text-xs sm:text-sm">
          <span className="px-2 py-0.5 border border-white/30 rounded text-[10px] uppercase">
            Movie
          </span>

          {year && <span>{year}</span>}

          <span className="px-2 py-0.5 bg-white/10 rounded">{cert}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-2xl leading-tight">
          {movie.title}
        </h1>

        <p className="hidden sm:block text-gray-200 line-clamp-3 text-sm sm:text-base">
          {movie.overview}
        </p>

        <div className="flex gap-3 mt-3">
          <Link
            to={`/user/movies/${movie.id}/details`}
            className="px-5 py-2 bg-white text-black font-semibold rounded-xl flex items-center gap-2 shadow-lg hover:bg-gray-200 transition"
          >
            <Play size={18} /> Details
          </Link>

          <button
            className="px-5 py-2 bg-white/20 border border-white/30 text-white rounded-xl flex items-center gap-2 backdrop-blur-md 
            hover:bg-white/30 transition"
          >
            <Plus size={18} /> Watchlist
          </button>

          <button className="hidden sm:flex px-5 py-2 bg-white/10 border border-white/20 text-white rounded-xl items-center gap-2 backdrop-blur-md hover:bg-white/20 transition">
            <Info size={18} /> More Info
          </button>
        </div>
      </div>
    </div>
  );
};

FadeSlide.propTypes = {
  movie: PropTypes.object,
  isActive: PropTypes.bool,
};
