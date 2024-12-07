import { Button, Card, Result, Col, Row, Steps, Checkbox, Space } from "antd";
import styles from "./OrderPage.module.css";
import { useState } from "react";
import {
  ShoppingCartOutlined,
  SmileOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
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
  const { user, cart } = useSelector((state) => state.account);
  const [addressDelivery, setAddressDelivery] = useState(null);
  const { width, height } = useWindowSize();
  const [shippingfee, setShippingFee] = useState(0);
  console.log('user', user)

  return (
    <div className={styles.container}>
      <>
        <Card className={`${styles.cardStep} bg-Black2 mt-[3rem] mx-2 lg:mt-[8rem]`}>
          <Steps
            size="small"
            current={currentStep}
            items={[
              {
                title: (
                  <p
                    className={currentStep === 0 ? styles.stepActive : styles.stepInactive}
                    onClick={() => setCurrentStep(0)}
                  >
                    Giỏ hàng
                  </p>
                ),
                icon: <ShoppingCartOutlined style={{ color: "white" }} />,
              },
              {
                title: (
                  <p
                    className={currentStep === 1 ? styles.stepActive : styles.stepInactive}
                    onClick={() => {
                      if (user?.cart?.some((item) => item.checked)) {
                        setCurrentStep(1);
                      }
                    }}
                  >
                    Đặt hàng
                  </p>
                ),
                icon: <SolutionOutlined style={{ color: "white" }} />,
              },
              {
                title: (
                  <p
                    className={currentStep === 2 ? styles.stepActive : styles.stepInactive}
                  >
                    Thành công
                  </p>
                ),
                icon: <SmileOutlined style={{ color: "white" }} />,
              },
            ]}
          />
        </Card>

        {currentStep === 2 && <Confetti width={width} height={height} recycle={false} />}
        
        <div>
          {currentStep === 2 && (
            <Result
              icon={<SmileOutlined style={{ color: "white" }} />}
              title={<span className="text-white">Đặt hàng thành công!</span>}
              extra={
                <Link to={"/"}>
                  <button className="text-white py-1 px-2 border border-white rounded">
                    Tiếp tục mua
                  </button>
                </Link>
              }
            />
          )}

          <Row>
            <Col span={24}>
              {currentStep === 0 && <Cart cart={user?.cart ? user.cart : cart} />}
              {currentStep === 1 && (
                <ProductChooses
                  addressDelivery={addressDelivery}
                  setAddressDelivery={setAddressDelivery}
                />
              )}
              {(user ? user?.cart.length === 0 : cart.length === 0) && currentStep !== 2 && (
                <Result
                  icon={<SmileOutlined style={{ color: "white" }} />}
                  title={<span className="text-white">Không có sản phẩm nào trong giỏ hàng</span>}
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

        {currentStep === 0 && <CheckoutOrder setCurrentStep={setCurrentStep} />}
        {currentStep === 1 && (
          <CheckoutPayment
            addressDelivery={addressDelivery}
            setCurrentStep={setCurrentStep}
            setShippingFee={setShippingFee}
            shippingfee={shippingfee}
          />
        )}
      </>
    </div>
  );
};

export default OrderPage;
