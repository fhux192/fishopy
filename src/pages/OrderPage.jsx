import { SmileOutlined } from "@ant-design/icons";
import { Button, Card, Col, Empty, Result, Row, Steps } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import Cart from "../components/Cart";
import CheckoutSummary from "../components/CheckoutSummary";
import CartPayment from "../components/CartPayment";
import Payment from "../components/Payment";

const OrderPage = () => {
  const cart = useSelector((state) => state.user.account.cart);

  const [step, setStep] = useState(1);

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
        {step == 3 && (
          <Result
            icon={<SmileOutlined />}
            title="Đặt hàng thành công!"
            extra={
              <Link to="/">
                <button
                  className="w-[10rem] bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-xl mt-4"
                  type="primary"
                >
                  Tiếp tục mua{" "}
                </button>
              </Link>
            }
          />
        )}

        {cart.length == 0 && (
          <Empty description="Không có sản phẩm nào trong giỏ hàng">
            <Link to="/">
              <Button>Tiếp tục mua</Button>
            </Link>
          </Empty>
        )}
        <Row gutter={42}>
          <Col xs={24} sm={24} md={24} lg={24} xl={16}>
            {step == 1 && <Cart cart={cart} />}
            {step == 2 && <CartPayment cart={cart} />}
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={8}>
            {step == 1 && <CheckoutSummary setStep={setStep} cart={cart} />}
            {step == 2 && <Payment setStep={setStep} cart={cart} />}
          </Col>
        </Row>
      </Card>
    </div>
  );
};
export default OrderPage;
