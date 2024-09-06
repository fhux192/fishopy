import { useDispatch, useSelector } from "react-redux";
import { toggleModalLogin, toggleModalRegister } from "../../../redux/features/toggle/toggleSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { callRegister } from "../../../services/api";
import { toast } from "react-toastify";
import { setCredentials } from "../../../redux/features/user/userSlice";
import { message } from "antd";
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

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        toast.error("Mật khẩu không trùng khớp");
        return;
      }

      const res = await callRegister({ name, password, phone });

      console.log("check res", res);

      if (res.vcode === 0) {
        dispatch(setCredentials(res.data));
        toast.success(res.message);
        dispatch(toggleModalRegister());

        // Reset form
        setName("");
        setPhone("");
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
    <div className={`${styles.modal} ${modalRegister ? styles.fixed : styles.hidden}`}>
      <div className={styles.modalOverlay} onClick={() => dispatch(toggleModalRegister())}></div>
      <div className={styles.modalContent}>
        <h1 className={styles.modalTitle}>Đăng ký</h1>
        <label htmlFor="name" className="text-black font-semibold">
          Họ và tên:
          <input
            type="text"
            className="w-full   mt-2 p-2 outline-none border-2 text-primaryBlack rounded-xl mb-4"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="phone" className="text-black font-semibold">
          Số điện thoại:
          <input
            type="text"
            className="w-full  mt-2 border-2 p-2 outline-none text-primaryBlack rounded-xl mb-4"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label htmlFor="passwordRegister" className="text-black font-semibold">
          Mật Khẩu:
          <div className="relative">
            <input
              type={isShowPassword.showPassword ? "text" : "password"}
              className="w-full  mt-2 border-2 p-2 outline-none text-primaryBlack rounded-xl mb-4"
              id="passwordRegister"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isShowPassword.showPassword ? (
              <FaEye
                onClick={() =>
                  setIsShowPassword((prev) => ({
                    ...prev,
                    showPassword: !prev.showPassword,
                  }))
                }
                className="absolute right-2 top-[42%] -translate-y-1/4 text-black font-semibold cursor-pointer"
                color="black"
                size={20}
              />
            ) : (
              <FaEyeSlash
                onClick={() =>
                  setIsShowPassword((prev) => ({
                    ...prev,
                    showPassword: !prev.showPassword,
                  }))
                }
                className="absolute right-2 top-[42%] -translate-y-1/4 text-black font-semibold cursor-pointer"
                color="black"
                size={20}
              />
            )}
          </div>
        </label>

        <label htmlFor="confirmPassword" className="text-black font-semibold">
          Xác nhận mật khẩu:
          <div className="relative">
            <input
              type={isShowPassword.showConfirmPassword ? "text" : "password"}
              className="w-full  mt-2 border-2 p-2 outline-none text-primaryBlack rounded-xl mb-2"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {isShowPassword.showConfirmPassword ? (
              <FaEye
                onClick={() =>
                  setIsShowPassword((prev) => ({
                    ...prev,
                    showConfirmPassword: !prev.showConfirmPassword,
                  }))
                }
                className="absolute right-2 top-[42%] -translate-y-1/4 text-black cursor-pointer"
                color="black"
                size={20}
              />
            ) : (
              <FaEyeSlash
                onClick={() =>
                  setIsShowPassword((prev) => ({
                    ...prev,
                    showConfirmPassword: !prev.showConfirmPassword,
                  }))
                }
                className="absolute right-2 top-[42%] -translate-y-1/4 text-black cursor-pointer"
                color="black"
                size={20}
              />
            )}
          </div>
        </label>
        <button
          onClick={handleRegister}
          className="h-10 w-full hover:border-2 hover:border-teal-500  px-2 text-center font-semibold bg-primaryBlack text-white mt-8  rounded-3xl duration-150"
        >
          Đăng Ký
        </button>
        <div className={styles.smallText}>
          <span>Bạn đã có tài khoản? </span>
          <a
            className="pl-1 text-primaryTeal font-semibold cursor-pointer"
            onClick={() => {
              dispatch(toggleModalLogin());
              dispatch(toggleModalRegister());
            }}
          > 
            Đăng nhập
          </a>
        </div>
      </div>
    </div>
  );
};

export default ModalRegister;
