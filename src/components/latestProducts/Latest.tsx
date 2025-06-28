import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetProductsMutation } from "../../redux/api/productsApi";
import Product from "../../pages/products/Product";
import ProductSkeleton from "../skeleton/Skeleton";
import ViewMore from "../shared-button/ViewMore";

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

export default function LatestProducts() {
  const [getProducts, { data, isLoading, error }] = useGetProductsMutation();

  useEffect(() => {
    getProducts({
      limit: 3,
      page: 1,
      category: "",
      sortBy: "-1",
    });
  }, [getProducts]);

  const products = data?.data?.data || [];

  return (
    <section className="py-12 sm:max-w-6xl mx-auto px-4 mt-2">
      <h2 className="text-3xl font-bold mb-6 text-white text-center">
        Latest <span className="text-cyan-400">Products</span>
      </h2>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-red-500 text-xl">
          Error loading latest products.
        </p>
      )}

      {/* Products */}
      {!isLoading && !error && products.length > 0 && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
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
            No latest products available.
          </p>
        </div>
      )}

      <ViewMore />
    </section>
  );
}
