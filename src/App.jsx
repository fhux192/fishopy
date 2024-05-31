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


function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      
      <main className={`main-body`}>
        <Outlet />
      </main>
      <Footer />
      <ModalLogin />
      <ToastContainer />
      <MessageBox />
      <ModalRegister />
    </>
  );
}

export default App;
