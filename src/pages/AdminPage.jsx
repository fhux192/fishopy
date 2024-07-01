import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { DesktopOutlined, FileOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(<Link to={"/admin"}>Tổng quan</Link>, "2", <DesktopOutlined />),
  getItem("Sản phẩm", "sub1", <UserOutlined />, [
    getItem(<Link to={"/admin/product"}>Quản lý sản phẩm</Link>, "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Đơn hàng", "sub2", <TeamOutlined />, [
    getItem(<Link to={"/admin/order"}>Quản lý đơn hàng</Link>, "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "white",
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            style={{
              marginTop: "16px",
              padding: 24,
              minHeight: 360,
              background: "white",
              borderRadius: "5px",
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AdminPage;
