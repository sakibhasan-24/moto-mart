import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetProductsMutation } from "../../redux/api/productsApi"; // RTK mutation hook
import Product from "../../pages/products/Product";
import { Link } from "react-router-dom";
import { Skeleton } from "antd";
import ProductSkeleton from "../skeleton/Skeleton";
import ViewMore from "../shared-button/ViewMore";

const categories = [
  { id: "all", name: "all", icon: "🏍️" },
  { id: "electric", name: "Electric", icon: "⚡" },
  { id: "hybrid", name: "Hybrid", icon: "🔋" },
  { id: "scooter", name: "Scooter", icon: "🛴" },
  { id: "sports", name: "Sports", icon: "🏁" },
  { id: "cycle", name: "Cycle", icon: "🚲" },
  { id: "cruiser", name: "Cruiser", icon: "🛵" },
  { id: "dirt", name: "Dirt Bike", icon: "🏜️" },
  { id: "touring", name: "Touring", icon: "🧳" },
  { id: "electric-bike", name: "Electric Bike", icon: "⚙️" },
  { id: "commuter", name: "Commuter", icon: "🚦" },
];

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1, backgroundColor: "#0891b2", color: "#fff" },
  active: {
    scale: 1.1,
    backgroundColor: "#0e7490",
    color: "#fff",
    boxShadow: "0 0 10px #0e7490",
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const productVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Categories() {
  const [activeCat, setActiveCat] = useState("all");
  const [getProducts, { data, isLoading, error }] = useGetProductsMutation();

  useEffect(() => {
    getProducts({
      limit: 3,
      page: 1,
      searchTerm: "",
      minPrice: 0,
      maxPrice: 0,
      category: activeCat === "all" ? "" : activeCat,
    });
  }, [activeCat, getProducts]);

  const products = data?.data?.data || [];

  return (
    <section className="py-12 sm:max-w-6xl mx-auto px-4 mt-2">
      <h2 className="text-3xl font-bold mb-6 text-white text-center">
        Browse by <span className="text-cyan-400">Category</span>
      </h2>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-6 mb-12">
        {categories.map(({ id, name, icon }) => (
          <motion.button
            key={id}
            onClick={() => setActiveCat(name)}
            initial="initial"
            whileHover="hover"
            animate={activeCat === name ? "active" : "initial"}
            variants={buttonVariants}
            className="flex items-center space-x-3 px-5 py-3 rounded-full cursor-pointer transition"
          >
            <span className="text-xl">{icon}</span>
            <span className="font-semibold">{name}</span>
          </motion.button>
        ))}
      </div>

      {/* Loading */}
      {isLoading && (
        <p className="text-center text-white text-xl">
          <ProductSkeleton />
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-red-500 text-xl">
          Error loading products.
        </p>
      )}

      {/* Products */}
      {!isLoading && !error && products.length > 0 && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeCat} // re-animate on category change
        >
          <AnimatePresence>
            {products.map((product: any) => (
              <motion.div
                key={product._id}
                variants={productVariants}
                exit={{ opacity: 0 }}
              >
                <Product product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Empty */}
      {!isLoading && !error && products.length === 0 && (
        <div className="text-center mt-12">
          <p className="text-xl font-semibold text-white">
            No products found in this category.
          </p>
        </div>
      )}
      <ViewMore />
    </section>
  );
}
