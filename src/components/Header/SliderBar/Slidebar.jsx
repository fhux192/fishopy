import "../../../scss/slidebar.scss";
import ToggleButton from "./ToggleButton";
import Links from "./Links";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Slidebar = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  const variants = {
    open: {
      clipPath: "circle(1200px at 50px 50px)",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 20,
        damping: 5,
      },
    },
    closed: {
      clipPath: "circle(0px at 30.5px 36px)",
      opacity: 0,
      transition: {
        delay: 0,
        duration: 0.2,
        type: "tween",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        // Scroll down
        setOpen(false);
      } 
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For mobile or negative scrolling
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.div
      className="slidebar"
      animate={open ? "open" : "closed"}
      style={{ display: visible ? "block" : "none" }}
    >
      <motion.div className="bg" variants={variants}>
        <Links />
      </motion.div>
      <ToggleButton setOpen={setOpen} open={open} />
    </motion.div>
  );
};

export default Slidebar;
