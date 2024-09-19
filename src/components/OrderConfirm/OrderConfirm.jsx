import { useEffect, useState } from "react";
import { Button, Card, Divider, Flex, Image, message, Popconfirm, Typography } from "antd";
import styles from "./OrderConfirm.module.css";
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

const OrderConfirm = ({ activeKey, setOrderDetail, role = "USER" }) => {
  const [ordersConfirm, setOrdersConfirm] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrderConfirmAdmin = async (status) => {
      try {
        const res = await callFetchOrderByStatusAdmin(status);
        if (res.vcode == 0) {
          setOrdersConfirm(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchOrderConfirm = async (status) => {
      try {
        const res = await callFetchOrderByStatus(status);
        if (res.vcode == 0) {
          setOrdersConfirm(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (activeKey == "order-confirm") {
      dispatch(setLoading(true));
      if (role == "USER") {
        fetchOrderConfirm(activeKey);
      } else fetchOrderConfirmAdmin(activeKey);
      dispatch(setLoading(false));
    }
  }, [activeKey]);

  const confirmOrder = async (orderId) => {
    try {
      const res = await callUpdateOrderAdmin(orderId, { status: "Đang giao" });
      if (res.vcode == 0) {
        setOrdersConfirm((pre) => pre.filter((item) => item._id != orderId));
        message.success("Xác nhận đơn hàng thành công");
      }
    } catch (error) {
      console.error("error", error.message);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const res = await callUpdateOrder(orderId, { status: "Đã hủy" });
      if (res.vcode == 0) {
        setOrdersConfirm((pre) => pre.filter((item) => item._id != orderId));
        message.success("Hủy đơn hàng thành công");
      }
    } catch (error) {
      console.error("error", error.message);
    }
  };

  return (
    <>
      {ordersConfirm.map((item, index) => {
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
                        <Image className={styles.imageProduct} src={proItem.product.images[0]} />
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
              {role == "ADMIN" && (
                <Popconfirm
                  title="Xác nhận"
                  description="Bạn có muốn xác nhận đơn hàng?"
                  okText="Có"
                  cancelText="Không"
                  onConfirm={() => confirmOrder(item._id)}
                >
                  <Button style={{ color: "orange", borderColor: "orange" }}>Xác nhận</Button>
                </Popconfirm>
              )}

              {role == "USER" && (
                <Popconfirm
                  title="Hủy đơn hàng"
                  description="Bạn chắc chắn muốn hủy đơn hàng?"
                  okText="Có"
                  cancelText="Không"
                  onConfirm={() => cancelOrder(item._id)}
                >
                  <Button danger>Hủy đơn</Button>
                </Popconfirm>
              )}
            </Flex>
          </Card>
        );
      })}
    </>
  );
};
export default OrderConfirm;
