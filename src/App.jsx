import "./App.css";
import Footer from "./components/Footer/Footer";
import MessageBox from "./components/Layouts/MessageBox";
import ModalLogin from "./components/Modal/ModalLogin/ModalLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ModalRegister from "./components/Modal/ModalRegister/ModalRegister";
import { useSelector } from "react-redux";
import CartDrawer from "./components/CartDrawer";
import Navbar from "./components/Header/Navbar/Navbar";

function App() {
  const { pathname } = useLocation();
  const { isShowModalLogin } = useSelector((state) => state.toggle);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const originalTitle = document.title;
    const titles = [
      "Đừng đi mà 🥺 | Guppy Hóc Môn",
      "Quay lại đi 😢 | Guppy Hóc Môn",
      "Nhớ bạn quá 😢 | Guppy Hóc Môn",
      "Chờ bạn trở lại 🥺 | Guppy Hóc Môn"
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
  return (
    <>
      <Navbar /> {/* Use Navbar component */}
      <main className={`main-body`}>
        <Outlet />
      </main>
      <Footer />
      {isShowModalLogin && <ModalLogin />}
      <CartDrawer />
      <ToastContainer />
      <MessageBox />
      <ModalRegister />
    </>
  );
}

export default App;
