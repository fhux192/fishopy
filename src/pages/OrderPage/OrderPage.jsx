import { Button, Card, Result, Col, Row, Steps, Checkbox, Space } from "antd";
import styles from "./OrderPage.module.css";
import { useState } from "react";
import { ShoppingCartOutlined, SmileOutlined, SolutionOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import Cart from "../../components/Cart/Cart.jsx";
import CheckoutPayment from "../../components/CheckoutPayment/CheckoutPayment.jsx";
import CheckoutOrder from "../../components/CheckoutOrder/CheckoutOrder.jsx";
import ProductChooses from "../../components/ProductChooses/ProductChooses.jsx";

const OrderPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { user } = useSelector((state) => state.account);
  const [addressDelivery, setAddressDelivery] = useState(null);
  const { width, height } = useWindowSize();
  const [shippingfee, setShippingFee] = useState(0);

  return (
    <>
      {user && (
        <>
          <Card className={`${styles.cardStep} mt-[4rem] lg:mt-[6rem]`}>
            <Steps
              size="small"
              current={currentStep}
              items={[
                {
                  title: (
                    <p style={{ cursor: "pointer" }} onClick={() => setCurrentStep(0)}>
                      Giỏ hàng
                    </p>
                  ),
                  icon: <ShoppingCartOutlined />,
                },
                {
                  title: (
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        if (user?.cart?.some((item) => item.checked)) {
                          setCurrentStep(1);
                        }
                      }}
                    >
                      Đặt hàng
                    </p>
                  ),
                  icon: <SolutionOutlined />,
                },
                {
                  title: <p style={{ cursor: "pointer" }}>Thành công</p>,
                  icon: <SmileOutlined />,
                },
              ]}
            />
          </Card>
          {currentStep == 2 && <Confetti width={width} height={height} recycle={false} />}
          <div>
            {currentStep == 2 && (
              <Result
                icon={<SmileOutlined />}
                title="Đặt hành thành công!"
                extra={
                  <Link to={"/"}>
                    <Button type="primary">Tiếp tục mua</Button>
                  </Link>
                }
              />
            )}
            <Row>
              <Col span={24}>
                {currentStep == 0 && <Cart cart={user?.cart} />}
                {currentStep == 1 && (
                  <ProductChooses
                    addressDelivery={addressDelivery}
                    setAddressDelivery={setAddressDelivery}
                  />
                )}
                {user.cart.length == 0 && currentStep != 2 && (
                  <Result
                    icon={<SmileOutlined />}
                    title="Không có sản phẩm nào trong giỏ hàng"
                    extra={
                      <Link to={"/"}>
                        <Button type="primary">Tiếp tục mua</Button>
                      </Link>
                    }
                  />
                )}
              </Col>
            </Row>
          </div>

          {currentStep == 0 && <CheckoutOrder setCurrentStep={setCurrentStep} />}
          {currentStep == 1 && (
            <CheckoutPayment
              addressDelivery={addressDelivery}
              setCurrentStep={setCurrentStep}
              setShippingFee={setShippingFee}
              shippingfee={shippingfee}
            />
          )}
        </>
      )}
    </>
  );
};
export default OrderPage;
