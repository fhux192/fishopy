import { Button, Checkbox, Flex, message, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import formatPrice from "../../utils/formatPrice";
import styles from "./CheckoutPayment.module.css";
import { callCalcFee, callCreateOrder } from "../../services/api";
import { useEffect, useState } from "react";
import { updateAccount, updateCartLocal } from "../../redux/features/user/userSlice";
import qs from "qs";

const CheckoutPayment = ({
  addressDelivery,
  setCurrentStep,
  setShippingFee,
  shippingfee,
}) => {
  const { isAuthenticated, user, cart } = useSelector((state) => state.account);

  const [paymentMethod, setPaymentMethod] = useState(
    "cash_on_delivery"
  );
  const dispatch = useDispatch();
  const onOrder = async () => {
    try {
      const cartLocal = isAuthenticated ? user.cart.filter((item) => item.checked) : cart.filter((item) => item.checked)
      const values = {
        orderItems: cartLocal,
        shippingAddress: {
          name: addressDelivery?.name,
          phone: addressDelivery?.phone,
          address: addressDelivery?.address,
          city: addressDelivery?.city,
          district: addressDelivery?.district,
          ward: addressDelivery?.ward,
        },
        paymentMethod,
        itemsPrice: user? user.cart.reduce(
          (acc, cur) =>
            cur.checked
              ? (acc += cur.product.discountedPrice * cur.quantity)
              : (acc += 0),
          0
        ) :  cart.reduce(
          (acc, cur) =>
            cur.checked
              ? (acc += cur.product.discountedPrice * cur.quantity)
              : (acc += 0),
          0
        ),
        shippingPrice: shippingfee,
      };

      const res = await callCreateOrder(values);
      if (res.vcode == 0) {
        if (paymentMethod === "cash_on_delivery") {
          if(user) {
            console.log('user', user);
            dispatch(updateAccount({cart: user.cart.filter((item) => !item.checked)}));
          } else {
            dispatch(updateCartLocal(cart.filter((item) => !item.checked)));
            localStorage.setItem("cart", JSON.stringify(cart.filter((item) => !item.checked)));
          }
          setCurrentStep((pre) => (pre += 1));
          message.success(res.message);
        } else if (paymentMethod === "bank_transfer") {
          message.info(res.data);
          window.location.href = res.data;
        }
      } else message.error(res.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const calculateShippingFee = async (shippingData) => {
      try {
        const queryString = qs.stringify(shippingData);
        const res = await callCalcFee(queryString);
        if (res.vcode === 0) {
          setShippingFee(res.data.fee.fee);
        }
      } catch (error) {
        console.error("Error calculating shipping fee:", error);
      }
    };

    if (
      addressDelivery?.city &&
      addressDelivery?.district &&
      addressDelivery?.ward &&
      addressDelivery?.address
    ) {
      calculateShippingFee({
        pick_province: "Hồ Chí Minh",
        pick_district: "Huyện Hóc Môn",
        pick_ward: "Xã Đông Thạnh",
        province: addressDelivery?.city,
        district: addressDelivery?.district,
        ward: addressDelivery?.ward,
        address: addressDelivery?.address,
        weight: 500,
        value: 100000,
        transport: "road",
        tags: [],
      });
    }
  }, [addressDelivery]);

  return (
    <div className={styles.checkOutOrder}>
      <div className={styles.checkOutOrderCard}>
        <Flex vertical gap={10}>
          <Flex justify="space-between" vertical gap={5}>
            <p style={{color: 'white'}}>Phương thức thanh toán:</p>
            <Select
            style={{color: 'white'}}
              value={paymentMethod}
              options={[
                {
                  value: "cash_on_delivery",
                  label: "Thanh toán khi nhận hàng",
                },
                { value: "bank_transfer", label: "Chuyển khoản" },
              ]}
              onChange={(value) => setPaymentMethod(value)}
            ></Select>
          </Flex>
          <Flex justify="space-between" gap={5}>
            <p style={{color: 'white'}}>Tổng tiền hàng: </p>
            <p style={{color: 'white'}}>
              {formatPrice(
                user ? user.cart.reduce(
                  (acc, cur) =>
                    cur.checked
                      ? (acc += cur.product.discountedPrice * cur.quantity)
                      : (acc += 0),
                  0
                ) : cart.reduce(
                  (acc, cur) =>
                    cur.checked
                      ? (acc += cur.product.discountedPrice * cur.quantity)
                      : (acc += 0),
                  0
                )
              )}
              đ
            </p>
          </Flex>
          <Flex justify="space-between" gap={5}>
            <p style={{color: 'white'}}>Phí vận chuyển: </p>
            <p style={{color: 'white'}}>{formatPrice(shippingfee)}đ</p>
          </Flex>
          <Flex justify="space-between" gap={5}>
            <strong style={{color: 'white'}}>Tổng thanh toán: </strong>
            <p style={{color: 'white'}}>
              {formatPrice(
               user ? user.cart.reduce(
                  (acc, cur) =>
                    cur.checked
                      ? (acc += cur.product.discountedPrice * cur.quantity)
                      : (acc += 0),
                  0
                ) + shippingfee :  cart.reduce(
                  (acc, cur) =>
                    cur.checked
                      ? (acc += cur.product.discountedPrice * cur.quantity)
                      : (acc += 0),
                  0
                ) + shippingfee
              )}
              đ
            </p>
          </Flex>
          <span style={{color: 'white'}}>
          {user ? user.cart
            .filter((item) => item.checked)
            .reduce((acc, cur) => (acc += cur.quantity), 0) != 0 && (
            <small>
              (
              {user.cart
                .filter((item) => item.checked)
                .reduce((acc, cur) => (acc += cur.quantity), 0)}{" "}
              sản phẩm)
            </small>
          ) : cart
          .filter((item) => item.checked)
          .reduce((acc, cur) => (acc += cur.quantity), 0) != 0 && (
          <small>
            (
            {cart
              .filter((item) => item.checked)
              .reduce((acc, cur) => (acc += cur.quantity), 0)}{" "}
            sản phẩm)
          </small>
        )}
          </span>
        </Flex>
        <div className={styles.groupSum}>
          <Button
            type="primary"
            disabled={
              !shippingfee ||
              !addressDelivery
            }
            className="bg-Teal rounded-full font-semibold"
            onClick={onOrder}
          >
            Đặt hàng
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CheckoutPayment;
