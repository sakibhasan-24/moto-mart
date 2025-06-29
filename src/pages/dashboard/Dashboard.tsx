import { Link, Outlet } from "react-router-dom";
import {
  FaUser,
  FaShoppingBag,
  FaBoxes,
  FaPlus,
  FaLock,
  FaBarcode,
} from "react-icons/fa";
import matchRouter from "../../utils/matchRouter";
import { useAppSelector } from "../../redux/hooks";

export default function Dashboard() {
  // const location = useLocation();
  const { user }: any = useAppSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 sm:bg-gray-800 p-6">
        <h2 className="text-xl hidden sm:block font-semibold mb-4">
          Dashboard
        </h2>

        <nav className="space-y-3 flex flex-row flex-wrap gap-6 sm:flex-col mx-auto sm:mx-0">
          <Link
            to="/dashboard/change-pass"
            className={`flex items-center p-3 rounded-lg transition ${
              matchRouter("/dashboard/change-pass")
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >
            <FaLock className="mr-2" /> change Password
          </Link>
          <Link
            to="/dashboard/profile"
            className={`flex items-center p-3 rounded-lg transition ${
              matchRouter("/dashboard/profile")
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >
            <FaUser className="mr-2" /> profile
          </Link>

          <Link
            to="/dashboard/orders-list"
            className={`flex items-center p-3 rounded-lg transition ${
              matchRouter("/dashboard/orders-list")
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >
            <FaShoppingBag className="mr-2" /> Orders
          </Link>

          {/* Admin Links */}
          {isAdmin && (
            <>
              <Link
                to="/dashboard/stat"
                className={`flex items-center p-3 rounded-lg transition ${
                  matchRouter("/dashboard/stat")
                    ? "bg-blue-600"
                    : "hover:bg-gray-700"
                }`}
              >
                <FaBarcode className="mr-2" /> Statics
              </Link>
              <Link
                to="/dashboard/users"
                className={`flex items-center p-3 rounded-lg transition ${
                  matchRouter("/dashboard/users")
                    ? "bg-blue-600"
                    : "hover:bg-gray-700"
                }`}
              >
                <FaUser className="mr-2" /> Users
              </Link>

              <Link
                to="/dashboard/admin/products"
                className={`flex items-center p-3 rounded-lg transition ${
                  matchRouter("/dashboard/admin/products")
                    ? "bg-blue-600"
                    : "hover:bg-gray-700"
                }`}
              >
                <FaBoxes className="mr-2" /> All Products
              </Link>

              <Link
                to="/dashboard/admin/create-product"
                className={`flex items-center p-3 rounded-lg transition ${
                  matchRouter("/dashboard/admin/create-product")
                    ? "bg-blue-600"
                    : "hover:bg-gray-700"
                }`}
              >
                <FaPlus className="mr-2" /> Add Product
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}
