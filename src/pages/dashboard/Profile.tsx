import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { FaUserCircle, FaEnvelope, FaKey } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Profile() {
  const { user } = useAppSelector((state) => state.auth);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password Change Requested:", passwordData);
  };

  return (
    <div className="flex justify-center  items-center min-h-screen bg-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative border-2 animate-border bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-xl max-w-md w-full text-white overflow-hidden"
      >
        <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 shadow-lg transform rotate-45 translate-x-0.5 -translate-y-2">
          🟢 Active
        </div>

        <div className="flex justify-center">
          <FaUserCircle className="text-blue-500 text-6xl" />
        </div>

        <h2 className="text-2xl font-semibold text-center mt-3">
          {user?.name || "User Name"}
        </h2>
        <p className="text-gray-300 text-center flex items-center justify-center">
          <FaEnvelope className="mr-2" />
          {user?.email || "user@example.com"}
        </p>

        <form onSubmit={handlePasswordChange} className="mt-6 space-y-4">
          <div className="relative">
            <FaKey className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={passwordData.currentPassword}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white p-3 pl-10 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div className="relative">
            <FaKey className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white p-3 pl-10 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-3 rounded-lg shadow-md"
          >
            Change Password
          </button>
        </form>
      </motion.div>
    </div>
  );
}
