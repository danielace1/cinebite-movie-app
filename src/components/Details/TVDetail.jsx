import PropTypes from "prop-types";
import { Play, Plus } from "lucide-react";

const TVDetail = ({ tv, playTrailer }) => {
  if (!tv) return null;

  const { details, watchProviders, cert, percentage, trailer } = tv;

  const title = details.name;
  const year = details.first_air_date
    ? new Date(details.first_air_date).getFullYear()
    : null;

  const genres = details.genres?.map((g) => g.name).join(" • ") || "";
  const rating = typeof percentage === "number" ? percentage : 0;
  const isNR = !percentage && percentage !== 0;

  const runtime =
    details.episode_run_time?.length > 0
      ? `${details.episode_run_time[0]}m`
      : null;

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(rating, 100) / 100) * circumference;

  const posterURL = details.poster_path
    ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
    : "/no-poster.jpg";

  return (
    <div className="relative z-10 px-4 sm:px-8 lg:px-12 py-8 lg:py-10 flex flex-col lg:flex-row gap-7 lg:gap-10 items-stretch">
      {/* Poster */}
      <div className="w-full max-w-[220px] mx-auto lg:mx-0 lg:w-[26%]">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10 bg-black/40 backdrop-blur-md">
          <img
            src={posterURL}
            onError={(e) => (e.target.src = "/no-poster.jpg")}
            alt={title}
            className="w-full h-full object-cover"
          />

          {/* Streaming badge */}
          {watchProviders && (
            <div className="absolute bottom-0 inset-x-0 bg-black/70 backdrop-blur-md px-3 py-2 flex items-center gap-3">
              <img
                src={
                  watchProviders?.flatrate?.[0]?.logo_path
                    ? `https://image.tmdb.org/t/p/w92${watchProviders.flatrate[0].logo_path}`
                    : "/no-img.png"
                }
                onError={(e) => (e.target.src = "/no-img.png")}
                alt="provider"
                className="w-8 h-8 rounded-md object-contain bg-white"
              />
              <div className="text-xs leading-snug">
                <p className="text-primary-col3 font-semibold uppercase tracking-wide">
                  Now Streaming
                </p>
                <p className="text-white font-semibold text-[11px]">
                  Watch on{" "}
                  {watchProviders?.flatrate?.[0]?.provider_name ||
                    watchProviders?.buy?.[0]?.provider_name ||
                    "OTT Platform"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 text-white flex flex-col justify-center">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            {title}
            {year && (
              <span className="ml-2 text-xl font-semibold text-gray-200/90">
                ({year})
              </span>
            )}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-100/90 font-medium">
            <span className="border border-gray-300/60 px-1.5 py-0.5 rounded-md text-[11px] uppercase tracking-wide">
              {cert || "NR"}
            </span>

            {runtime && <span>• {runtime}</span>}
            {genres && <span className="hidden sm:inline">• {genres}</span>}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-8">
          {/* Score */}
          <div className="flex items-center gap-4">
            <div className="relative size-[72px] bg-black/50 rounded-full p-1 shadow-lg shadow-black/60 border border-white/10 transition-all duration-300 hover:scale-110 hover:shadow-2xl">
              <svg className="size-full -rotate-90" viewBox="0 0 44 44">
                <circle
                  cx="22"
                  cy="22"
                  r={radius}
                  fill="none"
                  className="stroke-gray-700"
                  strokeWidth="2"
                />
                <circle
                  cx="22"
                  cy="22"
                  r={radius}
                  fill="none"
                  className={
                    rating < 70 ? "stroke-amber-400" : "stroke-emerald-400"
                  }
                  strokeWidth="3"
                  strokeDasharray={circumference}
                  strokeDashoffset={isNR ? circumference : offset}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset .4s ease-out" }}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
                {isNR ? (
                  <span className="text-[17px] font-extrabold">NR</span>
                ) : (
                  <span className="text-[16px] font-extrabold flex items-center">
                    {rating}
                    <span className="text-[10px] font-bold ml-0.5">%</span>
                  </span>
                )}

                {!isNR && (
                  <span className="text-[9px] font-semibold text-gray-300 tracking-wide">
                    Score
                  </span>
                )}
              </div>
            </div>

            <span className="text-xs sm:text-sm font-semibold text-gray-100 uppercase tracking-wide">
              User
              <br />
              Score
            </span>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {trailer?.key && (
              <button
                onClick={() => playTrailer(trailer.key)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              >
                <Play className="w-4 h-4" />
                Play Trailer
              </button>
            )}

            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/20 border border-white/30 text-sm font-medium hover:bg-white/30 transition-all duration-300 hover:scale-105">
              <Plus className="w-4 h-4" />
              Watchlist
            </button>
          </div>
        </div>

        {/* Overview */}
        <div className="mt-7 space-y-3 max-w-3xl">
          {details.tagline && (
            <p className="text-sm sm:text-base font-semibold italic text-gray-100/90">
              {details.tagline}
            </p>
          )}

          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-1.5">Overview</h2>
            <p className="text-sm sm:text-base text-gray-100/90 leading-relaxed">
              {details.overview || "No overview available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

TVDetail.propTypes = {
  tv: PropTypes.object,
  playTrailer: PropTypes.func,
};

export default TVDetail;
