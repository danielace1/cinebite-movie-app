import PropTypes from "prop-types";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const Detail = ({
  details,
  watchProviders,
  textColor,
  certifications,
  genre,
  formattedtime,
  percentage,
  circumference,
  offset,
  openModal,
  trailer,
  pages,
}) => {
  const plugin = useRef(
    Autoplay({
      delay: 4000,
      loop: true,
      infinite: true,
    })
  );

  return (
    <div className="mx-20 py-10 flex space-x-12 z-10 relative">
      {/* Movie Poster */}
      <div className="w-4/12">
        <img
          src={`https://image.tmdb.org/t/p/w500${details?.poster_path}`}
          alt={details?.title}
          className={`rounded-t-lg object-cover ${
            watchProviders ? "rounded-b-none" : "rounded-b-lg mt-3"
          }`}
        />
        {watchProviders && (
          <div className="p-3 flex justify-center items-center space-x-3 text-white bg-primary-col1 rounded-b-lg">
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w92${
                  watchProviders.flatrate?.[0]?.logo_path ||
                  watchProviders.rent?.[watchProviders.rent.length - 1]
                    ?.logo_path
                }`}
                alt={`${watchProviders.flatrate?.[0]?.provider_name}`}
                className="w-10 h-10 rounded"
              />
            </div>
            <div>
              <span className="font-semibold text-primary-col3">
                Now Streaming
              </span>
              <br />
              <span className="block -mt-1 font-bold">Watch Now</span>
            </div>
          </div>
        )}
      </div>

      {/* Movie Details */}
      <div className={`w-8/12 mt-5 ${textColor}`}>
        <div>
          <h1 className="font-bold text-3xl mb-1">
            {details?.title || details?.original_name}{" "}
            <span
              className={`${
                textColor === "text-white" ? "text-gray-200" : "black"
              } text-2xl font-semibold`}
            >
              (
              {new Date(
                details?.release_date || details?.first_air_date
              ).getFullYear()}
              )
            </span>
          </h1>
          <div
            className={`flex items-center ${
              textColor === "text-white" ? "text-gray-200" : "black"
            } font-semibold`}
          >
            {certifications && (
              <>
                <span
                  className={`border px-1  ${
                    textColor === "text-white"
                      ? "text-gray-200 border-gray-300"
                      : "black border-black"
                  }`}
                >
                  {certifications.certification}
                </span>
                &nbsp;&nbsp;
              </>
            )}
            {details?.first_air_date ? (
              ""
            ) : (
              <>
                <span>
                  {new Date(
                    certifications?.release_date || details?.release_date
                  ).toLocaleDateString()}
                </span>
                &nbsp;({certifications?.region || details?.origin_country}
                )&nbsp;&nbsp;
                <span
                  className={`w-1 h-1 rounded-full ${
                    textColor === "text-white" ? "bg-gray-200" : "bg-black"
                  }`}
                ></span>
                &nbsp;&nbsp;
              </>
            )}
            {genre.map((g) => g.name).join(", ")}&nbsp;&nbsp;
            {details?.first_air_date
              ? ""
              : formattedtime && (
                  <>
                    <span
                      className={`w-1 h-1 rounded-full ${
                        textColor === "text-white" ? "bg-gray-200" : "bg-black"
                      }`}
                    ></span>
                    &nbsp;&nbsp;{formattedtime}
                  </>
                )}
          </div>
        </div>

        <div className="mt-8 flex items-center">
          {/* Circular Progress */}
          <div className="relative size-16 bg-primary-col1 rounded-full p-0.5 mr-2 hover:cursor-pointer transform-gpu will-change-transform transition-transform hover:scale-110">
            <svg
              className="size-full -rotate-90"
              viewBox="0 0 36 36"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background Circle */}
              <circle
                cx={18}
                cy={18}
                r={16}
                fill="none"
                className={`stroke-current ${
                  percentage < 70 ? "text-amber-900" : "text-green-900"
                }`}
                strokeWidth={2}
              />
              {/* Progress Circle */}
              <circle
                cx={18}
                cy={18}
                r={16}
                fill="none"
                className={`stroke-current ${
                  percentage < 70 ? "text-amber-300" : "text-green-500"
                }`}
                strokeWidth={2}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
              />
            </svg>
            {/* Percentage Text */}
            <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
              <span className="flex items-center text-center text-lg font-bold text-white">
                {percentage}
                <span className="text-xs">
                  {percentage === "NR" ? "" : "%"}
                </span>{" "}
              </span>
            </div>
          </div>
          {/* End Circular Progress */}

          <span className="font-bold">
            User <br /> Score
          </span>
        </div>

        <div className="mt-8 flex items-center space-x-5">
          {/* WatchList */}
          <div className="bg-primary-col3 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current text-white hover:cursor-pointer hover:text-primary-col1"
            >
              <path d="m12 18l-4.2 1.8q-1 .425-1.9-.162T5 17.975V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v12.975q0 1.075-.9 1.663t-1.9.162zm0-2.2l5 2.15V5H7v12.95zM12 5H7h10z"></path>
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="hidden fill-current text-white hover:cursor-pointer hover:text-primary-col1"
            >
              <path d="m12 16.923l-3.738 1.608q-.808.348-1.535-.134Q6 17.916 6 17.052V5.616q0-.691.463-1.153T7.616 4h8.769q.69 0 1.153.463T18 5.616v11.436q0 .864-.727 1.345q-.727.482-1.535.134z"></path>
            </svg>
          </div>
          {trailer.length > 0 && (
            <div
              className="flex items-center justify-center font-bold bg-sky-900 text-white px-3 py-2 rounded-lg hover:cursor-pointer transition-all hover:bg-sky-950"
              onClick={() => openModal(trailer[0]?.key)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current text-white mr-1"
              >
                <path d="M8 17.175V6.825q0-.425.3-.713t.7-.287q.125 0 .263.037t.262.113l8.15 5.175q.225.15.338.375t.112.475t-.112.475t-.338.375l-8.15 5.175q-.125.075-.262.113T9 18.175q-.4 0-.7-.288t-.3-.712"></path>
              </svg>
              Play Trailer
            </div>
          )}
        </div>

        <div className="mt-10">
          <p
            className={`${
              textColor === "text-white" ? "text-gray-200" : "black"
            } font-semibold italic`}
          >
            {details?.tagline}
          </p>

          <h2 className="font-bold mt-2 text-xl">Overview</h2>
          <p
            className={`${
              textColor === "text-white"
                ? "text-gray-200"
                : "black font-semibold"
            } `}
          >
            {details?.overview}
          </p>
        </div>

        <div className="mt-8">
          {/* Names */}
          <Carousel className="mt-5 overflow-hidden" plugins={[plugin.current]}>
            <CarouselContent>
              {pages.map((page, pageIndex) => (
                <CarouselItem key={pageIndex} className="flex-shrink-0 w-full">
                  <div className="grid grid-cols-3 gap-4">
                    {page.map((credit, index) => (
                      <div key={index} className="flex flex-col">
                        <h1
                          className={`text-lg ${
                            textColor === "text-white"
                              ? "text-gray-100"
                              : "text-zinc-950 font-semibold"
                          }`}
                        >
                          {credit.name}
                        </h1>
                        <h2
                          className={`text-sm ${
                            textColor === "text-white"
                              ? "text-gray-300"
                              : "text-zinc-950"
                          }`}
                        >
                          {credit.character || credit.job}
                        </h2>
                      </div>
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

Detail.propTypes = {
  details: PropTypes.object,
  watchProviders: PropTypes.object,
  textColor: PropTypes.string,
  certifications: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  genre: PropTypes.array,
  formattedtime: PropTypes.string,
  percentage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  circumference: PropTypes.number,
  offset: PropTypes.string,
  openModal: PropTypes.func,
  trailer: PropTypes.array,
  pages: PropTypes.array,
};

export default Detail;
