import { Popcorn } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full px-3 md:px-5 py-3 md:py-4 flex items-center justify-between bg-[#0f172a]/70 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40 shadow-lg">
      <div className="flex items-center gap-2">
        <Popcorn className="text-yellow-500 size-7" />
        <h1 className="text-white text-2xl font-extrabold tracking-wide">
          Cinebite
        </h1>
      </div>

      <div className="flex items-center sm:hidden">
        <img
          src="https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=John+Doe"
          alt="profile"
          className="w-9 h-9 rounded-full border border-white/20 shadow-md hover:scale-105 transition"
        />
      </div>
    </header>
  );
};

export default Header;
