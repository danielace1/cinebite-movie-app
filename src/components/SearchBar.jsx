import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import PropTypes from "prop-types";
import MovieIcon from "./Icons/MovieIcon";
import TVIcon from "./Icons/TVShowIcon";

const SearchBar = ({ onSearch, suggestions, placeholder }) => {
  const [query, setQuery] = useState("");
  const [showSuggest, setShowSuggest] = useState(false);

  const ref = useRef(null);

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

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowSuggest(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <div className="relative bg-gray-800/80 backdrop-blur-md rounded-xl border border-white/10 flex items-center px-4 py-3 focus-within:border-gray-600">
        <Search className="text-gray-300 absolute left-4" size={20} />

        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-8 pr-10 bg-transparent text-white placeholder-gray-400 outline-none"
          onFocus={() => query && setShowSuggest(true)}
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
        <div className="absolute w-full bg-gray-900/90 backdrop-blur-md rounded-lg shadow-lg border border-white/10 max-h-60 overflow-y-auto z-50 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-800/50 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gradient-to-b [&::-webkit-scrollbar-thumb]:from-gray-500 [&::-webkit-scrollbar-thumb]:to-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border[&::-webkit-scrollbar-thumb]:border-gray-900/40 [&::-webkit-scrollbar-thumb:hover]:from-gray-400[&::-webkit-scrollbar-thumb:hover]:to-gray-300">
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
  placeholder: PropTypes.string,
};

export default SearchBar;
