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

const TVshowDetails = () => {
  const { id } = useParams();

  const [details, setDetails] = useState();
  const [watchProviders, setWatchProviders] = useState();
  const [certifications, setCertifications] = useState("");
  const [genre, setGenre] = useState([]);
  const [credits, setCredits] = useState([]);
  const [videos, setVideos] = useState([]);
  const [backdrops, setBackdrops] = useState([]);
  const [posters, setPosters] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const [percentage, setPercentage] = useState("");
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

      const videosData = await videosResponse.json();
      const keys = videosData.results.map((video) => video.key);
      const backdropsData = await backdropsResponse.json();
      const recommendationsData = await recommendationsResponse.json();

      // Combine cast and crew into one array
      const combinedCredits = [...creditsData.cast, ...creditsData.crew];

      setDetails(data);
      setWatchProviders(watchProvidersData.results.IN);
      setGenre(data.genres);
      setCredits(combinedCredits);

      setVideos(videosData.results);
      setVideoKey(keys);
      setBackdrops(backdropsData.backdrops);
      setPosters(backdropsData.posters);
      setRecommendations(recommendationsData.results);

      console.log(videosData.results);

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
          pages={pages}
        />
      </div>

      <div className="mt-20">
        <h1 className="text-2xl text-white font-semibold">Top Billed Cast</h1>

        {/* Cast and Status */}
        <CastandStatus details={details} credits={credits} />

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
