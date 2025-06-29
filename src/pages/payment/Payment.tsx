// @ts-nocheck
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useAppSelector } from "../../redux/hooks";
import Swal from "sweetalert2";
import {
  useCreatePaymentIntentMutation,
  useProcessPaymentMutation,
} from "../../redux/api/paymentApi";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
// console.log(stripePromise);

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { token } = useAppSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const order = location.state?.order;
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [processPayment] = useProcessPaymentMutation();

  useEffect(() => {
    if (order) {
      createPaymentIntent({ orderId: order._id, token })
        .unwrap()
        .then((res) => setClientSecret(res.clientSecret))
        .catch(() => setError("Failed to initiate payment."));
    }
  }, [order, createPaymentIntent, token]);

  // const handlePayment = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError(null);

  //   if (!stripe || !elements || !clientSecret) return;

  //   setLoading(true);

  //   try {
  //     const { paymentIntent, error } = await stripe.confirmCardPayment(
  //       clientSecret,
  //       {
  //         payment_method: {
  //           card: elements.getElement(CardElement)!,
  //         },
  //       }
  //     );

  //     if (error) {
  //       setError(error.message || "Payment failed!");
  //       setLoading(false);
  //       return;
  //     }

  //     // Update order status
  //     await processPayment({ orderId: order._id, token }).unwrap();

  //     alert("Payment Successful!");
  //     navigate("/dashboard/orders-list");
  //   } catch (err) {
  //     setError("Payment processing error. Try again!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
          },
        }
      );

      if (error) {
        setError(error.message || "Payment failed!");
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        console.log("Payment successful, transaction ID:", paymentIntent.id);

        await processPayment({
          orderId: order._id,

          transactionId: paymentIntent?.id,
          token,
        }).unwrap();

        Swal.fire({
          title: "Payment Successful!",
          text: `Transaction ID: ${paymentIntent.id}`,
          icon: "success",
          confirmButtonColor: "#22c55e",
          confirmButtonText: "OK",
          background: "#1e293b",
          color: "#ffffff",
        });

        navigate("/dashboard/orders-list");
      }
    } catch (err) {
      setError("Payment processing error. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Stripe Payment</h2>

        <p className="text-gray-400 text-center mb-6">
          Pay{" "}
          <span className="text-yellow-400 font-semibold">
            ${order.totalPrice.toFixed(2)}
          </span>
        </p>

        {clientSecret ? (
          <form onSubmit={handlePayment} className="space-y-4">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#ffffff",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#fa755a",
                  },
                },
              }}
              className="p-3 bg-gray-700 rounded-lg"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading || !stripe}
              className="w-full py-3 rounded-md bg-green-500 hover:bg-green-600 text-white font-semibold transition-all"
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </form>
        ) : (
          <p className="text-gray-400 text-center">Loading payment...</p>
        )}
      </div>
    </div>
  );
}
