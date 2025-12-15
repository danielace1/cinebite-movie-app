import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import { useWatchlistStore } from "@/store/useWatchlistStore";
import Footer from "@/components/Footer";

const UserLayout = () => {
  const { user } = useAuthStore();
  const { fetchWatchlist } = useWatchlistStore();

  useEffect(() => {
    if (user) fetchWatchlist(user.id);
  }, [user, fetchWatchlist]);

  return (
    <div className="bg-primary-col2 min-h-screen">
      <div className="2xl:container flex">
        <Navbar />
        <main className="flex-1 sm:pl-14 md:pl-16 lg:pl-20 pb-[50px] md:pb-0">
          <Header />
          <div className="mt-4">
            <Outlet />
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
