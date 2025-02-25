import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useGetProductByIdMutation } from "../../redux/api/productsApi";

export default function ProductDetails() {
  const { id } = useParams();
  const [getProductById, { data: product, isLoading, error }] =
    useGetProductByIdMutation();

  useEffect(() => {
    if (id) {
      getProductById(id);
    }
  }, [id, getProductById]);

  // Local state for quantity
  const [quantity, setQuantity] = useState(1);

  // Local state for review form
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);

  if (isLoading)
    return <p className="text-center text-lg text-white">Loading...</p>;

  if (error)
    return (
      <p className="text-center text-lg text-red-500">Error: {error.message}</p>
    );

  if (!product?.data)
    return (
      <p className="text-center text-lg text-gray-400">Product not found</p>
    );

  const maxQuantity = product.data.quantity || 1;

  // Handle quantity change
  const increaseQuantity = () => {
    if (quantity < maxQuantity) setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Review Submitted:", { review, rating });
    setReview("");
    setRating(5);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-xl">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <div className="relative w-full md:w-1/2">
          <motion.img
            whileHover={{ scale: 1.1 }}
            src={
              product.data.image ||
              "https://bsmedia.business-standard.com/_media/bs/img/article/2023-07/11/full/1689070314-2921.jpg?im=FeatureCrop,size=(826,465)"
            }
            alt={product.data.name}
            className="w-full rounded-lg shadow-lg"
          />
          {/* Floating Brand Badge */}
          <div className="absolute top-3 left-3 bg-yellow-500 text-black text-sm font-semibold px-4 py-1 rounded-full shadow-lg">
            {product.data.brand}
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-3xl font-extrabold">{product.data.name}</h1>
          <p className="text-xl text-yellow-400 font-semibold">
            ${product.data.price}
          </p>
          <p className="text-gray-300">{product.data.description}</p>

          {/* Stock Badge */}
          <div
            className={`text-sm font-bold px-3 py-1 rounded-full shadow-lg w-fit ${
              product.data.quantity > 0
                ? "bg-green-500 text-black"
                : "bg-red-500 text-white"
            }`}
          >
            {product.data.quantity > 0 ? "In Stock" : "Out of Stock"}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-3">
            <button
              onClick={decreaseQuantity}
              className="px-4 py-2 bg-gray-700 text-white rounded-md"
              disabled={quantity <= 1}
            >
              ➖
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="px-4 py-2 bg-gray-700 text-white rounded-md"
              disabled={quantity >= maxQuantity}
            >
              ➕
            </button>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className={`w-full mt-4 py-3 text-black text-lg font-semibold rounded-full shadow-lg transition-all ${
              product.data.quantity > 0
                ? "bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800"
                : "bg-gray-600 cursor-not-allowed"
            }`}
            disabled={product.data.quantity <= 0}
          >
            🛒 Add to Cart
          </motion.button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

        {/* Show Reviews */}
        {product.data.reviews?.length > 0 ? (
          <ul className="space-y-4">
            {product.data.reviews.map((rev: any, index: number) => (
              <li key={index} className="p-4 border-b border-gray-700">
                <p className="text-yellow-400">Rating: ⭐ {rev.rating}/5</p>
                <p className="text-gray-300">{rev.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No reviews yet.</p>
        )}

        {/* Add Review Form */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Leave a Review</h3>
          <form onSubmit={handleReviewSubmit} className="mt-4 space-y-4">
            <textarea
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
              rows={3}
              placeholder="Write your review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            ></textarea>

            <div className="flex items-center gap-4">
              <label className="text-gray-300">Rating:</label>
              <select
                className="p-2 rounded-lg bg-gray-700 text-white border border-gray-600"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} ⭐
                  </option>
                ))}
              </select>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-yellow-500 text-black text-lg font-semibold rounded-lg shadow-lg hover:bg-yellow-600 transition-all"
            >
              Submit Review
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}
