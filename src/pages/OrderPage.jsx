import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Empty, Image, InputNumber, Row, Steps } from "antd";
import Title from "antd/es/typography/Title";
import { useDispatch, useSelector } from "react-redux";
import { addLocalCart, changeQuantityLocalCart, removeCartLocal } from "../redux/features/user/userSlice";
import { Link } from "react-router-dom";
import { useState } from "react";

const OrderPage = () => {
  const cart = useSelector((state) => state.user.account.cart);
  console.log("cart", cart);
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);

  const convertPrice = (price) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <div>
      <Card className="mt-5">
        <Steps
          size="small"
          current={step}
          items={[
            {
              title: "Giỏ hàng",
            },
            {
              title: "Đặt hàng",
            },
            {
              title: "Thanh toán",
            },
          ]}
        />
      </Card>

      <Card className="mt-5">
        <Row gutter={42}>
          <Col xs={24} sm={24} md={24} lg={24} xl={16}>
            <div>
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
                        <InputNumber
                          value={item.quantity}
                          controls={false}
                          min={1}
                          addonBefore={
                            <div
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                dispatch(changeQuantityLocalCart({ item, type: "decrease" }));
                              }}
                            >
                              -
                            </div>
                          }
                          addonAfter={
                            <div
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                dispatch(changeQuantityLocalCart({ item, type: "increase" }));
                              }}
                            >
                              +
                            </div>
                          }
                          defaultValue={1}
                        />
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

                      <Col span={1} style={{ textAlign: "center" }}>
                        <DeleteOutlined onClick={() => dispatch(removeCartLocal(item.id))} />
                      </Col>
                    </Row>
                  </Card>
                );
              })}
              {cart.length == 0 && (
                <Empty description="Không có sản phẩm nào trong giỏ hàng">
                  <Link to="/">
                    <Button>Tiếp tục mua</Button>
                  </Link>
                </Empty>
              )}
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={8}>
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
              <Button onClick={() => setStep(2)} className="w-full bg-black " type="primary">
                Mua hàng
              </Button>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
export default OrderPage;
