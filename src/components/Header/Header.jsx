import "./Header.css";

import HeaderSearch from "../HeaderSearch/HeaderSearch";
import { IoMenu } from "react-icons/io5";
import AccountCart from "../AccountCart/AccountCart";
import { useState,useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { List } from "./List/List";



const Header = () => {
  const [position,setPosition]=useState("static");

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setPosition(scrollTop > 98 ? "fixed" : "static");
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${position}  top-0 left-0 right-0 z-20`}>
      <div className="bg-primaryBlack shadow-md shadow-primaryBlack">
        <div className="h-[5rem] py-[1rem] mx-[1rem] flex">
          {/* Logo */}
          <div className="relative flex w-[257px] h-full items-center ml-[1rem]">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 1000 }}
            >
              <Link to="/">
              <IoMenu className="ml-[1rem] text-white w-[2.5rem] h-[2.5rem]"/>
                <HiMenu className="absolute lg:invisible phone:invisible top-[20%] min-[360px]:left-[110%] min-[390px]:left-[120%] min-[410px]:left-[125%] min-[430px]:left-[130%] text-white hover:text-teal-500 w-[2rem] h-[2.8rem]" />
              </Link>
            </motion.div>
            <div className="min-w-[29rem] object-cover h-full"></div>
            <List />
          </div>

          {/* header search */}
          <HeaderSearch />

          {/* Account and Cart */}
          <AccountCart />
        </div>
      </div>
    </header>
  );
};

export default Header;
