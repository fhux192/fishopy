import { useDispatch, useSelector } from "react-redux";
import { toggleModalLogin } from "../../redux/features/toggle/toggleSlice";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { callLogin } from "../../services/api";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/user/userSlice";
import { motion, transform } from "framer-motion";

const ModalLogin = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isShowModalLogin } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();

  const handlelogin = async () => {
    const res = await callLogin(email, password);

    if (res.vcode == 0) {
      console.log("check res.data", res.data);
      dispatch(setCredentials(res.data));
      toast.success(res.msg);
      dispatch(toggleModalLogin());
    } else {
      toast.error(res.msg);
    }
  };

  return (
    <div
      className={`fixed  inset-0 z-[21] ${
        isShowModalLogin ? "block" : "hidden"
      }`}
    >
      <div
        className="w-full h-full  bg-overlay"
        onClick={() => dispatch(toggleModalLogin())}
      ></div>
      <motion.div
        animate={{
          opacity: isShowModalLogin ? 1 : 0,
          y: isShowModalLogin ? 0 : 300,
        }}
        open
        className="absolute left-[40%] top-[25%] -translate-y-1/2 -translate-x-1/2 w-[20rem] h-[20rem] p-4 rounded "
      >
        <h2 className="text-center text-2xl text-white mb-4">Đăng Nhập</h2>
        <label htmlFor="email" className="text-white ">
          Email:
          <input
            type="text"
            className="w-full p-2 outline-none text-primaryBlack rounded mb-[1rem]"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password" className="text-white  ">
          Mật Khẩu:
          <div className="relative">
            <input
              type={isShowPassword ? "text" : "password"}
              className="w-full p-2 outline-none text-primaryBlack rounded mb-[0.5rem]"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isShowPassword ? (
              <FaEye
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="absolute right-2 top-[42%] -translate-y-1/2 text-white cursor-pointer"
                color="black"
                size={20}
              />
            ) : (
              <FaEyeSlash
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="absolute right-2 top-[42%] -translate-y-1/2 text-white cursor-pointer"
                color="black"
                size={20}
              />
            )}
          </div>
        </label>
        <button
          onClick={() => handlelogin()}
          className="h-10 w-full px-2 text-center bg-teal-900  text-white mt-4 hover:bg-teal-700 rounded-full duration-150  "
        >
          Đăng Nhập
        </button>
      </motion.div>
    </div>
  );
};
export default ModalLogin;
