import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { removeFromCart, clearCart } from "../../redux/features/product.slice";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles for toast notifications

export default function CartItems() {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.items);

  const overallTotalPrice = cartItems.reduce(
    (acc, item) => acc + item.totalPrice,
    0
  );

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed!", {
      position: "top-right",
      autoClose: 2000, // Closes after 2 seconds
      hideProgressBar: true,
    });
  };

  const handleClearCart = () => {
    Swal.fire({
      title: "Clear cart?",
      text: "Are you sure you want to clear the cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCart());
        toast.info("Cart cleared!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
        });
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          Your cart is empty.
          <Link
            to="/"
            className="ml-2 bg-blue-600 px-4 py-2 rounded-md text-white"
          >
            Order Now
          </Link>
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-700 rounded-lg">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Quantity</th>
                  <th className="p-3 text-left">Total Price</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-700">
                    <td className="p-3 text-gray-400">{item.id}</td>
                    <td className="p-3 font-semibold">{item.name}</td>
                    <td className="p-3 text-green-400">${item.price}</td>
                    <td className="p-3 font-medium">{item.quantity}</td>
                    <td className="p-3 text-yellow-500 font-bold">
                      ${item.totalPrice}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="px-3 py-1 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-md"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Overall Total:</h2>
            <span className="text-yellow-500 font-bold text-2xl">
              ${overallTotalPrice}
            </span>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handleClearCart}
              className="bg-red-500 cursor-pointer hover:bg-red-600 text-white text-lg px-6 py-3 rounded-md shadow-md"
              disabled={cartItems.length === 0}
            >
              Clear Cart
            </button>
            <button
              className="bg-green-500 cursor-pointer hover:bg-green-600 text-white text-lg px-6 py-3 rounded-md shadow-md"
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
