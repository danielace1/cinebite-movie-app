import { Link } from "react-router-dom";
import { Popcorn, Github, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-10 border-t border-white/10 bg-black/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 md:px-6 py-4 grid grid-cols-3 items-center text-xs sm:text-sm text-gray-400">
        <Link
          to="/"
          className="flex items-center gap-1 justify-self-start hover:opacity-90 transition"
        >
          <Popcorn className="size-5 text-yellow-500" />
          <span className="font-semibold text-white text-lg tracking-tight">
            Cine<span className="text-gray-400">Bite</span>
          </span>
        </Link>

        <div className="text-center tracking-wide">
          &copy; {new Date().getFullYear()} · All rights reserved
        </div>

        <div className="justify-self-end flex items-center gap-1">
          <span className="hidden sm:inline">Built with</span>
          <Heart className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          <span className="hidden sm:inline">by</span>

          <a
            href="https://github.com/danielace1"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-white font-medium hover:text-gray-200 transition"
            aria-label="GitHub"
          >
            Sudharsan
            <Github className="w-4 h-4 opacity-80" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
