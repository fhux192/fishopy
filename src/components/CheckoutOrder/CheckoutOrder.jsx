import { Button, Checkbox } from "antd";
import styles from "./CheckoutOrder.module.css";
import { useDispatch, useSelector } from "react-redux";
import { checkAllProduct, checkAllProductLocal } from "../../redux/features/user/userSlice";
import formatPrice from "../../utils/formatPrice";
import MyButton from "../MyButton/MyButton";

const CheckoutOrder = ({ setCurrentStep }) => {
  const { user, cart } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const getCheckedItemsCount = (cart) => {
    return cart.filter((item) => item.checked).reduce((acc, cur) => acc + cur.quantity, 0);
  };

  const checkedItemsCount = user ? getCheckedItemsCount(user.cart) : getCheckedItemsCount(cart);

  return (
    <>
      {(user?.cart?.length > 0 || cart?.length > 0) && (
        <div className={styles.checkoutOrderContainer}>
          <div className={styles.checkoutOrderCard}>
            <Checkbox
              checked={user ? user.cart.every((item) => item.checked) : cart.every((item) => item.checked)}
              onClick={() => dispatch(user ? checkAllProduct() : checkAllProductLocal())}
              style={{ color: 'white',fontWeight:"bold" }}
            >
              {user?.cart?.every((item) => item.checked) || cart?.every((item) => item.checked) ? (
                <>Bỏ chọn tất cả sản phẩm</>
              ) : (
                <>Chọn tất cả sản phẩm</>
              )}
            </Checkbox>
            <div className={styles.summaryGroup}>
              <div className={styles.summaryInfo}>
                <p style={{ color: '#08ea79',fontWeight:"bold" }}>
                  <strong>Tạm tính: </strong>
                  {formatPrice(
                    user
                      ? user.cart.reduce((acc, cur) => {
                          if (cur.checked) {
                            return acc + cur.product.discountedPrice * cur.quantity;
                          }
                          return acc;
                        }, 0).toString()
                      : cart.reduce((acc, cur) => {
                          if (cur.checked) {
                            return acc + cur.product.discountedPrice * cur.quantity;
                          }
                          return acc;
                        }, 0).toString()
                  )}
                  đ
                </p>
                <span style={{ color: '#bdc3c7' }}>
                  {checkedItemsCount !== 0 && (
                    <p>
                      ({checkedItemsCount} sản phẩm)
                    </p>
                  )}
                </span>
              </div>
              
            </div>
            <MyButton
                text="Mua hàng"
                disabled={user ? !user?.cart?.some((item) => item.checked) : !cart?.some((item) => item.checked)}
                onClick={() => {
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
