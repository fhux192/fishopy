import { useDispatch, useSelector } from "react-redux";
import { toggle } from "@redux/features/toggle/toggleSlice";
import { logout, setLoading } from "@redux/features/user/userSlice";
import { Link } from "react-router-dom";
import { message } from "antd";
import { user_logout } from "@services/api.js";
import { googleLogout } from "@react-oauth/google";
import { motion } from "framer-motion";

const ModalAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.account);

  const handleLogout = async () => {
    try {
      dispatch(setLoading(true));
      const res = await user_logout();
      if (res.vcode == 0) {
        dispatch(logout());
        message.success(res.msg);
      }
      googleLogout();
      dispatch(setLoading(false));
    } catch (error) {
      console.error(error);
    }
  };

  // Animation variants for a more pronounced bounce effect
  const modalVariants = {
    hidden: {
      opacity: 0,
      y: -20, // Start higher for a bigger drop
      scale: 0.7, // Start smaller for a more dramatic scale-up
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500, // Tighter spring for faster, snappier bounce
        damping: 10, // Lower damping for more oscillations
        mass: 0.3, // Lighter mass for exaggerated bounce
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      scale: 0.7,
      transition: {
        duration: 0.25,
        ease: "easeIn",
      },
    },
  };

  return (
    <motion.div
      className="absolute font-semibold top-full right-0 mt-4 bg-white border-[1px] border-gray-200 rounded-xl"
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {isAuthenticated ? (
        <>
          {user.role == "ADMIN" && (
            <Link
              className="block px-4 py-2 font-bold text-Black hover:bg-Teal hover:text-white rounded-t-xl w-full text-left"
              to={"/admin"}
            >
              <button>Quản lý Admin</button>
            </Link>
          )}
          <Link
            to={"/account"}
            className="block px-4 py-2 font-bold text-Black border-t-[1px] hover:bg-Teal hover:text-white w-44 text-left"
          >
            Quản lý tài khoản
          </Link>
          <button
            onClick={handleLogout}
            className="block px-4 py-2 font-bold text-Black border-t-[1px] border-gray-100 hover:bg-Teal hover:text-white rounded-b-xl w-full text-left"
          >
            Đăng Xuất
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => dispatch(toggle("modalLogin"))}
            className="block px-4 py-2 font-bold text-Black rounded-t-xl w-40 text-left"
          >
            Đăng Nhập
          </button>
          <button
            onClick={() => dispatch(toggle("modalRegister"))}
            className="block px-4 py-2 font-bold text-Black border-t-[1px] border-gray-100 rounded-b-xl w-full text-left"
          >
            Đăng Ký
          </button>
        </>
      )}
    </motion.div>
  );
};

export default ModalAuth;