import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import App from "./App.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import ManageProduct from "./components/Admin/ManageProduct/ManageProduct.jsx";
import ManageOrder from "./components/Admin/ManageOrder/ManageOrder.jsx";
import ProtectedRoutes from "./components/ProtectedRoute/ProtectedRoute.jsx";
import InfoPay from "./pages/InfoPay.jsx";
import DetailProductPage from "./pages/DetailProductPage.jsx";
import "./index.css";
import OrderPage from "./pages/OrderPage.jsx";
import AddressPage from "./pages/AddressPage.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./components/Admin/Dashboard/Dashboard.jsx";
import "ckeditor5/ckeditor5.css";

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
        path: "product",
        element: <ProductPage />,
      },
      {
        path: "order",
        element: <OrderPage />,
      },
      { path: "/payment", element: <InfoPay /> },
      {
        path: "infomation",
        element: <ProductPage />,
      },
    ],
  },
  {
    path: "admin",
    element: <AdminPage />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        ),
      },
      {
        path: "product",
        element: (
          <ProtectedRoutes>
            <ManageProduct />
          </ProtectedRoutes>
        ),
      },
      {
        path: "order",
        element: (
          <ProtectedRoutes>
            <ManageOrder />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
