import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Lock } from "lucide-react";
import Loading from "@/components/Loading";

const Watchlist = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setLoading(false);
    };

    getUser();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-xl p-8 max-w-md">
          <div className="flex justify-center mb-4">
            <Lock className="w-10 h-10 text-gray-400" />
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">Login Required</h1>

          <p className="text-gray-400 text-sm mb-6">
            You need to be logged in to save and view your watchlist.
          </p>

          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-xl bg-gray-700 px-6 py-2.5 text-white font-semibold hover:bg-gray-600 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // ✅ LOGGED IN
  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Your Watchlist</h1>

      {/* Later we’ll map watchlist items here */}
      <p className="text-gray-400">
        Your saved movies and TV shows will appear here.
      </p>
    </div>
  );
};

export default Watchlist;
