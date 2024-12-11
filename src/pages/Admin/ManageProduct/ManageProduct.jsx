import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Table, message, Image, Popconfirm, Space } from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { toggle } from "@redux/features/toggle/toggleSlice";
import ModalAddProduct from "@components/Admin/Product/ModalAddProduct/ModalAddProduct";
import ModalEditProduct from "@components/Admin/Product/ModalEditProduct/ModalEditProduct";
import { admin_getProducts_byFields, admin_deleteProduct } from "@services/api";
import { formatPrice } from "@utils/function";

const ManageProduct = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [productEdit, setProductEdit] = useState();

  const handleDeleteProduct = async (id) => {
    setLoading(true);
    try {
      const res = await admin_deleteProduct(id);
      if (res.vcode !== 0) {
        return message.error(res.msg);
      }

      const newProducts = products.filter((product) => product._id !== id);
      setProducts(newProducts);
      message.success(res.msg);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getProducts = async (query, sort, limit, page) => {
    // console.log("Data", Data);
    // Data.forEach(async (p) => {
    //   const res = await admin_addProduct({ ...p, link: convertToSlug(p.name) });
    // });
    setLoading(true);
    try {
      const res = await admin_getProducts_byFields(query, sort, limit, page);
      if (res.vcode != 0) {
        return message.error(res.msg);
      }
      let products = res.data.map((p) => ({
        ...p,
        key: p._id,
      }));
      setProducts(products);
      setTotal(res.total);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "imgs",
      key: "imgs",
      render: (imgs, record) => (
        <Image src={imgs[0]} alt={record.name} width={100} />
      ),
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Giá bán",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>{formatPrice(price)}đ</span>,
    },
    {
      title: "Giá khuyến mãi",
      dataIndex: "price_sale",
      key: "price_sale",
      width: 150,
      render: (price_sale) => <span>{formatPrice(price_sale)}đ</span>,
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      key: "status",
      width: 150,

      render: (status) => (
        <span
          className={`font-bold ${status ? "text-green-500" : "text-red-500"}`}
        >
          {status ? "Còn hàng" : "Hết hàng"}
        </span>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      width: 100,
      fixed: "right",
      render: (record) => (
        <>
          <Button
            type="link"
            icon={<EditOutlined style={{ color: "orange" }} />}
            onClick={() => {
              dispatch(toggle("modalEditProduct"));
              setProductEdit(record);
            }}
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa sản phẩm này?"
            okText="Có"
            cancelText="Không"
            onConfirm={() => handleDeleteProduct(record._id)}
          >
            <Button
              type="link"
              icon={<DeleteOutlined style={{ color: "red" }} />}
            />
          </Popconfirm>
        </>
      ),
    },
  ];

  useEffect(() => {
    getProducts({}, {}, limit, page);
  }, []);

  return (
    <>
      <div className="flex justify-end items-center mb-4">
        <Space>
          <Button
            icon={<PlusCircleOutlined />}
            onClick={() => dispatch(toggle("modalAddProduct"))}
          >
            Thêm sản phẩm
          </Button>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => {
              setPage(1);
              setLimit(10);
              getProducts({}, {}, 10, 1);
            }}
          ></Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={products}
        loading={loading}
        pagination={{
          current: page,
          pageSize: limit,
          total: total,
          showSizeChanger: true, // Show the size changer
          pageSizeOptions: ["10", "20", "50", "100"], // Define the page size options
          onChange: (page, pageSize) => {
            setPage(page);
            setLimit(pageSize);
            getProducts({}, {}, pageSize, page);
          },
        }}
        scroll={{
          x: "max-content",
          y: 600,
        }}
      />

      <ModalAddProduct setProducts={setProducts} />
      <ModalEditProduct
        setProductEdit={setProductEdit}
        productEdit={productEdit}
        setProducts={setProducts}
      />
    </>
  );
};

export default ManageProduct;
