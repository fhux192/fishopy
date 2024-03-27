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
import { useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import ModalRegister from "./components/ModalRegister/ModalRegister";
import TopInfo from "./components/TopInfo/TopInfo";

function App() {
  const { pathname } = useLocation();
  const [position,setPosition]=useState(0);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setPosition(scrollTop > 98 ? 20 : 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <TopInfo />
      <Header />
      <main className={`main-body mt-${position}`}>
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
