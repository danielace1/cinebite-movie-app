import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";

import { getMovieDetails } from "@/api/tmdbService";

import Detail from "@/components/Details/Detail";
import CastandStatus from "@/components/Details/CastandStatus";
import Reviews from "@/components/Details/Reviews";
import Media from "@/components/Details/Media";
import Recommendations from "@/components/Details/Recommendations";
import Loading from "@/components/Loading";

const MovieDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);
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

      const data = await getMovieDetails(id);

      // Apply blur + gradient
      data.overlay =
        "linear-gradient(to right, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.5) 45%, transparent 80%)";

      setMovie(data);
      setLoading(false);
    })();
  }, [id]);

  if (loading || !movie) return <Loading />;

  const {
    details,
    credits,
    reviews,
    videos,
    backdrops,
    posters,
    recommendations,
  } = movie;

  console.log("Credits", credits);

  const backdropURL = details.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${details.backdrop_path}`
    : "/no-img.png";

  return (
    <div className="mt-10 px-4 sm:px-6 lg:px-10 w-full max-w-[1440px] mx-auto overflow-x-hidden">
      {/* Hero Section*/}
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
          style={{ backgroundImage: movie.overlay }}
        />

        <Detail movie={movie} playTrailer={openModal} />
      </div>

      {/* ==== CAST SECTION ==== */}
      <div className="mt-12">
        <h1 className="text-3xl font-bold text-white mb-4">Top Cast</h1>
        {/* <CastandStatus details={details} credits={credits} /> */}
      </div>

      {/* ==== REVIEWS ==== */}
      <Reviews reviews={reviews} details={details} />

      {/* ==== MEDIA ==== */}
      <Media
        videos={videos}
        backdrops={backdrops}
        posters={posters}
        openModal={openModal}
      />

      {/* ==== MODAL PLAYER ==== */}
      <ModalVideo
        channel="youtube"
        isOpen={showVideo}
        videoId={videoKey}
        onClose={closeModal}
      />

      {/* ==== RECOMMENDATIONS ==== */}
      {recommendations.length > 0 && (
        <Recommendations recommendations={recommendations} />
      )}
    </div>
  );
};

export default MovieDetails;
