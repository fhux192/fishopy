
import { motion } from "framer-motion";
import { SiZalo } from "react-icons/si";
const MessageBox = () => {
  return (
    <motion.a
      whileHover={{scale:1.5}}
      href="https://www.facebook.com/vduyit"
      target="_blank"
      className="fixed w-[45px] h-[45px] hover:scale-110 top-[50rem] lg:right-[0.5rem] right-[0.1rem] min-[360px]:top-[40rem] min-[375px]:top-[36rem] min-[410px]:top-[50rem] min-[390px]:top-[46rem] lg:top-[54rem] cursor-pointer z-[22]"
    >
      <div className="rounded-full border-4 ">
      <SiZalo className="w-[35px] h-[35px] text-blue-500" />
      </div>
    </motion.a>
  );
};

export default MessageBox;
