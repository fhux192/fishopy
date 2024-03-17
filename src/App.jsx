import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import Slider from "./components/Slider/Slider";
import { slides } from "./components/Slider/MenuSlider";
import Products from "./components/Products/Products";
import BigImage from "./components/Products/BigImage";
import MessageBox from "./components/Products/MessageBox";
import InfoBox from "./components/Products/InfoBox";
import ModalLogin from "./components/ModalLogin/ModalLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Header />
      <main className="main-body">
        <Outlet />
        <Slider slides={slides} />
        <MessageBox />
        <Products />
        <BigImage />
        <InfoBox />
      </main>
      <Footer />
      <ModalLogin />
      <ToastContainer />
    </>
  );
}

export default App;
