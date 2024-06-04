import { motion } from "framer-motion";
import { SiZalo } from "react-icons/si";

const MessageBox = () => {
  return (
    <motion.a
      whileHover={{ scale: 1.5 }}
      href=""
      target="_blank"
      className="fixed w-[45px] h-[45px] shadow-lg shadow-gray-500 rounded-full bg-white hover:scale-110 bottom-[1rem] right-[1rem] cursor-pointer z-[22]"
    >
      <div className="rounded-full border-white border-4">
        <SiZalo className="w-[35px] h-[35px]  text-blue-500" />
      </div>
    </motion.a>
  );
};

export default MessageBox;