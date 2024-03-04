import "./Header.css";

import HeaderSearch from "../HeaderSearch/HeaderSearch";
import AccountCart from "../AccountCart/AccountCart";

const Header = () => {
  return (
    <header>
      <div className="bg-primaryBlack  ">
        <div className="h-[6rem] py-[1.25rem] mx-[1rem] flex">
          {/* Logo */}
          <a className="flex w-[257px] h-full items-center ml-[1rem]">
            <div className="ml-2">
              <p className="text-white text-[3.5rem] font-bold font-body hover:text-teal-800 shadow-md cursor-pointer">
                Guppy
              </p>
            </div>
            <div className="min-w-[8rem] object-cover h-full"></div>
          </a>

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
