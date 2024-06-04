import { motion } from "framer-motion";
import { SiZalo } from "react-icons/si";

const MessageBox = () => {
  return (
    <motion.a
      whileHover={{ scale: 1.5 }}
      href="https://www.facebook.com/vduyit"
      target="_blank"
      className="fixed w-[45px] h-[45px] hover:scale-110 bottom-[1rem] right-[1rem] cursor-pointer z-[22]"
    >
      <div className="rounded-full border-4">
        <SiZalo className="w-[35px] h-[35px] text-blue-500" />
      </div>
    </motion.a>
  );
};

export default MessageBox;