import PropTypes from "prop-types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { Link } from "react-router-dom";
import MediaCard from "@/components/MediaCard";

const Recommendations = ({ recommendations = [] }) => {
  const plugin = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: true,
    })
  );

  if (!recommendations.length) {
    return (
      <section className="mt-10 md:mt-12">
        <h2 className="text-2xl font-bold text-white mb-4">Recommendations</h2>
        <div className="h-40 flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/60 text-gray-400">
          No recommendations available.
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10 md:mt-12 w-full min-w-0">
      <h2 className="text-2xl font-bold text-white mb-4">Recommendations</h2>

      <Carousel
        className="relative w-full min-w-0 overflow-hidden"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="w-full">
          {recommendations.map((item) => {
            const isMovie = item.media_type === "movie";
            const year =
              item.release_date || item.first_air_date
                ? new Date(
                    item.release_date || item.first_air_date
                  ).getFullYear()
                : "";

            return (
              <CarouselItem
                key={`${item.id}-${item.media_type}`}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 px-2"
              >
                <Link
                  to={
                    isMovie
                      ? `/user/movies/${item.id}/details`
                      : `/user/TVshows/${item.id}/details`
                  }
                >
                  <MediaCard
                    img={item.backdrop_path || item.poster_path}
                    year={year}
                    title={
                      item.title ||
                      item.original_title ||
                      item.name ||
                      item.original_name
                    }
                    type={`${Math.round((item.vote_average / 10) * 100)}%`}
                  />
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className="left-2 bg-primary-col1 border-none text-white" />
        <CarouselNext className="right-2 bg-primary-col1 border-none text-white" />
      </Carousel>
    </section>
  );
};

Recommendations.propTypes = {
  recommendations: PropTypes.arrayOf(PropTypes.object),
};

export default Recommendations;
