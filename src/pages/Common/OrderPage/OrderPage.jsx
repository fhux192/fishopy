import { Button, Card, Result, Col, Row, Steps, message } from "antd";
import styles from "./OrderPage.module.css";
import { useEffect, useState } from "react";
import {
  ShoppingCartOutlined,
  SmileOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import Cart from "@components/Order/Cart/Cart.jsx";
import CheckoutPayment from "@components/Order/CheckoutPayment/CheckoutPayment.jsx";
import CheckoutOrder from "@components/Order/CheckoutOrder/CheckoutOrder.jsx";
import ProductChooses from "@components/Order/ProductChooses/ProductChooses.jsx";
import { updateAccount } from "@redux/features/user/userSlice";

const OrderPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { user } = useSelector((state) => state.account);
  const [addressDelivery, setAddressDelivery] = useState(
    user.addresses.find((item) => item.default) || user.addresses[0]
  );
  const { width, height } = useWindowSize();
  const [shippingfee, setShippingFee] = useState(0);
  const location = useLocation(); 
  const dispatch = useDispatch();

  useEffect(() => {
    setAddressDelivery(user.addresses.find((item) => item.default));
  }, [user.addresses.length]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    const cancel = searchParams.get("cancel");
    const status = searchParams.get("status");
    if (code === "00" && cancel === "false" && status === "PAID") {
      setCurrentStep(2);
      if (Number(localStorage.getItem("status_login")) != 0) {
        const cart = localStorage.getItem("cart")
          ? JSON.parse(localStorage.getItem("cart"))
          : [];
        const newCart = cart.filter((item) => !item.checked);
        localStorage.setItem("cart", JSON.stringify(newCart));
        dispatch(updateAccount({ cart: newCart }));
      }

      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [location.search]);

  return (
    <div className={styles.container}>
      <>
        <Card
          className={`${styles.cardStep} bg-Black2 mt-[3rem] mx-2 lg:mt-[8rem]`}
        >
          <Steps
            size="small"
            current={currentStep}
            items={[
              {
                title: (
                  <p
                    className={
                      currentStep === 0
                        ? styles.stepActive
                        : styles.stepInactive
                    }
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
                    className={
                      currentStep === 1
                        ? styles.stepActive
                        : styles.stepInactive
                    }
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
                    className={
                      currentStep === 2
                        ? styles.stepActive
                        : styles.stepInactive
                    }
                  >
                    Thành công
                  </p>
                ),
                icon: <SmileOutlined style={{ color: "white" }} />,
              },
            ]}
          />
        </Card>

        {currentStep === 2 && (
          <Confetti width={width} height={height} recycle={false} />
        )}

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
              {currentStep === 0 && <Cart />}
              {currentStep === 1 && (
                <ProductChooses
                  addressDelivery={addressDelivery}
                  setAddressDelivery={setAddressDelivery}
                />
              )}
              {user?.cart.length === 0 && currentStep !== 2 && (
                <Result
                  icon={<SmileOutlined style={{ color: "white" }} />}
                  title={
                    <span className="text-white">
                      Không có sản phẩm nào trong giỏ hàng
                    </span>
                  }
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
