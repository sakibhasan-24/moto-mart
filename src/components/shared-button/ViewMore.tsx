import { Link } from "react-router-dom";

export default function ViewMore() {
  return (
    <div className="my-12 flex items-center justify-center">
      <Link
        to="/all/products"
        className="inline-block px-6 py-3 text-white text-lg font-medium bg-gradient-to-r from-cyan-600 to-blue-800 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-300"
      >
        View More
      </Link>
    </div>
  );
}
