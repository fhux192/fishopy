import { Button, Checkbox } from "antd";
import styles from "./CheckoutOrder.module.css";
import { useDispatch, useSelector } from "react-redux";
import { checkAllProduct, checkAllProductLocal } from "../../redux/features/user/userSlice";
import formatPrice from "../../utils/formatPrice";
import MyButton from "../MyButton/MyButton";
const CheckoutOrder = ({ setCurrentStep }) => {
  const { user , cart} = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const getCheckedItemsCount = (cart) => {
    return cart.filter((item) => item.checked).reduce((acc, cur) => acc + cur.quantity, 0);
  };
  
  const checkedItemsCount = user ? getCheckedItemsCount(user.cart) : getCheckedItemsCount(cart);

  return (
    <>
      {(user?.cart?.length > 0 || cart?.length > 0) && (
        <div className={styles.checkOutOrder}>
          <div className={styles.checkOutOrderCard}>
            <Checkbox
              checked={ user ? user.cart.every((item) => item.checked) : cart.every((item) => item.checked)}
              onClick={() => dispatch(user ? checkAllProduct() : checkAllProductLocal())}
              style={{color: 'white'}}
            >
              {user?.cart?.every((item) => item.checked) || cart?.every((item) => item.checked) ? (
                <>Bỏ chọn tất cả sản phẩm</>
              ) : (
                <>Chọn tất cả sản phẩm</>
              )}
            </Checkbox>
            <div className={styles.groupSum}>
              <div className={styles.groupInfo}>
                <p style={{color: 'white'}}>
                  <strong>Tạm tính: </strong>
                  {formatPrice(
                    user ?
                    user?.cart
                      ?.reduce((acc, cur) => {
                        if (cur.checked) {
                          return acc + cur.product.discountedPrice * cur.quantity;
                        }
                        return acc;
                      }, 0)
                      .toString() : cart
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

               <span style={{color: 'white'}}>
               {checkedItemsCount !== 0 && (
                  <small>
                    ({checkedItemsCount} sản phẩm)
                  </small>
                )}
               </span>
              </div>
              <MyButton
                text="Mua hàng"
                disabled={user ? !user?.cart?.some((item) => item.checked) :  !cart?.some((item) => item.checked)}
                className="bg-Teal"
                onClick={() => {
                  setCurrentStep((pre) => (pre += 1))
                  
                }}
              ></MyButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default CheckoutOrder;
