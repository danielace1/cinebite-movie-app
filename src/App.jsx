import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore.js";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Movies from "./pages/Movies.jsx";
import TVShows from "./pages/TVShows.jsx";
import Watchlist from "./pages/Watchlist.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import TVShowDetails from "./pages/TVShowDetails.jsx";
import NotFound from "./pages/NotFound.jsx";
import UserLayout from "./layout/UserLayout.jsx";

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
