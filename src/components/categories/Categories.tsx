import { useEffect, useState } from "react";
import { useGetProductsMutation } from "../../redux/api/productsApi"; // RTK mutation hook
import Product from "../../pages/products/Product"; // Your product card component

const categories = [
  { id: "all", name: "All", icon: "🏍️" },
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

export default function Categories() {
  const [activeCat, setActiveCat] = useState("all");
  const [getProducts, { data, isLoading, error }] = useGetProductsMutation();

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      await getProducts({
        limit: 3,
        page: 1,
        searchTerm: "",
        minPrice: 0,
        maxPrice: 0,
        category: activeCat === "all" ? "" : activeCat,
      });
    };

    fetchFilteredProducts();
  }, [activeCat, getProducts]);

  const products = data?.data?.data || [];

  return (
    <section className="py-12 sm:max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6 text-white text-center">
        Browse by <span className="text-cyan-400">Category</span>
      </h2>

      <div className="flex flex-wrap justify-center gap-6 mb-12">
        {categories.map(({ id, name, icon }) => (
          <button
            key={id}
            onClick={() => setActiveCat(id)}
            className={`flex items-center space-x-3 px-5 py-3 rounded-full cursor-pointer transition ${
              activeCat === id
                ? "bg-cyan-600 text-white shadow-lg"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            <span className="text-xl">{icon}</span>
            <span className="font-semibold">{name}</span>
          </button>
        ))}
      </div>

      {/* Loading */}
      {isLoading && (
        <p className="text-center text-white text-xl">Loading products...</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-red-500 text-xl">
          Error loading products.
        </p>
      )}

      {/* Products */}
      {!isLoading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {products.map((product: any) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* Empty */}
      {!isLoading && !error && products.length === 0 && (
        <div className="text-center mt-12">
          <p className="text-xl font-semibold text-white">
            No products found in this category.
          </p>
        </div>
      )}
    </section>
  );
}
