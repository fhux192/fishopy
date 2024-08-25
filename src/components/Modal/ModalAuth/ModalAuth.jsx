import { useDispatch, useSelector } from "react-redux";
import { toggleModalLogin, toggleModalRegister } from "../../../redux/features/toggle/toggleSlice";
import { useNavigate } from "react-router-dom";

import { logout, setLoading } from "../../../redux/features/user/userSlice";
import { Link } from "react-router-dom";
import { message } from "antd";
import { callLogout } from "../../../services/api.js";

const ModalAuth = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.account);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      dispatch(setLoading(true));
      const res = await callLogout();
      if (res.vcode == 0) {
        dispatch(logout());
        message.success(res.message);
      }
      dispatch(setLoading(false));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="absolute font-semibold top-full right-0 mt-4 w-48 bg-white border-2 border-gray-100 rounded-xl">
      {user ? (
        <>
          {user.role == "ADMIN" && (
            <Link
              className="block px-4 py-2 text-primaryBlack  hover:bg-teal-700 hover:text-white rounded-t-xl w-full text-left"
              to={"/admin"}
            >
              <button>Admin</button>
            </Link>
          )}

          <Link
            to={"/account"}
            className="block px-4 py-2 text-primaryBlack border-t-2 hover:bg-teal-700 hover:text-white w-full text-left"
          >
            Quản lý tài khoản
          </Link>
          <button
            onClick={handleLogout}
            className="block px-4 py-2 text-primaryBlack border-t-2 border-gray-100 hover:bg-teal-700 hover:text-white rounded-b-xl w-full text-left"
          >
            Đăng Xuất
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => dispatch(toggleModalLogin())}
            className=" block px-4 py-2 text-primaryBlack hover:bg-teal-800 hover:text-white rounded-t-xl w-full text-left"
          >
            Đăng Nhập
          </button>
          <button
            onClick={() => dispatch(toggleModalRegister())}
            className="block px-4 py-2 text-primaryBlack border-t-2 border-gray-100 hover:bg-teal-800 hover:text-white rounded-b-xl w-full text-left"
          >
            Đăng Ký
          </button>
        </>
      )}
    </div>
  );
};
export default ModalAuth;
