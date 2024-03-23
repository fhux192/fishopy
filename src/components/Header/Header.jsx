import "./Header.css";

import HeaderSearch from "../HeaderSearch/HeaderSearch";
import AccountCart from "../AccountCart/AccountCart";
import { HiMenu } from "react-icons/hi";
import { List } from "./List/List";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0  right-0 z-20">
      <div className="bg-primaryBlack shadow-md shadow-primaryBlack">
        <div className="h-[6rem] py-[1.25rem] mx-[1rem] flex">
          {/* Logo */}
          <div className="relative flex w-[257px] h-full items-center ml-[1rem]">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 1000 }}
            >
              <Link to="/">
                <p className="text-white text-[2.5rem] lg:text-[3.5rem] font-body font-normal hover:text-teal-500 shadow-md cursor-pointer">
                  Guppy
                </p>
                <HiMenu className="absolute lg:invisible phone:invisible top-[20%] min-[360px]:left-[110%] min-[390px]:left-[120%] min-[410px]:left-[125%] min-[430px]:left-[130%] text-white hover:text-teal-500 w-[2rem] h-[2.8rem]" />
              </Link>
            </motion.div>
            <div className="min-w-[24rem] object-cover h-full"></div>
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
