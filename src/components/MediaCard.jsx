import PropTypes from "prop-types";
import { useAuthStore } from "@/store/useAuthStore";
import { useWatchlistStore } from "@/store/useWatchlistStore";
import toast from "react-hot-toast";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";
import noImg from "../../public/no-img.png";

const MediaCard = ({ img, year, icon, type, cert, title, mediaId }) => {
  const { user } = useAuthStore();
  const { addItem, removeItem, keys } = useWatchlistStore();

  const mediaType = type.toLowerCase();
  const key = `${mediaType}:${mediaId}`;
  const wishlisted = keys.has(key);

  const toggleWatchlist = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in to manage your watchlist.");
      return;
    }

    try {
      if (wishlisted) {
        removeItem(null, mediaType, mediaId);

        await supabase
          .from("watchlist")
          .delete()
          .eq("user_id", user.id)
          .eq("media_id", mediaId)
          .eq("media_type", mediaType);

        toast.success(`${title} removed from your watchlist.`);
      } else {
        const payload = {
          user_id: user.id,
          media_id: mediaId,
          media_type: mediaType,
          title,
          poster_path: img,
        };

        addItem(payload);

        await supabase.from("watchlist").insert(payload);

        toast.success(`${title} added to your watchlist.`);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="relative group cursor-pointer">
      <div className="overflow-hidden rounded-lg">
        <img
          src={img ? `https://image.tmdb.org/t/p/w500${img}` : noImg}
          alt={title}
          className="rounded-lg object-cover w-full h-56 transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg"></div>

      <button
        onClick={toggleWatchlist}
        className="absolute top-2 right-2 bg-black/50 p-2 rounded-full text-white hover:bg-primary transition"
      >
        {wishlisted ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
      </button>

      <div className="absolute bottom-3 left-3">
        <p className="text-gray-300 text-xs flex items-center gap-2">
          {year}
          {year && <span className="w-1 h-1 rounded-full bg-gray-300"></span>}
          {icon}
          {type}
          {cert && <span className="w-1 h-1 rounded-full bg-gray-300"></span>}
          {cert}
        </p>

        <h2 className="text-white font-bold text-lg leading-tight drop-shadow-lg line-clamp-1">
          {title}
        </h2>
      </div>
    </div>
  );
};

MediaCard.propTypes = {
  img: PropTypes.string,
  year: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  icon: PropTypes.object,
  type: PropTypes.string,
  cert: PropTypes.string,
  title: PropTypes.string,
  mediaId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default MediaCard;
