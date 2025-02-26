import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <motion.div
        className="w-12 h-12 rounded-full border-t-4 border-blue-500 animate-spin"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
      />
    </div>
  );
}
