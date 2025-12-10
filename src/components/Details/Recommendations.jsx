// src/components/Details/Recommendations.jsx
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

const Recommendations = ({ recommendations }) => {
  const plugin = useRef(
    Autoplay({
      delay: 5000,
      loop: true,
    })
  );

  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="mt-12 w-full lg:w-10/12">
      <h1 className="text-2xl text-white font-semibold">Recommendations</h1>

      <Carousel
        className="mt-5"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="-ml-3">
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
                className="basis-1/2 sm:basis-1/3 lg:basis-1/4 pl-3"
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
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        className="text-yellow-300 fill-current"
                      >
                        <path d="m12 16.3-3.7 2.825q-.275.225-.6.213t-.575-.188-.387-.475-.013-.65L8.15 13.4 4.525 10.825q-.3-.2-.375-.525t.025-.6.35-.488.6-.212H9.6l1.45-4.8q.125-.35.388-.538T12 3.475t.563.188.387.537L14.4 9h4.475q.35 0 .6.213t.35.487.025.6-.375.525L15.85 13.4l1.425 4.625q.125.35-.012.65t-.388.475-.575.188-.6-.213z" />
                      </svg>
                    }
                    type={`${Math.round((item.vote_average / 10) * 100) || 0}%`}
                    cert=""
                    title={
                      item.title ||
                      item.original_title ||
                      item.name ||
                      item.original_name
                    }
                  />
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className="left-[-16px] top-[80px] bg-primary-col1 border-none text-white" />
        <CarouselNext className="right-[-16px] top-[80px] bg-primary-col1 border-none text-white" />
      </Carousel>
    </div>
  );
};

Recommendations.propTypes = {
  recommendations: PropTypes.arrayOf(PropTypes.object),
};

export default Recommendations;
