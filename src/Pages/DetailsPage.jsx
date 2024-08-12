import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ColorThief from "colorthief";
import tinycolor from "tinycolor2";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";

import noProfile from "../../public/no-profile.png";
import RecommendedMovies from "@/components/RecommendedMovies";
import MovieIcon from "@/components/Icons/MovieIcon";

const DetailsPage = () => {
  const { id } = useParams();

  const [details, setDetails] = useState();
  const [watchProviders, setWatchProviders] = useState();
  const [certifications, setCertifications] = useState("");
  const [genre, setGenre] = useState([]);
  const [credits, setCredits] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [videos, setVideos] = useState([]);
  const [backdrops, setBackdrops] = useState([]);
  const [posters, setPosters] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const [percentage, setPercentage] = useState("");
  const [formattedtime, setFormattedtime] = useState("");
  const [overlayStyle, setOverlayStyle] = useState("");
  const [textColor, setTextColor] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [videoKey, setVideoKey] = useState([]);
  const [currentVideoKey, setCurrentVideoKey] = useState(null);
  const [trailer, setTrailer] = useState([]);

  const openModal = (key) => {
    setCurrentVideoKey(key);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setCurrentVideoKey(null);
  };

  // Calculating percentage for circular progress
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const offset = String(circumference - (percentage / 100) * circumference);

  const plugin = useRef(
    Autoplay({
      delay: 4000,
      loop: true,
      infinite: true,
    })
  );

  // Calculate the number of items per carousel item
  const itemsPerPage = 12; // 3 columns x 4 rows
  const totalPages = Math.ceil(credits.length / itemsPerPage);

  // Split credits into pages
  const pages = Array.from({ length: totalPages }, (_, index) => {
    const start = index * itemsPerPage;
    const end = start + itemsPerPage;
    return credits.slice(start, end);
  });

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // Fetch the details and generate overlay
  useEffect(() => {
    async function fetchDetails() {
      try {
        // Fetch movie details
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );

        // Fetch watch providers
        const WatchProviders = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${API_KEY}`
        );

        // Fetch movie certifications
        const certificationsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${API_KEY}`
        );

        // Fetch movie credits
        const creditsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
        );

        // Fetch reviews
        const reviewsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=en-IN`
        );

        // Fetch movie videos
        const videosResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
        );

        // Fetch the backdrops & posters
        const backdropsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/images?api_key=${API_KEY}`
        );

        // Fetch the Recommendations
        const recommendationsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
        );

        const data = await response.json();
        const watchProvidersData = await WatchProviders.json();
        const certificationsData = await certificationsResponse.json();
        const credit = await creditsResponse.json();
        const reviewsData = await reviewsResponse.json();
        const videosData = await videosResponse.json();
        const keys = videosData.results.map((video) => video.key);
        const backdropsData = await backdropsResponse.json();
        const recommendationsData = await recommendationsResponse.json();

        const teaser = videosData.results.filter(
          (v) =>
            (v.name === "Final Trailer" || v.name === "Official Trailer") &&
            v.type === "Trailer"
        );

        setDetails(data);
        setWatchProviders(watchProvidersData.results.IN);
        setGenre(data.genres);
        setCredits(credit.cast);
        setReviews(reviewsData.results);
        setVideos(videosData.results);
        setVideoKey(keys);
        setBackdrops(backdropsData.backdrops);
        setPosters(backdropsData.posters);
        setRecommendations(recommendationsData.results);
        setTrailer(teaser);

        // console.log(watchProvidersData.results.IN);
        // console.log(certificationsData);
        // console.log(credit.cast);
        // console.log(reviewsData.results);
        // console.log(videosData.results);
        // console.log(backdropsData);
        // console.log(recommendationsData.results);
        // console.log(teaser);
        console.log(recommendationsData);

        // Calculate the percentage
        const voteAverage = data.vote_average;
        if (voteAverage > 0) {
          const rating = Math.floor((voteAverage / 10) * 100);
          setPercentage(rating);
        } else {
          setPercentage("NR");
        }

        console.log(data);

        // Load the backdrop image to extract dominant color
        const image = new Image();
        image.crossOrigin = "Anonymous"; // Handle cross-origin images
        image.src = `https://image.tmdb.org/t/p/w1280${data.backdrop_path}&callback=handleData`;

        image.onload = () => {
          const colorThief = new ColorThief();
          const dominantColor = colorThief.getColor(image);

          // Use tinycolor to darken the dominant color
          const dominantColorString = `rgb(${dominantColor.join(",")},0.6)`;

          const darkerDominantColor =
            tinycolor(dominantColorString).toRgbString();

          const gradient = `linear-gradient(to right, ${darkerDominantColor} 22%, ${dominantColorString} 30%)`;
          setOverlayStyle(gradient);
          // Calculate brightness and set text color accordingly
          const isLight = tinycolor(dominantColorString).isLight();
          setTextColor(isLight ? "text-black" : "text-white");
        };

        const certs = certificationsData.results;
        const priorityOrder = ["IN", "US", "GB"];
        let highestPriorityCert = null;
        let inRegionExists = false; // To check if the IN region exists

        for (const region of priorityOrder) {
          const regionCerts = certs.find((r) => r.iso_3166_1 === region);
          if (regionCerts) {
            if (region === "IN") inRegionExists = true; // IN region is found

            for (const releaseDate of regionCerts.release_dates) {
              if (releaseDate.certification) {
                highestPriorityCert = {
                  region: inRegionExists ? "IN" : region, // Display region as IN if IN exists
                  release_date: releaseDate.release_date,
                  certification: releaseDate.certification,
                };
                break;
              }
            }
            if (highestPriorityCert) break;
          }
        }

        setCertifications(highestPriorityCert);

        // Format the runtime
        const totalMinutes = data.runtime;
        if (totalMinutes > 0) {
          const hours = Math.floor(totalMinutes / 60);
          const minutes = totalMinutes % 60;

          const formattedRuntime = `${hours}h ${minutes}m`;

          setFormattedtime(formattedRuntime);
        } else {
          setFormattedtime("");
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }

    fetchDetails();
  }, [id, API_KEY]);

  return (
    <div className="mt-10 mx-5 w-full ">
      {/* Backdrop */}
      <div
        className="relative bg-no-repeat rounded-lg bg-cover xl:bg-[left_calc((50vw-170px)-340px)_top] 2xl:bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${details?.backdrop_path})`,
        }}
      >
        {/* OverLay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={{
            backgroundImage: overlayStyle,
            backgroundBlendMode: "multiply",
          }}
        ></div>

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
                {details?.title}{" "}
                <span
                  className={`${
                    textColor === "text-white" ? "text-gray-200" : "black"
                  } text-2xl font-semibold`}
                >
                  ({new Date(details?.release_date).getFullYear()})
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
                &nbsp;&nbsp;{genre.map((g) => g.name).join(", ")}&nbsp;&nbsp;
                {formattedtime && (
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
              <Carousel
                className="mt-5 overflow-hidden"
                plugins={[plugin.current]}
              >
                <CarouselContent>
                  {pages.map((page, pageIndex) => (
                    <CarouselItem
                      key={pageIndex}
                      className="flex-shrink-0 w-full"
                    >
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
      </div>

      <div className="mt-20">
        <h1 className="text-2xl text-white font-semibold">Top Billed Cast</h1>

        <div className="flex space-x-16">
          {/* Cast */}
          <div className="w-10/12 mt-3">
            {/* Actor Cards */}
            <Carousel
              className="mt-5 grid grid-cols-1"
              plugins={[plugin.current]}
            >
              <CarouselContent className="">
                {credits.map((credit) => (
                  <CarouselItem className="lg:basis-1/6" key={credit.cast_id}>
                    <div className="">
                      <img
                        src={
                          credit.profile_path
                            ? `https://media.themoviedb.org/t/p/w185${credit.profile_path}`
                            : noProfile
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
          </div>

          {/* Status */}
          <div className="mt-6 w-2/12 space-y-5">
            <div className="text-white text-lg">
              <h1 className="font-semibold">Status</h1>
              <h2>{details?.status ? details?.status : "--"}</h2>
            </div>
            <div className="text-white">
              <h1 className="font-semibold">Original Language</h1>
              <h2>
                {details?.spoken_languages
                  ? details?.spoken_languages[0].english_name
                  : "--"}
              </h2>
            </div>
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
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-10">
          <h1 className="text-2xl text-white font-semibold">Reviews</h1>

          <div className="mt-5 w-10/12">
            {reviews.length > 0 ? (
              <ScrollArea className="h-64 border rounded-xl border-slate-700 bg-primary-col1 px-5 py-3">
                <Carousel
                  className="grid grid-cols-1"
                  plugins={[plugin.current]}
                >
                  <CarouselContent>
                    {reviews.map((review) => (
                      <CarouselItem key={review.id} className="">
                        <div className="flex items-center space-x-4">
                          <div>
                            <img
                              src={
                                review.author_details.avatar_path
                                  ? `https://media.themoviedb.org/t/p/w45${review.author_details.avatar_path}`
                                  : `https://ui-avatars.com/api/?background=random&name=${review.author_details.username}`
                              }
                              alt={review.author_details.username}
                              className="rounded-full w-12 h-12 object-cover"
                            />
                          </div>
                          <div className="text-white">
                            <h1 className="font-semibold text-lg">
                              A review by{" "}
                              <span className="capitalize">
                                {review.author ||
                                  review.author_details.username}
                              </span>
                            </h1>
                            <div className="mt-1.5 flex items-center space-x-2">
                              <div className="flex items-center bg-slate-500 rounded-md px-1 py-0.5 text-sm font-semibold">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  className="text-white fill-current"
                                >
                                  <path d="m12 16.3l-3.7 2.825q-.275.225-.6.213t-.575-.188t-.387-.475t-.013-.65L8.15 13.4l-3.625-2.575q-.3-.2-.375-.525t.025-.6t.35-.488t.6-.212H9.6l1.45-4.8q.125-.35.388-.538T12 3.475t.563.188t.387.537L14.4 9h4.475q.35 0 .6.213t.35.487t.025.6t-.375.525L15.85 13.4l1.425 4.625q.125.35-.012.65t-.388.475t-.575.188t-.6-.213z"></path>
                                </svg>
                                {review.author_details.rating !== undefined
                                  ? Math.floor(
                                      (review.author_details.rating / 10) * 100
                                    )
                                  : "0"}
                                <span className="text-xs">%</span>
                              </div>
                              <div className="font-extralight">
                                Written by{" "}
                                <span>{review.author_details.username}</span> on{" "}
                                {new Date(review.created_at).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    timeZone: "UTC",
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-5">
                          <ReactMarkdown
                            rehypePlugins={[rehypeRaw, rehypeSanitize]}
                            className="text-gray-200"
                          >
                            {review.content}
                          </ReactMarkdown>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </ScrollArea>
            ) : (
              <div className="text-white font-semibold">
                We currently don&apos;t have any reviews for {details?.title}
              </div>
            )}
          </div>
        </div>

        {/* Tabs for Media */}
        <div className="mt-8">
          <h1 className="text-2xl text-white font-semibold">Media</h1>

          <div className="mt-5 w-10/12">
            <Tabs defaultValue="videos" className="">
              <TabsList className="text-white font-semibold bg-slate-800 w-full justify-around">
                <TabsTrigger
                  value="videos"
                  className="data-[state=active]:bg-primary-col1 data-[state=active]:text-white hover:bg-primary-col1"
                >
                  Videos
                </TabsTrigger>
                <TabsTrigger
                  value="backdrops"
                  className="data-[state=active]:bg-primary-col1 data-[state=active]:text-white hover:bg-primary-col1"
                >
                  Backdrops
                </TabsTrigger>
                <TabsTrigger
                  value="posters"
                  className="data-[state=active]:bg-primary-col1 data-[state=active]:text-white hover:bg-primary-col1"
                >
                  Posters
                </TabsTrigger>
              </TabsList>
              <TabsContent value="videos">
                {/* Videos */}
                {backdrops.length > 0 ? (
                  <Carousel className="grid" plugins={[plugin.current]}>
                    <CarouselContent>
                      {videos.map((video) => (
                        <CarouselItem key={video.id} className="basis-1/2 pl-0">
                          <div className="relative">
                            <img
                              src={`https://i.ytimg.com/vi/${video.key}/maxresdefault.jpg`}
                              className="w-full h-72 hover:cursor-pointer object-cover"
                              alt={video.name}
                            />
                            <div
                              className="absolute inset-0 flex items-center justify-center hover:cursor-pointer"
                              onClick={() => openModal(video.key)}
                            >
                              <span className="w-16 h-16 bg-primary-col1 rounded-full grid place-items-center hover:bg-slate-800 transition">
                                <svg
                                  className="w-6 h-6 text-white"
                                  viewBox="0 0 16 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M15 7.26795C16.3333 8.03775 16.3333 9.96225 15 10.7321L3 17.6603C1.66667 18.4301 1.01267e-06 17.4678 1.07997e-06 15.9282L1.68565e-06 2.0718C1.75295e-06 0.532196 1.66667 -0.430054 3 0.339746L15 7.26795Z"
                                    fill="white"
                                  />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                ) : (
                  <div className="text-white text-center h-72 flex items-center justify-center">
                    No Videos Found
                  </div>
                )}
              </TabsContent>

              <TabsContent value="backdrops">
                <Carousel className="grid" plugins={[plugin.current]}>
                  <CarouselContent>
                    {backdrops.map((backdrop, id) => (
                      <CarouselItem key={id} className="basis-1/2 pl-0">
                        <img
                          src={`https://media.themoviedb.org/t/p/w780${backdrop.file_path}`}
                          alt={backdrop.file_path}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </TabsContent>

              <TabsContent value="posters">
                <Carousel className="grid" plugins={[plugin.current]}>
                  <CarouselContent>
                    {posters.map((poster, id) => (
                      <CarouselItem key={id} className="basis-1/5 pl-0">
                        <img
                          src={`https://media.themoviedb.org/t/p/w342${poster.file_path}`}
                          alt={poster.file_path}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </TabsContent>

              {/* Modal Video */}
              <ModalVideo
                channel="youtube"
                isOpen={isOpen}
                videoId={currentVideoKey}
                onClose={closeModal}
                allowFullScreen
                animationSpeed={300}
              />
            </Tabs>
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 ? (
          <div className="mt-8 w-10/12">
            <h1 className="text-2xl text-white font-semibold">
              Recommendations
            </h1>

            <Carousel
              className="mt-5 grid"
              plugins={[plugin.current]}
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent className="-ml-3 relative">
                {recommendations.map((item, id) => (
                  <CarouselItem
                    key={id}
                    className="md:basis-1/3 lg:basis-1/4 pl-3"
                  >
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
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default DetailsPage;
