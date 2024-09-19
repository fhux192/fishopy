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
import OrderHistoryPage from "./pages/OrderHistoryPage.jsx";
import AccountManagement from "./pages/AccountManagement/AccountManagement.jsx";
import AccountProfile from "./components/Account/AccountProfile/AccountProfile.jsx";
import AccountAddress from "./components/Account/AccountAddress/AccountAddress.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import OrderPage from "./pages/OrderPage/OrderPage.jsx";
import AccountOrder from "./components/AccountOrder/AccountOrder.jsx";
import UserManagement from "./pages/UserManagement/UserManagement.jsx";
import AddressPage from "./pages/AddressPage/AddressPage.jsx";
import Home from "./pages/Home/Home.jsx";
import Dashboard from "./components/Admin/Dashboardd/Dashboardd.jsx";
import AllProductPage from "./pages/AllProductPage/AllProductPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import ManageProduct from "./components/Admin/ManageProduct/ManageProduct.jsx";
import ManageOrder from "./components/Admin/ManageOrder/ManageOrder.jsx";
import InfoPay from "./pages/InfoPay.jsx";
import DetailProductPage from "./pages/DetailProductPage/DetailProductPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const User = () => {
  const { isShowModalLogin, modalRegister } = useSelector((state) => state.toggle);
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
      {isShowModalLogin && <ModalLogin />}
      {modalRegister && <ModalRegister />}
      <CartDrawer />
      <ToastContainer />
      <MessageBox />
      <ModalAddAddress />
    </>
  );
};

function App() {
  const { isLoading } = useSelector((state) => state.account);
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (localStorage.getItem("status_login") == 0) {
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
          path: "fish/:id",
          element: <DetailProductPage />,
        },
        {
          path: "address",
          element: <AddressPage />,
        },
        {
          path: "account",
          element: (
            <ProtectedRoute>
              <AccountManagement />
            </ProtectedRoute>
          ),
          children: [
            {
              index: true,

              element: <AccountProfile />,
            },
            {
              path: "address",
              element: <AccountAddress />,
            },
            {
              path: "order",
              element: <AccountOrder />,
            },
          ],
        },
        {
          path: "product",
          element: <AllProductPage />,
        },
        {
          path: "order",
          element: (
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/order-history",
          element: <OrderHistoryPage />,
        },
        { path: "/payment", element: <InfoPay /> },
        {
          path: "infomation",
          element: <AllProductPage />,
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute role={"ADMIN"}>
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
          element: <UserManagement />,
        },
      ],
    },
  ]);

  return <>{isLoading ? <Loader /> : <RouterProvider router={router} />}</>;
}

export default App;
