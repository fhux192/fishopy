export const List = () => {
  return (
    <nav>
      <ul className="flex left-10 justify-between w-[25rem] ">
        <li className="flex items-center border-r-[2px] border-r-white">
          <span className="w-[8rem] h-full font-bold text-lg shadow-md text-white text-center text-account hover:text-teal-400 cursor-pointer">
            Trang Chủ
          </span>
        </li>
        <li className="flex items-center border-r-[2px] border-r-white">
          <span className="w-[8rem] h-full font-bold text-lg shadow-md text-white text-center text-account hover:text-teal-400 cursor-pointer">
            Sản Phẩm
          </span>
        </li>
        <li className="flex items-center ">
          <span className="w-[8rem] h-full font-bold text-lg shadow-md text-white text-center text-account hover:text-teal-400 cursor-pointer">
            Thông tin
          </span>
        </li>
      </ul>
    </nav>
  );
};
