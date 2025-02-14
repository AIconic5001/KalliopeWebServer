import { createBrowserRouter } from "react-router";
import LandingPage from "../pages/Landing/LandingPage";
import AboutPage from "../pages/About";
import Citations from "../pages/Citations";
import SynopsisPage from "../pages/Synopsis";
import Layout from "../layout/MainLayout/Layout";

export const routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/citations",
        element: <Citations />,
      },
      {
        path: "/synopsis",
        element: <SynopsisPage />,
      },
      {
        path: "/vis",
      },
    ],
  },
]);
