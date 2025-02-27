import { useState } from "react";
// import { useAppSelector } from "../../redux/hooks";
import { useChangeUserPasswordMutation } from "../../redux/api/user.api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function Profile() {
  // const { user } = useAppSelector((state) => state.auth);
  const token = localStorage.getItem("token");

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [changePassword, { isLoading }] = useChangeUserPasswordMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("User not authenticated. Please log in again.");
      return;
    }

    try {
      await changePassword({ ...passwordData, token }).unwrap();
      toast.success("Password changed successfully! 🔥");
      setPasswordData({ oldPassword: "", newPassword: "" });
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to change password.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-center items-center min-h-screen "
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
        className="p-6 bg-gray-800 text-white rounded-lg shadow-lg max-w-sm w-full"
      >
        <h2 className="text-2xl font-semibold text-center">Change Password</h2>

        <form onSubmit={handlePasswordChange} className="mt-6 space-y-4">
          <input
            type="password"
            name="oldPassword"
            placeholder="Current Password"
            value={passwordData.oldPassword}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={isLoading}
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={passwordData.newPassword}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={isLoading}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-3 rounded-lg shadow-md"
            disabled={isLoading}
          >
            {isLoading ? "Changing..." : "Change Password"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
