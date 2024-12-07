import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import styles from "./ProductChooses.module.css";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import formatPrice from "../../utils/formatPrice";
import { useEffect, useState } from "react";
import {
  toggle,
  toggleModalAddAddress,
} from "../../redux/features/toggle/toggleSlice";
import CartItemChoose from "../CartItemChoose/CartItemChoose";
import ModalAddAddress from "../Modal/ModalAddAddress";
import ModalEditAddress from "../Modal/ModalEditAddress/ModalEditAddress";

const ProductChooses = ({ addressDelivery, setAddressDelivery }) => {
  let { user, cart, address } = useSelector((state) => state.account);
  const [modalChooseAddress, setModalChooseAddress] = useState(false);
  let cartChoosed = user
    ? user.cart.filter((item) => item.checked)
    : cart.filter((item) => item.checked);
  const dispatch = useDispatch();
  const [form] = Form.useForm();


  useEffect(() => {
    if (user) {
      setAddressDelivery(user?.addresses.find((item) => item.active));
    } else {
      setAddressDelivery(address);
    }
  }, [user ? user?.addresses : address]);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <>
      <Card
        className="mx-2"
        style={{
          marginBottom: "20px",
          backgroundColor: "rgba(30, 30, 30, 1)",
          border: "2px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {addressDelivery ? (
          <Flex justify="space-between" align="center">
            <div>
              <Typography.Title level={4} style={{ color: "white" }}>
                Địa chỉ nhận hàng
              </Typography.Title>
              <Row>
                <Col style={{ color: "white" }}>
                  <strong>{addressDelivery.name}</strong>
                  <Divider type="vertical" />
                  {addressDelivery.phone}
                </Col>
                <Divider type="vertical" />
                <Col style={{ color: "white" }}>
                  {addressDelivery.address}, {addressDelivery.ward},{" "}
                  {addressDelivery.district}, {addressDelivery.city}
                  {addressDelivery.active && <strong> (Mặc định)</strong>}
                </Col>
              </Row>
            </div>
            <button
              className="border-[1px] min-w-[5rem] bg-Black border-Grey3 font-bold rounded-full p-2 px-2 text-Teal3"
              onClick={() => {
                if (user) {
                  setModalChooseAddress((pre) => (pre = !pre));
                } else {
                  dispatch(toggle("modalEditAddress"));
                }
              }}
            >
              Thay đổi
            </button>
          </Flex>
        ) : (
          <Flex justify="space-between" align="center">
            <p className="text-Red mr-1 font-semibold text-[16px]">
              Chưa có địa chỉ nhận hàng
            </p>
            <button
              className="border-[1px] min-w-[5rem] bg-Black border-Grey3 font-bold rounded-full p-2 px-2 text-Red"
              onClick={() => dispatch(toggleModalAddAddress())}
            >
              Thêm 
            </button>
          </Flex>
        )}
      </Card>

      {cartChoosed &&
        cartChoosed.map((item) => {
          return <CartItemChoose key={item._id} item={item} />;
        })}

      {user && (
        <Modal
          open={modalChooseAddress}
          title={"Chọn địa chỉ"}
          footer={null}
          onCancel={() => setModalChooseAddress(false)}
        >
          {user?.addresses.map((item) => {
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
                        {item.address}, {item.ward}, {item.district},{" "}
                        {item.city}
                        {item.active && <strong> (Mặc định)</strong>}
                      </Col>
                    </Row>
                  </div>
                  {item._id == addressDelivery?._id && (
                    <Button disabled>Đang sử dụng</Button>
                  )}
                </Flex>
              </Card>
            );
          })}
        </Modal>
      )}

      <ModalAddAddress />
      <ModalEditAddress />
    </>
  );
};
export default ProductChooses;
