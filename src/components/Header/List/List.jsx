import { MdKeyboardArrowDown } from "react-icons/md";
import { Link,useMatch,useResolvedPath } from "react-router-dom";


export const List = () => {
  return (
    <nav>
      <ul className="flex left-10 items-center justify-between w-[25rem] ">
        {/* Home */}
        <li className="flex items-center border-r-[3px] border-r-secondGrey">
          <CustomLink
            to="home"
            className="w-[8rem] mr-[2rem] focus:text-white font-mono font-bold h-full  text-lg shadow-md text-secondGrey text-center text-account hover:text-teal-400 cursor-pointer"
          >
            Trang Chủ
          </CustomLink>
        </li>
        {/* Products */}
        <li className="flex items-center border-r-[3px] border-r-secondGrey">
          <CustomLink
          to="product" className="w-[8rem] mr-[2rem] focus:text-white h-full font-mono font-bold text-lg shadow-md text-secondGrey text-center text-account hover:text-teal-400 cursor-pointer">
            Sản Phẩm
          </CustomLink>
        </li>
        {/* About */}
        <li className="flex items-center ">
          <CustomLink
          to="infomation" className=" w-[8rem] h-full font-mono font-bold text-lg shadow-md text-secondGrey text-center text-account hover:text-teal-400 cursor-pointer">
            Thông Tin
          </CustomLink>
        </li>
      </ul>
    </nav>
  );
};

function CustomLink({ to, children, ...props }) {
  const resolvedPath=useResolvedPath(to)
  const isActive=useMatch({path:resolvedPath.pathname,end:true})

  return (
    <li className={` isActive === to ? "active" : ""`}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
