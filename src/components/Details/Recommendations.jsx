import PropTypes from "prop-types";
import { useRef } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";
import RecommendedMovies from "../RecommendedMovies";

const Recommendations = ({ recommendations }) => {
  const plugin = useRef(
    Autoplay({
      delay: 4000,
      loop: true,
      infinite: true,
    })
  );

  return (
    <div className="mt-8 w-10/12">
      <h1 className="text-2xl text-white font-semibold">Recommendations</h1>

      <Carousel
        className="mt-5 grid"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="-ml-3 relative">
          {recommendations.map((item, id) => (
            <CarouselItem key={id} className="md:basis-1/3 lg:basis-1/4 pl-3">
              <Link to={`/user/movies/${item.id}/details`}>
                <RecommendedMovies
                  img={item.backdrop_path}
                  year={
                    item.release_date
                      ? new Date(item.release_date).getFullYear()
                      : "N/A"
                  }
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      className="text-yellow-300 fill-current"
                    >
                      <path d="m12 16.3l-3.7 2.825q-.275.225-.6.213t-.575-.188t-.387-.475t-.013-.65L8.15 13.4l-3.625-2.575q-.3-.2-.375-.525t.025-.6t.35-.488t.6-.212H9.6l1.45-4.8q.125-.35.388-.538T12 3.475t.563.188t.387.537L14.4 9h4.475q.35 0 .6.213t.35.487t.025.6t-.375.525L15.85 13.4l1.425 4.625q.125.35-.012.65t-.388.475t-.575.188t-.6-.213z"></path>
                    </svg>
                  }
                  type={`${Math.floor((item.vote_average / 10) * 100)}%`}
                  adult={""}
                  title={item.title || item.original_title}
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-[-16px] top-[80px] bg-primary-col1 border-none text-white" />
        <CarouselNext className="right-[-16px]  top-[80px] bg-primary-col1 border-none text-white" />
      </Carousel>
    </div>
  );
};

Recommendations.propTypes = {
  recommendations: PropTypes.arrayOf(PropTypes.object),
};

export default Recommendations;
