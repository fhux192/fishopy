
import { SiZalo } from "react-icons/si";
import { motion } from "framer-motion";

const MessageBox = () => {
  return (
    <motion.a
      whileHover={{scale:1.5}}
      href="https://www.facebook.com/vduyit"
      target="_blank"
      className="fixed w-[40px] h-[40px] hover:scale-110 top-[54rem] right-[0.1rem] min-[360px]:top-[43rem] min-[375px]:top-[39rem] min-[410px]:top-[53rem] min-[390px]:top-[50rem] lg:top-[43rem] cursor-pointer z-[22]"
    >
      <SiZalo className="w-full h-full bg-blue-500 rounded-full border-4 hover:text-primaryTeal text-white" />
    </motion.a>
  );
};

export default MessageBox;
