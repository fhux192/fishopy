import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import App from "./App.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import ManageProduct from "./components/Admin/Product/ManageProduct/ManageProduct.jsx";
import DashBoard from "./components/Admin/DashBoard/DashBoard.jsx";
import ProtectedRoutes from "./components/ProtectedRoute/ProtectedRoute.jsx";
import Header from "./components/Header/Header.jsx";
import InfoPay from "./pages/InfoPay.jsx";
import DetailProductPage from "./pages/DetailProductPage.jsx";
import AllProducts from "./components/Layouts/ProductPageLayout/AllProducts.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <ProductPage />,
      },
      {
        path: "fish/:id",
        element: <DetailProductPage />,
      },
      {
        path: "product",
        element: (
          <Header>
            <ProductPage />
          </Header>
        ),
      },
      { path: "/payment", element: <InfoPay /> },
      {
        path: "infomation",
        element: (
          <Header>
            <ProductPage />
          </Header>
        ),
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
            <DashBoard />
          </ProtectedRoutes>
        ),
      },
      {
        path: "manage-product",
        element: (
          <ProtectedRoutes>
            <ManageProduct />
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
