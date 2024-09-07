import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  toggleModalAddProduct,
  toggleModalEditProduct,
} from "../../../redux/features/toggle/toggleSlice";
import ModalAddProduct from "../../Modal/ModalAddProduct/ModalAddProduct";
import { callDeleteProduct, callFetchProduct } from "../../../services/api";
import formatPrice from "../../../utils/formatPrice";
import ModalEditProduct from "../../Modal/ModalEditProduct/ModalEditProduct";
import { TbRefresh } from "react-icons/tb";
import { IoIosAddCircle } from "react-icons/io";

const ManageProduct = () => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [productEdit, setProductEdit] = useState({});

  const handleDeleteProduct = async (id) => {
    try {
      const res = await callDeleteProduct(id);
      if (res.vcode === 0) {
        const newProducts = products.filter((product) => product._id !== id);
        setProducts(newProducts);
        alert(res.message);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.error("error", error.message);
    }
  };

  const fetchProduct = async (page) => {
    setLoading(true);
    try {
      const res = await callFetchProduct(page, pageSize);
      const products = res.data.result.map((item) => ({
        ...item,
        key: item._id,
      }));
      setTotal(res.data.meta.total);
      setProducts(products);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct(current);
  }, [current, pageSize]);

  const totalPages = Math.ceil(total / pageSize);

  const handlePageClick = (page) => {
    setCurrent(page);
  };

  return (
    <div>
      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          gap: "0px",
          flexDirection: "column",
        }}
      >
        <div className="flex gap-2 items-center">
          {" "}
          <button
            className=" border-2 rounded-3xl text-primaryTeal lg:text-2xl md:text-xl text-lg font-semibold"
            onClick={() => {
              dispatch(toggleModalAddProduct());
            }}
          >
            <div className="flex gap-1 h-full p-1 px-2 items-center">
              <IoIosAddCircle className="text-primaryBlack w-6 h-6 border-r-2" />
              <div className="mt-1">Thêm sản phẩm</div>
            </div>
          </button>
          <div className="flex text-xl">
            {" "}
            <button onClick={() => fetchProduct(current)}>
              <TbRefresh className="bg-primaryBlack text-white rounded-full p-1 w-8 h-8" />
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          overflowX: "auto",
          marginBottom: "16px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th
                className="lg:text-2xl md:text-xl text-lg"
                style={{
                  paddingRight: "50px",
                  textAlign: "left",
                  color: "#1a202c",
                }}
              >
                Hình ảnh
              </th>
              <th
                className="lg:text-2xl md:text-xl text-lg"
                style={{ padding: "0px", textAlign: "left", color: "#1a202c" }}
              >
                Tên
              </th>
              <th
                className="lg:text-2xl md:text-xl text-lg"
                style={{
                  paddingRight: "50px",
                  textAlign: "left",
                  color: "#1a202c",
                }}
              >
                Giá khuyến mãi
              </th>
              <th
                className="lg:text-2xl md:text-xl text-lg"
                style={{
                  paddingRight: "50px",
                  textAlign: "left",
                  color: "#1a202c",
                }}
              >
                Tình trạng
              </th>
              <th
                className="lg:text-2xl md:text-xl text-lg"
                style={{ padding: "0px", textAlign: "left", color: "#1a202c" }}
              >
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td style={{ paddingTop: "16px", textAlign: "" }}>
                  <div className="w-full flex justify-start">
                    {" "}
                    <img
                      src={
                        import.meta.env.VITE_BASE_URL +
                        "/images/fish/" +
                        product.images[0]
                      }
                      alt={product.name}
                      style={{
                        maxWidth: "100px",
                        height: "auto",
                        objectFit: "cover",
                        display: "block",
                        marginRight: "50px",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                </td>
                <td
                  className="lg:text-xl md:text-lg text-md"
                  style={{
                    paddingRight: "50px",
                    fontWeight: "bold",
                    color: "#4a4a4a",
                  }}
                >
                  {product.name}
                </td>
                <td
                  className="lg:text-xl md:text-lg text-md"
                  style={{
                    paddingRight: "50px",
                    fontWeight: "bold",
                    color: "#20a69f",
                  }}
                >
                  {formatPrice(product.discountedPrice)}đ
                </td>
                <td
                  className="lg:text-xl md:text-lg text-md"
                  style={{ paddingRight: "50px", fontWeight: "bold" }}
                >
                  <span
                    style={{
                      color: product.status ? "green" : "red",
                    }}
                  >
                    {product.status ? "Còn hàng" : "Hết hàng"}
                  </span>
                </td>
                <td style={{ paddingRight: "0px" }}>
                  <button
                    style={{ color: "orange", fontSize: "1.2rem" }}
                    onClick={() => {
                      dispatch(toggleModalEditProduct());
                      setProductEdit(product);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    style={{ color: "red", fontSize: "1.2rem" }}
                    onClick={() => {
                      if (
                        window.confirm(
                          "Bạn có chắc chắn muốn xóa sản phẩm này?"
                        )
                      ) {
                        handleDeleteProduct(product._id);
                      }
                    }}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        style={{
          marginTop: "16px",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            isLoading={isLoading}
            key={index + 1}
            onClick={() => handlePageClick(index + 1)}
            style={{
              width: "30px",
              height: "30px",
              border: "2px solid #1a202c",
              borderRadius: "0.375rem",
              backgroundColor: current === index + 1 ? "#1a202c" : "#fff",
              color: current === index + 1 ? "#fff" : "#1a202c",
              cursor: "pointer",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <ModalAddProduct setProducts={setProducts} />
      <ModalEditProduct productEdit={productEdit} setProducts={setProducts} />
    </div>
  );
};

export default ManageProduct;
