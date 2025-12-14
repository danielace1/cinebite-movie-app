import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";

import { getTVDetails } from "@/api/tmdbService";

import TVDetail from "@/components/Details/TVDetail";
import CastandStatus from "@/components/Details/CastandStatus";
import Media from "@/components/Details/Media";
import Recommendations from "@/components/Details/Recommendations";
import Reviews from "@/components/Details/Reviews";
import Loading from "@/components/Loading";
import NextEpisodeCard from "@/components/Details/NextEpisodeCard";
import SeasonsSection from "@/components/Details/SeasonsSection";

const TVShowDetails = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [tv, setTV] = useState(null);

  const [showVideo, setShowVideo] = useState(false);
  const [videoKey, setVideoKey] = useState(null);

  const openModal = (key) => {
    setVideoKey(key);
    setShowVideo(true);
  };

  const closeModal = () => {
    setShowVideo(false);
    setVideoKey(null);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    (async () => {
      setLoading(true);
      const data = await getTVDetails(id);

      // Apply blur + gradient
      data.overlay =
        "linear-gradient(to right, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.5) 45%, transparent 80%)";

      setTV(data);
      setLoading(false);
    })();
  }, [id]);

  if (loading || !tv) return <Loading />;

  const {
    details,
    credits,
    reviews,
    videos,
    backdrops,
    posters,
    recommendations,
  } = tv;

  const backdropURL = details.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${details.backdrop_path}`
    : "/no-img.png";

  return (
    <div className="mt-10 px-4 sm:px-6 lg:px-10 w-full max-w-[1440px] mx-auto overflow-x-hidden pb-1">
      {/* Hero Section */}
      <div
        className="relative rounded-2xl overflow-hidden shadow-xl"
        style={{
          backgroundImage: `url(${backdropURL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0 backdrop-blur-[3px]"
          style={{ backgroundImage: tv.overlay }}
        />

        <TVDetail tv={tv} playTrailer={openModal} />
      </div>

      {/* Next Episode */}
      <NextEpisodeCard episode={details.next_episode_to_air} />

      <SeasonsSection seasons={details.seasons} />

      {/* Cast & Status */}
      <div className="mt-14">
        <CastandStatus details={details} credits={credits} />
      </div>

      {/* Reviews */}
      <Reviews reviews={reviews} details={details} />

      {/* Media */}
      <Media
        videos={videos}
        backdrops={backdrops}
        posters={posters}
        openModal={openModal}
      />

      {/* Video Modal */}
      <ModalVideo
        channel="youtube"
        isOpen={showVideo}
        videoId={videoKey}
        onClose={closeModal}
      />

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Recommendations recommendations={recommendations} />
      )}
    </div>
  );
};

export default TVShowDetails;
