import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldHalved,
  faTruckFast,
  faCreditCard,
  faTools,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const features = [
  {
    title: "Trusted Brands",
    description:
      "Partnered with Yamaha, Honda, Hero & more to ensure the highest quality.",
    icon: faShieldHalved,
  },
  {
    title: "Free Delivery",
    description:
      "Nationwide doorstep delivery – fast, secure, and free with every order.",
    icon: faTruckFast,
  },
  {
    title: "Easy EMI Plans",
    description:
      "Split payments with flexible EMI options to suit every budget.",
    icon: faCreditCard,
  },
  {
    title: "1-Year Warranty",
    description:
      "All our bikes include a full manufacturer-backed warranty for peace of mind.",
    icon: faTools,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function Features() {
  return (
    <section className="bg-gradient-to-b from-gray-900 via-gray-800 to-black py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Why Choose <span className="text-cyan-400">Us</span>
        </h2>
        <p className="text-gray-300 mb-14 max-w-xl mx-auto">
          Experience unmatched quality, service, and reliability with our bikes
          and services.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="bg-white/5 border border-cyan-500/10 backdrop-blur-xl shadow-lg rounded-2xl p-6 text-left cursor-pointer hover:shadow-cyan-600/40 transition-all"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(6,182,212,0.5)",
              }}
            >
              <div className="flex items-center justify-center mb-4 w-12 h-12 rounded-full bg-cyan-600/20 text-cyan-400">
                <FontAwesomeIcon icon={feature.icon} className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
