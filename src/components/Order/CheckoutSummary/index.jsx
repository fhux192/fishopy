import { Button, Card, Col, Divider, Row } from "antd";
import Title from "antd/es/typography/Title";

const CheckoutSummary = ({ setStep, cart }) => {
  const convertPrice = (price) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  return (
    <Card>
      <Row justify="space-between">
        <Col>
          <Title level={5}>Tạm tính: </Title>
        </Col>
        <Col>
          <Title level={5}>
            {convertPrice(
              cart.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.quantity * Number(currentValue.price.replace(".", ""));
              }, 0)
            )}
          </Title>
        </Col>
      </Row>
      <Divider />
      <Row justify="space-between">
        <Col>
          <Title level={5}>Tổng tiền: </Title>
        </Col>
        <Col>
          <Title level={5}>
            {convertPrice(
              cart.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.quantity * Number(currentValue.price.replace(".", ""));
              }, 0)
            )}
          </Title>
        </Col>
      </Row>
      <Divider />
      <Button onClick={() => setStep(2)} className="w-full h-14 rounded-xl lg:text-xl bg-black " type="primary">
        Mua hàng
      </Button>
    </Card>
  );
};
export default CheckoutSummary;
