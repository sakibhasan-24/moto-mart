import { motion } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <motion.footer
      className="bg-gray-900 text-white py-8 mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h2 className="text-yellow-400 text-xl font-bold">About Us</h2>
          <p className="text-gray-400 mt-2 text-sm">
            Discover the **latest bike collections**, enjoy **fastest
            delivery**, and **secure payments**. Ride with confidence!
          </p>
        </div>

        <div>
          <h2 className="text-yellow-400 text-xl font-bold">Quick Links</h2>
          <ul className="mt-2 space-y-2">
            {["Home", "Shop", "About Us", "Contact"].map((link, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to={`/${link.toLowerCase().replace(" ", "-")}`}
                  className="text-gray-400 hover:text-yellow-400"
                >
                  {link}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-yellow-400 text-xl font-bold">Contact Us</h2>
          <p className="text-gray-400 mt-2 flex items-center gap-2">
            <FaPhone className="text-yellow-400" /> +123 456 7890
          </p>
          <p className="text-gray-400 mt-2 flex items-center gap-2">
            <FaEnvelope className="text-yellow-400" /> motoMart@Redux.com
          </p>
          {/* Social Icons */}
          <div className="flex mt-4 gap-4">
            {[FaFacebook, FaInstagram, FaTwitter].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 text-2xl"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-6 border-t border-gray-700 pt-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} Moto Mart. All Rights Reserved.
      </div>
    </motion.footer>
  );
}
