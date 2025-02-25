import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdMutation } from "../../redux/api/productsApi";
import { useAppDispatch } from "../../redux/hooks";
import { addToCart } from "../../redux/features/product.slice";
import { motion } from "framer-motion";
import { Button, Rate, Input, message } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [getProductById, { data: product, isLoading, error }] =
    useGetProductByIdMutation();

  useEffect(() => {
    if (id) {
      getProductById(id);
    }
  }, [id, getProductById]);

  const [quantity, setQuantity] = useState(1);
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

  const increaseQuantity = () => {
    if (quantity < maxQuantity) setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    if (!product?.data) {
      toast.error("Product not found!");
      return;
    }

    const productId = product.data._id;
    const existingCart = JSON.parse(localStorage.getItem("items") || "[]");
    const existingItem = existingCart.find(
      (item: any) => item.id === productId
    );
    const existingCartQty = existingItem ? existingItem.quantity : 0;
    const availableStock = product.data.quantity;

    if (existingCartQty + quantity > availableStock) {
      toast.warning(
        `You can only add ${availableStock - existingCartQty} more!`
      );
      return;
    }

    const cartItem = {
      id: product.data._id,
      brand: product.data.brand,
      name: product.data.name,
      price: product.data.price,
      image: product.data.image,
      quantity: quantity,
      totalPrice: product.data.price * quantity,
    };

    dispatch(addToCart(cartItem));
    toast.success("Added to cart successfully!");
    navigate("/cart-items");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Product Container */}
      <div className="max-w-5xl mx-auto p-8 rounded-xl shadow-2xl bg-opacity-40 backdrop-blur-lg bg-gray-800 border border-gray-700">
        {/* Product Content */}
        <div className="flex flex-col md:flex-row gap-10">
          {/* Product Image */}
          <div className="relative w-full md:w-1/2">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={product.data.image || "https://via.placeholder.com/300"}
              alt={product.data.name}
              className="w-full rounded-lg shadow-md"
            />
            <div className="absolute top-3 left-3 bg-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-lg">
              {product.data.brand}
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 space-y-5">
            <h1 className="text-4xl font-extrabold text-white">
              {product.data.name}
            </h1>
            <p className="text-2xl text-green-400 font-semibold">
              ${product.data.price}
            </p>
            <p className="text-gray-300">{product.data.description}</p>

            {/* Stock Status */}
            <div
              className={`text-sm font-bold px-4 py-2 rounded-full shadow-md w-fit ${
                product.data.quantity > 0
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
              }`}
            >
              {product.data.quantity > 0 ? "In Stock" : "Out of Stock"}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <Button
                className="bg-gray-700 text-white px-3 py-2 rounded-lg"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                ➖
              </Button>
              <span className="text-lg font-semibold">{quantity}</span>
              <Button
                className="bg-gray-700 text-white px-3 py-2 rounded-lg"
                onClick={increaseQuantity}
                disabled={quantity >= maxQuantity}
              >
                ➕
              </Button>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              onClick={handleAddToCart}
              whileTap={{ scale: 0.95 }}
              className={`w-full cursor-pointer mt-4 py-3 text-white text-lg font-semibold rounded-md transition-all ${
                product.data.quantity > 0
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
              disabled={product.data.quantity <= 0}
            >
              🛒 Add to Cart
            </motion.button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-10 bg-gray-900 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

          {product.data.reviews?.length > 0 ? (
            <ul className="space-y-4">
              {product.data.reviews.map((rev: any, index: number) => (
                <li key={index} className="p-4 border-b border-gray-700">
                  <Rate disabled defaultValue={rev.rating} />
                  <p className="text-gray-400">{rev.comment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}

          {/* Add Review Form */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Leave a Review</h3>
            <form className="mt-4 space-y-4">
              <Input.TextArea
                rows={3}
                placeholder="Write your review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                className="bg-gray-700 text-white p-3 rounded-md"
              />

              <div className="flex items-center gap-4">
                <label className="text-gray-300">Rating:</label>
                <Rate value={rating} onChange={(value) => setRating(value)} />
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-blue-600 transition-all"
                onClick={() => {
                  message.success("Review submitted!");
                }}
              >
                Submit Review
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
