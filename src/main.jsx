import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import MoviesList from "./Pages/MoviesList.jsx";
import TVShows from "./Pages/TVShows.jsx";
import Watchlist from "./Pages/Watchlist.jsx";
import UserLayout from "./Layout/UserLayout.jsx";

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
        path: "",
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
