import { useDispatch, useSelector } from "react-redux";
import { toggleModalLogin, toggleModalRegister } from "../../../redux/features/toggle/toggleSlice";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { callLogin } from "../../../services/api";
import { toast } from "react-toastify";
import { setCredentials } from "../../../redux/features/user/userSlice";
import { Button, Typography, message } from "antd";
import styles from "./ModalLogin.module.css";

const ModalLogin = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handlelogin = async () => {
    try {
      const res = await callLogin({ phone, password });
      if (res.vcode == 0) {
        dispatch(setCredentials(res.data));
        toast.success(res.message);
        dispatch(toggleModalLogin());
        setPhone("");
        setPassword("");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalOverlay} onClick={() => dispatch(toggleModalLogin())}></div>
      <div className={styles.modalContent}>
        <h1 className={styles.modalTitle}>Đăng Nhập</h1>
        <label htmlFor="phone" className="text-black ">
          Số điện thoại:
          <input
            type="text"
            className="w-full mt-2 outline-gray-100 p-2 outline-none text-primaryBlack rounded-xl mb-[1rem]"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label htmlFor="passwordLogin" className="text-black ">
          Mật Khẩu:
          <div className="relative">
            <input
              type={isShowPassword ? "text" : "password"}
              className="w-full mt-2 outline-gray-100 p-2 outline-none text-primaryBlack rounded-xl mb-[0.5rem]"
              id="passwordLogin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isShowPassword ? (
              <FaEye
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="absolute right-2 top-[42%] -translate-y-1/4 text-white cursor-pointer"
                color="black"
                size={20}
              />
            ) : (
              <FaEyeSlash
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="absolute right-2 top-[42%] -translate-y-1/4 text-white cursor-pointer"
                color="black"
                size={20}
              />
            )}
          </div>
        </label>
        <button
          onClick={handlelogin}
          className="h-10 w-full hover:border-2 hover:border-teal-500 px-2 text-center font-semibold bg-primaryBlack text-white mt-8 rounded-lg duration-150"
        >
          Đăng Nhập 
        </button>

        <div className={styles.smallText}>
          <span>Bạn chưa có tài khoản? </span>{" "}
          <a className="pl-1 text-teal-500 cursor-pointer"
            onClick={() => {
              dispatch(toggleModalLogin());
              dispatch(toggleModalRegister());
            }}
          >
            Đăng ký
          </a>
        </div>
      </div>
    </div>
  );
};
export default ModalLogin;
