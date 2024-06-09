import { Card, Col, Image, Row, InputNumber } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { useDispatch } from "react-redux";

const CartPayment = ({ cart }) => {
  const convertPrice = (price) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  const dispatch = useDispatch();
  return (
    <>
      {cart.map((item) => {
        return (
          <Card key={item.id} className="mb-5">
            <Row justify="space-between" align="middle">
              <Col xs={5} sm={3} md={3} lg={3} xl={3} style={{ textAlign: "center" }}>
                <Image src={item.proImg} width={70} />
              </Col>
              <Col xs={5} sm={5} md={5} lg={5} xl={6}>
                <Title
                  ellipsis={{
                    width: 200,
                  }}
                  level={4}
                >
                  {item.title}
                </Title>
              </Col>
              <Col xs={0} sm={0} md={0} lg={3} xl={2} style={{ textAlign: "center" }}>
                <Title level={5} style={{ whiteSpace: "nowrap" }}>
                  {convertPrice(Number(item.price.replace(".", "")))}{" "}
                </Title>
              </Col>
              <Col xs={7} sm={6} md={3} lg={3} xl={3} style={{ textAlign: "center" }}>
                <p>Số lượng: {item.quantity}</p>
                <Col className="mt-1" xs={3} sm={0} md={0} lg={0} xl={0}>
                  <Title level={5} style={{ whiteSpace: "nowrap" }}>
                    Tổng {convertPrice(Number(item.price.replace(".", "")) * item.quantity)}
                  </Title>
                </Col>
              </Col>
              <Col xs={0} sm={6} md={6} lg={6} xl={6} style={{ textAlign: "center" }}>
                <p style={{ whiteSpace: "nowrap" }}>
                  Tổng {convertPrice(Number(item.price.replace(".", "")) * item.quantity)}
                </p>
              </Col>
            </Row>
          </Card>
        );
      })}
    </>
  );
};
export default CartPayment;
