import "./App.css";
import Footer from "./components/Footer/Footer";
import MessageBox from "./components/MessageBox/MessageBox";
import ModalLogin from "./components/Modal/ModalLogin/ModalLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ModalRegister from "./components/Modal/ModalRegister/ModalRegister";
import { useDispatch, useSelector } from "react-redux";
import CartDrawer from "./components/CartDrawer";
import Navbar from "./components/Header/Navbar/Navbar";
import BottomNavBar from "./components/Header/Navbar/BottomNavBar";
import { callFetchAccount } from "./services/api";
import { setCredentials, setLoading } from "./redux/features/user/userSlice";
import ModalAddAddress from "./components/Modal/ModalAddAddress/index";
import Loader from "./components/Loader/Loader";

function App() {
  const { pathname } = useLocation();
  const { isShowModalLogin, modalRegister } = useSelector(
    (state) => state.toggle
  );
  const status_login = localStorage.getItem("status_login");
  const { isLoading } = useSelector((state) => state.account);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (status_login == 0) {
      handleFetchAccount();
    } else {
      dispatch(setLoading(false));
    }
    const originalTitle = document.title;
    const titles = [
      "Đừng đi mà 🥺 | Guppy Hóc Môn",
      "Quay lại đi 😢 | Guppy Hóc Môn",
      "Nhớ bạn quá 😢 | Guppy Hóc Môn",
      "Chờ bạn trở lại 🥺 | Guppy Hóc Môn",
    ];

    const handleVisibilityChange = () => {
      if (document.hidden) {
        const randomIndex = Math.floor(Math.random() * titles.length);
        document.title = titles[randomIndex];
      } else {
        document.title = originalTitle;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleFetchAccount = async () => {
    try {
      const res = await callFetchAccount();
      if (res.vcode === 0) {
        dispatch(setCredentials(res.data));
      }
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Lỗi khi tải tài khoản:", error);
    }
  };

  return (
    <>
      <Navbar />
      <BottomNavBar />
      <main className={`main-body`}>
        <Outlet />
      </main>
      <Footer />
      {isShowModalLogin && <ModalLogin />}
      {modalRegister && <ModalRegister />}
      <CartDrawer />
      <ToastContainer />
      <MessageBox />
      <ModalAddAddress />
      {isLoading && <Loader />}
    </>
  );
}

export default App;
