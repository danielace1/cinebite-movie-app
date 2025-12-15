import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Home, Film, Tv, Bookmark, Clapperboard, User } from "lucide-react";
import { supabase } from "@/lib/supabase";

const Navbar = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const navItems = [
    { to: "/", icon: <Home size={26} />, label: "Dashboard" },
    { to: "/movies", icon: <Film size={26} />, label: "Movies" },
    { to: "/tvshows", icon: <Tv size={26} />, label: "TV Shows" },
    { to: "/watchlist", icon: <Bookmark size={26} />, label: "Watchlist" },
  ];

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleProfileClick = () => {
    if (!user) navigate("/login");
    else navigate("/profile");
  };

  const avatarUrl = user
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.email
      )}&background=random&color=random`
    : null;

  return (
    <nav className="bg-[#1b263b]/80 backdrop-blur-xl md:py-3 h-[95vh] rounded-xl flex flex-col justify-between shadow-xl border border-white/10 fixed sm:left-1 md:left-2 lg:left-3 top-3 sm:w-14 lg:w-16 transition-all duration-300 z-50 max-sm:bottom-0 max-sm:top-auto max-sm:h-12 max-sm:w-full max-sm:flex-row max-sm:items-center max-sm:px-5 max-sm:rounded-t-md max-sm:rounded-b-none">
      <div
        className="flex flex-col items-center max-sm:hidden"
        title="Cinebite"
      >
        <Link to="/" title="CineBite">
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
                    <span className="absolute left-[-5px] md:left-[-6px] lg:left-[-10px] w-1 h-7 bg-red-500 rounded-full max-sm:hidden"></span>
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
        <button
          onClick={handleProfileClick}
          className="focus:outline-none"
          title={user ? user.email : "Login"}
        >
          {user ? (
            <img
              src={avatarUrl}
              alt="profile"
              className="w-10 h-10 rounded-full border border-white/20 shadow-md hover:scale-105 transition"
            />
          ) : (
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-300 hover:bg-white/10 transition">
              <User size={20} />
            </div>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
