import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import Home from "./pages/Home.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import DetailProductPage from "./pages/DetailProductPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import ManageProduct from "./components/Admin/Product/ManageProduct/ManageProduct.jsx";
import DashBoard from "./components/Admin/DashBoard/DashBoard.jsx";
import ProtectedRoutes from "./components/ProtectedRoute/ProtectedRoute.jsx";

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
        path: "product",
        element: <ProductPage />,
      },
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
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
