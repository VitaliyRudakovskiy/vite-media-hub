import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import AuthForm from "../components/AuthForm";
import CardDetails from "../components/CardDetails";
import LikedCards from "../components/pages/LikedCards";
import BookmarkedCards from "../components/pages/BookmarkedCards";
import Subscriptions from "../components/pages/Subscriptions";
import Settings from "../components/pages/Settings";
import MyCards from "../components/pages/MyCards";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cards",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cards/:id",
    element: <CardDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cards/search",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/settings",
    element: <Settings />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <MyCards />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/likes",
    element: <LikedCards />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/bookmarks",
    element: <BookmarkedCards />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/subscriptions",
    element: <Subscriptions />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/settings",
    element: <Settings />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
