import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useUpdateProfileMutation } from "../../redux/api/user.api";

export default function ProfileOverView() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please login again.");
      return;
    }

    try {
      await updateProfile({ token, profile: formData }).unwrap();
      toast.success("Profile updated successfully!");

      const updatedUser = { ...user, ...formData };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setEditMode(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black to-gray-900 text-white px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="bg-gray-800 bg-opacity-90 rounded-xl shadow-2xl p-8 max-w-md w-full"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center mb-6">
          <img
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${
              formData.name || "User"
            }`}
            alt="avatar"
            className="w-24 h-24 rounded-full mx-auto border-4 border-yellow-400 shadow-md"
          />
          <h2 className="mt-4 text-3xl font-bold text-yellow-300">
            {formData.name || "User"}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Role:{" "}
            <span className="font-medium text-blue-400">
              {user?.role || "Customer"}
            </span>
          </p>
        </div>

        {!editMode ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400">Email</label>
              <p className="bg-gray-700 px-4 py-2 rounded-md text-white font-medium">
                {formData.email}
              </p>
            </div>
            <button
              onClick={() => setEditMode(true)}
              className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition"
            >
              ✏️ Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "✅ Save"}
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition"
              >
                ❌ Cancel
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
