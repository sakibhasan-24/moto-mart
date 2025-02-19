import { motion } from "framer-motion";
import HeaderText from "./HeaderText";

const NavbarLogo = () => {
  return (
    <div className="flex  ">
      <motion.h1
        className="text-3xl sm:text-4xl font-extrabold flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <HeaderText color="blue" text="Moto" />
        <motion.span
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "backIn", delay: 0.5 }}
          className="mx-2 drop-shadow-lg"
        >
          🚴
        </motion.span>
        <HeaderText color="red" text="Mart" />
      </motion.h1>
    </div>
  );
};

export default NavbarLogo;
