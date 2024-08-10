import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import MoviesList from "./Pages/Movies.jsx";
import TVShows from "./Pages/TVShows.jsx";
import Watchlist from "./Pages/Watchlist.jsx";
import UserLayout from "./Layout/UserLayout.jsx";
import DetailsPage from "./Pages/DetailsPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
  {
    path: "user",
    element: <UserLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "movieslist",
        element: <MoviesList />,
      },
      {
        path: "TVshows",
        element: <TVShows />,
      },
      {
        path: "watchlist",
        element: <Watchlist />,
      },
      {
        path: "details",
        element: <DetailsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
