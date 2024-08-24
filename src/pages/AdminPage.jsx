import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  DesktopOutlined,
  DownOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Breadcrumb, Button, Dropdown, Layout, Menu, Space, theme } from "antd";
import { setCredentials, setLoading } from "../redux/features/user/userSlice";
import { useDispatch } from "react-redux";
import { callFetchAccount } from "../services/api";
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

const dropdownList = [
  {
    key: "1",
    label: <Link to={"/"}>Trang chủ</Link>,
  },
  {
    key: "2",
    label: <Link to={"/account"}>Quản lý tài khoản</Link>,
  },
  {
    key: "3",
    label: <div>Đăng xuất</div>,
  },
];

const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const status_login = localStorage.getItem("status_login");
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const handleFetchAccount = async () => {
    try {
      const res = await callFetchAccount();
      if (res.vcode === 0) {
        dispatch(setCredentials(res.data));
        setUser(res.data);
      }
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Lỗi khi tải tài khoản:", error);
    }
  };

  useEffect(() => {
    if (status_login == 0) {
      handleFetchAccount();
    } else {
      dispatch(setLoading(false));
    }
  }, []);

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
            textAlign: "right",
            paddingRight: "40px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Avatar icon={<UserOutlined />} />
          <Dropdown menu={{ items: dropdownList }} trigger={"click"}>
            <Space>
              {user?.name}
              <DownOutlined />
            </Space>
          </Dropdown>
        </Header>
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
