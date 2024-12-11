import {
  Button,
  Card,
  Divider,
  Empty,
  Flex,
  Image,
  message,
  Popconfirm,
  Spin,
  Typography,
} from "antd";
import styles from "./OrderTab.module.css";
import { useEffect, useState } from "react";
import { callGetOrders, callUpdateOrder } from "../../../services/api";
import moment from "moment";
import formatPrice from "../../../utils/formatPrice";

const OrderTab = ({ activeKey }) => {
  const [orders, setOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getOrdersByStatus = async (status) => {
      try {
        setLoading(true);
        setOrders([]);
        const res = await callGetOrders(
          { status: { $eq: status } },
          {},
          1,
          1000
        );
        console.log("res", res);
        if (res?.vcode == 0) {
          setOrders(res.data);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getOrdersByStatus(activeKey);
  }, [activeKey]);

  const cancelOrder = async (orderId) => {
    try {
      const res = await callUpdateOrder(orderId, { status: "canceled" });
      if (res?.vcode == 0) {
        setOrders(orders.filter((item) => item._id !== orderId));
        message.success("Hủy đơn hàng thành công");
      } else {
        console.error(res.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {orders.map((item, index) => {
        return (
          <Card
            className="bg-Black text-white"
            key={item._id}
            style={{ marginBottom: "15px" }}
          >
            {item.orderItems?.map((proItem) => {
              return (
                <div
                  key={proItem._id}
                  span={24}
                  style={{ marginBottom: "10px" }}
                  onClick={() => {
                    setOrderDetail(item);
                  }}
                >
                  <div className={styles.cardContainer}>
                    <Flex gap={10}>
                      <div className={styles.groupImage}>
                        <Image
                          className={styles.imageProduct}
                          src={proItem?.product.images[0]}
                        />
                        <Typography.Text className={styles.title}>
                          {proItem?.product.name}
                        </Typography.Text>
                      </div>
                      <div className={styles.groupSum}>
                        <Typography.Text className={styles.title2}>
                          {proItem.product.name}
                        </Typography.Text>
                        <Typography.Text className={"text-white"}>
                          {formatPrice(proItem.product.price)}đ{" "}
                        </Typography.Text>
                        <Typography.Text className={"text-white"}>
                          Số lượng: {proItem.quantity}{" "}
                        </Typography.Text>
                      </div>
                    </Flex>
                  </div>
                </div>
              );
            })}
            <Divider />
            <Flex align="center" justify="space-between">
              <div className="text-white">
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
                  <Typography.Text className="text-white">
                    <strong>Thành tiền: </strong>{" "}
                    {formatPrice(item.itemsPrice + item.shippingPrice)}đ
                  </Typography.Text>
                </Flex>
              </div>

              {activeKey == "pending" && (
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
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <Spin />
        </div>
      )}

      {!loading && orders.length == 0 && <Empty />}
    </>
  );
};
export default OrderTab;
