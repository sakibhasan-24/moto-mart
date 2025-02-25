import { useEffect, useState } from "react";
import { useGetProductsMutation } from "../productsApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

export default function AdminProducts() {
  const [getProducts, { data: products, error, isLoading }] =
    useGetProductsMutation();
  const [showAll, setShowAll] = useState(false); // Toggle state

  useEffect(() => {
    getProducts({ limit: 6 });
  }, [getProducts]);

  const handleShowAll = () => {
    if (!showAll) {
      getProducts({ limit: products?.allLists });
    } else {
      getProducts({ limit: 6 });
    }
    setShowAll(!showAll);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={50} color="#facc15" />{" "}
      </div>
    );
  }

  if (error) {
    console.error("Error fetching products:", error);
    toast.error("Failed to load products.");
    return (
      <div className="text-center text-red-500 text-xl mt-10">
        ❌ Error loading products.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6">
        📦 Product List
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-700 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-yellow-500 text-black text-lg">
              <th className="p-4 border border-gray-700">Image</th>
              <th className="p-4 border border-gray-700">Product Name</th>
              <th className="p-4 border border-gray-700">Brand</th>
              <th className="p-4 border border-gray-700">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {products?.data?.data?.map((product: any, index: number) => (
              <tr
                key={product._id}
                className={`transition-all duration-300  hover:shadow-xl hover:bg-gray-800 ${
                  index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                }`}
              >
                <td className="p-4 border border-gray-700 text-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg mx-auto transition-transform hover:scale-110"
                  />
                </td>
                <td className="p-4 border border-gray-700 text-center font-semibold">
                  {product.name}
                </td>
                <td className="p-4 border border-gray-700 text-center text-gray-400">
                  {product.brand}
                </td>
                <td className="p-4 border border-gray-700 text-center">
                  <div className="flex justify-center gap-3">
                    <Link
                      to={`/admin/edit-product/${product._id}`}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                    >
                      <FaEdit /> Edit
                    </Link>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2 hover:bg-red-700 transition">
                      <FaTrash /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products?.data?.data?.length > 3 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleShowAll}
            className="px-6 py-2 cursor-pointer bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition-all duration-200 transform hover:scale-105"
          >
            {showAll ? " Show Less" : " Show All"}
          </button>
        </div>
      )}
    </div>
  );
}
