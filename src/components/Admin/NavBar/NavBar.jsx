import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="fixed bg-black text-white w-[10rem] flex flex-col h-full justify-between  px-2">
      <ul className="mt-[5rem] flex flex-col gap-4">
        <li className="nav-item">
          <Link to={"/admin"}>Tổng quan</Link>
        </li>
        <li className="nav-item">
          <Link to={"/admin/manage-product"}>Sản phẩm</Link>
        </li>

        <li className="nav-item">
          <Link to={"/"}>Trang chủ</Link>
        </li>
      </ul>

      <ul>
        <li>
          <Link to={"/"}>Duy</Link>
        </li>
      </ul>
    </div>
  );
};
export default NavBar;
