import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MessageBox from "./components/Products/MessageBox";
import ModalLogin from "./components/ModalLogin/ModalLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route,Routes } from "react-router-dom";
import Home from "./router/page/Home";
import ProductPage from "./router/page/ProductPage";

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="home" element={<Home/>}/>
      <Route path="product" element={<ProductPage/>}/>
      <Route path="infomation" element={<Home/>}/>
    </Routes>
    <MessageBox />
      <Footer />
      <ModalLogin />
      <ToastContainer />
    </>
  );
}

export default App;
