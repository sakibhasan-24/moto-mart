// @ts-nocheck
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAddProductMutation } from "../productsApi";
import { toast } from "react-toastify";

export default function BikeCreate() {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    price: 1,
    quantity: 10,
    inStock: true,
    image: null as File | null,
  });

  const [errors, setErrors] = useState({ name: "", price: "", quantity: "" });
  const categories = ["Mountain", "Road", "Electric", "Hybrid"];
  const [addProduct, { isLoading }] = useAddProductMutation();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, image: e.target.files[0] as any }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Please select an image.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized! Please log in again.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("brand", formData.brand);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("quantity", formData.quantity.toString());
    formDataToSend.append("price", formData.price.toString());
    formDataToSend.append("image", formData.image);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("inStock", formData.inStock.toString());

    try {
      await addProduct({ formData: formDataToSend, token }).unwrap();
      toast.success("Bike added successfully!");
    } catch (error) {
      console.error("Error adding bike:", error);
      toast.error("Failed to add bike.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-3xl bg-gray-800/50 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-yellow-400 mb-8">
          🏍️ Add a New Bike
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Name */}
          <div className="col-span-2">
            <label className="block text-lg font-semibold">Bike Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg bg-gray-800/50 text-white border border-gray-600 focus:border-yellow-500 focus:outline-none"
              placeholder="Enter bike name"
              required
            />
          </div>

          {/* Brand */}
          <div>
            <label className="block text-lg font-semibold">Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg bg-gray-800/50 text-white border border-gray-600 focus:border-yellow-500 focus:outline-none"
              placeholder="Enter brand name"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-lg font-semibold">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg bg-gray-800/50 text-white border border-gray-600 focus:border-yellow-500 focus:outline-none"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category} value={category} className="text-black">
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-lg font-semibold">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg bg-gray-800/50 text-white border border-gray-600 focus:border-yellow-500 focus:outline-none"
              placeholder="Enter price"
              required
            />
            {errors.price && (
              <p className="text-red-400 text-sm break-words">{errors.price}</p>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-lg font-semibold">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg bg-gray-800/50 text-white border border-gray-600 focus:border-yellow-500 focus:outline-none"
              placeholder="Enter quantity"
              required
            />
            {errors.quantity && (
              <p className="text-red-400 text-sm break-words">
                {errors.quantity}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div className="col-span-2">
            <label className="block text-lg font-semibold">Bike Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full mt-2 p-2 rounded-lg bg-gray-800/50 text-white border border-gray-600 focus:border-yellow-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-600"
              required
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-lg font-semibold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-2 p-3 h-32 min-h-[6rem] md:h-40 rounded-lg bg-gray-800/50 text-white border border-gray-600 focus:border-yellow-500 focus:outline-none"
              placeholder="Enter bike description"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <motion.button
              type="submit"
              whileHover={{ scale: isLoading ? 1 : 1.05 }}
              whileTap={{ scale: isLoading ? 1 : 0.95 }}
              className={`w-full py-3 text-base sm:text-lg text-black font-semibold rounded-lg shadow-md transition-all
                ${
                  isLoading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800"
                }
              `}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Uploading...
                </span>
              ) : (
                "🚀 Add Bike"
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}
