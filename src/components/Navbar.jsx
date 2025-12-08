import { Link, NavLink } from "react-router-dom";
import { Home, Film, Tv, Bookmark, Clapperboard } from "lucide-react";

const Navbar = () => {
  const navItems = [
    { to: "/user/dashboard", icon: <Home size={26} />, label: "Dashboard" },
    { to: "/user/movies", icon: <Film size={26} />, label: "Movies" },
    { to: "/user/TVshows", icon: <Tv size={26} />, label: "TV Shows" },
    { to: "/user/watchlist", icon: <Bookmark size={26} />, label: "Watchlist" },
  ];

  return (
    <nav className="bg-[#1b263b]/80 backdrop-blur-xl md:py-3 h-[95vh] rounded-xl flex flex-col justify-between shadow-xl border border-white/10 fixed left-0 md:left-3 top-3 md:w-16 transition-all duration-300 z-50 max-sm:bottom-0 max-sm:top-auto max-sm:h-12 max-sm:w-full max-sm:flex-row max-sm:items-center max-sm:px-5 max-sm:rounded-t-md max-sm:rounded-b-none">
      <div
        className="flex flex-col items-center max-sm:hidden"
        title="Cinebite"
      >
        <Link to="/user/dashboard">
          <Clapperboard
            size={34}
            className="text-primary-col4 hover:text-red-500 transition duration-300"
          />
        </Link>
      </div>

      <ul className="flex flex-col items-center space-y-8 max-sm:flex-row max-sm:space-y-0 max-sm:justify-between max-sm:w-full">
        {navItems.map(({ to, icon, label }) => (
          <li key={to} className="relative group">
            <NavLink
              to={to}
              className={({ isActive }) =>
                `relative p-2 rounded-lg flex items-center justify-center hover:bg-white/10 transition duration-300
                ${isActive ? "text-red-400 scale-110" : "text-gray-300"}`
              }
            >
              {({ isActive }) => (
                <>
                  {icon}
                  {isActive && (
                    <span className="absolute left-[-10px] w-1 h-7 bg-red-500 rounded-full max-sm:hidden"></span>
                  )}
                </>
              )}
            </NavLink>

            <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-300 whitespace-nowrap max-sm:hidden">
              {label}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex justify-center items-end max-sm:hidden">
        <img
          src="https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=John+Doe"
          alt="profile"
          className="w-10 h-10 rounded-full border border-white/20 shadow-md hover:scale-105 transition"
        />
      </div>
    </nav>
  );
};

export default Navbar;
