import { Button, Checkbox, Flex, message, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import formatPrice from "../../utils/formatPrice";
import styles from "./CheckoutPayment.module.css";
import { callCalcFee, callCreateOrder } from "../../services/api";
import { useEffect, useState } from "react";
import {
  updateAccount,
  updateCartLocal,
} from "../../redux/features/user/userSlice";
import qs from "qs";
import MyButton from "../../components/MyButton/MyButton";

const CheckoutPayment = ({
  addressDelivery,
  setCurrentStep,
  setShippingFee,
  shippingfee,
}) => {
  const { isAuthenticated, user, cart } = useSelector((state) => state.account);

  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  const dispatch = useDispatch();

  const onOrder = async () => {
    // Kiểm tra nếu địa chỉ chưa đầy đủ
    if (
      !addressDelivery?.address ||
      !addressDelivery?.city ||
      !addressDelivery?.district ||
      !addressDelivery?.ward
    ) {
      // Hiện thông báo cảnh báo với thiết kế nhỏ gọn và chữ in đậm
      message.error({
        content: "Vui lòng thêm địa chỉ nhận hàng!",
        style: {
          color: "#161617", // Màu chữ tối
          padding: "10px", // Khoảng cách trong thông báo
          borderRadius: "5px", // Bo tròn góc
          fontSize: "14px", // Kích thước chữ nhỏ gọn
        },
      });

      // Cuộn trang lên đầu từ từ
      setTimeout(() => {
        window.scrollTo({
          top: 0, // Cuộn lên đầu trang
          behavior: "smooth", // Hiệu ứng cuộn mượt mà
        });
      }, 300); // Delay một chút sau khi thông báo xuất hiện

      return; // Dừng lại không thực hiện tiếp
    }

    try {
      const cartLocal = isAuthenticated
        ? user.cart.filter((item) => item.checked)
        : cart.filter((item) => item.checked);
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
        itemsPrice: user
          ? user.cart.reduce(
              (acc, cur) =>
                cur.checked
                  ? (acc += cur.product.discountedPrice * cur.quantity)
                  : acc,
              0
            )
          : cart.reduce(
              (acc, cur) =>
                cur.checked
                  ? (acc += cur.product.discountedPrice * cur.quantity)
                  : acc,
              0
            ),
        shippingPrice: shippingfee,
      };

      const res = await callCreateOrder(values);
      if (res.vcode === 0) {
        if (paymentMethod === "cash_on_delivery") {
          if (user) {
            dispatch(
              updateAccount({ cart: user.cart.filter((item) => !item.checked) })
            );
          } else {
            dispatch(updateCartLocal(cart.filter((item) => !item.checked)));
            localStorage.setItem(
              "cart",
              JSON.stringify(cart.filter((item) => !item.checked))
            );
          }
          setCurrentStep((prevStep) => prevStep + 1);
          message.success(res.msg);
        } else if (paymentMethod === "bank_transfer") {
          message.info(res.data);
          window.location.href = res.data;
        }
      } else {
        message.error(res.msg);
      }
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
        <Flex vertical gap={2}>
          <Flex justify="space-between" vertical gap={3}>
            <p className="font-bold" style={{ color: "white" }}>
              Phương thức thanh toán:
            </p>
            <Select
              className="mb-1"
              style={{ color: "white" }}
              value={paymentMethod}
              options={[
                {
                  value: "cash_on_delivery",
                  label: "Thanh toán khi nhận hàng",
                },
                { value: "bank_transfer", label: "Chuyển khoản" },
              ]}
              onChange={(value) => setPaymentMethod(value)}
            />
          </Flex>
          <Flex justify="space-between" gap={5}>
            <p style={{ color: "#46DFB1", fontWeight: "bold" }}>
              Tổng tiền sản phẩm:{" "}
            </p>
            <p style={{ color: "#46DFB1", fontWeight: "bold" }}>
              {formatPrice(
                user
                  ? user.cart.reduce(
                      (acc, cur) =>
                        cur.checked
                          ? (acc += cur.product.discountedPrice * cur.quantity)
                          : acc,
                      0
                    )
                  : cart.reduce(
                      (acc, cur) =>
                        cur.checked
                          ? (acc += cur.product.discountedPrice * cur.quantity)
                          : acc,
                      0
                    )
              )}
              đ
            </p>
          </Flex>
          <span style={{ color: "#bdc3c7" }}>
            {(user
              ? user.cart.filter((item) => item.checked)
              : cart.filter((item) => item.checked)
            ).reduce((acc, cur) => (acc += cur.quantity), 0) !== 0 && (
              <p>
                (
                {(user ? user.cart : cart)
                  .filter((item) => item.checked)
                  .reduce((acc, cur) => (acc += cur.quantity), 0)}{" "}
                sản phẩm)
              </p>
            )}
          </span>
          <Flex justify="space-between" gap={5}>
            <p style={{ color: "#bdc3c7", fontWeight: "bold" }}>
              Phí vận chuyển:
            </p>
            <p style={{ color: "#bdc3c7", fontWeight: "bold" }}>
              {formatPrice(shippingfee)}đ
            </p>
          </Flex>
          <Flex justify="space-between" gap={5}>
            <strong style={{ color: "#08ea79", fontWeight: "bold" }}>
              Tổng thanh toán:{" "}
            </strong>
            <p style={{ color: "#08ea79", fontWeight: "bold" }}>
              {formatPrice(
                user
                  ? user.cart.reduce(
                      (acc, cur) =>
                        cur.checked
                          ? (acc += cur.product.discountedPrice * cur.quantity)
                          : acc,
                      0
                    ) + shippingfee
                  : cart.reduce(
                      (acc, cur) =>
                        cur.checked
                          ? (acc += cur.product.discountedPrice * cur.quantity)
                          : acc,
                      0
                    ) + shippingfee
              )}
              đ
            </p>
          </Flex>
        </Flex>
        <div className={styles.groupSum}>
          <MyButton text="Đặt hàng" onClick={onOrder} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPayment;
