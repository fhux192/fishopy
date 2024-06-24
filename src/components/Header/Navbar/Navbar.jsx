import { motion } from "framer-motion";
import { FaFacebook } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";
import { FaFishFins } from "react-icons/fa6";
import Slidebar from "../SliderBar/Slidebar.jsx";
import "../../../scss/navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawerCart } from "../../../redux/features/toggle/toggleSlice.js";
import { useEffect } from "react";
import "../../../scss/bubble.scss";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.user.account.cart);

  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/");
  };

  const fishIconVariants = {
    initial: { scale: 1 },
    animate: { scale: [1, 0.9, 1] },
  };

  useEffect(() => {
    // Trigger animation when cart length changes
  }, [cart.length]);

  return (
    <div className="navbar">
      <div className="wrapper lg:mx-[10%] lg:ml-[7%]">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={0.5}
          className="top-text min-[320px]:ml-12  lg:ml-14 sm:ml-14"
        >
          <button onClick={handleNavigation}>
            <BubbleText />
          </button>
        </motion.span>
        <div className="social">
          <Slidebar />

          <a href="/">
            <FaFacebook className="icon duration-500 " />
          </a>
          <a href="/">
            <IoLogoTiktok className="icon duration-500 " />
          </a>
          <div className="relative group" onClick={() => dispatch(toggleDrawerCart())}>
            <motion.div
              variants={fishIconVariants}
              initial="initial"
              animate={cart.length > 0 ? "animate" : "initial"}
              transition={{ duration: 0.5, repeat: 1, repeatType: "reverse" }}
              key={cart.length} // Ensure the animation triggers when cart length changes
            >
              <FaFishFins className="zalo-icon duration-500  text-white" />
            </motion.div>
            <div
              className={`w-[1.5rem] h-[1.5rem] right-[7%] top-[-30%] duration-300 text-center rounded-full absolute ${
                cart.length > 0
                  ? "text-white bg-teal-500"
                  : "text-black bg-white group-hover:text-white group-hover:bg-teal-500"
              }`}
            >
              {cart.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BubbleText = () => {
  return (
      <div className="gradientText w-full text-xl min-[320px]:text-lg min-[321px]:text-xl min-[425px]:text-2xl min-[768px]:text-4xl font-body z-10 lg:text-4xl font-thin ">
        {"GUPPY ĐÔNG THẠNH".split("").map((child, idx) => (
          <span className="cursor-pointer hoverText" key={idx}>
            {child}
          </span>
        ))}
      </div>
  );
};

export default Navbar;
