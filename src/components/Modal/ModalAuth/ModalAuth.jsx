import { useDispatch, useSelector } from "react-redux";
import {
  toggleModalLogin,
  toggleModalRegister,
} from "../../../redux/features/toggle/toggleSlice";
import { useNavigate } from "react-router-dom";

import { logout, setLoading } from "../../../redux/features/user/userSlice";
import { Link } from "react-router-dom";
import { message } from "antd";
import { callLogout } from "../../../services/api.js";
import { googleLogout } from "@react-oauth/google";

const ModalAuth = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.account);
  const handleLogout = async () => {
    try {
      dispatch(setLoading(true));
      const res = await callLogout();
      if (res.vcode == 0) {
        dispatch(logout());
        message.success(res.message);
      }
      googleLogout();
      dispatch(setLoading(false));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="absolute font-semibold top-full right-0 mt-4 w-48 bg-white border-[1px] border-gray-200 rounded-xl">
      {user ? (
        <>
          {user.role == "ADMIN" && (
            <Link
              className="block px-4 py-2 text-Black  hover:bg-Teal hover:text-white rounded-t-xl w-full text-left"
              to={"/admin"}
            >
              <button>Quản lý Admin</button>
            </Link>
          )}

          <Link
            to={"/account"}
            className="block px-4 py-2 text-Black border-t-[1px] hover:bg-Teal hover:text-white w-full text-left"
          >
            Quản lý tài khoản
          </Link>
          <button
            onClick={handleLogout}
            className="block px-4 py-2 text-Black border-t-[1px] border-gray-100 hover:bg-Teal hover:text-white rounded-b-xl w-full text-left"
          >
            Đăng Xuất
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => dispatch(toggleModalLogin())}
            className=" block px-4 py-2 text-Black hover:bg-Teal hover:text-white rounded-t-xl w-full text-left"
          >
            Đăng Nhập
          </button>
          <button
            onClick={() => dispatch(toggleModalRegister())}
            className="block px-4 py-2 text-Black border-t-[1px] border-gray-100 hover:bg-Teal hover:text-white rounded-b-xl w-full text-left"
          >
            Đăng Ký
          </button>
        </>
      )}
    </div>
  );
};
export default ModalAuth;
