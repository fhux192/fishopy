import { Card, Flex } from "antd";
import { useEffect, useState } from "react";
import { callFetchDataDashboard } from "../../../services/api";
import { FileDoneOutlined, ProductOutlined, UserOutlined } from "@ant-design/icons";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await callFetchDataDashboard();
        if (res.vcode == 0) {
          setData(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Flex gap={20} align="center">
        <Card
          style={{
            width: 300,
          }}
        >
          <Flex vertical={true} gap={5}>
            <ProductOutlined />
            <p>Người dùng: {data?.totalUsers}</p>
          </Flex>
        </Card>
        <Card
          style={{
            width: 300,
          }}
        >
          <Flex vertical={true} gap={5}>
            <UserOutlined />
            <p>Sản phẩm: {data?.totalProducts}</p>
          </Flex>
        </Card>
        <Card
          style={{
            width: 300,
          }}
        >
          <Flex vertical={true} gap={5}>
            <FileDoneOutlined />
            <p>Đơn hàng: {data?.totalOrders}</p>
          </Flex>
        </Card>
      </Flex>
    </div>
  );
};
export default Dashboard;
