import { useDispatch } from "react-redux";
import { toggle } from "@redux/features/toggle/toggleSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { free_google_login, free_login } from "@services/api";
import { toast } from "react-toastify";
import { setCredentials } from "@redux/features/user/userSlice";
import { Button, Typography, message, Image } from "antd";
import styles from "./ModalLogin.module.css";
import { useGoogleLogin } from "@react-oauth/google";
import logo from "@assets/google-logo.webp";

const ModalLogin = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handlelogin = async () => {
    try {
      const res = await free_login({ phone, password });
      if (res.vcode === 0) {
        dispatch(setCredentials(res.data));
        toast.success(res.msg);
        dispatch(toggle("modalLogin"));
        setPhone("");
        setPassword("");
      } else {
        toast.error(res.msg);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const onGoogleSuccess = async (response) => {
    try {
      const res = await free_google_login(response.access_token);
      if (res.vcode != 0) {
        return message.error(res.msg);
      }

      dispatch(setCredentials(res.data));
      message.success(res.msg);
      dispatch(toggle("modalLogin"));
    } catch (error) {
      console.error(error);
    }
  };

  const onGoogleFailure = (response) => {
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
        onClick={() => dispatch(toggle("modalLogin"))}
      ></div>
      <div className={styles.modalContent}>
        <p className={styles.modalTitle}>Đăng Nhập</p>
        <label htmlFor="phone" className="text-Black font-semibold ">
          Số điện thoại:
          <input
            type="text"
            className="w-full mt-1 p-2 border-2 outline-none text-Black rounded-lg mb-[0.5rem]"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label htmlFor="passwordLogin" className="text-Black font-semibold">
          Mật khẩu:
          <div className="relative">
            <input
              type={isShowPassword ? "text" : "password"}
              className="w-full mt-1 border-2 outline-none p-2 text-Black rounded-lg mb-[0.5rem]"
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
                className="absolute right-2 top-[38%] -translate-y-1/4 text-white cursor-pointer"
                color="black"
                size={20}
              />
            )}
          </div>
        </label>
        {/* <Typography
          onClick={() => {
            message.info(
              "Quên thì thôi bạn"
            );
          }}
          className="text-teal-700 ml-1 mt-2 cursor-pointer font-semibold"
        >
          Bạn quên mật khẩu?
        </Typography> */}
        <Button
          onClick={handlelogin}
          className="h-10 w-full px-2 text-center font-semibold mt-4 rounded-3xl duration-150"
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
          <span className=" cursor-default font-semibold text-Black">
            Bạn chưa có tài khoản?{" "}
          </span>
          <Typography.Link
            className="pl-1 font-bold"
            style={{ color: "teal" }}
            onClick={() => {
              dispatch(toggle("modalLogin"));
              dispatch(toggle("modalRegister"));
            }}
          >
            Đăng ký
          </Typography.Link>
        </div>
        <div className="flex mt-5 justify-center">
          <p className="text-Grey font-medium cursor-default">
            Hoặc đăng nhập bằng Gmail
          </p>
        </div>
        <div className="flex mt-2 w-full justify-center">
          <Image
            src={logo}
            style={{
              cursor: "pointer",
              width: "2rem",
              marginBottom: "10px",
            }}
            preview={false}
            onClick={() => loginGoogle()}
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default ModalLogin;
