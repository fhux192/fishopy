import { Button, Space, Table, Typography, Tag, Image, message } from "antd";
import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { toggleModalAddProduct } from "../../../redux/features/toggle/toggleSlice";
import ModalAddProduct from "../../Modal/ModalAddProduct/ModalAddProduct";
import { callDeleteProduct, callFetchProduct } from "../../../services/api";

const ManageProduct = () => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [products, setProducts] = useState([]);

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "images",
      key: "images",
      render: (images) => (
        <Image
          src={import.meta.env.VITE_BASE_URL + "/images/fish/" + images[0]}
          style={{ width: "100px", height: "100px" }}
        />
      ),
      width: 150,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
      width: 150,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 150,
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status ? "green" : "red"}>
          {status ? "Còn hàng" : "Hết hàng"} {status}
        </Tag>
      ),
      width: 150,
    },
    {
      title: " Thao tác",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => (
        <Space>
          <EditOutlined
            style={{
              color: "orange",
            }}
          />

          <DeleteOutlined
            onClick={() => handleDeleteProduct(_id)}
            style={{
              color: "red",
            }}
          />
        </Space>
      ),
      width: 150,
    },
  ];

  const handleDeleteProduct = async (id) => {
    try {
      const res = await callDeleteProduct(id);
      if (res.vcode == 0) {
        const newProducts = products.filter((product) => product._id !== id);
        setProducts(newProducts);
        message.success(res.message);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.error("error", error.message);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await callFetchProduct(current, pageSize);
        console.log(res);
        const products = res.data.result.map((item) => ({
          ...item,
          key: item._id,
        }));
        setProducts(products);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div>
      <Button
        type="link"
        style={{
          marginBottom: 16,
        }}
        onClick={() => {
          dispatch(toggleModalAddProduct());
        }}
      >
        Thêm sản phẩm
      </Button>
      <Table columns={columns} dataSource={products} loading={isLoading} />

      <ModalAddProduct setProducts={setProducts} />
    </div>
  );
};
export default ManageProduct;
