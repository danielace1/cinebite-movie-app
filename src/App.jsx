import { Route, Routes } from "react-router-dom";

import Loading from "./components/Loading.jsx";

import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import MoviesList from "./Pages/Movies.jsx";
import TVShows from "./Pages/TVShows.jsx";
import Watchlist from "./Pages/Watchlist.jsx";
// import MovieDetails from "./Pages/MovieDetails.jsx";
// import TVshowDetails from "./Pages/TVshowDetails.jsx";
import NotFound from "./Pages/NotFound.jsx";
import UserLayout from "./Layout/UserLayout.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/user" element={<UserLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="movies" element={<MoviesList />} />
          {/* <Route path="movies/:id/details" element={<MovieDetails />} /> */}
          <Route path="tvshows" element={<TVShows />} />
          {/* <Route path="tvshows/:id/details" element={<TVshowDetails />} /> */}
          <Route path="watchlist" element={<Watchlist />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
