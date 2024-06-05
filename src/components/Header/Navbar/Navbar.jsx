// src/components/Header/Navbar.jsx
import { motion } from "framer-motion";
import { FaFacebook } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";
import { FaFishFins } from "react-icons/fa6";
import Slidebar from "../SliderBar/Slidebar.jsx";
import "../../../scss/navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={0.5}
          className="top-text"
        ></motion.span>

        <div className="social">
          <Slidebar />

          <a href="/">
            <FaFacebook className="icon duration-500 hover:text-teal-500" />
          </a>
          <a href="/">
            <IoLogoTiktok className="icon duration-500 hover:text-teal-500" />
          </a>
          <a className="relative group" href="/">
            <FaFishFins className="zalo-icon duration-500 group-hover:text-teal-500 text-white" />
            <div className="w-[1.5rem] h-[1.5rem] right-[7%] top-[-30%] duration-300 group-hover:text-white group-hover:bg-teal-500 text-black text-center bg-white rounded-full absolute">
              0
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
