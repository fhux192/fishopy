import "./Header.css";
import search from "../../assets/Zoom.png";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { useState } from "react";

const Header = () => {
  const [isActiveSearch, setIsActiveSearch] = useState(false);
  const [isAccountHover, setIsAccountHover] = useState(false);
  const [isCartHover, setIsCartHover] = useState(false);
  const [searchText, setSearchText] = useState("");

  function accountHover() {
    return `w-full h-full font-bold text-xs shadow-md  ${
      isAccountHover ? "text-teal2" : "text-white"
    }`;
  }
  function cartHover() {
    return `w-full h-full font-bold text-xs shadow-md  ${
      isCartHover ? "text-teal2" : "text-white"
    }`;
  }

  return (
    <header>
      <div className="bg-primaryBlack ">
        <div className="h-[6rem] py-[1.25rem] mx-[1rem] flex">
          {/* Logo */}
          <a className="flex w-[257px] h-full items-center ml-[1rem]">
            <div className="ml-2">
              <p className="text-white text-[3.5rem] font-bold font-body hover:text-teal-800 shadow-md cursor-pointer">
                Guppy
              </p>
            </div>
            <div className="min-w-[8rem] object-cover h-full">
              {/*<img src={logo} alt="logo" className="w-[55px] h-[55px] " /> */}
            </div>
          </a>

          {/* header search */}
          <div className="ml-[40rem] mr-[0.8rem] relative w-full rounded-full overflow-hidden">
            <form className="absolute flex w-full">
              <div className="absolute w-full">
                {!isActiveSearch && !searchText && (
                  <label
                    htmlFor="header-search"
                    className="absolute left-[1.1rem] top-[1rem]"
                  >
                    Search...
                  </label>
                )}
                <input
                  type="text"
                  id="header-search"
                  className="header-search shadow-md"
                  onFocus={() => setIsActiveSearch((pre) => !pre)}
                  onBlur={() => setIsActiveSearch((pre) => !pre)}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <button className="absolute top-0 right-0 w-[3.5rem] h-[3.5rem] bg-white">
                <div className="w-full h-full grid place-items-center">
                  <img src={search} alt="Search" width={32} height={32} />
                </div>
              </button>
            </form>
          </div>

          {/* Account and Cart */}
          <nav>
            <ul className="flex self-center">
              <li className="flex justify-center items-center pr-[0.5rem] border-r-[1px] border-r-white ">
                <button
                  className="px-[1rem] w-[6rem]"
                  onMouseEnter={() => setIsAccountHover((hov) => !hov)}
                  onMouseLeave={() => setIsAccountHover((hov) => !hov)}
                >
                  <span className="flex flex justify-center items-center ">
                    <div className="w-[55px] h-[33px]">
                      <IoPersonOutline className={accountHover()} />
                    </div>
                    <MdKeyboardArrowDown className={accountHover()} />
                  </span>
                  <span className={accountHover()}>Tài Khoản</span>
                </button>
              </li>

              <li className="pl-[0.5rem]">
                <button
                  className="px-[1rem] w-[6rem]"
                  onMouseEnter={() => setIsCartHover((hov2) => !hov2)}
                  onMouseLeave={() => setIsCartHover((hov2) => !hov2)}
                >
                  <span>
                    <div className="w-[55px] h-[33px] items-center">
                      <IoCartOutline className={cartHover()} />
                      <span className={cartHover()}>Giỏ Hàng</span>
                    </div>
                  </span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
