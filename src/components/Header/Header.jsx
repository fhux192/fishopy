import "./Header.css";

import HeaderSearch from "../HeaderSearch/HeaderSearch";
import AccountCart from "../AccountCart/AccountCart";
import { List } from "./List/List";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <header className="fixed top-0 left-0  right-0 z-20">
      <div className="bg-primaryBlack">
        <div className="h-[6rem] py-[1.25rem] mx-[1rem] flex">
          {/* Logo */}
          <div className="flex w-[257px] h-full items-center ml-[1rem]">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 1000 }}
            >
              <p className="text-white text-[3.5rem] font-body font-normal hover:text-teal-500 shadow-md cursor-pointer">
                Guppy
              </p>
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
