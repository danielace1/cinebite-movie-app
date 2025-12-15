import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Lock, BookmarkX, Trash2 } from "lucide-react";

import Loading from "@/components/Loading";
import { useAuthStore } from "@/store/useAuthStore";
import { useWatchlistStore } from "@/store/useWatchlistStore";

const Watchlist = () => {
  const { user, loading: authLoading } = useAuthStore();
  const { list, loading, fetchWatchlist, removeItem } = useWatchlistStore();

  useEffect(() => {
    if (user) fetchWatchlist(user.id);
  }, [user, fetchWatchlist]);

  if (authLoading || loading) return <Loading />;

  // If user is not logged in
  if (!user) {
    return (
      <div className="flex items-center justify-center h-[70vh] px-4">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-xl p-8 max-w-md text-center">
          <Lock className="mx-auto mb-4 w-10 h-10 text-gray-400" />

          <h1 className="text-2xl font-bold text-white mb-2">Login Required</h1>

          <p className="text-gray-400 text-sm mb-6">
            Login to save and view your watchlist.
          </p>

          <Link
            to="/login"
            className="inline-flex w-full justify-center rounded-xl bg-gray-700 px-6 py-2.5 text-white font-semibold hover:bg-gray-600 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // If watchlist is empty
  if (list.length === 0) {
    return (
      <div className="px-6 py-10 max-w-7xl mx-auto text-center">
        <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl p-10">
          <BookmarkX className="mx-auto mb-4 w-10 h-10 text-gray-400" />

          <h2 className="text-xl font-semibold text-white mb-2">
            Your watchlist is empty
          </h2>

          <p className="text-gray-400 text-sm mb-6">
            Start adding movies and TV shows.
          </p>

          <Link
            to="/movies"
            className="rounded-xl bg-gray-700 px-6 py-2.5 text-white font-semibold hover:bg-gray-600 transition"
          >
            Browse Movies
          </Link>
        </div>
      </div>
    );
  }

  // Display watchlist items
  return (
    <div className="px-6 py-5 mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Your Watchlist</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {list.map((item) => (
          <Link
            key={`${item.media_type}-${item.id}`}
            to={
              item.media_type === "movie"
                ? `/movies/${item.media_id}/details`
                : `/TVshows/${item.media_id}/details`
            }
          >
            <div
              key={item.id}
              className="group relative rounded-xl overflow-hidden bg-black/40 border border-white/10"
            >
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : "/no-poster.jpg"
                }
                alt={item.title}
                className="h-64 w-full object-cover group-hover:scale-105 transition"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              <button
                onClick={() => removeItem(item.id)}
                className="absolute top-2 right-2 bg-black/60 p-2 rounded-full text-white hover:bg-red-500 transition"
              >
                <Trash2 size={16} />
              </button>

              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-sm text-gray-300 mb-1">
                  {item.media_type.toUpperCase()}
                </p>
                <h3 className="text-white font-semibold line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
