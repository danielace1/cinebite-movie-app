import PropTypes from "prop-types";
import { useState } from "react";

const SeasonsSection = ({ seasons }) => {
  const [activeSeason, setActiveSeason] = useState(null);

  if (!seasons || seasons.length === 0) return null;

  const toggleSeason = (id) => {
    setActiveSeason((prev) => (prev === id ? null : id));
  };

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-white mb-5">Seasons</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {seasons.map((season) => {
          const isActive = activeSeason === season.id;

          return (
            <div
              key={season.id}
              onClick={() => toggleSeason(season.id)}
              className="group relative cursor-pointer rounded-xl bg-slate-900/70 border border-white/10 shadow-lg overflow-hidden transition-transform hover:scale-[1.03]"
            >
              {/* Poster */}
              <img
                src={
                  season.poster_path
                    ? `https://image.tmdb.org/t/p/w342${season.poster_path}`
                    : "/no-poster.jpeg"
                }
                alt={season.name}
                className="w-full h-56 object-cover"
              />

              {/* Base Info */}
              <div className="p-3 text-white">
                <h3 className="font-semibold truncate">{season.name}</h3>

                <p className="text-xs text-gray-300 mt-1">
                  {season.air_date
                    ? new Date(season.air_date).getFullYear()
                    : "-"}{" "}
                  • {season.episode_count} Episodes
                </p>

                {season.overview && (
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                    {season.overview}
                  </p>
                )}
              </div>

              {/* Overlay */}
              {season.overview && (
                <div
                  className={`
                    absolute inset-0 bg-primary-col1/40 backdrop-blur-sm p-4 text-sm text-gray-200 flex flex-col justify-end transition-all duration-300 opacity-0 group-hover:opacity-100
                    ${isActive ? "opacity-100" : ""}
                  `}
                >
                  <h4 className="text-white font-semibold mb-2">
                    {season.name}
                  </h4>

                  <p className=" text-xs leading-relaxed overflow-y-auto max-h-[70%] pr-2 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/30[&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/50">
                    {season.overview}
                  </p>

                  <p className="mt-2 text-[11px] text-gray-400 sm:hidden">
                    Tap again to close
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

SeasonsSection.propTypes = {
  seasons: PropTypes.array,
};

export default SeasonsSection;
