import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import ColorThief from "colorthief";
import tinycolor from "tinycolor2";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";

import { API_BASE_URL, API_KEY } from "@/api/apiConfig";
import Detail from "@/components/Details/Detail";
import CastandStatus from "@/components/Details/CastandStatus";
import Media from "@/components/Details/Media";
import Recommendations from "@/components/Details/Recommendations";
import Reviews from "@/components/Details/Reviews";

const TVshowDetails = () => {
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
  const [overlayStyle, setOverlayStyle] = useState("");
  const [textColor, setTextColor] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentSeason, setCurrentSeason] = useState("");
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

  //   Fetch Details
  useEffect(() => {
    async function fetchDetails() {
      // Fetch TV Show Details
      const response = await fetch(
        `${API_BASE_URL}/tv/${id}?api_key=${API_KEY}`
      );

      // Fetch watch providers
      const WatchProviders = await fetch(
        `${API_BASE_URL}/tv/${id}/watch/providers?api_key=${API_KEY}`
      );

      // Fetch TVshow certifications
      const certificationsResponse = await fetch(
        `${API_BASE_URL}/tv/${id}/content_ratings?api_key=${API_KEY}`
      );

      // Fetch TVshow credits
      const creditsResponse = await fetch(
        `${API_BASE_URL}/tv/${id}/credits?api_key=${API_KEY}`
      );

      // Fetch reviews
      const reviewsResponse = await fetch(
        `${API_BASE_URL}/tv/${id}/reviews?api_key=${API_KEY}&language=en-IN`
      );

      // Fetch movie videos
      const videosResponse = await fetch(
        `${API_BASE_URL}/tv/${id}/videos?api_key=${API_KEY}`
      );

      // Fetch the backdrops & posters
      const backdropsResponse = await fetch(
        `${API_BASE_URL}/tv/${id}/images?api_key=${API_KEY}`
      );

      // Fetch the Recommendations
      const recommendationsResponse = await fetch(
        `${API_BASE_URL}/tv/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
      );

      const data = await response.json();
      const watchProvidersData = await WatchProviders.json();
      const certificationData = await certificationsResponse.json();
      const creditsData = await creditsResponse.json();
      const reviewsData = await reviewsResponse.json();
      const videosData = await videosResponse.json();
      const keys = videosData.results.map((video) => video.key);
      const backdropsData = await backdropsResponse.json();
      const recommendationsData = await recommendationsResponse.json();

      const teaser = videosData.results.filter(
        (v) =>
          v.type === "Opening Credits" ||
          v.type === "Teaser" ||
          v.type === "Trailer"
      );

      // Combine cast and crew into one array
      const combinedCredits = [...creditsData.cast, ...creditsData.crew];

      setDetails(data);
      setWatchProviders(watchProvidersData.results.IN);
      setGenre(data.genres);
      // setCurrentSeason(data.)
      setCredits(combinedCredits);
      setReviews(reviewsData.results);
      setVideos(videosData.results);
      setVideoKey(keys);
      setBackdrops(backdropsData.backdrops);
      setPosters(backdropsData.posters);
      setRecommendations(recommendationsData.results);
      setTrailer(teaser);

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

      // Certifications Logic
      const certs = certificationData.results;
      const priorityOrder = ["IN", "US", "GB"];
      let highestPriorityCert = null;
      let inRegionExists = false;

      // First, loop through the priority regions
      for (const region of priorityOrder) {
        const regionCerts = certs.find((r) => r.iso_3166_1 === region);
        if (regionCerts) {
          if (region === "IN") inRegionExists = true;

          if (regionCerts.rating) {
            highestPriorityCert = {
              region: inRegionExists ? "IN" : region,
              certification: regionCerts.rating,
            };
            break;
          }
        }
      }

      // If no certification was found from the priority regions, check for any remaining certifications
      if (!highestPriorityCert && certs.length === 1) {
        const singleCert = certs[0];
        highestPriorityCert = {
          region: singleCert.iso_3166_1,
          certification: singleCert.rating,
        };
      }

      setCertifications(highestPriorityCert);
    }

    fetchDetails();
  }, [id]);

  return (
    <div className="mt-10 mx-5 w-full ">
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

        {/* TVShow Details */}
        <Detail
          details={details}
          watchProviders={watchProviders}
          textColor={textColor}
          certifications={certifications}
          genre={genre}
          percentage={percentage}
          circumference={circumference}
          offset={offset}
          openModal={openModal}
          trailer={trailer}
          pages={pages}
        />
      </div>

      <div className="mt-20">
        <h1 className="text-2xl text-white font-semibold">Top Billed Cast</h1>

        {/* Cast and Status */}
        <CastandStatus details={details} credits={credits} />

        {/* Current Season Detail */}
        <div className="mt-10 text-white">
          <h1 className="text-2xl font-semibold">Current Season</h1>
          <div className="flex rounded-lg">
            <img src="" alt="" />
          </div>

          <div>
            <h1>Season 1</h1>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                className="text-white fill-current"
              >
                <path d="m12 16.3l-3.7 2.825q-.275.225-.6.213t-.575-.188t-.387-.475t-.013-.65L8.15 13.4l-3.625-2.575q-.3-.2-.375-.525t.025-.6t.35-.488t.6-.212H9.6l1.45-4.8q.125-.35.388-.538T12 3.475t.563.188t.387.537L14.4 9h4.475q.35 0 .6.213t.35.487t.025.6t-.375.525L15.85 13.4l1.425 4.625q.125.35-.012.65t-.388.475t-.575.188t-.6-.213z"></path>
              </svg>
              2024
              <span
                className={`w-1 h-1 rounded-full ${
                  textColor === "text-white" ? "bg-gray-200" : "bg-black"
                }`}
              ></span>
              186 Episodes
            </div>

            <p>Season 1 of Rebirth premiered on January 22, 2024.</p>

            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 20 20"
              >
                <g fill="currentColor">
                  <path d="M5.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75zM6 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75zM7.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H8a.75.75 0 0 1-.75-.75zM8 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75zM9.25 10a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H10a.75.75 0 0 1-.75-.75zm.75 1.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V12a.75.75 0 0 0-.75-.75zM9.25 14a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H10a.75.75 0 0 1-.75-.75zM12 9.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V10a.75.75 0 0 0-.75-.75zM11.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75zm.75 1.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75zM13.25 10a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H14a.75.75 0 0 1-.75-.75zm.75 1.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V12a.75.75 0 0 0-.75-.75z"></path>
                  <path
                    fillRule="evenodd"
                    d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2m-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25z"
                    clipRule="evenodd"
                  ></path>
                </g>
              </svg>
            </span>
          </div>
        </div>

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
      </div>

      {/* Modal Video */}
      <ModalVideo
        channel="youtube"
        autoplay={1}
        isOpen={isOpen}
        videoId={currentVideoKey}
        onClose={closeModal}
        allowFullScreen
        disablePictureInPicture
        animationSpeed={300}
      />

      {/* Recommendations */}
      {recommendations.length > 0 ? (
        <Recommendations recommendations={recommendations} />
      ) : (
        ""
      )}
    </div>
  );
};

export default TVshowDetails;
