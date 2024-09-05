import {
  Button,
  Select,
  Tabs,
  DatePicker,
  Flex,
  List,
  Card,
  Typography,
  Divider,
  Image,
  Pagination,
  message,
  Empty,
  Spin,
  Popconfirm,
} from "antd";
import { useEffect, useState } from "react";
import styles from "./ManageOrder.module.css";
import { useDispatch } from "react-redux";
import { callDeleteOrder, callFetchOrders, callUpdateOrder } from "../../../services/api";
import formatPrice from "../../../utils/formatPrice";
import { toggleModalOrderDetail } from "../../../redux/features/toggle/toggleSlice";
import ModalOrderDetail from "../../ModalOrderDetail/ModalOrderDetail";
import { DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import moment from "moment";

const ManageOrder = () => {
  const [status, setStatus] = useState("Chờ xác nhận");
  const [from, setFrom] = useState(dayjs().subtract(1, "month"));
  const [to, setTo] = useState(dayjs());
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
      const res = await callFetchOrders(current, pageSize, status, from, to);

      if (res.vcode == 0) {
        setOrders(res.data.result);
        console.log("orders", res.data.result);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrder = async (orderId, value) => {
    try {
      const res = await callUpdateOrder(orderId, { status: value });
      if (res.vcode == 0) {
        message.success(res.message);
        if (value != status) {
          setOrders(orders.filter((item) => item._id != orderId));
        }
      } else console.error(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const res = await callDeleteOrder(orderId);
      if (res.vcode == 0) {
        message.success(res.message);
        setOrders(orders.filter((item) => item._id != orderId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Flex justify="space-between" align="center" wrap gap={10}>
        <Flex align="center" gap={10}>
          <Select
            defaultValue="Chờ xác nhận"
            onChange={(value) => {
              setStatus(value);
            }}
            options={[
              { value: "Chờ xác nhận", label: "Chờ xác nhận" },
              { value: "Đang giao", label: "Đang giao" },
              { value: "Đã hủy", label: "Đã hủy" },
              { value: "Đã giao", label: "Đã giao" },
            ]}
          />

          <ReloadOutlined onClick={fetchOrders} />
        </Flex>

        <Flex gap={5} align="center">
          <DatePicker
            value={from}
            format={"DD/MM/YYYY"}
            onChange={(date) => {
              setFrom(date);
            }}
            locale="vi"
          />
          đến
          <DatePicker
            value={to}
            format={"DD/MM/YYYY"}
            onChange={(date) => {
              setTo(date);
            }}
            locale="vi"
          />
        </Flex>
      </Flex>
      <Divider />
      {orders.map((item, index) => {
        return (
          <Card key={item._id} style={{ marginBottom: "15px" }}>
            {item.orderItems.map((proItem) => {
              return (
                <div
                  key={proItem._id}
                  span={24}
                  style={{ marginBottom: "10px" }}
                  onClick={() => {
                    setOrderDetail(item);
                    dispatch(toggleModalOrderDetail());
                  }}
                >
                  <div className={styles.cardContainer}>
                    <Flex gap={10} justify="space-between" align="center">
                      <div className={styles.groupImage}>
                        <Image
                          className={styles.imageProduct}
                          src={
                            import.meta.env.VITE_BASE_URL +
                            "/images/fish/" +
                            proItem.product.images[0]
                          }
                        />
                        <Typography.Text className={styles.title}>
                          {proItem.product.name}
                        </Typography.Text>
                      </div>
                      <div className={styles.groupSum}>
                        <Typography.Text className={styles.title2}>
                          {proItem.product.name}
                        </Typography.Text>
                        <Typography.Text>{formatPrice(proItem.product.price)}đ </Typography.Text>
                        <Typography.Text>Số lượng: {proItem.quantity} </Typography.Text>
                      </div>
                    </Flex>
                  </div>
                </div>
              );
            })}
            <Divider />
            <Flex wrap gap={10} align="center" justify="space-between">
              <div>
                <Flex align="center" gap={5}>
                  <strong>Mã đơn hàng: </strong>
                  <p>{item._id} </p>
                </Flex>
                <Flex align="center" gap={5}>
                  <strong>Thời gian: </strong>
                  <p>{moment(item.createdAt).format("HH:mm:ss DD-MM-YYYY")}</p>
                </Flex>
                <Flex align="center">
                  <Typography.Text>
                    <strong>Tổng tiền: </strong> {formatPrice(item.itemsPrice + item.shippingPrice)}
                    đ
                  </Typography.Text>
                </Flex>
              </div>
              <Flex gap={10} vertical={true}>
                <Popconfirm
                  title="Xóa đơn hàng?"
                  description="Bạn chắc chắn xóa đơn hàng?"
                  onConfirm={() => handleDeleteOrder(item._id)}
                  okText="Có"
                  cancelText="Không"
                >
                  <DeleteOutlined style={{ color: "red", marginLeft: "50px" }} />
                </Popconfirm>
                <Select
                  defaultValue={item.status}
                  options={[
                    { value: "Chờ xác nhận", label: "Chờ xác nhận" },
                    { value: "Đang giao", label: "Đang giao" },
                    { value: "Đã giao", label: "Đã giao" },
                    { value: "Đã hủy", label: "Đã hủy" },
                  ]}
                  onChange={(value) => handleUpdateOrder(item._id, value)}
                />
              </Flex>
            </Flex>
          </Card>
        );
      })}
      {orders.length == 0 && !loading && <Empty />}

      {orders.length > 0 && (
        <Flex justify="flex-end">
          <Pagination
            current={current}
            pageSize={pageSize}
            total={total}
            onChange={(page, size) => {
              setCurrent(page);
              setPageSize(size);
            }}
          />
        </Flex>
      )}

      {loading && <p>Loading...</p>}
      <ModalOrderDetail orderDetail={orderDetail} />
    </>
  );
};
export default ManageOrder;
