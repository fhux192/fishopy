import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { user_fetchAccount } from "./services/api";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Footer from "@components/Common/Footer/Footer";
import MessageBox from "@components/Common/MessageBox/MessageBox";
import Navbar from "@components/Common/Header/Navbar/Navbar";
import CartDrawer from "@components/Cart/DrawerCart/DrawerCart.jsx";
import Loader from "@components/Common/Loader/Loader";
import BottomNavBar from "@components/Common/Header/Navbar/BottomNavBar";
import ManageAccount from "@pages/User/ManageAccount/ManageAccount.jsx";
import Profile from "@pages/User/ManageAccount/Profile/Profile.jsx";
import Addresses from "@pages/User/ManageAccount/Addresses/Addresses.jsx";
import Order from "@pages/User/ManageAccount/Order/Order.jsx";
import OrderPage from "@pages/Common/OrderPage/OrderPage.jsx";
import ModalLogin from "@components/Auth/ModalLogin/ModalLogin.jsx";
import ModalRegister from "@components/Auth/ModalRegister/ModalRegister.jsx";
import ProtectedRoute from "@components/Auth/ProtectedRoute/ProtectedRoute.jsx";
import AddressPage from "@pages/Common/AddressPage/AddressPage.jsx";
import Home from "@pages/Common/Home/Home.jsx";
import Dashboard from "@components/Admin/Dashboardd/Dashboardd.jsx";
import AllProductPage from "@pages/Common/AllProductPage/AllProductPage.jsx";
import ManageOrder from "@pages/Admin/ManageOrder/ManageOrder.jsx";
import ManageCombo from "@pages/Admin/ManageCombo/ManageCombo.jsx";
import AdminPage from "@pages/Admin/AdminPage/AdminPage.jsx";
import ManageProduct from "@pages/Admin/ManageProduct/ManageProduct.jsx";
import ManageUser from "@pages/Admin/ManageUser/ManageUser.jsx";
import { setCredentials, setLoading } from "@redux/features/user/userSlice";

const User = () => {
  const { modalLogin, modalRegister } = useSelector((state) => state.toggle);
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <Navbar />
      <BottomNavBar />
      <main className={`main-body`}>
        <Outlet />
      </main>
      <Footer />
      {modalLogin && <ModalLogin />}
      {modalRegister && <ModalRegister />}
      <CartDrawer />
      <ToastContainer />
      <MessageBox />
    </>
  );
};

function App() {
  const { isLoading } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const handleFetchAccount = async () => {
    try {
      const res = await user_fetchAccount();
      if (res.vcode != 0) {
        if (res.vcode == 1 && res.msg == "Vui lòng đăng nhập") {
          localStorage.setItem("status_login", 1);
          return dispatch(setLoading(false));
        }
        return message.error(res.msg);
      }
      dispatch(setCredentials(res.data));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (localStorage.getItem("status_login") == 0) {
      handleFetchAccount();
    } else {
      dispatch(setLoading(false));
      localStorage.setItem("status_login", 1);
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
      }

      if (!localStorage.getItem("addresses")) {
        localStorage.setItem("addresses", JSON.stringify([]));
      }
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

  const router = createBrowserRouter([
    {
      path: "/",
      element: <User />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "address",
          element: <AddressPage />,
        },

        {
          path: "product",
          element: <AllProductPage />,
        },
        {
          path: "order",
          element: <OrderPage />,
        },
        {
          path: "account",
          element: (
            <ProtectedRoute roles={["USER", "ADMIN"]}>
              <ManageAccount />
            </ProtectedRoute>
          ),
          children: [
            {
              index: true,
              element: <Profile />,
            },
            {
              path: "address",
              element: <Addresses />,
            },
            {
              path: "order",
              element: <Order />,
            },
          ],
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute roles={["ADMIN"]}>
          <AdminPage />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "product",
          element: <ManageProduct />,
        },
        {
          path: "order",
          element: <ManageOrder />,
        },
        {
          path: "user",
          element: <ManageUser />,
        },
        {
          path: "combo",
          element: <ManageCombo />,
        },
      ],
    },
  ]);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_G_CLIENT_ID}>
      {isLoading ? <Loader /> : <RouterProvider router={router} />}
    </GoogleOAuthProvider>
  );
}

export default App;
