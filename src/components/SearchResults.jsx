import { useState } from "react";
import PropTypes from "prop-types";
import MediaCard from "./MediaCard";
import SkeletonCard from "./SkeletonCard";
import MovieIcon from "./Icons/MovieIcon";
import TVIcon from "./Icons/TVShowIcon";

const SearchResults = ({ results }) => {
  const { data = [], isLoading } = results;

  const [activeTab, setActiveTab] = useState("all");

  const movies = data.filter((i) => i.media_type === "movie");
  const tv = data.filter((i) => i.media_type === "tv");

  const filtered =
    activeTab === "all" ? data : activeTab === "movie" ? movies : tv;

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-white text-2xl font-bold">Search Results</h1>

        {/* Tabs */}
        <div className="flex gap-4">
          {["all", "movie", "tv"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1 rounded-lg text-sm capitalize transition ${
                activeTab === tab
                  ? "bg-primary text-white border border-gray-500"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {tab === "all" ? "All" : tab === "movie" ? "Movies" : "TV Shows"}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {Array(6)
            .fill()
            .map((_, i) => (
              <SkeletonCard key={i} />
            ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-gray-400 mt-4">No results found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {filtered.map((item) => {
            const date = item.release_date || item.first_air_date;
            const year = date ? new Date(date).getFullYear() : "";

            return (
              <MediaCard
                key={item.id}
                img={item.backdrop_path}
                year={year}
                icon={item.media_type === "movie" ? <MovieIcon /> : <TVIcon />}
                type={item.media_type === "movie" ? "Movie" : "TV"}
                cert=""
                title={item.title || item.name}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

SearchResults.propTypes = {
  results: PropTypes.object,
};

export default SearchResults;
