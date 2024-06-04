import { useDispatch, useSelector } from "react-redux";
import { toggleModalLogin } from "../../../redux/features/toggle/toggleSlice";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { callLogin } from "../../../services/api";
import { toast } from "react-toastify";
import { setCredentials } from "../../../redux/features/user/userSlice";
import { Button } from "antd";
import { motion } from "framer-motion";
import styles from "./ModalLogin.module.css";

const ModalLogin = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { isShowModalLogin } = useSelector((state) => state.toggle);
  const handlelogin = async () => {
    setIsLoading(true);
    const res = await callLogin(email, password);

    setTimeout(() => {
      if (res.vcode == 0) {
        dispatch(setCredentials(res.data));
        toast.success(res.msg);
        dispatch(toggleModalLogin());
        // Reset form
        setEmail("");
        setPassword("");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(res.msg);
      }
    }, 500);
  };

  return (
    <div className={styles.modal}>
      <div
        className={styles.modalOverlay}
        onClick={() => dispatch(toggleModalLogin())}
      ></div>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Đăng Nhập</h2>
        <label htmlFor="emailLogin" className="text-white ">
          Email:
          <input
            type="text"
            className="w-full p-2 outline-none text-primaryBlack rounded mb-[1rem]"
            id="emailLogin"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          loading={isLoading}
          className="h-10 w-full px-2 text-center bg-teal-900  text-white mt-4 hover:bg-teal-700 rounded-full duration-150  "
        >
          Đăng Nhập
        </Button>
      </div>
    </div>
  );
};
export default ModalLogin;
