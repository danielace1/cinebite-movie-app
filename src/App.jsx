import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore.js";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Movies from "./Pages/Movies.jsx";
import TVShows from "./Pages/TVShows.jsx";
import Watchlist from "./Pages/Watchlist.jsx";
import MovieDetails from "./Pages/MovieDetails.jsx";
import TVShowDetails from "./Pages/TVShowDetails.jsx";
import NotFound from "./Pages/NotFound.jsx";
import UserLayout from "./Layout/UserLayout.jsx";

const App = () => {
  const { initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<UserLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:id/details" element={<MovieDetails />} />
          <Route path="tvshows" element={<TVShows />} />
          <Route path="tvshows/:id/details" element={<TVShowDetails />} />
          <Route path="watchlist" element={<Watchlist />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#0f172a",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      />
    </>
  );
};

export default App;
