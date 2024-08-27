import { Button, Checkbox } from "antd";
import styles from "./CheckoutOrder.module.css";
import { useDispatch, useSelector } from "react-redux";
import { checkAllProduct } from "../../redux/features/user/userSlice";
import formatPrice from "../../utils/formatPrice";
import MyButton from "../MyButton/MyButton";
const CheckoutOrder = ({ setCurrentStep }) => {
  const { user } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  return (
    <>
      {user && user.cart.length > 0 && (
        <div className={styles.checkOutOrder}>
          <div className={styles.checkOutOrderCard}>
            <Checkbox
              checked={user.cart.every((item) => item.checked)}
              onClick={() => dispatch(checkAllProduct())}
            >
              {user && user.cart?.every((item) => item.checked) ? (
                <>Bỏ chọn tất cả sản phẩm</>
              ) : (
                <>Chọn tất cả sản phẩm</>
              )}
            </Checkbox>
            <div className={styles.groupSum}>
              <div className={styles.groupInfo}>
                <p>
                  <strong>Tạm tính: </strong>
                  {formatPrice(
                    user.cart
                      ?.reduce((acc, cur) => {
                        if (cur.checked) {
                          return acc + cur.product.discountedPrice * cur.quantity;
                        }
                        return acc;
                      }, 0)
                      .toString()
                  )}
                  đ
                </p>

                {user.cart
                  .filter((item) => item.checked)
                  .reduce((acc, cur) => (acc += cur.quantity), 0) != 0 && (
                  <small>
                    (
                    {user.cart
                      .filter((item) => item.checked)
                      .reduce((acc, cur) => (acc += cur.quantity), 0)}
                    sản phẩm)
                  </small>
                )}
              </div>
              <MyButton
                text="Mua hàng"
                disabled={!user?.cart?.some((item) => item.checked)}
                className={styles.btnOrder}
                onClick={() => setCurrentStep((pre) => (pre += 1))}
              ></MyButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default CheckoutOrder;
