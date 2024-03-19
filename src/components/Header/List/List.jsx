import { Link, useMatch, useResolvedPath } from "react-router-dom";

export const List = () => {
  return (
    <nav>
      <ul className="flex left-10 items-center justify-between w-[25rem] ">
        {/* Home */}
        <ul className="flex items-center border-r-[3px] border-r-secondGrey">
          <CustomLink to="/">Trang Chủ</CustomLink>
        </ul>
        {/* Products */}
        <ul className="flex items-center border-r-[3px] border-r-secondGrey">
          <CustomLink to="/product">Sản Phẩm</CustomLink>
        </ul>
        {/* About */}
        <ul className="flex items-center ">
          <CustomLink to="/infomation">Thông Tin</CustomLink>
        </ul>
      </ul>
    </nav>
  );
};

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive === to ? "active" : ""}>
      <Link
        to={to}
        {...props}
        className={`w-[8rem] mr-[2rem] focus:text-white font-mono font-bold h-full text-lg shadow-md text-secondGrey text-center text-account  ${
          isActive ? "text-white cursor-default" : "hover:text-teal-400 "
        }`}
      >
        {children}
      </Link>
    </li>
  );
}
