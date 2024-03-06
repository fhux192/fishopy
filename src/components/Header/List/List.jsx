export const List = () => {
  return (
    <nav>
      <ul className="flex left-10 items-center justify-between w-[25rem] ">
        <li className="flex items-center border-r-[3px] border-r-secondGrey">
          <span className="w-[8rem] font-mono font-bold h-full  text-lg shadow-md text-white text-center text-account hover:text-teal-400 cursor-pointer">
            Trang Chủ
          </span>
        </li>
        <li className="flex items-center border-r-[3px] border-r-secondGrey">
          <span className="w-[8rem] h-full font-mono font-bold text-lg shadow-md text-secondGrey text-center text-account hover:text-teal-400 cursor-pointer">
            Sản Phẩm
          </span>
        </li>
        <li className="flex items-center ">
          <span className="w-[8rem] h-full font-mono font-bold text-lg shadow-md text-secondGrey text-center text-account hover:text-teal-400 cursor-pointer">
            Thông Tin
          </span>
        </li>
      </ul>
    </nav>
  );
};
