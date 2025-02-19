import { Link } from "react-router-dom";

export default function RestItems() {
  return (
    <nav className=" p-4 rounded-lg shadow-lg ">
      <ul className="flex space-x-6 justify-center text-sm sm:text-base font-semibold">
        <li>
          <Link
            to="/products"
            className="text-cyan-400 neon-text hover:text-cyan-300 transition-all duration-300"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="text-pink-400 neon-text hover:text-pink-300 transition-all duration-300"
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="text-green-400 neon-text hover:text-green-300 transition-all duration-300"
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}
