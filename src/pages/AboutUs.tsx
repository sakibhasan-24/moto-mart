import { motion } from "framer-motion";
import { FaShippingFast, FaShieldAlt, FaBoxOpen } from "react-icons/fa";

export default function AboutUs() {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-8 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-4">
          Welcome to Our Store 🏆
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Experience the **latest trends**, **fastest delivery**, and **secure
          payments** – all in one place.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-6xl">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="p-6 bg-gray-800 rounded-xl shadow-lg flex flex-col items-center text-center"
        >
          <FaBoxOpen className="text-yellow-400 text-6xl mb-4" />
          <h2 className="text-2xl font-bold">Latest Collection</h2>
          <p className="text-gray-400 mt-2">
            Discover the **newest arrivals** and stay ahead in style.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          className="p-6 bg-gray-800 rounded-xl shadow-lg flex flex-col items-center text-center"
        >
          <FaShippingFast className="text-yellow-400 text-6xl mb-4" />
          <h2 className="text-2xl font-bold">Fastest Delivery</h2>
          <p className="text-gray-400 mt-2">
            Your orders reach you **in record time** with our efficient
            logistics.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          className="p-6 bg-gray-800 rounded-xl shadow-lg flex flex-col items-center text-center"
        >
          <FaShieldAlt className="text-yellow-400 text-6xl mb-4" />
          <h2 className="text-2xl font-bold">Secure Payment</h2>
          <p className="text-gray-400 mt-2">
            Your transactions are **safe & encrypted** for maximum security.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
