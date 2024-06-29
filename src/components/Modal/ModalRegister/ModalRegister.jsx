import { useDispatch, useSelector } from "react-redux";
import { toggleModalLogin, toggleModalRegister } from "../../../redux/features/toggle/toggleSlice";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { callRegister } from "../../../services/api";
import { toast } from "react-toastify";
import { setCredentials } from "../../../redux/features/user/userSlice";
import { motion } from "framer-motion";
import { Typography } from "antd";
import styles from "./ModalRegister.module.css";

const ModalRegister = () => {
  const [isShowPassword, setIsShowPassword] = useState({
    showConfirmPassword: false,
    showPassword: false,
  });
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { modalRegister } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();

  const handlelogin = async () => {
    try {
      if (password !== confirmPassword) {
        toast.error("Mật khẩu không trùng khớp");
        return;
      }

      const res = await callRegister({ name, password, phone });

      if (res.vcode == 0) {
        dispatch(setCredentials(res.data));
        toast.success(res.message);
        dispatch(toggleModalRegister());

        // Reset form
        setEmail("");
        setName("");
        setPassword("");
        setConfirmPassword("");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className={`fixed  inset-0 z-[21] ${modalRegister ? "block" : "hidden"}`}>
      <div
        className="w-full h-full  bg-overlay"
        onClick={() => dispatch(toggleModalRegister())}
      ></div>
      <motion.div
        animate={{
          opacity: modalRegister ? 1 : 0,
          y: modalRegister ? 0 : 300,
        }}
        open
        className="absolute left-[40%] top-[20%] -translate-y-1/2 -translate-x-1/2 w-[20rem] h-[20rem] p-4 rounded "
      >
        <h2 className="text-center text-2xl text-white mb-4">Đăng ký</h2>
        <label htmlFor="name" className="text-white ">
          Họ và tên:
          <input
            type="text"
            className="w-full p-2 outline-none text-primaryBlack rounded mb-[1rem]"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="name" className="text-white ">
          Số điện thoại:
          <input
            type="text"
            className="w-full p-2 outline-none text-primaryBlack rounded mb-[1rem]"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label htmlFor="passwordRegister" className="text-white  ">
          Mật Khẩu:
          <div className="relative">
            <input
              type={isShowPassword.showPassword ? "text" : "password"}
              className="w-full p-2 outline-none text-primaryBlack rounded mb-[0.5rem]"
              id="passwordRegister"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isShowPassword.showPassword ? (
              <FaEye
                onClick={() =>
                  setIsShowPassword((pre) => {
                    return {
                      ...pre,
                      showPassword: !pre.showPassword,
                    };
                  })
                }
                className="absolute right-2 top-[42%] -translate-y-1/2 text-white cursor-pointer"
                color="black"
                size={20}
              />
            ) : (
              <FaEyeSlash
                onClick={() => {
                  setIsShowPassword((pre) => {
                    return {
                      ...pre,
                      showPassword: !pre.showPassword,
                    };
                  });
                }}
                className="absolute right-2 top-[42%] -translate-y-1/2 text-white cursor-pointer"
                color="black"
                size={20}
              />
            )}
          </div>
        </label>

        <label htmlFor="confirmPassword" className="text-white  ">
          Xác nhận mật khẩu:
          <div className="relative">
            <input
              type={isShowPassword.showConfirmPassword ? "text" : "password"}
              className="w-full p-2 outline-none text-primaryBlack rounded mb-[0.5rem]"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {isShowPassword.showConfirmPassword ? (
              <FaEye
                onClick={() =>
                  setIsShowPassword((pre) => {
                    return {
                      ...pre,
                      showConfirmPassword: !pre.showConfirmPassword,
                    };
                  })
                }
                className="absolute right-2 top-[42%] -translate-y-1/2 text-white cursor-pointer"
                color="black"
                size={20}
              />
            ) : (
              <FaEyeSlash
                onClick={() =>
                  setIsShowPassword((pre) => {
                    return {
                      ...pre,
                      showConfirmPassword: !pre.showConfirmPassword,
                    };
                  })
                }
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
          Đăng ký
        </button>
        <div className={styles.smallText}>
          <span>Bạn đã có tài khoản? </span>
          <Typography.Link
            onClick={() => {
              dispatch(toggleModalRegister());
              dispatch(toggleModalLogin());
            }}
          >
            Đăng nhập
          </Typography.Link>
        </div>
      </motion.div>
    </div>
  );
};
export default ModalRegister;
