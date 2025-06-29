import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductByIdMutation,
  useAddOrUpdateReviewMutation,
} from "../../redux/api/productsApi";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import Loader from "../../components/loader/Loader";
import { Button, Modal, Rate } from "antd";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/product.slice";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getProductById, { data: product, isLoading, error, refetch }] =
    useGetProductByIdMutation();
  const [addOrUpdateReview, { isLoading: reviewLoading }] =
    useAddOrUpdateReviewMutation();

  // Quantity state
  const [quantity, setQuantity] = useState(1);

  // Modal & Review states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  // Get current user ID from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const currentUserId = user?.id;
  // console.log(currentUserId);

  useEffect(() => {
    if (id) getProductById(id);
  }, [id, getProductById]);

  const maxQuantity = product?.data?.quantity || 1;

  // Open Review Modal
  const openModal = () => {
    if (product?.data?.reviews && currentUserId) {
      const existingReview = product.data.reviews.find(
        (rev: any) =>
          rev.user === currentUserId || rev.user?._id === currentUserId
      );
      if (existingReview) {
        setRating(existingReview.rating);
        setReviewText(existingReview.text);
      } else {
        setRating(5);
        setReviewText("");
      }
    } else {
      setRating(5);
      setReviewText("");
    }
    setIsModalOpen(true);
  };

  // Close Review Modal & reset inputs
  const closeModal = () => {
    setIsModalOpen(false);
    setRating(5);
    setReviewText("");
  };

  // Submit review handler

  const handleAddReview = async () => {
    if (!rating && !reviewText.trim()) {
      toast.warning("Please provide rating or review text");
      return;
    }
    try {
      if (!currentUserId) {
        toast.error("You must be logged in to submit a review");
        return;
      }

      await addOrUpdateReview({
        productId: id!,
        userId: currentUserId,
        rating,
        text: reviewText,
        token: localStorage.getItem("token"),
      }).unwrap();

      // console.log(getProductById, currentUserId, rating, reviewText);
      toast.success("Review submitted successfully!");
      closeModal();

      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (refetch) refetch();
      const updated = await getProductById(id).unwrap();
      product.data = updated.data;
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to submit review");
    }
  };

  // Quantity controls
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
  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900 text-white">
        <Loader />
      </div>
    );

  if (error && "message" in error)
    return (
      <p className="min-h-screen flex items-center justify-center text-red-500 bg-gradient-to-br from-black to-gray-900 text-lg">
        Error: {error.message}
      </p>
    );

  if (!product?.data)
    return (
      <p className="min-h-screen flex items-center justify-center text-gray-400 bg-gradient-to-br from-black to-gray-900 text-lg">
        Product not found
      </p>
    );

  const p = product.data;
  console.log(p);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-6xl mx-auto rounded-xl border border-gray-700 bg-gray-800 bg-opacity-60 shadow-2xl backdrop-blur-md p-8">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Product Image */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="relative rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={p.image || "https://via.placeholder.com/400"}
              alt={p.name}
              className="w-full object-cover max-h-[500px]"
            />
            <span className="absolute top-4 left-4 bg-blue-600 text-white px-5 py-1 rounded-full text-sm font-bold shadow-md">
              brand: {p.brand}
            </span>
          </motion.div>

          {/* Product Info */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <div className="text-center mb-8">
                {p.averageRating > 0 ? (
                  <div className="inline-flex items-center gap-3 bg-gray-900 px-6 py-3 rounded-full shadow-md border border-yellow-400 animate-fade-in">
                    <Rate
                      disabled
                      allowHalf
                      defaultValue={p.averageRating}
                      style={{ fontSize: 24, color: "#facc15" }}
                    />
                    <span className="text-yellow-300 font-semibold text-lg tracking-wide">
                      {p.averageRating.toFixed(1)} / 5
                    </span>
                  </div>
                ) : (
                  <div className="inline-block bg-gray-800 text-gray-400 px-5 py-2 rounded-full border border-gray-600 shadow-sm animate-fade-in">
                    No reviews yet
                  </div>
                )}
              </div>

              <h1 className="text-5xl font-extrabold text-yellow-400">
                name: {p.name}
              </h1>
              <p className="text-xl font-extrabold text-blue-400">
                category: {p.category}
              </p>
              <p className="text-3xl text-green-400 font-semibold mt-3">
                ${p.price.toFixed(2)}
              </p>
              <p className="text-gray-300 mt-5 leading-relaxed">
                description: {p.description}
              </p>
              <div
                className={`mt-6 inline-block px-5 py-2 text-sm rounded-full font-bold shadow-md ${
                  p.quantity > 0 ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {p.quantity > 0 ? "In Stock" : "Out of Stock"}
              </div>
            </div>

            {/* Quantity selector and Add to Cart */}
            <div className="space-y-5">
              <div className="flex items-center gap-5 text-xl font-semibold">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="px-4 py-2 bg-gray-700 rounded-lg disabled:opacity-50"
                >
                  −
                </button>
                <span>{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  disabled={quantity >= maxQuantity}
                  className="px-4 py-2 bg-gray-700 rounded-lg disabled:opacity-50"
                >
                  +
                </button>
              </div>

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

            {/* Review Button */}
            <div>
              <Button
                type="primary"
                size="large"
                onClick={openModal}
                className="w-full"
              >
                ⭐ Add Review
              </Button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 max-w-3xl mx-auto bg-gray-700 bg-opacity-70 rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-8 text-yellow-400">
            Customer Reviews
          </h2>

          {p.reviews.length === 0 && (
            <p className="text-gray-400 text-lg">
              No reviews yet. Be the first to review!
            </p>
          )}

          {p.reviews.map((rev: any) => (
            <div
              key={rev._id}
              className="mb-6 border-b border-gray-600 pb-5 last:border-none last:pb-0"
            >
              <p className="text-green-400 font-semibold mb-1">
                User: <span className="font-normal">{rev.user}</span>
              </p>
              <Rate disabled defaultValue={rev.rating} />
              <p className="mt-2 text-gray-300">{rev.text}</p>
              <p className="mt-1 text-xs text-gray-500">
                {new Date(rev.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}

      <Modal
        title="Add or Update Review"
        open={isModalOpen}
        onOk={handleAddReview}
        onCancel={closeModal}
        okText="Submit"
        confirmLoading={reviewLoading}
        cancelText="Cancel"
        centered
      >
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-white text-lg">
            Your Rating
          </label>
          <Rate
            allowClear={false}
            value={rating}
            onChange={(value) => setRating(value)}
            style={{ fontSize: 30 }}
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-white text-lg">
            Your Review
          </label>
          <textarea
            rows={5}
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full rounded-md p-3 bg-gray-700 text-white resize-none placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </Modal>
    </div>
  );
}
