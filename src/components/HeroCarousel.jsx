import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Play, Info, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { getCertification } from "@/api/tmdbService";
import { useAuthStore } from "@/store/useAuthStore";
import { useWatchlistStore } from "@/store/useWatchlistStore";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

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
        {movies[0]?.media_type === "tv" ? "Airing Today" : "Now Playing"}
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

// Fade Slide Component
const FadeSlide = ({ movie, isActive }) => {
  const { user } = useAuthStore();
  const { keys, addItem, removeItem } = useWatchlistStore();
  const [cert, setCert] = useState("");

  useEffect(() => {
    (async () => {
      const rating = await getCertification(movie);
      setCert(rating || "NR");
    })();
  }, [movie]);

  // Detect Movie or TV
  const isTV = movie.media_type === "tv";

  const mediaType = isTV ? "tv" : "movie";
  const mediaId = movie.id;
  const posterPath = movie.poster_path || movie.backdrop_path;

  const key = `${mediaType}:${mediaId}`;
  const wishlisted = keys.has(key);

  const img = movie.backdrop_path || movie.poster_path;

  const year = isTV
    ? movie.first_air_date
      ? new Date(movie.first_air_date).getFullYear()
      : null
    : movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;

  const title = isTV ? movie.name || movie.original_name : movie.title;
  const overview = movie.overview;

  const detailsUrl = isTV
    ? `/TVshows/${movie.id}/details`
    : `/movies/${movie.id}/details`;

  const typeLabel = isTV ? "TV Series" : "Movie";

  const toggleWatchlist = async () => {
    if (!user) {
      toast.error("Please log in to manage your watchlist.");
      return;
    }

    try {
      if (wishlisted) {
        removeItem(null, mediaType, mediaId);

        await supabase
          .from("watchlist")
          .delete()
          .eq("user_id", user.id)
          .eq("media_id", mediaId)
          .eq("media_type", mediaType);

        toast.success("Removed from watchlist");
      } else {
        const payload = {
          user_id: user.id,
          media_id: mediaId,
          media_type: mediaType,
          title,
          poster_path: posterPath,
        };

        const { data, error } = await supabase
          .from("watchlist")
          .insert(payload)
          .select()
          .single();

        if (error) throw error;

        addItem(data);
        toast.success("Added to watchlist");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out 
      ${isActive ? "opacity-100 z-30" : "opacity-0 z-0"}`}
    >
      <img
        src={`https://image.tmdb.org/t/p/original${img}`}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent backdrop-blur-[1px] z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 z-10" />

      <div className="relative z-20 px-[40px] md:px-16 max-w-3xl h-full flex flex-col justify-center space-y-6">
        <div className="flex items-center gap-3 text-gray-300 text-xs sm:text-sm">
          <span className="px-2 py-0.5 border border-white/30 rounded text-[10px] uppercase">
            {typeLabel}
          </span>

          {year && <span>{year}</span>}

          <span className="px-2 py-0.5 bg-white/10 rounded">{cert}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-2xl leading-tight">
          {title}
        </h1>

        <p className="hidden sm:block text-gray-200 line-clamp-3 text-sm sm:text-base">
          {overview}
        </p>

        <div className="flex gap-3 mt-3">
          <Link
            to={detailsUrl}
            className="px-5 py-2 bg-white text-black font-semibold rounded-xl flex items-center gap-2 shadow-lg hover:bg-gray-200 transition"
          >
            <Play size={18} /> Details
          </Link>

          <button
            onClick={toggleWatchlist}
            className={`px-5 py-2 rounded-xl flex items-center gap-2 font-semibold transition
              ${
                wishlisted
                  ? "bg-emerald-500 text-white hover:bg-emerald-600"
                  : "bg-white/20 border border-white/30 text-white hover:bg-white/30"
              }
            `}
          >
            <Plus size={18} />
            {wishlisted ? "In Watchlist" : "Watchlist"}
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
