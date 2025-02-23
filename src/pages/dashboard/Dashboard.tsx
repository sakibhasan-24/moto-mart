import { Link, Outlet, useLocation } from "react-router-dom";
import { FaUser, FaShoppingBag } from "react-icons/fa";
import matchRouter from "../../utils/matchRouter";

export default function Dashboard() {
  const location = useLocation();

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gray-900 text-white">
      <div className="w-64 sm:bg-gray-800 p-6">
        <h2 className="text-xl hidden sm:visible font-semibold mb-4">
          Dashboard
        </h2>

        <nav className="space-y-3 flex flex-row gap-6 sm:flex-none sm:flex-col mx-auto sm:mx-0">
          <Link
            to="/dashboard/profile"
            className={`flex items-center p-3 rounded-lg transition ${
              matchRouter("/dashboard/profile")
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >
            <FaUser className="mr-2" /> Profile
          </Link>

          <Link
            to="/dashboard/orders"
            className={`flex items-center p-3 rounded-lg transition ${
              matchRouter("/dashboard/orders")
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >
            <FaShoppingBag className="mr-2" /> Orders
          </Link>
        </nav>
      </div>

      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}
