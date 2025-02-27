import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(import.meta.env.public_key);
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);

const StripeProvider = ({ children }: { children: React.ReactNode }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;
