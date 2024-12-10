import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Table, message, Row, Image, Col, Popconfirm } from "antd";
import {
  PlusCircleOutlined,
  ReloadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { toggle } from "@redux/features/toggle/toggleSlice";
import ModalAddProduct from "@components/Modal/ModalAddProduct/ModalAddProduct";
import ModalEditProduct from "@components/Modal/ModalEditProduct/ModalEditProduct";
import { admin_getProducts_byFields } from "@services/api";
import formatPrice from "@utils/formatPrice";

const ManageProduct = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [productEdit, setProductEdit] = useState({});

  const handleDeleteProduct = async (id) => {
    setLoading(true);
    try {
      const res = await admin_deleteProduct(id);
      if (res.vcode !== 0) {
        return message.error(res.message);
      }

      const newProducts = products.filter((product) => product._id !== id);
      setProducts(newProducts);
      message.success(res.message);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getProducts = async (query, sort, limit, page) => {
    setLoading(true);
    try {
      const res = await admin_getProducts_byFields(query, sort, limit, page);
      if (res.vcode != 0) {
        return message.error(res.message);
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
      dataIndex: "images",
      key: "image",
      render: (images, record) => (
        <Image
          src={images[0]}
          alt={record.name}
          width={100}
          style={{
            height: "auto",
            objectFit: "cover",
            display: "block",
            borderRadius: "10px",
          }}
        />
      ),
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <span style={{ fontWeight: "bold", color: "#707070" }}>{text}</span>
      ),
    },
    {
      title: "Giá gốc",
      dataIndex: "price",
      key: "price",
      render: (text) => (
        <span style={{ fontWeight: "bold", color: "#20a69f" }}>
          {formatPrice(text)}đ
        </span>
      ),
    },
    {
      title: "Giá bán sau giảm giá",
      dataIndex: "discountedPrice",
      key: "discountedPrice",
      render: (text) => (
        <span style={{ fontWeight: "bold", color: "#20a69f" }}>
          {formatPrice(text)}đ
        </span>
      ),
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          style={{
            fontWeight: "bold",
            color: status ? "green" : "red",
          }}
        >
          {status ? "Còn hàng" : "Hết hàng"}
        </span>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (text, record) => (
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

  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: 16, flexWrap: "wrap" }}>
        <Col>
          <Button
            icon={<PlusCircleOutlined />}
            onClick={() => dispatch(toggle("modalAddProduct"))}
          >
            Thêm sản phẩm
          </Button>
        </Col>
        <Col>
          <Button
            onClick={() => {
              setPage(1);
              setLimit(10);
              getProducts({}, {}, 10, 1);
            }}
          >
            Xem
          </Button>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={products}
        loading={loading}
        pagination={{
          current: page,
          pageSize: limit,
          total: total,
          onChange: (page, pageSize) => {
            setPage(page);
            setLimit(pageSize);
            getProducts({}, {}, pageSize, page);
          },
        }}
        rowKey="_id"
        scroll={{ x: "max-content", y: 500 }}
      />

      <ModalAddProduct setProducts={setProducts} />
      <ModalEditProduct productEdit={productEdit} setProducts={setProducts} />
    </div>
  );
};

export default ManageProduct;
