import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

type MegaMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 "
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal content */}
          <motion.div
            className="fixed inset-x-0 top-16 z-50 max-w-7xl mx-auto rounded-b-2xl shadow-2xl p-10 overflow-auto max-h-[80vh] backdrop-blur-xl border border-gray-700"
            style={{
              background: "linear-gradient(135deg, #001f3f 0%, #000000 100%)",
            }}
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button
              className="absolute top-4 right-6 text-gray-300 hover:text-white text-3xl font-bold"
              onClick={onClose}
              aria-label="Close mega menu"
            >
              ×
            </button>

            <h2 className="text-3xl font-bold mb-8 text-center text-cyan-400 neon-text tracking-wider">
              Explore Categories
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-white">
              {/* By Brand */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-pink-400 border-b border-pink-400 pb-2">
                  🏍️ By Brand
                </h3>
                <ul className="space-y-2 text-lg grid ">
                  {["Honda", "Yamaha", "Suzuki"].map((brand) => (
                    <Link
                      to={`/search/${brand}`}
                      key={brand}
                      className="cursor-pointer hover:text-cyan-400 hover:translate-x-2 transition-transform duration-300"
                    >
                      {brand}
                    </Link>
                  ))}
                </ul>
              </div>

              {/* By Engine */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-400 border-b border-green-400 pb-2">
                  ⚙️ By Engine
                </h3>
                <ul className="space-y-2 text-lg grid">
                  {["100cc", "150cc", "200cc+"].map((engine) => (
                    <Link
                      to={`/search/${engine}`}
                      key={engine}
                      className="cursor-pointer hover:text-cyan-400 hover:translate-x-2 transition-transform duration-300"
                    >
                      {engine}
                    </Link>
                  ))}
                </ul>
              </div>

              {/* Accessories */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-yellow-400 border-b border-yellow-400 pb-2">
                  🧤 Accessories
                </h3>
                <ul className="space-y-2 text-lg grid">
                  {["Helmet", "Gloves", "Engine Oil"].map((item) => (
                    <Link
                      to={`/all/products/${item}`}
                      key={item}
                      className="cursor-pointer hover:text-cyan-400 hover:translate-x-2 transition-transform duration-300"
                    >
                      {item}
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
