import { useAppSelector } from "../../redux/hooks";
import { useState } from "react";

export default function ConfirmOrder() {
  const { cartItems } = useAppSelector((state) => state.items);
  const { user } = useAppSelector((state) => state.auth);
  const { offer, claimed } = useAppSelector((state) => state.offer);

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="bg-gray-800  border-gray-700 p-10 my-12 rounded-lg shadow-xl max-w-lg w-full transition-transform transform border-2 animate-border duration-300">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-400">
          🛒 Confirm Your Order
        </h1>

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

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-white">User Information</h2>
          <div className="bg-gray-700 p-4 rounded-lg mt-3">
            <p className="text-gray-300 flex justify-between">
              <span className="font-semibold text-white">Email:</span>
              <span className="text-gray-400">
                {user?.email || "user@example.com"}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-white">Phone Number</h2>
          <input
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 mt-3 bg-gray-700 text-white rounded-lg outline-none border border-gray-600 focus:ring-2 focus:ring-green-400 transition-all"
          />
          {!isPhoneValid && phone.length > 0 && (
            <p className="text-red-400 text-sm mt-2">
              Phone number must be **11 digits** and start with **"01"**.
            </p>
          )}
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-white">Address</h2>
          <textarea
            placeholder="Enter your full delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 mt-3 bg-gray-700 text-white rounded-lg outline-none border border-gray-600 focus:ring-2 focus:ring-green-400 transition-all"
          />
          {!isAddressValid && address.length > 0 && (
            <p className="text-red-400 text-sm mt-2">
              Address cannot be empty.
            </p>
          )}
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-white">Payment Method</h2>
          <div className="bg-gray-700 p-4 rounded-lg mt-3 shadow-md">
            <label className="flex items-center gap-3 text-gray-300">
              <input
                type="radio"
                name="payment"
                value="Online Payment"
                checked
                className="accent-green-500"
                disabled
              />
              <span className="text-green-400 font-medium">
                Online Payment (Required)
              </span>
            </label>
          </div>
        </div>

        <button
          className={`mt-8 text-lg w-full py-3 rounded-md shadow-lg transition-all transform hover:scale-105 ${
            isFormValid
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!isFormValid}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
