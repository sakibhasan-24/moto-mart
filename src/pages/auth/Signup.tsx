import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
  };

  return (
    <div className="flex  items-center justify-center px-6">
      <div
        className="w-full max-w-md  border-4 
      border-transparent animate-border text-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl sm:text-6xl font-bold text-center mb-6 text-green-600">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border-b border-gray-500 py-2">
            <FaUser className="text-gray-400 mr-3" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-transparent outline-none text-white w-full p-2"
              placeholder="Your Name"
              required
            />
          </div>

          <div className="flex items-center border-b border-gray-500 py-2">
            <FaEnvelope className="text-gray-400 mr-3" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent outline-none text-white w-full p-2"
              placeholder="Your Email"
              required
            />
          </div>

          <div className="flex items-center border-b border-gray-500 py-2">
            <FaLock className="text-gray-400 mr-3" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-transparent outline-none text-white w-full p-2"
              placeholder="Your Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
