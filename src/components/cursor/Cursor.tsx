import { motion } from "framer-motion";
import { CursorProps } from "../interface/Interface";

const Cursor = ({ cursorPosition }: CursorProps) => {
  return (
    <motion.div
      className="fixed z-50 w-5 h-5 rounded-full pointer-events-none bg-formColor"
      style={{ left: cursorPosition.x, top: cursorPosition.y }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
    />
  );
};

export default Cursor;
