import { Checkbox, message } from "antd";
import styles from "./CheckoutOrder.module.css";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "@utils/function";
import MyButton from "@components/Common/MyButton/MyButton";
import { updateAccount } from "@redux/features/user/userSlice";

const CheckoutOrder = ({ setCurrentStep }) => {
  const { user } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const getCheckedItemsCount = (cart) => {
    return cart
      .filter((item) => item.checked)
      .reduce((acc, cur) => acc + cur.quantity, 0);
  };
  const checkedItemsCount = getCheckedItemsCount(user.cart);

  const handleCheckAll = () => {
    const updatedCart = user.cart.map((item) => ({
      ...item,
      checked: !item.checked,
    }));
    dispatch(updateAccount({ cart: updatedCart }));
  };

  return (
    <>
      {user.cart?.length > 0 && (
        <div className={styles.checkoutOrderContainer}>
          <div className={styles.checkoutOrderCard}>
            <Checkbox
              checked={user.cart.every((item) => item.checked)}
              onClick={handleCheckAll}
              style={{ color: "white", fontWeight: "bold" }}
            >
              {user?.cart?.every((item) => item.checked) ? (
                <>Bỏ chọn tất cả sản phẩm</>
              ) : (
                <>Chọn tất cả sản phẩm</>
              )}
            </Checkbox>
            <div className={styles.summaryGroup}>
              <div className={styles.summaryInfo}>
                <p style={{ color: "#08ea79", fontWeight: "bold" }}>
                  <strong>Tạm tính: </strong>
                  {formatPrice(
                    user.cart
                      .reduce((acc, cur) => {
                        if (cur.checked) {
                          return acc + cur.id_product.price * cur.quantity;
                        }
                        return acc;
                      }, 0)
                      .toString()
                  )}
                  đ
                </p>
                <span style={{ color: "#bdc3c7" }}>
                  {checkedItemsCount !== 0 && (
                    <p>({checkedItemsCount} sản phẩm)</p>
                  )}
                </span>
              </div>
            </div>
            <MyButton
              text="Mua hàng"
              onClick={() => {
                if (user.cart.every((item) => !item.checked)) {
                  return message.error("Vui lòng chọn sản phẩm để mua");
                }
                setCurrentStep((prevStep) => prevStep + 1);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutOrder;
