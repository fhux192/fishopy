import { Button, Space, Table, Typography, Tag, Image, message, Flex, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  toggleModalAddProduct,
  toggleModalEditProduct,
} from "../../../redux/features/toggle/toggleSlice";
import ModalAddProduct from "../../Modal/ModalAddProduct/ModalAddProduct";
import { callDeleteProduct, callFetchProduct } from "../../../services/api";
import formatPrice from "../../../utils/formatPrice";
import ModalEditProduct from "../../Modal/ModalEditProduct/ModalEditProduct";

const ManageProduct = () => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [products, setProducts] = useState([]);
  const [productEdit, setProductEdit] = useState({});

  console.log("products", products);

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
      title: "Giá khuyến mãi",
      dataIndex: "discountedPrice",
      key: "discountedPrice",
      render: (price) => <p>{formatPrice(price)}</p>,
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
      render: (_id, pro) => (
        <Space>
          <EditOutlined
            style={{
              color: "orange",
            }}
            onClick={() => {
              dispatch(toggleModalEditProduct());
              setProductEdit(pro);
            }}
          />

          <Popconfirm
            title="Xóa sản phẩm này"
            description="Bạn có chắc chắn muốn xóa sản phẩm này?"
            onConfirm={() => handleDeleteProduct(_id)}
            okText="Có"
            cancelText="Không"
          >
            <DeleteOutlined
              style={{
                color: "red",
              }}
            />
          </Popconfirm>
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
      <Flex
        style={{
          marginBottom: 16,
        }}
        gap={10}
      >
        <Button
          onClick={() => {
            dispatch(toggleModalAddProduct());
          }}
        >
          Thêm sản phẩm
        </Button>
        <Button>
          <ReloadOutlined />
        </Button>
      </Flex>
      <Table columns={columns} dataSource={products} loading={isLoading} />

      <ModalAddProduct setProducts={setProducts} />

      <ModalEditProduct productEdit={productEdit} setProducts={setProducts} />
    </div>
  );
};
export default ManageProduct;
