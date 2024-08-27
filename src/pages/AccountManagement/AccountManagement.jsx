import { Card, Col, Menu, Row } from "antd";
import { EnvironmentOutlined, FileDoneOutlined, UserOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import styles from "./AccountManagement.module.css";

const items = [
  {
    key: "/account",
    icon: <UserOutlined />,
    label: <Link to={"/account"}>Hồ sơ</Link>,
  },
  {
    key: "/account/address",
    icon: <EnvironmentOutlined />,
    label: <Link to={"/account/address"}>Địa chỉ</Link>,
  },
  {
    key: "/account/order",
    icon: <FileDoneOutlined />,
    label: <Link to={"/account/order"}>Đơn mua</Link>,
  },
];

const AccountManagement = () => {
  const location = useLocation();
  return (
    <div className={styles.cardContainer}>
      <Card>
        <Row>
          <Col xs={24} sm={6}>
            <Menu mode="inline" items={items} defaultSelectedKeys={[location.pathname]} />
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
