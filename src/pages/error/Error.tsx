import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function Error() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center text-white px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-7xl font-extrabold text-yellow-400 mb-4 animate-bounce">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-300 text-lg mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded transition-all duration-300"
        >
          <FaArrowLeft /> Back to Home
        </Link>
      </div>

      <div className="mt-10 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Moto Mart. All rights reserved.
      </div>
    </div>
  );
}
