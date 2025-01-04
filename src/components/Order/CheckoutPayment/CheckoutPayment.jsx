import { Flex, message, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import formatPrice from "@utils/formatPrice";
import styles from "./CheckoutPayment.module.css";
import { free_addOrder } from "@services/api";
import { useEffect, useState } from "react";
import { updateAccount } from "@redux/features/user/userSlice";
import MyButton from "@components/Common/MyButton/MyButton";
import { free_addOrderDetail, user_updateCartItem } from "@services/api";

const CheckoutPayment = ({
  addressDelivery,
  setCurrentStep,
  setShippingFee,
  shippingfee,
}) => {
  const { user, isAuthenticated } = useSelector((state) => state.account);

  const [paymentMethod, setPaymentMethod] = useState("cod");
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
      const values = {
        shipping_address: {
          name: addressDelivery.name,
          phone: addressDelivery.phone,
          address: addressDelivery.address,
          city: addressDelivery.city,
          district: addressDelivery.district,
          ward: addressDelivery.ward,
        },
        payment_method: paymentMethod,
        items_price: user.cart.reduce(
          (acc, cur) =>
            cur.checked
              ? (acc +=
                  (cur.id_combo?.price || cur.id_product.price) * cur.quantity)
              : acc,
          0
        ),
        shipping_price: shippingfee,
        id_user: user._id || null,
      };

      const res = await free_addOrder(values);
      if (res.vcode != 0) {
        return message.error(res.msg);
      }

      if (paymentMethod === "cod") {
        const itemsChecked = user.cart.filter((item) => item.checked);
        const newCart = user.cart.filter((item) => !item.checked);
        dispatch(updateAccount({ cart: newCart }));
        if (isAuthenticated) {
          itemsChecked.forEach(async (item) => {
            const resUpdate = await user_updateCartItem(item._id, {
              id_order: res.data._id,
            });
            if (resUpdate.vcode != 0) return message.error(resUpdate.msg);
          });
        } else {
          itemsChecked.forEach(async (item) => {
            let orderDetail = {
              quantity: item.quantity,
              id_order: res.data._id,
            };
            if (item.id_product) {
              orderDetail.id_product = item.id_product._id;
            }

            if (item.id_combo) {
              orderDetail.id_combo = item.id_combo._id;
            }
            const resDelete = await free_addOrderDetail(orderDetail);
            if (resDelete.vcode != 0) return message.error(resDelete.msg);
          });
          localStorage.setItem("cart", JSON.stringify(newCart));
        }
        setCurrentStep((prevStep) => prevStep + 1);
        message.success(res.msg);
      } else if (paymentMethod === "bank_transfer") {
        const itemsChecked = user.cart.filter((item) => item.checked);
        const newCart = user.cart.filter((item) => !item.checked);
        dispatch(updateAccount({ cart: newCart }));
        const updatePromises = [];

        if (isAuthenticated) {
          itemsChecked.forEach(async (item) => {
            const updatePromise = user_updateCartItem(item._id, {
              id_order: res.data._id,
            }).then((resUpdate) => {
              console.log("resUpdate", resUpdate);

              if (resUpdate.vcode != 0) {
                message.error(resUpdate.msg);
                throw new Error(resUpdate.msg);
              }
            });
            updatePromises.push(updatePromise);
          });
        } else {
          itemsChecked.forEach(async (item) => {
            let orderDetail = {
              quantity: item.quantity,
              id_order: res.data._id,
            };
            if (item.id_product) {
              orderDetail.id_product = item.id_product._id;
            }

            if (item.id_combo) {
              orderDetail.id_combo = item.id_combo._id;
            }
            const addPromise = free_addOrderDetail(orderDetail).then(
              (resAdd) => {
                if (resAdd.vcode != 0) {
                  message.error(resAdd.msg);
                  throw new Error(resAdd.msg);
                }
              }
            );
            updatePromises.push(addPromise);
          });
        }
        try {
          // Sử dụng await để đợi tất cả các Promise hoàn thành
          await Promise.all(updatePromises);
          window.location.href = res.link;
        } catch (error) {
          console.error(
            "Error updating cart items or adding order details:",
            error
          );
          message.error(
            "Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại."
          );
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (
      addressDelivery?.city &&
      addressDelivery?.district &&
      addressDelivery?.ward &&
      addressDelivery?.address
    ) {
      const total = user.cart.reduce(
        (acc, cur) =>
          cur.checked
            ? (acc +=
                (cur.id_combo?.price || cur.id_product.price) * cur.quantity)
            : acc,
        0
      );

      setShippingFee(total >= 200000 ? 0 : 25000);
      // setShippingFee(0);
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
                  value: "cod",
                  label: "Thanh toán khi nhận hàng",
                },
                { value: "bank_transfer", label: "Chuyển khoản" },
              ]}
              onChange={(value) => setPaymentMethod(value)}
            />
          </Flex>
          <Flex justify="space-between" gap={5}>
            <p style={{ color: "#46DFB1", fontWeight: "bold" }}>
              Tổng tiền sản phẩm:
            </p>
            <p style={{ color: "#46DFB1", fontWeight: "bold" }}>
              {formatPrice(
                user.cart.reduce(
                  (acc, cur) =>
                    cur.checked
                      ? (acc +=
                          (cur.id_combo?.price || cur.id_product.price) *
                          cur.quantity)
                      : acc,
                  0
                )
              )}
              đ
            </p>
          </Flex>
          <span style={{ color: "#bdc3c7" }}>
            {user.cart
              .filter((item) => item.checked)
              .reduce((acc, cur) => (acc += cur.quantity), 0) !== 0 && (
              <p>
                {`${user.cart
                  .filter((item) => item.checked)
                  .reduce((acc, cur) => (acc += cur.quantity), 0)} sản phẩm`}
              </p>
            )}
          </span>
          <Flex justify="space-between" gap={5}>
            <p style={{ color: "#bdc3c7", fontWeight: "bold" }}>
              Phí vận chuyển:
            </p>
            <div>
              <p
                style={{
                  color: "#bdc3c7",
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              >
                {formatPrice(shippingfee)}đ
              </p>
              <small className="text-white">
                (miễn phí ship đơn trên 200.000đ)
              </small>
            </div>
          </Flex>
          <Flex justify="space-between" gap={5}>
            <strong style={{ color: "#08ea79", fontWeight: "bold" }}>
              Tổng thanh toán:{" "}
            </strong>
            <p style={{ color: "#08ea79", fontWeight: "bold" }}>
              {formatPrice(
                user.cart.reduce(
                  (acc, cur) =>
                    cur.checked
                      ? (acc +=
                          (cur.id_combo?.price || cur.id_product.price) *
                          cur.quantity)
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
