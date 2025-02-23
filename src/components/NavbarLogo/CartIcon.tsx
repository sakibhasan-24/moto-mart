import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";

export default function CartIcon() {
  const [cartCount, setCartCount] = useState(1);
  return (
    <div>
      {cartCount > 0 && (
        <div className="relative">
          <button
            className="relative animate-border text-white text-3xl p-3 rounded-full shadow-xl border border-gray-700 
                bg-gradient-to-b from-gray-800 to-black transition-all duration-300 
                hover:border-blue-500 hover:shadow-blue-500/50 flex items-center justify-center"
          >
            <FiShoppingCart className="text-blue-400" />
          </button>

          <span
            className="absolute -top-2 -right-2 text-white text-xs font-bold px-3 py-1 rounded-full 
                  bg-white/20 backdrop-blur-md border border-gray-300 shadow-md"
          >
            {cartCount}
          </span>
        </div>
      )}
    </div>
  );
}
