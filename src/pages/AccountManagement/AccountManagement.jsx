import { Card, Col, Menu, Row } from "antd";
import {
  EnvironmentOutlined,
  FileDoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import styles from "./AccountManagement.module.css";

const items = [
  {
    key: "/account",
    icon: <UserOutlined style={{ color: "white" }} />,
    label: (
      <Link to={"/account"}>
        <span className="text-white">Hồ sơ</span>
      </Link>
    ),
  },
  {
    key: "/account/address",
    icon: <EnvironmentOutlined style={{ color: "white" }} />,
    label: (
      <Link className="text-white" to={"/account/address"}>
        <span className="text-white">Địa chỉ</span>
      </Link>
    ),
  },
  {
    key: "/account/order",
    icon: <FileDoneOutlined style={{ color: "white" }} />,
    label: (
      <Link className="text-white" to={"/account/order"}>
        <span className="text-white">Đơn mua</span>
      </Link>
    ),
  },
];

const AccountManagement = () => {
  const location = useLocation();
  return (
    <div
      className={`${styles.cardContainer} md:pt-[7rem] w-full max-w-[1366px] mx-auto `}
    >
      <Card className="bg-Black">
        <Row>
          <Col xs={24} sm={6}>
            <Menu
              theme="dark"
              className="bg-Black "
              mode="inline"
              items={items}
              defaultSelectedKeys={[location.pathname]}
            />
          </Col>
          <Col lg={18} className={styles.right}>
            <Outlet />
          </Col>
        </Row>
      </Card>
    </div>
  );
};
export default AccountManagement;
