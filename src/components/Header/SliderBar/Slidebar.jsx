import "../../../scss/slidebar.scss";
import ToggleButton from "./ToggleButton";
import Links from "./Links";
import { useState } from "react";
import { motion } from "framer-motion";


const Slidebar = () => {
  const [open, setOpen] = useState(false);

  const variants = {
    open: {
      clipPath: "circle(1200px at 50px 50px)",
      transition: {
        type: "spring",
        stiffness: 20,
      },
    },

    closed: {
      clipPath: "circle(0px at 30.5px 33px)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  return (
    <motion.div className="slidebar" animate={open ? "open" : "closed"}>
      <motion.div className="bg" variants={variants}>
        <Links />
      </motion.div>
      <ToggleButton setOpen={setOpen} open={open} />
    </motion.div>
  );
};

export default Slidebar;
