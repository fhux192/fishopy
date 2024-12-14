/* eslint-disable react/prop-types */
import "./Header.css";
import HeaderSearch from "./HeaderSearch/HeaderSearch";
import AccountCart from "./AccountCart/AccountCart";
import { HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import { List } from "./List/List";

const Header = ({ children }) => {
  return (
    <div>
      <header className={`sticky  top-0 left-0 right-0 z-20`}>
        <div className="bg-primaryBlack shadow-md shadow-primaryBlack">
          <div className="h-[5rem] py-[1rem] mx-[1rem] flex">
            {/* Logo */}
            <div className="relative flex w-[257px] h-full items-center ml-[1rem]">
              <div>
                <Link to="/">
                  <div className="flex">
                    <HiMenu className="absolute lg:invisible phone:invisible top-[20%] min-[360px]:left-[110%] min-[390px]:left-[120%] min-[410px]:left-[125%] min-[430px]:left-[130%] text-white hover:text-teal-500 w-[2rem] h-[2.8rem]" />
                  </div>
                </Link>
              </div>
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
      {children}
    </div>
  );
};

export default Header;
