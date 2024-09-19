import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Table, Pagination, Modal, message, Row, Image, Col } from "antd";
import {
  PlusCircleOutlined,
  ReloadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  toggleModalAddProduct,
  toggleModalEditProduct,
} from "../../../redux/features/toggle/toggleSlice";
import ModalAddProduct from "../../Modal/ModalAddProduct/ModalAddProduct";
import ModalEditProduct from "../../Modal/ModalEditProduct/ModalEditProduct";
import { callDeleteProduct, callFetchProduct } from "../../../services/api";
import formatPrice from "../../../utils/formatPrice";

const ManageProduct = () => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [productEdit, setProductEdit] = useState({});

  const handleDeleteProduct = async (id) => {
    try {
      const res = await callDeleteProduct(id);
      if (res.vcode === 0) {
        const newProducts = products.filter((product) => product._id !== id);
        setProducts(newProducts);
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("error", error.message);
      message.error(error.message);
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
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct(current);
  }, [current, pageSize]);

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
      render: (text) => <span style={{ fontWeight: "bold", color: "#707070" }}>{text}</span>,
    },
    {
      title: "Giá bán",
      dataIndex: "discountedPrice",
      key: "discountedPrice",
      render: (text) => (
        <span style={{ fontWeight: "bold", color: "#20a69f" }}>{formatPrice(text)}đ</span>
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
              dispatch(toggleModalEditProduct());
              setProductEdit(record);
            }}
          />
          <Button
            type="link"
            icon={<DeleteOutlined style={{ color: "red" }} />}
            onClick={() => {
              Modal.confirm({
                title: "Bạn có chắc chắn muốn xóa sản phẩm này?",
                onOk: () => handleDeleteProduct(record._id),
              });
            }}
          />
        </>
      ),
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: 16, flexWrap: "wrap" }}>
        <Col>
          <Button icon={<PlusCircleOutlined />} onClick={() => dispatch(toggleModalAddProduct())}>
            Thêm sản phẩm
          </Button>
        </Col>
        <Col>
          <Button icon={<ReloadOutlined />} onClick={() => fetchProduct(current)} />
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={products}
        loading={isLoading}
        pagination={false}
        rowKey="_id"
        scroll={{ x: "max-content" }}
      />

      <Pagination
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={(page, pageSize) => {
          setCurrent(page);
          setPageSize(pageSize);
        }}
        style={{ marginTop: 16, textAlign: "center" }}
        showSizeChanger
        responsive
      />

      <ModalAddProduct setProducts={setProducts} />
      <ModalEditProduct productEdit={productEdit} setProducts={setProducts} />
    </div>
  );
};

export default ManageProduct;
