import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import SkeletonCard from "@/components/SkeletonCard";
import SkeletonHero from "@/components/SkeletonHero";
import MediaCard from "@/components/MediaCard";
import HeroCarousel from "@/components/HeroCarousel";
import TVIcon from "@/components/Icons/TVShowIcon";
import SearchBar from "@/components/SearchBar";
import { useDebounce } from "@/hooks/useDebounce";

import {
  getAiringToday,
  getOnTheAirTV,
  getPopularTV,
  getTopRatedTV,
  getCertification,
  searchTVShows,
} from "@/api/tmdbService";

const TVShows = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 500);

  // 🔍 TV Search
  const searchResults = useQuery({
    queryKey: ["tv-search", debouncedQuery],
    enabled: debouncedQuery.trim().length > 0,
    queryFn: () => searchTVShows(debouncedQuery),
  });

  const { data: airingToday = [], isLoading: loadingHero } = useQuery({
    queryKey: ["tv-airing-today"],
    queryFn: getAiringToday,
  });

  return (
    <div className="mt-4 mx-3 sm:mx-5">
      <SearchBar
        onSearch={setSearchQuery}
        placeholder="Search for TV Shows..."
        suggestions={searchResults.data || []}
      />

      {debouncedQuery.trim() ? (
        <TVSearchResults results={searchResults} />
      ) : (
        <>
          {loadingHero ? (
            <SkeletonHero />
          ) : airingToday.length > 0 ? (
            <HeroCarousel movies={airingToday} />
          ) : null}

          <TVRow title="On The Air" fetchFn={getOnTheAirTV} />
          <TVRow title="Popular TV Shows" fetchFn={getPopularTV} />
          <TVRow title="Top Rated TV Shows" fetchFn={getTopRatedTV} />
        </>
      )}
    </div>
  );
};

export default TVShows;

// TV Row Component
const TVRow = ({ title, fetchFn }) => {
  const autoplay = useRef(
    Autoplay({
      delay: 5000 + Math.random() * 10000,
      stopOnInteraction: true,
      loop: true,
    })
  );

  const { data = [], isLoading } = useQuery({
    queryKey: ["tv-row", title],
    queryFn: fetchFn,
  });

  // Fetch certifications
  const { data: certs } = useQuery({
    queryKey: ["tv-row-certs", title],
    enabled: data.length > 0,
    queryFn: async () => {
      const promises = data.map(async (item) => {
        const cert = await getCertification(item);
        return { id: item.id, cert };
      });
      return Promise.all(promises);
    },
  });

  const certMap =
    certs?.reduce((acc, cur) => {
      acc[cur.id] = cur.cert;
      return acc;
    }, {}) || {};

  const items = data.filter((m) => m.backdrop_path || m.poster_path);

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white text-xl sm:text-2xl font-bold">{title}</h2>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {Array(5)
            .fill()
            .map((_, i) => (
              <SkeletonCard key={i} />
            ))}
        </div>
      ) : (
        <Carousel className="mt-4" plugins={[autoplay.current]}>
          <CarouselContent className="ml-2">
            {items.map((item) => {
              const year = item.first_air_date
                ? new Date(item.first_air_date).getFullYear()
                : "";

              return (
                <CarouselItem
                  key={item.id}
                  className="basis-1/2 sm:basis-1/3 lg:basis-1/5 px-2"
                >
                  <Link to={`/user/TVshows/${item.id}/details`}>
                    <MediaCard
                      img={item.backdrop_path || item.poster_path}
                      year={year}
                      icon={<TVIcon />}
                      type="TV Series"
                      cert={certMap[item.id] || ""}
                      title={item.name || item.original_name}
                    />
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselPrevious className="left-[-10px] bg-primary text-white" />
          <CarouselNext className="right-[-10px] bg-primary text-white" />
        </Carousel>
      )}
    </section>
  );
};

TVRow.propTypes = {
  title: PropTypes.string,
  fetchFn: PropTypes.func,
};

// TV Search Results Component
const TVSearchResults = ({ results }) => {
  const { data = [], isLoading } = results;

  return (
    <section className="mt-6">
      <h1 className="text-white text-2xl font-bold mb-3">Search Results</h1>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {Array(6)
            .fill()
            .map((_, i) => (
              <SkeletonCard key={i} />
            ))}
        </div>
      ) : data.length === 0 ? (
        <p className="text-gray-400 mt-4">No TV Shows found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-2">
          {data
            .filter((item) => item.backdrop_path || item.poster_path)
            .map((item) => {
              const year = item.first_air_date
                ? new Date(item.first_air_date).getFullYear()
                : "";

              return (
                <Link
                  key={item.id}
                  to={`/user/TVshows/${item.id}/details`}
                  className="block"
                >
                  <MediaCard
                    img={item.backdrop_path || item.poster_path}
                    year={year}
                    icon={<TVIcon />}
                    type="TV Series"
                    cert=""
                    title={item.name || item.original_name}
                  />
                </Link>
              );
            })}
        </div>
      )}
    </section>
  );
};

TVSearchResults.propTypes = {
  results: PropTypes.object,
};
