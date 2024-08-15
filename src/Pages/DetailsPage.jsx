import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import ColorThief from "colorthief";
import tinycolor from "tinycolor2";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";

import Detail from "@/components/Details/Detail";
import CastandStatus from "@/components/Details/CastandStatus";
import Reviews from "@/components/Details/Reviews";
import Media from "@/components/Details/Media";
import Recommendations from "@/components/Details/Recommendations";
import { API_BASE_URL, API_KEY } from "@/api/apiConfig";

const DetailsPage = () => {
  const { id } = useParams();

  const [isloading, setIsLoading] = useState(false);

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

  // open and close the video modal
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

  // Calculate the number of items per carousel item
  const itemsPerPage = 12;
  const totalPages = Math.ceil(credits.length / itemsPerPage);

  // Split credits into pages
  const pages = Array.from({ length: totalPages }, (_, index) => {
    const start = index * itemsPerPage;
    const end = start + itemsPerPage;
    return credits.slice(start, end);
  });

  // Fetch the details and generate overlay
  useEffect(() => {
    async function fetchDetails() {
      try {
        // Fetch movie details
        const response = await fetch(
          `${API_BASE_URL}/movie/${id}?api_key=${API_KEY}`
        );

        // Fetch watch providers
        const WatchProviders = await fetch(
          `${API_BASE_URL}/movie/${id}/watch/providers?api_key=${API_KEY}`
        );

        // Fetch movie certifications
        const certificationsResponse = await fetch(
          `${API_BASE_URL}/movie/${id}/release_dates?api_key=${API_KEY}`
        );

        // Fetch movie credits
        const creditsResponse = await fetch(
          `${API_BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
        );

        // Fetch reviews
        const reviewsResponse = await fetch(
          `${API_BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=en-IN`
        );

        // Fetch movie videos
        const videosResponse = await fetch(
          `${API_BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
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
        setIsLoading(false);

        // console.log(watchProvidersData.results.IN);
        // console.log(certificationsData);
        // console.log(credit.cast);
        // console.log(reviewsData.results);
        // console.log(videosData.results);
        // console.log(backdropsData);
        // console.log(recommendationsData.results);
        // console.log(teaser);
        // console.log(recommendationsData);

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
      {isloading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-10 h-10 border-4 border-white rounded-full animate-spin border-t-transparent" />
        </div>
      ) : (
        <>
          {/* Backdrop */}
          <div
            className="relative bg-no-repeat rounded-lg bg-cover bg-center"
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

            {/* Movie Details */}
            <Detail
              details={details}
              watchProviders={watchProviders}
              textColor={textColor}
              certifications={certifications}
              genre={genre}
              formattedTime={formattedtime}
              percentage={percentage}
              circumference={circumference}
              offset={offset}
              openModal={openModal}
              trailer={trailer}
              pages={pages}
            />
          </div>

          <div className="mt-20">
            <h1 className="text-2xl text-white font-semibold">
              Top Billed Cast
            </h1>

            {/* Cast and Status */}
            <CastandStatus details={details} credits={credits} />

            {/* Reviews */}
            <Reviews reviews={reviews} details={details} />

            {/* Tabs for Media */}
            <Media
              videos={videos}
              backdrops={backdrops}
              posters={posters}
              openModal={openModal}
              currentVideoKey={currentVideoKey}
              isOpenModal={isOpen}
              closeModal={closeModal}
            />

            {/* Modal Video */}
            <ModalVideo
              channel="youtube"
              isOpen={isOpen}
              videoId={currentVideoKey}
              onClose={closeModal}
              allowFullScreen
              animationSpeed={300}
            />

            {/* Recommendations */}
            {recommendations.length > 0 ? (
              <Recommendations recommendations={recommendations} />
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DetailsPage;
