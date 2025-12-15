import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Popcorn, User } from "lucide-react";
import { supabase } from "@/lib/supabase";

const Header = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

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
    <header className="w-full px-3 md:px-5 py-3 md:py-4 flex items-center justify-between bg-[#0f172a]/70 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40 shadow-lg">
      <div className="flex items-center gap-2">
        <Popcorn className="text-yellow-500 size-7" />
        <h1 className="text-white text-2xl font-extrabold tracking-wide">
          Cinebite
        </h1>
      </div>

      <div className="flex items-center sm:hidden">
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
    </header>
  );
};

export default Header;
