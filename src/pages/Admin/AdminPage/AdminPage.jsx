import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  DesktopOutlined,
  DownOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Avatar, Drawer, Dropdown, Layout, Menu, message, Space } from "antd";
import { logout } from "@redux/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { user_logout } from "@services/api";
import { googleLogout } from "@react-oauth/google";
const { Header, Content, Sider } = Layout;
import styles from "./AdminPage.module.css";

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
  const [menuAdmin, setMenuAdmin] = useState(false);

  const { user } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const res = await user_logout();
      if (res.vcode !== 0) {
        return message.error(res.msg);
      }
      dispatch(logout());
      message.success(res.msg);

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
  const location = useLocation();

  return (
    <Layout className="min-h-screen">
      <Sider
        className={styles.sider}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          className="mt-4"
          defaultSelectedKeys={[location.pathname]}
          openKeys={["sub1", "sub2", "sub3", "sub4"]}
        />
      </Sider>

      <Layout>
        <Header className="bg-white px-4 flex justify-between lg:justify-end">
          <MenuOutlined
            className="lg:hidden"
            onClick={() => setMenuAdmin(!menuAdmin)}
          />
          <Space>
            <Avatar icon={<UserOutlined />} />
            <Dropdown menu={{ items: dropdownList }} trigger={"click"}>
              <Space className="font-bold text-Grey cursor-pointer lg:text-xl md:text-lg text-md">
                {user?.name}
                <DownOutlined />
              </Space>
            </Dropdown>
          </Space>
        </Header>
        <Content className="p-4">
          <Outlet />
        </Content>

        <Drawer
          placement={"left"}
          open={menuAdmin}
          onClose={() => setMenuAdmin(!menuAdmin)}
        >
          <Menu
            mode="inline"
            items={items}
            onClick={() => setMenuAdmin(!menuAdmin)}
            defaultSelectedKeys={[location.pathname]}
            openKeys={["sub1", "sub2", "sub3", "sub4"]}
          />
        </Drawer>
      </Layout>
    </Layout>
  );
};
export default AdminPage;
