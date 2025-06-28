import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/auth/Login";
import AuthLayout from "../pages/auth/AuthLayout";
import Signup from "../pages/auth/Signup";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/dashboard/Profile";
import ProtectedRoute from "./protectedRoutes";
import ProductDetails from "../pages/products/ProductDetails";
import ProductCreate from "../redux/api/admin/ProductCreate";
import AdminRoute from "./adminRoutes";
import AdminProducts from "../redux/api/admin/AdminProducts";
import AdminEditProducts from "../redux/api/admin/AdminEditProducts";
import CartItems from "../pages/Cart/CartItems";
import ConfirmOrder from "../pages/orderPlace/ConfirmOrder";
import Payment from "../pages/payment/Payment";
import OrderList from "../pages/dashboard/OrderList";
import Users from "../pages/dashboard/Users";
import AboutUs from "../pages/AboutUs";
import SearchProducts from "../pages/search/SearchProducts";
import Contact from "../pages/contact/Contact";
import Blogs from "../pages/blogs/Blogs";
import BlogDetails from "../pages/blogs/BlogDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <h1>Something went Wrong</h1>,
    children: [
      { path: "/about", element: <AboutUs /> },
      { path: "/", element: <Home /> },
      { path: "/all/products", element: <SearchProducts /> },
      { path: "/contact", element: <Contact /> },
      { path: "/blogs", element: <Blogs /> },
      { path: "/blog/:id", element: <BlogDetails /> },
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
            path: "orders-list",
            element: (
              <ProtectedRoute>
                <OrderList />
              </ProtectedRoute>
            ),
          },
          {
            path: "users",
            element: (
              <ProtectedRoute>
                <AdminRoute>
                  <Users />
                </AdminRoute>
              </ProtectedRoute>
            ),
          },
          {
            path: "admin/products",
            element: (
              <ProtectedRoute>
                <AdminRoute>
                  <AdminProducts />
                </AdminRoute>
              </ProtectedRoute>
            ),
          },
          {
            path: "admin/create-product",
            element: (
              <ProtectedRoute>
                <AdminRoute>
                  <ProductCreate />
                </AdminRoute>
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
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },

      {
        path: "/cart-items",
        element: <CartItems />,
      },
      {
        path: "/admin/edit-product/:id",
        element: (
          <ProtectedRoute>
            <AdminRoute>
              <AdminEditProducts />
            </AdminRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "/confirm-order",
        element: (
          <ProtectedRoute>
            <ConfirmOrder />
          </ProtectedRoute>
        ),
      },

      {
        path: "/payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
