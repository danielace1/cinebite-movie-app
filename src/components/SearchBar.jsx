import { useState } from "react";
import { Search, X } from "lucide-react";
import PropTypes from "prop-types";
import MovieIcon from "./Icons/MovieIcon";
import TVIcon from "./Icons/TVShowIcon";

const SearchBar = ({ onSearch, suggestions }) => {
  const [query, setQuery] = useState("");
  const [showSuggest, setShowSuggest] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
    setShowSuggest(true);
  };

  const clearSearch = () => {
    setQuery("");
    onSearch?.("");
    setShowSuggest(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative bg-gray-800/80 backdrop-blur-md rounded-xl border border-white/10 flex items-center px-4 py-3 focus-within:ring-2 focus-within:ring-primary">
        <Search className="text-gray-300 absolute left-4" size={20} />

        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for movies or TV shows..."
          className="w-full pl-10 pr-10 bg-transparent text-white placeholder-gray-400 outline-none"
        />

        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 text-gray-300 hover:text-white"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Suggestions */}
      {showSuggest && suggestions?.length > 0 && (
        <div className="absolute w-full bg-gray-900/90 backdrop-blur-md rounded-lg shadow-lg border border-white/10 max-h-60 overflow-y-auto z-50">
          {suggestions.slice(0, 8).map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setQuery(item.title || item.name);
                onSearch(item.title || item.name);
                setShowSuggest(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-800 transition text-white flex items-center gap-3"
            >
              <span className="text-gray-400">
                {item.media_type === "movie" ? <MovieIcon /> : <TVIcon />}
              </span>
              {item.title || item.name}{" "}
              {item.release_date || item.first_air_date
                ? `(${new Date(
                    item.release_date || item.first_air_date
                  ).getFullYear()})`
                : ""}{" "}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func,
  suggestions: PropTypes.array,
};

export default SearchBar;
