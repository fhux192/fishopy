import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MessageBox from "./components/Products/MessageBox";
import ModalLogin from "./components/ModalLogin/ModalLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ModalRegister from "./components/ModalRegister/ModalRegister";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <main className="main-body">
        <Outlet />
      </main>
      <Footer />
      <MessageBox />
      <ModalLogin />
      <ToastContainer />
      <ModalRegister />
    </>
  );
}

export default App;
