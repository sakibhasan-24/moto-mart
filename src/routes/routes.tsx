import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/auth/Login";
import AuthLayout from "../pages/auth/AuthLayout";
import Signup from "../pages/auth/Signup";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/dashboard/Profile";
import ProtectedRoute from "./protectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <h1>Something went Wrong</h1>,
    children: [
      { path: "about", element: <h1>About</h1> },
      { path: "/", element: <Home /> },
      { path: "contact", element: <h1>Contact</h1> },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "profile",
            element: (
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            ),
          },
          {
            path: "orders",
            element: <Profile />,
          },
        ],
      },
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          { path: "login", element: <Login /> },
          { path: "signup", element: <Signup /> },
        ],
      },
    ],
  },
]);

export default router;
