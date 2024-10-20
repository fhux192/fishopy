import { Card, Segmented, Space, Tabs } from "antd";
import { useState } from "react";
import OrderTab from "../USER/OrderTab/OrderTab";

const AccountOrder = () => {
  const [activeKey, setActiveKey] = useState("pending");
  const onChange = (key) => {
    setActiveKey(key);
  };

  return (
    <Card style={{ padding: "15px" }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Segmented
          value={activeKey}
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
export default AccountOrder;
