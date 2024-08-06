import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="bg-primary-col2 p-4 min-h-screen">
      <div className="container flex">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
