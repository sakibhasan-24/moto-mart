import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";

const SearchBox = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className="relative w-full max-w-[250px] mx-auto"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div
        className={`flex items-center border rounded-full transition-all duration-300 px-3 py-1.5 bg-gray-900 ${
          isFocused
            ? "border-blue-500 shadow-sm shadow-blue-500"
            : "border-gray-600"
        }`}
      >
        <FiSearch className="text-gray-400 text-sm mr-1.5" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-white outline-none text-sm w-full placeholder-gray-400"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </motion.div>
  );
};

export default SearchBox;
