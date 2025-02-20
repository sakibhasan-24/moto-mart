import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/auth/Login";
import AuthLayout from "../pages/auth/AuthLayout";
import Signup from "../pages/auth/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <h1>Something went Wrong</h1>,
    children: [
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          { path: "login", element: <Login /> },
          { path: "signup", element: <Signup /> },
        ],
      },
      { path: "about", element: <h1>About</h1> },
      { path: "contact", element: <h1>Contact</h1> },
    ],
  },
]);

export default router;
