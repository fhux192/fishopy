import React, { useEffect, useState } from "react";
import {
  Button,
  Select,
  DatePicker,
  Row,
  Col,
  Card,
  Typography,
  Divider,
  Image,
  Pagination,
  message,
  Empty,
  Spin,
  Popconfirm,
  Space,
} from "antd";
import { useDispatch } from "react-redux";
import { callDeleteOrderAdmin, callGetOrdersAdmin, callUpdateOrderAdmin } from "../../../services/api";
import formatPrice from "../../../utils/formatPrice";
import { toggleModalOrderDetail } from "../../../redux/features/toggle/toggleSlice";
import ModalOrderDetail from "../../ModalOrderDetail/ModalOrderDetail";
import { DeleteOutlined, ReloadOutlined, EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import styles from "./ManageOrder.module.css";

const { Text } = Typography;

const ManageOrder = () => {
  const [status, setStatus] = useState("");
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [orders, setOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchOrders();
  }, [current, pageSize, status, from, to]);

  const fetchOrders = async () => {
    setLoading(true);
    try {

      let query = {}
      if(status) query.status = {$eq: status}
      if(from) query.from = {$gte: from}
      if(to) query.to = {$lte: to}
      const res = await callGetOrdersAdmin(query, {createdAt: -1}, current, pageSize);
      if (res.vcode === 0) {
        setOrders(res.data);
        setTotal(res.total);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrder = async (orderId, value) => {
    try {
      const res = await callUpdateOrderAdmin(orderId, { status: value });
      if (res.vcode === 0) {
        message.success(res.message);
        fetchOrders();
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error("Failed to update order.");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const res = await callDeleteOrderAdmin(orderId);
      if (res.vcode === 0) {
        setOrders(orders.filter((order) => order._id !== orderId));
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error("Failed to delete order.");
    }
  };

  return (
    <>
      <Row gutter={[16, 16]} justify="space-between" align="middle">
        <Col xs={24} sm={12} md={8}>
          <Select
            value={status}
            onChange={(value) => setStatus(value)}
            options={[
              { value: "", label: "Tất cả" },
              { value: "pending", label: "Chờ xác nhận" },
              { value: "shipping", label: "Đang giao" },
              { value: "canceled", label: "Đã hủy" },
              { value: "delivered", label: "Đã giao" },
            ]}
            style={{ width: "100%" }}
          />
        </Col>
        <Col xs={24} sm={12} md={16}>
          <Row justify="end" align="middle" gutter={[8, 8]}>
            <Col flex="auto">
              <DatePicker.RangePicker
                value={[from, to]}
                format={"DD/MM/YYYY"}
                onChange={(dates) => {
                  setFrom(dates[0]);
                  setTo(dates[1]);
                }}
                style={{ width: "100%" }}
              />
            </Col>
            <Col>
              <Button icon={<ReloadOutlined />} onClick={fetchOrders} shape="circle" />
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider />

      {loading ? (
        <Spin tip="Loading..." style={{ width: "100%", textAlign: "center" }} />
      ) : orders.length === 0 ? (
        <Empty description="Không có đơn hàng" />
      ) : (
        orders.map((order) => (
          <Card key={order._id} style={{ marginBottom: "15px" }}>
            {order.orderItems.map((item) => (
              <Row key={item._id} gutter={[16, 16]} align="middle" style={{ marginBottom: "10px" }}>
                <Col xs={24} sm={6} md={4} className={styles.groupImage}>
                  <Image
                    className={styles.imageProduct}
                    src={item.product.images[0]}
                    alt={item.product.name}
                    style={{ cursor: "pointer" }}
                  />
                </Col>
                <Col xs={24} sm={18} md={20} className={styles.groupSum}>
                  <Text
                    className={styles.title}
                    onClick={() => {
                      setOrderDetail(order);
                      dispatch(toggleModalOrderDetail());
                    }}
                    style={{ cursor: "pointer", color: "#707070" }}
                  >
                    {item.product.name}
                  </Text>
                  <Text style={{ color: "#2daab6", fontWeight: "bold" }}>
                    {formatPrice(item.product.discountedPrice)}đ
                  </Text>
                  <div className="flex gap-1 h-full items-center">
                    <p className="font-bold">Số lượng: </p>
                    <p> {item.quantity}</p>
                  </div>
                </Col>
              </Row>
            ))}
            <Divider />
            <Row justify="space-between" align="middle">
              <Col xs={24} sm={12}>
                <Text strong>Mã đơn hàng: </Text>
                <Text copyable>{order._id}</Text>
                <br />
                <Text strong>Thời gian: </Text>
                <Text>{dayjs(order.createdAt).format("HH:mm:ss DD-MM-YYYY")}</Text>
                <br />
                <Text strong>Tổng tiền: </Text>
                <Text style={{ color: "#2daab6", fontWeight: "bold" }}>
                  {formatPrice(order.itemsPrice + order.shippingPrice)}đ
                </Text>
              </Col>
              <Col xs={24} sm={12} style={{ textAlign: "right" }}>
                <Space direction="vertical" size="middle">
                  <Space size="small">
                    <Button
                      type="link"
                      icon={<EyeOutlined />}
                      onClick={() => {
                        setOrderDetail(order);
                        dispatch(toggleModalOrderDetail());
                      }}
                    >
                      Xem chi tiết
                    </Button>
                    <Popconfirm
                      title="Xóa đơn hàng?"
                      description="Bạn chắc chắn xóa đơn hàng?"
                      onConfirm={() => handleDeleteOrder(order._id)}
                      okText="Có"
                      cancelText="Không"
                    >
                      <Button
                        type="link"
                        icon={<DeleteOutlined style={{ color: "red" }} />}
                        style={{ color: "inherit" }}
                      />
                    </Popconfirm>
                  </Space>
                  <Select
                    defaultValue={order.status}
                    options={[
                      { value: "pending", label: "Chờ xác nhận" },
                      { value: "shipping", label: "Đang giao" },
                      { value: "delivered", label: "Đã giao" },
                      { value: "canceled", label: "Đã hủy" },
                    ]}
                    onChange={(value) => handleUpdateOrder(order._id, value)}
                  />
                </Space>
              </Col>
            </Row>
          </Card>
        ))
      )}

      {orders.length > 0 && (
        <Row justify="end" style={{ marginTop: "16px" }}>
          <Pagination
            current={current}
            pageSize={pageSize}
            total={total}
            onChange={(page, size) => {
              setCurrent(page);
              setPageSize(size);
            }}
            showSizeChanger
            responsive
          />
        </Row>
      )}

      <ModalOrderDetail orderDetail={orderDetail} />
    </>
  );
};

export default ManageOrder;
