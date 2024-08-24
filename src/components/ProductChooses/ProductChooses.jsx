import { Button, Card, Col, Divider, Flex, Image, InputNumber, Modal, Row, Typography } from "antd";
import styles from "./ProductChooses.module.css";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import formatPrice from "../../utils/formatPrice";
import { useEffect, useState } from "react";
import { toggleModalAddAddress } from "../../redux/features/toggle/toggleSlice";
import CartItemChoose from "../CartItemChoose/CartItemChoose";

const ProductChooses = ({ addressDelivery, setAddressDelivery }) => {
  let { user } = useSelector((state) => state.account);
  const [modalChooseAddress, setModalChooseAddress] = useState(false);
  let cartChoosed = user.cart.filter((item) => item.checked);
  const dispatch = useDispatch();

  useEffect(() => {
    setAddressDelivery(user.addresses.find((item) => item.active));
  }, [user.addresses]);

  return (
    <>
      <Card style={{ marginBottom: "10px" }}>
        {addressDelivery ? (
          <Flex justify="space-between" align="center">
            <div>
              <Typography.Title level={4}>Địa chỉ nhận hàng</Typography.Title>
              <Row>
                <Col>
                  <strong>{addressDelivery.name}</strong>
                  <Divider type="vertical" />
                  {addressDelivery.phone}
                </Col>
                <Divider type="vertical" />
                <Col>
                  {addressDelivery.address}, {addressDelivery.ward}, {addressDelivery.district},{" "}
                  {addressDelivery.city}
                  {addressDelivery.active && <strong> (Mặc định)</strong>}
                </Col>
              </Row>
            </div>
            <Button onClick={() => setModalChooseAddress((pre) => (pre = !pre))}>Thay đổi</Button>
          </Flex>
        ) : (
          <Flex justify="space-between" align="center">
            <Typography.Title level={5}>Chưa có địa chỉ nhận hàng</Typography.Title>
            <Button onClick={() => dispatch(toggleModalAddAddress())}>Thêm nhanh</Button>
          </Flex>
        )}
      </Card>

      {cartChoosed &&
        cartChoosed.map((item) => {
          return <CartItemChoose key={item._id} item={item} />;
        })}

      <Modal
        open={modalChooseAddress}
        title={"Chọn địa chỉ"}
        footer={null}
        onCancel={() => setModalChooseAddress(false)}
      >
        {user.addresses.map((item) => {
          return (
            <Card
              key={item._id}
              onClick={() => {
                setAddressDelivery(item);
                setModalChooseAddress(false);
              }}
              className={styles.cardAddress}
              style={{ marginBottom: "10px" }}
              hoverable
            >
              <Flex justify="space-between" align="center">
                <div>
                  <Typography.Title level={4}>{item.name}</Typography.Title>
                  <Row>
                    <Col>
                      <strong>{item.name}</strong>
                      <Divider type="vertical" />
                      {item.phone}
                    </Col>
                    <Divider type="vertical" />
                    <Col>
                      {item.address}, {item.ward}, {item.district}, {item.city}
                      {item.active && <strong> (Mặc định)</strong>}
                    </Col>
                  </Row>
                </div>
                {item._id == addressDelivery?._id && <Button disabled>Đang sử dụng</Button>}
              </Flex>
            </Card>
          );
        })}
      </Modal>
    </>
  );
};
export default ProductChooses;
