import PropTypes from "prop-types";
import { useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import noImg from "../../public/no-img.png";

const MediaCard = ({ img, year, icon, type, cert, title }) => {
  const [wishlisted, setWishlisted] = useState(false);

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
        onClick={() => setWishlisted(!wishlisted)}
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
};

export default MediaCard;
