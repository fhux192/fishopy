import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import Slider from "./components/Slider/Slider";
import { slides } from "./components/Slider/MenuSlider";
import Products from "./components/Products/Products";

function App() {
  return (
    <>
      <Header />
      <main className="main-body">
        <Outlet />
        <Slider slides={slides} />
        <Products />
      </main>
      <Footer />
    </>
  );
}

export default App;
