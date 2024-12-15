import {
  Button,
  Card,
  Divider,
  Empty,
  Flex,
  Image,
  message,
  Pagination,
  Popconfirm,
  Spin,
  Typography,
} from "antd";
import styles from "./OrderTab.module.css";
import { useEffect, useState } from "react";
import { user_getOrder_byFields, update_updateOrder } from "@services/api";
import moment from "moment";
import { formatPrice } from "@utils/function.js";
import { user_getOrderDetail_byFields } from "@services/api";

const OrderTab = ({ activeKey }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(1);
  const sort = { createdAt: -1 };

  useEffect(() => {
    getOrders({ status: { $eq: activeKey } }, sort, limit, page);
  }, [activeKey]);

  const getOrders = async (query, sort, limit, page) => {
    try {
      setLoading(true);
      setOrders([]);
      const res = await user_getOrder_byFields(query, sort, limit, page);
      if (res?.vcode != 0) return console.error(res.msg);
      const listOrder = res.data;
      const ordersWithDetails = await Promise.all(
        listOrder.map(async (element) => {
          const rsp = await user_getOrderDetail_byFields(
            {
              id_order: { $eq: element._id },
            },
            {},
            100,
            1
          );
          if (rsp?.vcode != 0) return console.error(rsp.msg);
          element.order_items = rsp.data;
          return element;
        })
      );
      setOrders(ordersWithDetails);
      setLoading(false);
      setTotal(res.total);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const res = await update_updateOrder(orderId, { status: "canceled" });
      if (res?.vcode != 0) {
        return console.error(res.msg);
      }
      setOrders(orders.filter((item) => item._id !== orderId));
      message.success("Hủy đơn hàng thành công");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {orders.length > 0 && (
        <>
          {orders.map((item, index) => (
            <Card
              className="bg-Black text-white"
              key={item._id}
              style={{ marginBottom: "15px" }}
            >
              {item.order_items?.map((proItem) => (
                <div
                  key={proItem._id}
                  span={24}
                  style={{ marginBottom: "10px" }}
                >
                  <div className={styles.cardContainer}>
                    <Flex gap={10}>
                      <div className={styles.groupImage}>
                        <Image
                          className={styles.imageProduct}
                          src={
                            proItem.id_combo?.imgs[0] ||
                            proItem.id_product.imgs[0]
                          }
                        />
                        <Typography.Text className={styles.title}>
                          {proItem.id_combo?.name || proItem.id_product.name}
                        </Typography.Text>
                      </div>
                      <div className={styles.groupSum}>
                        <Typography.Text className={styles.title2}>
                          {proItem.id_combo?.name || proItem.id_product.name}
                        </Typography.Text>
                        <Typography.Text className={"text-white"}>
                          {formatPrice(
                            proItem.id_combo?.price || proItem.id_product.price
                          )}
                          đ
                        </Typography.Text>
                        <Typography.Text className={"text-white"}>
                          Số lượng: {proItem.quantity}
                        </Typography.Text>
                      </div>
                    </Flex>
                  </div>
                </div>
              ))}
              <Divider />
              <Flex align="center" justify="space-between">
                <div className="text-white">
                  <Flex align="center" gap={5}>
                    <strong>Thời gian: </strong>
                    <p>
                      {moment(item.createdAt).format("HH:mm:ss DD-MM-YYYY")}
                    </p>
                  </Flex>
                  <Flex align="center" gap={5}>
                    <strong>Phí vận chuyển: </strong>
                    <p>{formatPrice(item.shipping_price.toString())}đ</p>
                  </Flex>
                  <Flex align="center" gap={5}>
                    <strong>Tiền hàng: </strong>
                    <p>{formatPrice(item.items_price.toString())}đ</p>
                  </Flex>
                  <Flex align="center">
                    <Typography.Text className="text-white">
                      <strong>Thành tiền: </strong>
                      {formatPrice(item.items_price + item.shipping_price)}đ
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
          ))}
        </>
      )}
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
      <div className="text-right">
        <Pagination
          total={total}
          pageSize={limit}
          current={page}
          onChange={(page, pageSize) => {
            setPage(page);
            setLimit(pageSize);
            getOrders({ status: { $eq: activeKey } }, sort, pageSize, page);
          }}
        />
      </div>
    </>
  );
};
export default OrderTab;
