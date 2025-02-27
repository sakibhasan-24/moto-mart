import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../redux/api/orderApi";
import { clearCart } from "../../redux/features/product.slice";
import { toast } from "react-toastify";

export default function ConfirmOrder() {
  const navigate = useNavigate();
  const { cartItems } = useAppSelector((state) => state.items);
  const { user, token }: any = useAppSelector((state) => state.auth);
  const { offer, claimed } = useAppSelector((state) => state.offer);

  const dispatch = useAppDispatch();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [createOrder, { isLoading: isOrderLoading }] = useCreateOrderMutation();

  const overallTotalPrice = cartItems.reduce(
    (acc, item) => acc + item.totalPrice,
    0
  );
  const discountAmount = claimed
    ? (overallTotalPrice * Number(offer)) / 100
    : 0;
  const finalPayableAmount = overallTotalPrice - discountAmount;

  const isPhoneValid =
    phone.length === 11 && /^\d+$/.test(phone) && phone.startsWith("01");
  const isAddressValid = address.trim().length > 0;
  const isFormValid = isPhoneValid && isAddressValid;

  const handleOrder = async () => {
    if (!isFormValid) return;

    try {
      const orderData = {
        email: user?.email || "user@example.com",
        products: cartItems.map((item) => ({
          product: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice: finalPayableAmount,
        phone,
        address,
        offer: claimed ? Number(offer) : 0,
        paymentStatus: "Pending",
        orderStatus: "Processing",
      };

      // Create Order
      const response = await createOrder({ orderData, token }).unwrap();
      // Clear the cart after successful order
      dispatch(clearCart());
      console.log("Order Success:", response);

      // Redirect to payment page
      navigate("/payment", { state: { order: response.order } });
    } catch (error) {
      toast.error("Prodcuts Not Found");
      console.error("Order Failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="bg-gray-800 border-gray-700 p-10 my-12 rounded-lg shadow-xl max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-400">
          🛒 Confirm Your Order
        </h1>

        {/* Order Summary */}
        <div className="bg-gray-700 p-5 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-white">Order Summary</h2>
          <div className="flex justify-between mt-3">
            <span className="text-gray-300">Total Amount:</span>
            <span className="text-yellow-400 font-bold text-lg">
              ${overallTotalPrice.toFixed(2)}
            </span>
          </div>

          {claimed && (
            <div className="flex justify-between mt-3">
              <span className="text-gray-300">Discount Applied:</span>
              <span className="text-green-400 font-bold text-lg">
                -${discountAmount.toFixed(2)}
              </span>
            </div>
          )}

          <div className="flex justify-between mt-3 border-t border-gray-600 pt-3">
            <span className="text-white font-semibold text-lg">
              Final Payable Amount:
            </span>
            <span className="text-yellow-400 font-bold text-xl">
              ${finalPayableAmount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* User Email */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-white">User Information</h2>
          <div className="bg-gray-700 p-4 rounded-lg mt-3">
            <p className="text-gray-300 flex justify-between">
              <span className="font-semibold text-white">Email:</span>
              <span className="text-gray-400">{user?.email || "N/A"}</span>
            </p>
          </div>
        </div>

        {/* Phone Number */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-white">Phone Number</h2>
          <input
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 mt-3 bg-gray-700 text-white rounded-lg outline-none border border-gray-600 focus:ring-2 focus:ring-green-400 transition-all"
          />
        </div>

        {/* Address */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-white">Address</h2>
          <textarea
            placeholder="Enter your full delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 mt-3 bg-gray-700 text-white rounded-lg outline-none border border-gray-600 focus:ring-2 focus:ring-green-400 transition-all"
          />
        </div>

        <button
          onClick={handleOrder}
          className={`mt-8 text-lg w-full py-3 rounded-md shadow-lg transition-all transform hover:scale-105 ${
            isFormValid
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!isFormValid}
        >
          {isOrderLoading ? "Processing..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
}
