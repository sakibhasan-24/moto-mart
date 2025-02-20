import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import matchRouter from "../../utils/matchRouter";

export default function AuthLayout() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 ">
      {/* Navigation Links */}
      <nav className="mb-6 flex space-x-6 bg-gray-800 px-6 py-3 rounded-lg shadow-lg">
        <Link
          to="/login"
          className={`text-4xl text-blue-700  font-semibold neon-text-auth 
            transition-all duration-500 ease-in-out 
            hover:text-sky-50 hover:bg-teal-700 hover:px-4 hover:py-2 
            hover:rounded-lg hover:scale-110 
            ${
              matchRouter("/login")
                ? "scale-110 bg-teal-700 text-sky-50 p-2 rounded-lg "
                : ""
            }`}
        >
          Login
        </Link>
        <Link
          to="/signup"
          className={`text-4xl text-green-600 font-semibold neon-text-auth 
            transition-all duration-500 ease-in-out 
            hover:text-sky-50 hover:bg-green-700 hover:px-4 hover:py-2 
            hover:rounded-lg hover:scale-110 
            ${
              matchRouter("/signup")
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
