import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="bg-primary-col2 min-h-screen">
      <div className="2xl:container flex">
        <Navbar />
        <main className="flex-1 sm:pl-14 md:pl-16 lg:pl-20 pb-[70px] md:pb-8">
          <Header />
          <div className="mt-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
