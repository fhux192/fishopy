import { Card } from "antd";
import { useEffect, useState } from "react";
import {  callGetDataDashboardAdmin } from "../../../services/api";
import { FileDoneOutlined, ProductOutlined, UserOutlined } from "@ant-design/icons";
import CountUp from "react-countup";

const Dashboard = () => {
  const [data, setData] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await callGetDataDashboardAdmin();
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
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: ".5rem",
      }}
    >
      <Card style={{ flex: "1 1 390px", height: 100 }}>
        <UserOutlined style={{ fontSize: "24px" }} />
        <p>
          Người dùng: <CountUp end={data.totalUsers} start={0} />
        </p>
      </Card>
      <Card style={{ flex: "1 1 390px", height: 100 }}>
        <ProductOutlined style={{ fontSize: "24px" }} />
        <p>
          Sản phẩm: <CountUp end={data.totalProducts} start={0} />
        </p>
      </Card>
      <Card style={{ flex: "1 1 390px", height: 100 }}>
        <FileDoneOutlined style={{ fontSize: "24px" }} />
        <p>
          Đơn hàng: <CountUp end={data.totalOrders} start={0} />
        </p>
      </Card>
    </div>
  );
};
export default Dashboard;
