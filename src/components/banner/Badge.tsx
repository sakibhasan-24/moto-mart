import React from "react";
import { motion } from "framer-motion";
export default function Badge() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="relative inline-block mt-4 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500
     backdrop-blur-md text-white px-6 py-3 rounded-full shadow-lg text-sm font-semibold mx-5
     animate-pulse border border-white/20"
    >
      <div className="absolute inset-0 rounded-full bg-blue-500 blur-lg opacity-50"></div>

      <div className="relative flex items-center space-x-2">
        <span className="text-lg">🏍️</span>
        <span className="uppercase font-bold tracking-wide">
          Limited Time Offer: 30% Off!
        </span>
      </div>
    </motion.div>
  );
}
