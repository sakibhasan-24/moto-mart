import Marquee from "react-fast-marquee";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Emma Thompson",
    location: "London, UK",
    review:
      "Absolutely love my new cruiser! Smooth service and quick delivery.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Liam Garcia",
    location: "Madrid, Spain",
    review: "Impressed by the variety and price. Would buy again!",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Olivia Chen",
    location: "Toronto, Canada",
    review: "Great platform for bike lovers. Got my scooter in 3 days.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Noah Müller",
    location: "Berlin, Germany",
    review: "Customer support is excellent. Fast EMI approval too.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    name: "Sophia Rossi",
    location: "Rome, Italy",
    review: "The electric bike is amazing. Stylish and eco-friendly!",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/30.jpg",
  },
];

export default function TestimonialsMarquee() {
  return (
    <section className="bg-gray-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-white">
          What Our <span className="text-cyan-400">Riders</span> Say
        </h2>
        <p className="text-gray-400 mt-2">
          Trusted by happy customers around the globe.
        </p>
      </div>

      <div className="overflow-hidden">
        <Marquee
          pauseOnHover
          speed={40}
          gradient={false}
          className="no-scrollbar"
        >
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 rounded-xl p-6 shadow-md mx-4 w-72 flex-shrink-0 transition-transform duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border border-cyan-400"
                />
                <div className="text-left">
                  <h4 className="text-white font-semibold">{t.name}</h4>
                  <p className="text-gray-400 text-sm">{t.location}</p>
                </div>
              </div>

              <p className="text-gray-300 text-sm italic mb-4">"{t.review}"</p>

              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
                {[...Array(5 - t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gray-600" />
                ))}
              </div>
            </motion.div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
