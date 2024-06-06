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
