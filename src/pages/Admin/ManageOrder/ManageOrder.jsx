import React, { useEffect, useState } from "react";
import {
  Button,
  Select,
  DatePicker,
  Divider,
  message,
  Table,
  Space,
  Popconfirm,
  Tag,
} from "antd";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import formatPrice from "@utils/formatPrice";
import moment from "moment";
import { toggle } from "@redux/features/toggle/toggleSlice";
import "./ManageOrder.module.css";
import DrawerOrderDetail from "@components/Admin/Order/DrawerOrderDetail/DrawerOrderDetail";
import { admin_getOrders_byFields } from "@services/api";
import dayjs from "dayjs";
import { admin_deleteOrder, admin_updateOrder } from "@services/api";

const ManageOrder = () => {
  const [status, setStatus] = useState("");
  const [dates, setDates] = useState([dayjs(), dayjs()]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const [orders, setOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState(null);
  const sort = { createdAt: -1 };
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
      dataIndex: "shipping_address",
      key: "phone",
      width: 150,
      render: (shipping_address) => <p>{shipping_address.phone}</p>,
    },
    {
      title: "Tên khách hàng",
      dataIndex: "shipping_address",
      key: "name",
      width: 200,
      render: (shipping_address) => <p>{shipping_address.name}</p>,
    },
    {
      title: "Tiền hàng",
      dataIndex: "items_price",
      key: "items_price",
      width: 150,
      render: (items_price) => <p>{formatPrice(items_price)}</p>,
    },
    {
      title: "Phí vận chuyển",
      dataIndex: "shipping_price",
      key: "shipping_price",
      width: 150,
      render: (shipping_price) => <p>{formatPrice(shipping_price)}</p>,
    },
    {
      title: "Tổng tiền",
      width: 150,
      render: (_, record) => (
        <p>{formatPrice(record.shipping_price + record.items_price)}</p>
      ),
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
    getOrders({}, sort, limit, page);
  }, []);

  const getOrders = async (query, sort, limit, page) => {
    setLoading(true);
    try {
      let q = query;
      if (status) {
        q.status = { $eq: status };
      }

      if (dates?.[0] && dates?.[1]) {
        q.createdAt = {
          $gte: dates[0].startOf("day").toISOString(),
          $lte: dates[1].endOf("day").toISOString(),
        };
      }

      const res = await admin_getOrders_byFields(q, sort, limit, page);
      if (res.vcode !== 0) {
        return message.error(res.msg);
      }
      setOrders(res.data);
      setTotal(res.total);
    } catch (error) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrder = async (orderId, value) => {
    try {
      const res = await admin_updateOrder(orderId, { status: value });
      if (res.vcode != 0) {
        return message.error(res.msg);
      }
      message.success(res.msg);
    } catch (error) {
      message.error("Failed to update order.");
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      const res = await admin_deleteOrder(id);
      if (res.vcode !== 0) {
        return message.error(res.msg);
      }
      message.success(res.msg);
      setOrders(orders.filter((order) => order._id !== id));
    } catch (error) {
      message.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-end items-center gap-4 flex-wrap">
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
        />
        <Button onClick={() => getOrders({}, sort, limit, page)}>Xem</Button>

        <DatePicker
          placeholder="Từ ngày"
          format={"DD/MM/YYYY"}
          value={dates[0]}
          onChange={(date) => {
            setDates((prevDates) => [date, prevDates[1]]);
          }}
        />

        <DatePicker
          placeholder="Đến ngày"
          format={"DD/MM/YYYY"}
          value={dates[1]}
          onChange={(date) => {
            setDates((prevDates) => [prevDates[0], date]);
          }}
        />
      </div>

      <Divider />

      <Table
        columns={columns}
        dataSource={orders}
        loading={loading}
        rowKey="_id"
        scroll={{ x: "max-content" }}
        pagination={{
          current: page,
          pageSize: limit,
          total: total,
          onChange: (page, pageSize) => {
            setPage(page);
            setLimit(pageSize);
            getOrders({}, sort, pageSize, page);
          },
        }}
      />

      {orderDetail && <DrawerOrderDetail orderDetail={orderDetail} />}
    </>
  );
};

export default ManageOrder;
