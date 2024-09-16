import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import App from "./App.jsx";
import AllProductPage from "./pages/AllProductPage/AllProductPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import ManageProduct from "./components/Admin/ManageProduct/ManageProduct.jsx";
import ManageOrder from "./components/Admin/ManageOrder/ManageOrder.jsx";
import InfoPay from "./pages/InfoPay.jsx";
import DetailProductPage from "./pages/DetailProductPage/DetailProductPage.jsx";
import "./index.css";
import AddressPage from "./pages/AddressPage/AddressPage.jsx";
import Home from "./pages/Home/Home.jsx";
import Dashboard from "./components/Admin/Dashboardd/Dashboardd.jsx";
import "ckeditor5/ckeditor5.css";
import OrderHistoryPage from "./pages/OrderHistoryPage.jsx";
import AccountManagement from "./pages/AccountManagement/AccountManagement.jsx";
import AccountProfile from "./components/Account/AccountProfile/AccountProfile.jsx";
import AccountAddress from "./components/Account/AccountAddress/AccountAddress.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import OrderPage from "./pages/OrderPage/OrderPage.jsx";
import AccountOrder from "./components/AccountOrder/AccountOrder.jsx";
import UserManagement from "./pages/UserManagement/UserManagement.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
          <ProtectedRoute role={"ALL"}>
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
          <ProtectedRoute role={"ALL"}>
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
