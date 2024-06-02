/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FaList } from "react-icons/fa6";
import { motion } from "framer-motion";

const ToggleButton = ({ setOpen, open }) => {
  const [scrolled, setScrolled] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Adjust this value as needed
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    setClicked(true);
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (open) {
      setClicked(true);
    } else {
      setClicked(false);
    }
  }, [open]);

  return (
    <button onClick={handleClick}>
      <motion.div>
        <FaList
          fontWeight="bold"
          className="icon"
          style={{ color: clicked ? "#2dd4bf" : scrolled ? "#141414" : "#f8f7f9" }} // Green when clicked, red on scroll
        />
      </motion.div>
    </button>
  );
};

export default ToggleButton;
