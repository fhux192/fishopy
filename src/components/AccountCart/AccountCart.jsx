import { MdKeyboardArrowDown } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";

const AccountCart = () => {
  return (
    <nav>
      <ul className="flex self-center">
        <li className="flex justify-center items-center pr-[0.5rem] border-r-[3px] border-r-white ">
          <button className="px-[1rem] w-[6rem] button-account">
            <span className="flex justify-center items-center ">
              <div className="w-[55px] h-[33px]">
                <IoPersonOutline className="w-full h-full text-white   icon-account" />
              </div>
              <MdKeyboardArrowDown className="w-[2rem] h-full text-white  icon-expand" />
            </span>
            <span className="w-full h-full font-mono font-semibold text-xs shadow-md text-white text-account">
              Tài Khoản
            </span>
          </button>
        </li>

        <li className="pl-[0.5rem]">
          <button className="px-[1rem] w-[6rem] button-cart">
            <span>
              <div className="w-[55px] h-[33px] items-center">
                <IoCartOutline className="w-full h-full text-white icon-cart" />
                <span className="w-full h-full font-mono font-semibold text-xs text-white text-cart">
                  Giỏ Hàng
                </span>
              </div>
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
};
export default AccountCart;
