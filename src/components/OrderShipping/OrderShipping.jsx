import { useEffect, useState } from "react";
import { Button, Card, Divider, Flex, Image, message, Popconfirm, Typography } from "antd";
import styles from "./OrderShipping.module.css";
import {
  callFetchOrderByStatus,
  callFetchOrderByStatusAdmin,
  callUpdateOrderAdmin,
} from "../../services/api";
import formatPrice from "../../utils/formatPrice";
import moment from "moment";
import { useDispatch } from "react-redux";
import { toggleModalOrderDetail } from "../../redux/features/toggle/toggleSlice";
import { setLoading } from "../../redux/features/user/userSlice";

const OrderShipping = ({ activeKey, setOrderDetail, role = "USER" }) => {
  const [ordersShipping, setOrdersShipping] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrderConfirmAdmin = async (status) => {
      try {
        const res = await callFetchOrderByStatusAdmin(status);
        if (res.vcode == 0) {
          setOrdersShipping(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchOrderConfirm = async (status) => {
      try {
        const res = await callFetchOrderByStatus(status);
        if (res.vcode == 0) {
          setOrdersShipping(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (activeKey == "order-shipping") {
      dispatch(setLoading(true));
      if (role == "USER") {
        fetchOrderConfirm(activeKey);
      } else fetchOrderConfirmAdmin(activeKey);
      dispatch(setLoading(false));
    }
  }, [activeKey]);

  const confirmOrder = async (orderId) => {
    try {
      const res = await callUpdateOrderAdmin(orderId, { status: "Đã giao" });
      if (res.vcode == 0) {
        setOrdersShipping((pre) => pre.filter((item) => item._id != orderId));
        message.success("Xác nhận đơn hàng thành công");
      }
    } catch (error) {
      console.error("error", error.message);
    }
  };

  return (
    <>
      {ordersShipping.map((item, index) => {
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
                    <Flex gap={10}>
                      <div className={styles.groupImage}>
                        <Image
                          className={styles.imageProduct}
                          src={
                            import.meta.env.VITE_BASE_URL +
                            "/uploads/images/hat/" +
                            proItem.images[0]
                          }
                        />
                        <Typography.Text className={styles.title}>{proItem.name}</Typography.Text>
                      </div>
                      <div className={styles.groupSum}>
                        <Typography.Text className={styles.title2}>{proItem.name}</Typography.Text>
                        <Typography.Text>{formatPrice(proItem.price)}đ </Typography.Text>
                        <Typography.Text>Số lượng: {proItem.quantity} </Typography.Text>
                      </div>
                    </Flex>
                  </div>
                </div>
              );
            })}
            <Divider />
            <Flex align="center" justify="space-between">
              <div>
                <Flex align="center" gap={5}>
                  <strong>Thời gian: </strong>
                  <p>{moment(item.createdAt).format("HH:mm:ss DD-MM-YYYY")}</p>
                </Flex>
                <Flex align="center" gap={5}>
                  <strong>Phí vận chuyển: </strong>
                  <p>{formatPrice(item.shippingPrice.toString())}đ</p>
                </Flex>
                <Flex align="center" gap={5}>
                  <strong>Tiền hàng: </strong>
                  <p>{formatPrice(item.itemsPrice.toString())}đ</p>
                </Flex>
                <Flex align="center">
                  <Typography.Text>
                    <strong>Thành tiền: </strong>{" "}
                    {formatPrice(item.itemsPrice + item.shippingPrice)}đ
                  </Typography.Text>
                </Flex>
              </div>

              <Popconfirm
                title="Xác nhận"
                description="Bạn có muốn xác nhận giao thành công đơn hàng?"
                okText="Có"
                cancelText="Không"
                onConfirm={() => confirmOrder(item._id)}
                disabled={role !== "ADMIN"}
              >
                <Button style={{ color: "#1677ff", borderColor: "#1677ff" }}>Đang giao</Button>
              </Popconfirm>
            </Flex>
          </Card>
        );
      })}
    </>
  );
};
export default OrderShipping;
