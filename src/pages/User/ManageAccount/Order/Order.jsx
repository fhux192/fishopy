import { Card, Segmented, Space } from "antd";
import { useState } from "react";
import OrderTab from "@components/User/OrderTab/OrderTab";

const Order = () => {
  const [activeKey, setActiveKey] = useState("pending");
  const onChange = (key) => {
    setActiveKey(key);
  };

  return (
    <Card style={{ padding: "15px" }} className="bg-Black text-white">
      <Space direction="vertical" style={{ width: "100%" }}>
        <Segmented
          value={activeKey}
          className="bg-Black text-white"
          options={[
            { label: "Chờ xác nhận", value: "pending" },
            { label: "Đang giao", value: "shipping" },
            { label: "Đã giao", value: "delivered" },
            { label: "Đã hủy", value: "canceled" },
          ]}
          onChange={onChange}
        />

        <OrderTab activeKey={activeKey} />
      </Space>
    </Card>
  );
};
export default Order;
