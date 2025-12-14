import PropTypes from "prop-types";
import { Calendar, Clock } from "lucide-react";

const NextEpisodeCard = ({ episode }) => {
  if (!episode) return null;

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-4 text-white shadow-lg">
      <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">
        Next Episode
      </p>

      <h3 className="text-lg font-bold">
        S{episode.season_number} • E{episode.episode_number} - {episode.name}
      </h3>

      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-300">
        {episode.air_date && (
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(episode.air_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        )}

        {episode.runtime && (
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {episode.runtime} min
          </span>
        )}
      </div>

      {episode.overview && (
        <p className="mt-3 text-sm text-gray-200 line-clamp-3">
          {episode.overview}
        </p>
      )}
    </div>
  );
};

NextEpisodeCard.propTypes = {
  episode: PropTypes.object,
};

export default NextEpisodeCard;
