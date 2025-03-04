import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import matchRouter from "../../utils/matchRouter";

export default function AuthLayout() {
  return (
    <div className="flex p-6 flex-col items-center justify-center my-6 min-h-screen ">
      {/* Navigation Links */}
      <nav
        className="mb-6 flex  border-4 
      border-transparent animate-border space-x-6 bg-gray-800 px-6 py-3 rounded-lg shadow-lg"
      >
        <Link
          to="/auth/login"
          className={`text-4xl text-blue-700  font-semibold neon-text-auth 
            transition-all duration-500 ease-in-out 
            hover:text-sky-50 hover:bg-teal-700 hover:px-4 hover:py-2 
            hover:rounded-lg hover:scale-110 
            ${
              matchRouter("/auth/login")
                ? "scale-110 bg-teal-700 text-sky-50 p-2 rounded-lg "
                : ""
            }`}
        >
          Login
        </Link>
        <Link
          to="/auth/signup"
          className={`text-4xl text-green-600 font-semibold neon-text-auth 
            transition-all duration-500 ease-in-out 
            hover:text-sky-50 hover:bg-green-700 hover:px-4 hover:py-2 
            hover:rounded-lg hover:scale-110 
            ${
              matchRouter("/auth/signup")
                ? "scale-110 bg-teal-700 text-sky-50 p-2 rounded-lg "
                : ""
            }`}
        >
          Signup
        </Link>
      </nav>

      {/* Page Content (Login/Signup Forms) */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
