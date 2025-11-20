import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Root from "../Layout/Root";
import AboutUs from "../pages/AboutUs";
import Coverage from "../pages/Coverage";
import AuthLayout from "../Layout/AuthLayout";

import SignUp from "../pages/SignUp";
import LogIn from "../pages/LogIn";
import BeArider from "../pages/BeArider";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/aboutUs",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/coverage",
        element: <Coverage></Coverage>,
        loader: () => fetch("/warehouses.json").then((res) => res.json()),
      },
      {
        path: "/beArider",
        element: <BeArider></BeArider>,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/logIn",
        element: <LogIn></LogIn>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);
