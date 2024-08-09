import PropTypes from "prop-types";

const TrendingMovieCard = ({ img, year, icon, type, adult, title }) => {
  return (
    <div className="relative">
      <img src={img} alt={title} className="rounded-lg object-cover" />

      <div className="absolute top-1 right-1 bg-black p-2 bg-opacity-35 rounded-full z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          className="fill-current text-white hover:cursor-pointer"
        >
          <path d="m12 18l-4.2 1.8q-1 .425-1.9-.162T5 17.975V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v12.975q0 1.075-.9 1.663t-1.9.162zm0-2.2l5 2.15V5H7v12.95zM12 5H7h10z"></path>
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          className="hidden fill-current text-white hover:cursor-pointer"
        >
          <path d="m12 16.923l-3.738 1.608q-.808.348-1.535-.134Q6 17.916 6 17.052V5.616q0-.691.463-1.153T7.616 4h8.769q.69 0 1.153.463T18 5.616v11.436q0 .864-.727 1.345q-.727.482-1.535.134z"></path>
        </svg>
      </div>

      {/* Dark fade effect at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-full rounded-lg overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      <div className="absolute bottom-3.5 left-2.5">
        <div className="text-slate-200 mb-1 flex items-center text-sm capitalize">
          {year}&nbsp;
          <span className="w-0.5 h-0.5 rounded-full bg-slate-200"></span>
          &nbsp;
          {icon}
          &nbsp;{type}&nbsp;
          <span className="w-0.5 h-0.5 rounded-full bg-slate-200"></span>
          &nbsp;{adult}
        </div>
        <h2 className="text-white font-bold">{title}</h2>
      </div>
    </div>
  );
};

TrendingMovieCard.propTypes = {
  img: PropTypes.string,
  year: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  icon: PropTypes.object,
  type: PropTypes.string,
  adult: PropTypes.string,
  title: PropTypes.string,
};

export default TrendingMovieCard;
