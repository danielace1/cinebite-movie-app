import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useDebounce } from "@/hooks/useDebounce";

import MediaCard from "@/components/MediaCard";
import SkeletonCard from "@/components/SkeletonCard";
import MovieIcon from "@/components/Icons/MovieIcon";
import TVIcon from "@/components/Icons/TVShowIcon";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";

import {
  getTrending,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getPopularTV,
  getTopRatedTV,
  getAiringToday,
  getCertification,
  searchMulti,
} from "@/api/tmdbService";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 600);

  const sections = [
    { title: "Trending Now", query: getTrending },
    { title: "Popular Movies", query: getPopularMovies },
    { title: "Top Rated Movies", query: getTopRatedMovies },
    { title: "Upcoming Movies", query: getUpcomingMovies },
    { title: "Popular TV Shows", query: getPopularTV },
    { title: "Top Rated TV Shows", query: getTopRatedTV },
    { title: "Airing Today", query: getAiringToday },
  ];

  const searchRes = useQuery({
    queryKey: ["search", debouncedSearchQuery],
    enabled: debouncedSearchQuery.trim().length > 0,
    queryFn: () => searchMulti(debouncedSearchQuery),
  });

  return (
    <div className="mt-4 mx-5">
      <SearchBar
        onSearch={(val) => setSearchQuery(val)}
        suggestions={searchRes.data || []}
      />

      {debouncedSearchQuery ? (
        <SearchResults results={searchRes} />
      ) : (
        <>
          {sections.map((section, index) => (
            <CategoryRow
              key={index}
              title={section.title}
              fetchFn={section.query}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Dashboard;

// Category Row Component
const CategoryRow = ({ title, fetchFn }) => {
  const autoplay = useRef(
    Autoplay({
      delay: 5000 + Math.random() * 10000,
      stopOnInteraction: true,
      loop: true,
    })
  );

  const { data = [], isLoading } = useQuery({
    queryKey: [title],
    queryFn: fetchFn,
  });

  // Fetch certifications for all items
  const certQueries = useQuery({
    queryKey: ["certifications", title],
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
    certQueries.data?.reduce((acc, cur) => {
      acc[cur.id] = cur.cert;
      return acc;
    }, {}) || {};

  return (
    <section className="mt-6 md:mt-8">
      <h1 className="text-white text-2xl font-bold mb-3">{title}</h1>

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
            {data.map((item) => (
              <CarouselItem
                key={item.id}
                className="basis-1/2 sm:basis-1/3 lg:basis-1/5 px-2"
              >
                <MediaCard
                  img={item.backdrop_path}
                  year={new Date(
                    item.release_date || item.first_air_date
                  ).getFullYear()}
                  icon={
                    item.media_type === "movie" ? <MovieIcon /> : <TVIcon />
                  }
                  type={item.media_type === "movie" ? "Movie" : "TV"}
                  cert={certMap[item.id] || "NR"}
                  title={item.title || item.name}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-[-10px] bg-primary text-white" />
          <CarouselNext className="right-[-10px] bg-primary text-white" />
        </Carousel>
      )}
    </section>
  );
};

CategoryRow.propTypes = {
  title: PropTypes.string,
  fetchFn: PropTypes.func,
  autoplay: PropTypes.object,
};
