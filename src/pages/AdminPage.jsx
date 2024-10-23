import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  DesktopOutlined,
  DownOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Dropdown,
  Layout,
  Menu,
  Space,
} from "antd";
import {
  logout,
} from "../redux/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { callLogout } from "../services/api";
import { googleLogout } from "@react-oauth/google";
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
  getItem(<Link to={"/admin"}>Tổng quan</Link>, "/admin", <DesktopOutlined />),
  getItem("Sản phẩm", "sub1", <UserOutlined />, [
    getItem(
      <Link to={"/admin/product"}>Quản lý sản phẩm</Link>,
      "/admin/product",
      <FileOutlined />
    ),
  ]),
  getItem("Đơn hàng", "sub2", <ShoppingCartOutlined />, [
    getItem(
      <Link to={"/admin/order"}>Quản lý đơn hàng</Link>,
      "/admin/order",
      <FileOutlined />
    ),
  ]),
  getItem("Người dùng", "sub3", <TeamOutlined />, [
    getItem(
      <Link to={"/admin/user"}>Quản lý người dùng</Link>,
      "/admin/user",
      <FileOutlined />
    ),
  ]),
  getItem("Combo", "sub4", <TeamOutlined />, [
    getItem(
      <Link to={"/admin/combo"}>Quản lý combo</Link>,
      "/admin/combo",
      <FileOutlined />
    ),
  ]),
];

const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.account);

  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const res = await callLogout();
      if (res.vcode === 0) {
        dispatch(logout());
        message.success(res.message);
      }
      
      googleLogout();
    } catch (error) {
      console.log(error);
    }
  };
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
      label: <div onClick={handleLogout}>Đăng xuất</div>,
    },
  ];

  const isDesktop = window.innerWidth >= 1024;

  const location = useLocation();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      {isDesktop && (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu
            theme="dark"
            mode="inline"
            items={items}
            style={{ marginTop: "1rem" }}
            defaultSelectedKeys={[location.pathname]}
            openKeys={["sub1", "sub2", "sub3", "sub4"]}
          />
        </Sider>
      )}

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
            <Space className="font-bold text-Grey cursor-pointer lg:text-xl md:text-lg text-md">
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
      </Layout>
    </Layout>
  );
};
export default AdminPage;
