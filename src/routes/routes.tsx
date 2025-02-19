import { createBrowserRouter, Router } from "react-router";
import MainLayout from "../layout/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <h1>Something went Wrong</h1>,
    children: [
      { path: "/", element: <h1>Home</h1> },
      { path: "about", element: <h1>About</h1> },
      { path: "contact", element: <h1>Contact</h1> },
    ],
  },
]);

export default router;
