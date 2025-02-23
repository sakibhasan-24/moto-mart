import { motion } from "framer-motion";
import HeaderText from "../NavbarLogo/HeaderText";
import Badge from "./Badge";

export default function Banner() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://bsmedia.business-standard.com/_media/bs/img/article/2023-07/11/full/1689070314-2921.jpg?im=FeatureCrop,size=(826,465)')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 text-white text-center max-w-3xl px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl sm:text-7xl font-extrabold drop-shadow-lg"
        >
          Next <HeaderText color="red" text="LEVEL" />
          <span className="text-blue-400">Future</span> Today!
        </motion.h1>
        {/* check for git */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-lg text-gray-300"
        >
          Experience unmatched speed and power with our latest high-performance
          bikes. Designed for next level riders.
        </motion.p>
        <Badge />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-8 py-3 border-2 animate-border cursor-pointer  transition rounded-lg text-white font-bold shadow-lg "
        >
          Explore Bikes
        </motion.button>
      </div>
    </div>
  );
}
