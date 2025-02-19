import { motion } from "framer-motion";

const NavbarLogo = () => {
  return (
    <div className="flex  bg-gradient-to-r from-black via-gray-900 to-black p-6 shadow-lg">
      <motion.h1
        className="text-3xl sm:text-5xl font-extrabold flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.span
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-red-500 drop-shadow-lg neon-text"
        >
          Moto
        </motion.span>
        <motion.span
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "backIn", delay: 0.5 }}
          className="mx-2 drop-shadow-lg"
        >
          🚴
        </motion.span>
        <motion.span
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: -10 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          className="text-blue-500 drop-shadow-lg neon-text"
        >
          Mart
        </motion.span>
      </motion.h1>
      <style>
        {`
          .neon-text {
            text-shadow: 0 0 10px rgba(255, 0, 0, 0.8), 
                         0 0 20px rgba(255, 0, 0, 0.6), 
                         0 0 30px rgba(255, 0, 0, 0.4);
            animation: flicker 1.5s infinite alternate;
          }

          .text-blue-500.neon-text {
            text-shadow: 0 0 10px rgba(0, 0, 255, 0.8), 
                         0 0 20px rgba(0, 0, 255, 0.6), 
                         0 0 30px rgba(0, 0, 255, 0.4);
          }

          @keyframes flicker {
            0% { opacity: 1; }
            50% { opacity: 0.8; text-shadow: 0 0 15px rgba(255, 255, 255, 0.6); }
            100% { opacity: 1; }
          }
        `}
      </style>
      ;
    </div>
  );
};

export default NavbarLogo;
