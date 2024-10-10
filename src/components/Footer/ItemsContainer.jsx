import React from "react";
import { Layout, Row, Col, Typography, Space, Divider } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  EnvironmentOutlined,
  UserOutlined,
  QrcodeOutlined,
  TikTokOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import "./itemsContainer.css"; // Import file CSS tùy chỉnh
import { useDispatch } from "react-redux"; // Đảm bảo bạn đã import đúng useDispatch
import { toggleDrawerCart } from "../../redux/features/toggle/toggleSlice"; // Đảm bảo đúng import từ slice

const { Footer } = Layout;
const { Title, Link, Text } = Typography;

export const ItemsContainer = () => {
  const dispatch = useDispatch(); // Gọi useDispatch bên trong component

  return (
    <Footer className="custom-footer">
      <div className="footer-content">
        <Row gutter={[32, 32]} justify="space-between">
          <Col xs={24} sm={12} md={6}>
            <Title level={4} className="footer-title">
              Khách Hàng
            </Title>
            <Space direction="vertical">
              <Link onClick={() => dispatch(toggleDrawerCart())} className="footer-link">
                <ShoppingCartOutlined className="highlight-icon" />{" "}
                <span className="highlight-text">Giỏ Hàng</span>
              </Link>
              <Link href="#" className="footer-link">
                <UserOutlined className="highlight-icon" />{" "}
                <span className="highlight-text">Kiểm Tra Đơn Hàng</span>
              </Link>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Title level={4} className="footer-title">
              Liên Hệ
            </Title>
            <Space direction="vertical px-0">
              <Row className="gap-1 footer-text">
                <PhoneOutlined />{" "}
                <Text className="footer-text" copyable>
                  0388811160
                </Text>
              </Row>
              <Row className=" gap-1 footer-text">
                <MailOutlined />{" "}
                <Text copyable className="footer-text">
                  hoangphuc395@gmail.com
                </Text>
              </Row>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Title level={4} className="footer-title">
              Mạng Xã Hội
            </Title>
            <Space direction="vertical">
              <Link href="#" className="footer-link">
                <FacebookOutlined className="highlight-icon" />{" "}
                <span className="highlight-text">Facebook: Quân Nguyễn</span>
              </Link>
              <Link
                href="https://www.tiktok.com/@quanguppy68?_t=8muvYNlCqUz&_r=1"
                className="footer-link"
              >
                <TikTokOutlined className="highlight-icon" />{" "}
                <span className="highlight-text">Tiktok: Trại Cá Guppy Bất Ổn</span>
              </Link>
              <Link
                href="https://www.youtube.com/channel/UCMnDPNFBmSwnlfPnPWN8zdw"
                className="footer-link"
              >
                <YoutubeOutlined className="highlight-icon" />{" "}
                <span className="highlight-text">Youtube: Guppy Hóc Môn</span>
              </Link>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Title level={4} className="footer-title">
              Thông Tin
            </Title>
            <Space direction="vertical">
              <Row className="gap-1 footer-text">
                <EnvironmentOutlined />{" "}
                <Text copyable className="footer-text">
                  22/9/2 ấp 3, Đông Thạnh, Hóc Môn
                </Text>
              </Row>
              <Link href="#" className="footer-link">
                <QrcodeOutlined className="highlight-icon" />{" "}
                <span className="highlight-text">Hướng Dẫn Thanh Toán</span>
              </Link>
            </Space>
          </Col>
        </Row>
        <Divider className="footer-divider" />
        <Row justify="center">
          <Col>
            <Text className="footer-copy">Guppy Hóc Môn - Trại Cá Guppy Bất Ổn</Text>
          </Col>
        </Row>
      </div>
    </Footer>
  );
};
