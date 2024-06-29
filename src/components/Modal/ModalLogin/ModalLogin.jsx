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
        <label htmlFor="phone" className="text-white ">
          Số điện thoại:
          <input
            type="text"
            className="w-full p-2 outline-none text-primaryBlack rounded mb-[1rem]"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label htmlFor="passwordLogin" className="text-white  ">
          Mật Khẩu:
          <div className="relative">
            <input
              type={isShowPassword ? "text" : "password"}
              className="w-full p-2 outline-none text-primaryBlack rounded mb-[0.5rem]"
              id="passwordLogin"
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
        <Button
          onClick={() => handlelogin()}
          className="h-10 w-full px-2 text-center bg-teal-900  text-white mt-4 hover:bg-teal-700 rounded-full duration-150  "
        >
          Đăng Nhập
        </Button>

        <div className={styles.smallText}>
          <span>Bạn chưa có tài khoản?</span>{" "}
          <Typography.Link
            onClick={() => {
              dispatch(toggleModalLogin());
              dispatch(toggleModalRegister());
            }}
          >
            Đăng ký
          </Typography.Link>
        </div>
      </div>
    </div>
  );
};
export default ModalLogin;
