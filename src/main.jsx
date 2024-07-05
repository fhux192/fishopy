import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import App from "./App.jsx";
import AllProductPage from "./pages/AllProductPage.jsx";
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
import Dashboard from "./components/Admin/DashBoard/DashBoard.jsx";
import "ckeditor5/ckeditor5.css";
import OrderHistoryPage from "./pages/OrderHistoryPage.jsx";

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
        element: <AllProductPage />,
      },
      {
        path: "order",
        element: <OrderPage />,
      },
      {
        path:"/order-history",
        element:<OrderHistoryPage/>
      },
      { path: "/payment", element: <InfoPay /> },
      {
        path: "infomation",
        element: <AllProductPage />,
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
