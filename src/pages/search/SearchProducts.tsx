import React, { useEffect, useState } from "react";

import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";
import { useGetProductsMutation } from "../../redux/api/productsApi";
import ProductCard from "../products/Product";

export default function SearchProducts() {
  const [getProducts, { data: products, isLoading }] = useGetProductsMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000); // Max price limit
  const [sortBy, setSortBy] = useState("1"); // "1" = latest first, "-1" = oldest
  const [page, setPage] = useState(1);
  const limit = 3; // Products per page

  // Fetch products automatically when filters change
  useEffect(() => {
    const delayFetch = setTimeout(() => {
      getProducts({ searchTerm, minPrice, maxPrice, sortBy, page, limit });
    }, 300); // Debounce API calls

    return () => clearTimeout(delayFetch);
  }, [searchTerm, minPrice, maxPrice, sortBy, page, getProducts]);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6">
        🔍 Search & Filter Products
      </h2>
      {/* Search & Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
        {/* Search Box */}
        <input
          type="text"
          placeholder="Search by name, brand, category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-white w-full md:w-1/3 focus:outline-none focus:ring focus:border-yellow-400"
        />

        {/* Sort Order */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring focus:border-yellow-400"
        >
          <option value="1">Newest First</option>
          <option value="-1">Oldest First</option>
        </select>
      </div>
      {/* Price Range Slider */}
      <div className="mt-6 text-center">
        <label className="text-yellow-400 font-semibold">
          Price Range: ${minPrice} - ${maxPrice}
        </label>
        <div className="flex items-center gap-4 justify-center mt-3">
          <input
            type="number"
            min="0"
            max="5000"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="px-2 py-1 w-20 bg-gray-800 border border-gray-600 rounded-md text-white text-center"
          />
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-40 cursor-pointer"
          />
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-40 cursor-pointer"
          />
          <input
            type="number"
            min="0"
            max="5000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="px-2 py-1 w-20 bg-gray-800 border border-gray-600 rounded-md text-white text-center"
          />
        </div>
      </div>
      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center items-center mt-6">
          <ClipLoader size={40} color="#facc15" />
        </div>
      )}
      {!isLoading &&
        (!products?.data?.data || products?.data?.data?.length === 0) && (
          <motion.div
            className="text-center mt-10 text-red-400 text-xl font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            🚫 No Bike Found!
          </motion.div>
        )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {products?.data?.data?.map((product: any) => (
          <motion.div
            key={product._id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
      //pagi
      {products?.totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-700 text-white rounded-md mx-2 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-yellow-400 px-4 py-2">
            Page {page} of {products?.totalPages}
          </span>
          <button
            onClick={() =>
              setPage((prev) => Math.min(prev + 1, products?.totalPages))
            }
            disabled={page === products?.totalPages}
            className="px-4 py-2 bg-gray-700 text-white rounded-md mx-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
