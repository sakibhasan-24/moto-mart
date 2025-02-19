import { motion } from "framer-motion";
import "../../styles/HeaderText.css";
interface TextProps {
  text: string;
  color?: "red" | "blue";
}

const HeaderText: React.FC<TextProps> = ({ text, color = "red" }) => {
  return (
    <motion.span
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`neon-text ${color === "blue" ? "neon-blue" : "neon-red"}`}
    >
      {text}
    </motion.span>
  );
};

export default HeaderText;
