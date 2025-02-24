import { motion } from "framer-motion";
import { FaSadTear } from "react-icons/fa";

export default function ProductCard({ product }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative w-80 p-5 rounded-lg overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl"
      style={{
        background:
          "linear-gradient(135deg, rgba(25, 29, 52, 0.9), rgba(54, 0, 51, 0.9))",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Image Section */}
      <div className="relative h-52 rounded-lg overflow-hidden">
        <motion.img
          src={
            product.image ||
            "https://bsmedia.business-standard.com/_media/bs/img/article/2023-07/11/full/1689070314-2921.jpg?im=FeatureCrop,size=(826,465)"
          }
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />

        <motion.div
          whileHover={{ scale: 1.1 }}
          className="absolute top-3 left-3 bg-yellow-500 text-black text-xs font-semibold px-4 py-1 rounded-full shadow-lg backdrop-blur-md"
        >
          {product.brand}
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full shadow-lg ${
            product.inStock
              ? "bg-green-400 text-black"
              : "bg-red-500 text-white"
          } backdrop-blur-md`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="p-4 text-center">
        <h2
          className="text-2xl font-bold text-white"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {product.name}
        </h2>
        <p className="text-lg text-gray-300 mt-1">
          Price:{" "}
          <span className="text-yellow-400 font-semibold">
            ${product.price}
          </span>
        </p>

        <div className="mt-2">
          {product.averageRating > 0 ? (
            <p className="text-sm text-gray-300">
              ⭐ {product.averageRating.toFixed(1)} Reviews
            </p>
          ) : (
            <p className="text-sm text-gray-400 flex gap-2 items-center justify-center">
              No reviews yet{" "}
              <FaSadTear className="text-blue-500 text-xl font-bold" />
            </p>
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-6 py-2 bg-gradient-to-r from-yellow-500 to-yellow-700 text-black text-lg font-semibold rounded-full shadow-lg hover:from-yellow-600 hover:to-yellow-800 transition-all"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
}
