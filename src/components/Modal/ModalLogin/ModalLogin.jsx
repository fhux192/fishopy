import { useDispatch, useSelector } from "react-redux";
import {
  toggle,
  toggleModalLogin,
  toggleModalRegister,
} from "../../../redux/features/toggle/toggleSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { callGooglelogin, callLogin } from "../../../services/api";
import { toast } from "react-toastify";
import { setCredentials } from "../../../redux/features/user/userSlice";
import { Button, Typography, message } from "antd";
import styles from "./ModalLogin.module.css";
import { useGoogleLogin } from "@react-oauth/google";

import logo from "../../../assets/google-logo.webp";

const ModalLogin = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handlelogin = async () => {
    try {
      const res = await callLogin({ phone, password });
      if (res.vcode === 0) {
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

  const onGoogleSuccess = async (response) => {
    try {
      console.log("Google Login Success:", response);
      const res = await callGooglelogin(response.access_token);
      if (res.vcode == 0) {
        dispatch(setCredentials(res.data));
        message.success(res.message);
        dispatch(toggle("isShowModalLogin"));
      }
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  const onGoogleFailure = (response) => {
    console.log("Google Login Failed:", response);
    // Xử lý logic khi đăng nhập thất bại
    message.error("Đăng nhập thất bại, vui lòng thử lại sau!");
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: onGoogleSuccess,
    onError: onGoogleFailure,
  });

  return (
    <div className={`${styles.modal}`}>
      <div
        className={styles.modalOverlay}
        onClick={() => dispatch(toggleModalLogin())}
      ></div>
      <div className={styles.modalContent}>
        <p className={styles.modalTitle}>Đăng Nhập</p>
        <label htmlFor="phone" className="text-black font-semibold ">
          Số điện thoại:
          <input
            type="text"
            className="w-full mt-2 p-2 border-2 outline-none text-primaryBlack rounded-xl mb-[1rem]"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label htmlFor="passwordLogin" className="text-black font-semibold">
          Mật khẩu:
          <div className="relative">
            <input
              type={isShowPassword ? "text" : "password"}
              className="w-full mt-2 border-2 outline-none p-2 text-primaryBlack rounded-xl mb-[0.5rem]"
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

        <Button
          type="primary"
          style={{ width: "100%", marginBottom: "10px" }}
          onClick={() => loginGoogle()}
        >
          {/* Đăng nhập bằng Google */}
        </Button>

        <Button
          onClick={handlelogin}
          className="h-10 w-full px-2 text-center font-semibold mt-8 rounded-3xl duration-150"
          style={{
            backgroundColor: "black",
            color: "white",
            borderColor: "transparent",
            height: "2.5rem",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "teal";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "transparent";
          }}
        >
          Đăng nhập
        </Button>

        <div className={styles.smallText}>
          <span>Bạn chưa có tài khoản? </span>
          <Typography.Link
            className="pl-1 font-semibold"
            style={{ color: "teal" }}
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
