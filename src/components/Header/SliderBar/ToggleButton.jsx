/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { FaList } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import "../../../scss/navbar.scss";

const ToggleButton = ({ setOpen, open }) => {
  const [scrolled, setScrolled] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 48);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen]);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
    
      <button ref={buttonRef} onClick={handleClick} style={{ background: "none", border: "none", cursor: "pointer" }}>
        <motion.div  whileTap={{ scale: 0.9 }}>
          <FaList className="icon text-white lg:hidden block" style={{ color: open ? "#0A6C62" : `#1a202c` }} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ToggleButton;
