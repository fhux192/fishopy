import React, { useEffect, useState } from "react";
import {
  Button,
  Select,
  DatePicker,
  Row,
  Col,
  Typography,
  Divider,
  message,
  Table,
  Space,
  Popconfirm,
  Tag,
} from "antd";
import { useDispatch } from "react-redux";
import {
  callDeleteOrderAdmin,
  callGetOrdersAdmin,
  callUpdateOrderAdmin,
} from "../../../services/api";
import ModalOrderDetail from "../../ModalOrderDetail/ModalOrderDetail";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import formatPrice from "../../../utils/formatPrice";
import moment from "moment";
import { toggle } from "../../../redux/features/toggle/toggleSlice";
import "./ManageOrder.css";
import DrawerOrderDetail from "../components/DrawerOrderDetail/DrawerOrderDetail";

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
  const optionsStatus = [
    { value: "", label: "Tất cả" },
    { value: "pending", label: "Chờ xác nhận" },
    { value: "shipping", label: "Đang giao" },
    { value: "canceled", label: "Đã hủy" },
    { value: "delivered", label: "Đã giao" },
  ];

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "_id",
      key: "_id",
      width: 220,
      render: (_id) => <a>{_id}</a>,
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 190,
      render: (createdAt) => (
        <p>{moment(createdAt).format("DD-MM-YYYY HH:mm:ss")}</p>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "shippingAddress",
      key: "phone",
      width: 150,
      render: (shippingAddress) => <p>{shippingAddress.phone}</p>,
    },
    {
      title: "Tên khách hàng",
      dataIndex: "shippingAddress",
      key: "name",
      width: 200,
      render: (shippingAddress) => <p>{shippingAddress.name}</p>,
    },
    {
      title: "Tiền hàng",
      dataIndex: "itemsPrice",
      key: "itemsPrice",
      width: 150,
      render: (itemsPrice) => <p>{formatPrice(itemsPrice)}</p>,
    },
    {
      title: "Phí vận chuyển",
      dataIndex: "shippingPrice",
      key: "shippingPrice",
      width: 150,
      render: (shippingPrice) => <p>{formatPrice(shippingPrice)}</p>,
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <>
          <Select
            defaultValue={
              optionsStatus.find((item) => item.value == status)?.label
            }
            style={{ width: 150 }}
            onChange={(value) => handleUpdateOrder(record._id, value)}
            options={[
              { value: "pending", label: "Chờ xác nhận" },
              { value: "shipping", label: "Đang giao" },
              { value: "canceled", label: "Đã hủy" },
              { value: "delivered", label: "Đã giao" },
            ]}
          />
        </>
      ),
    },

    {
      title: "Thanh toán",
      key: "isPaid",
      dataIndex: "isPaid",
      render: (_, { isPaid }) => (
        <Tag color={isPaid ? "success" : "error"}>
          {isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      fixed: "right",
      width: 90,
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "orange", cursor: "pointer", padding: "5px" }}
            onClick={() => {
              setOrderDetail(record);
              dispatch(toggle("modalOrderDetail"));
            }}
          />
          <Popconfirm
            title="Xóa đơn hàng?"
            description="Bạn có chắc chắn muốn xóa đơn hàng này không?"
            onConfirm={() => {
              handleDeleteOrder(record._id);
            }}
            okText="Có"
            cancelText="Không"
          >
            <DeleteOutlined
              style={{ color: "red", cursor: "pointer", padding: "5px" }}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchOrders();
  }, [current, pageSize, status, from, to]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      let query = {};
      if (status) query.status = { $eq: status };
      if (from) query.from = { $gte: from };
      if (to) query.to = { $lte: to };
      const res = await callGetOrdersAdmin(
        query,
        { createdAt: -1 },
        current,
        pageSize
      );

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
              <Button
                icon={<ReloadOutlined />}
                onClick={fetchOrders}
                shape="circle"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider />

      <Table
        columns={columns}
        dataSource={orders}
        loading={loading}
        rowKey="_id"
        scroll={{ x: "max-content" }}
        pagination={{
          current: current,
          pageSize: pageSize,
          total: total,
          onChange: (page, pageSize) => {
            setCurrent(page);
            setPageSize(pageSize);
          },
        }}
      />

      <DrawerOrderDetail orderDetail={orderDetail} />
    </>
  );
};

export default ManageOrder;
