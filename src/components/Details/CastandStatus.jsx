import PropTypes from "prop-types";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const CastandStatus = ({ details, credits }) => {
  const plugin = useRef(
    Autoplay({
      delay: 4000,
      loop: true,
      infinite: true,
    })
  );

  return (
    <div className="flex space-x-16">
      <div className="relative w-10/12 mt-3">
        {/* Actor Cards */}
        <Carousel className="mt-5 grid grid-cols-1" plugins={[plugin.current]}>
          <CarouselContent className="">
            {credits.map((credit) => (
              <CarouselItem className="lg:basis-1/6" key={credit.cast_id}>
                <div className="">
                  <img
                    src={
                      credit.profile_path
                        ? `https://media.themoviedb.org/t/p/w185${credit.profile_path}`
                        : "/no-profile.png"
                    }
                    alt={credit.name}
                    className={`rounded-t-lg object-cover ${
                      credit.profile_path ? "" : "h-[250px]"
                    }`}
                  />
                  <div className="pt-4 p-3 bg-primary-col1 text-white rounded-b-lg h-32">
                    <h1 className="font-bold">{credit.name}</h1>
                    <h2 className="text-sm">{credit.character}</h2>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {/* Fade effect on the right side */}
        <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-slate-800 to-transparent pointer-events-none rounded"></div>
      </div>

      {/* Status */}
      <div className="mt-6 w-2/12 space-y-5">
        <div className="text-white text-lg">
          <h1 className="font-semibold">Status</h1>
          <h2>{details?.status ? details?.status : "--"}</h2>
        </div>

        {!details?.runtime ? (
          <>
            <div className="text-white text-lg">
              <h1 className="font-semibold mb-3">Network</h1>

              <img
                src={`https://image.tmdb.org/t/p/w92${details?.networks[0].logo_path}`}
                alt={details?.networks[0].name}
                className="bg-white p-2 rounded-lg"
              />
            </div>
            <div className="text-white text-lg">
              <h1 className="font-semibold">Type</h1>

              <h2>{details?.type}</h2>
            </div>
          </>
        ) : (
          "--"
        )}

        <div className="text-white">
          <h1 className="font-semibold">Original Language</h1>
          <h2>
            {details?.spoken_languages
              ? details?.spoken_languages[0].english_name
              : "--"}
          </h2>
        </div>

        {details?.runtime ? (
          <>
            <div className="text-white">
              <h1 className="font-semibold">Budget</h1>
              <h2>
                {details?.budget
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(details.budget)
                  : "--"}
              </h2>
            </div>
            <div className="text-white">
              <h1 className="font-semibold">Revenue</h1>
              <h2>
                {details?.revenue
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(details.revenue)
                  : "--"}
              </h2>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

CastandStatus.propTypes = {
  details: PropTypes.object,
  credits: PropTypes.array,
};

export default CastandStatus;
