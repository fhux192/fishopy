import { Segmented, Tabs } from "antd";
import OrderCanceled from "../OrderCanceled/OrderCanceled";
import { useState } from "react";
import ModalOrderDetail from "../ModalOrderDetail/ModalOrderDetail";
import OrderShipping from "../OrderShipping/OrderShipping";
import OrderOrdered from "../OrderOrdered/OrderOrdered";
import OrderConfirm from "../OrderConfirm/OrderConfirm";

const AccountOrder = () => {
  const [activeKey, setActiveKey] = useState("pending");
  const onChange = (key) => {
    setActiveKey(key);
  };
  // const [activeKey, setActiveKey] = useState("order-confirm");
  // const [orderDetail, setOrderDetail] = useState(null);
  // const onChange = (key) => {
  //   setActiveKey(key);
  // };
  // const items = [
  //   {
  //     key: "order-confirm",
  //     label: "Chờ xác nhận",
  //     children: <OrderConfirm activeKey={activeKey} setOrderDetail={setOrderDetail} />,
  //   },
  //   {
  //     key: "order-shipping",
  //     label: "Đang giao",
  //     children: <OrderShipping activeKey={activeKey} setOrderDetail={setOrderDetail} />,
  //   },
  //   {
  //     key: "order-canceled",
  //     label: "Đã hủy",
  //     children: <OrderCanceled activeKey={activeKey} setOrderDetail={setOrderDetail} />,
  //   },
  //   {
  //     key: "order-ordered",
  //     label: "Đã giao",
  //     children: <OrderOrdered activeKey={activeKey} setOrderDetail={setOrderDetail} />,
  //   },
  // ];

  return (
    <>
      <Segmented
        options={[
          { label: "Chờ xác nhận", value: "pending" },
          { label: "Đang giao", value: "shipping" },
          { label: "Đã giao", value: "delivered" },
          { label: "Đã hủy", value: "canceled" },
        ]}
        onChange={(value) => {
          console.log(value); // string
        }}
      />
      {/* <ModalOrderDetail orderDetail={orderDetail} /> */}
    </>
  );
};
export default AccountOrder;
