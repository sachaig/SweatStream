import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/HomePage";
import Category from "./pages/CategoryPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import Viewing from "./pages/ViewingPage";
import SignInPage from "./pages/SignInPage";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/register",
        element: <SubscriptionPage />
      },
      {
        path: "/login",
        element: <SignInPage />,
      },
      {
        path: "/viewing",
        element: <Viewing />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);