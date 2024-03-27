import { useDispatch, useSelector } from "react-redux";
import {
  toggleModalLogin,
  toggleModalRegister,
} from "../../redux/features/toggle/toggleSlice";
import { toast } from "react-toastify";
import { logout } from "../../redux/features/user/userSlice";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const ModalAuth = () => {
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Đăng xuất thành công");
  };

  return (
    <div className="absolute top-[150%] z-[21] w-[8rem] right-[0] bg-primaryBlack text-white">
      {account?.name ? (
        <>
          <button
            onClick={handleLogout}
            className="p-4 text-center text-md font-bold hover:text-secondTeal duration-150"
          >
            Đăng Xuất
          </button>

          {account.isAdmin && (
            <Link to={"/admin"}>
              <button className="p-4 text-center text-md font-bold hover:text-secondTeal duration-150">
                Admin
              </button>
            </Link>
          )}
        </>
      ) : (
        <>
          <motion.button
            onClick={() => dispatch(toggleModalLogin())}
            className="p-4 text-center text-md font-bold hover:text-secondTeal duration-150"
          >
            Đăng nhập
          </motion.button>
          <button
            onClick={() => dispatch(toggleModalRegister())}
            className="p-4 text-center text-md font-bold hover:text-secondTeal duration-150"
          >
            Đăng ký
          </button>
        </>
      )}
    </div>
  );
};
export default ModalAuth;
