import {
  Button,
  Card,
  Checkbox,
  Image,
  InputNumber,
  message,
  Popconfirm,
  Typography,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import formatPrice from "../../utils/formatPrice";
import { callRemoveCartItem, callUpdateCartItem } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import {
  chooseProduct,
  chooseProductLocal,
  updateAccount,
  updateCartLocal,
} from "../../redux/features/user/userSlice";
import styles from "./Cart.module.css";

const Cart = ({ cart }) => {
  const { isAuthenticated, cartLocal } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const onChangeQuantity = (value, item) => {
    if (value == null) return; // value null khi người dùng xóa hết số
    const quantityValue = Number(value);

    if (isAuthenticated) {
      const newCart = cart.map((cartItem) => {
        if (cartItem._id === item._id) {
          return { ...cartItem, quantity: quantityValue };
        }
        return cartItem;
      });
      dispatch(updateAccount({ cart: newCart }));

      callUpdateCartItem(item._id, { quantity: quantityValue })
        .then((res) => {
          if (res.vcode !== 0) {
            message.error(res.message || "Failed to update quantity");
          }
        })
        .catch((error) => {
          console.error(error.message);
          message.error("Error updating quantity");
        });
    } else {
      if (!cartLocal) {
        console.error("cartLocal is not defined or not from Redux state");
        return;
      }
      const updatedCart = cartLocal.map((cartItem) => {
        if (cartItem._id === item._id) {
          return { ...cartItem, quantity: quantityValue };
        }
        return cartItem;
      });
      dispatch(updateCartLocal(updatedCart));
      message.success("Quantity updated.");
    }
  };

  const handleChooseProduct = (item) => {
    dispatch(
      isAuthenticated
        ? chooseProduct({ _id: item._id })
        : chooseProductLocal({ _id: item.product._id })
    );
  };

  const onDeleteItem = async (item) => {
    if (isAuthenticated) {
      try {
        const res = await callRemoveCartItem(item._id);
        if (res.vcode === 0) {
          message.success(res.message);
          const newCart = cart.filter((prod) => prod._id !== item._id);
          dispatch(updateAccount({ cart: newCart }));
        } else {
          message.error(res.message || "Failed to remove item");
        }
      } catch (error) {
        console.error("Error removing item:", error.message);
        message.error("An error occurred while removing the item.");
      }
    } else {
      if (!cartLocal) {
        console.error("cartLocal is not defined or not from Redux state");
        return;
      }
      const newCart = cartLocal.filter((prod) => prod._id !== item._id);
      dispatch(updateCartLocal(newCart));
      message.success("Xóa sản phẩm thành công.");
    }
  };

  return (
    <>
      {cart &&
        cart.map((item) => {
          const total = item.quantity * item.product.discountedPrice;
          return (
            <Card
              key={item._id}
              className={`${styles.cardCustom} p-4`}
              bodyStyle={{ padding: "10px" }}
            >
              <div className={styles.cardContainer}>
                <div className={styles.col1}>
                  <div className={styles.leftRow}>
                    <Checkbox
                      checked={item.checked}
                      className={styles.checkBox}
                      onClick={() => handleChooseProduct(item)}
                    />
                    <div className={styles.imageWrapper}>
                      <Image
                        className={styles.imageProduct}
                        src={item.product.images[0]}
                        preview={false}
                        alt={item.product.name}
                      />
                    </div>
                  </div>
                  <Typography.Text className={styles.productName}>
                    {item.product.name}
                  </Typography.Text>
                </div>

                <div className={styles.col2}>
                  <Typography.Text className={styles.priceText}>
                    Đơn giá: {formatPrice(item.product.discountedPrice.toString())}đ
                  </Typography.Text>
                  <InputNumber
                    className={styles.quantityInput}
                    min={1}
                    max={100}
                    value={item.quantity} 
                    onChange={(value) => onChangeQuantity(value, item)}
                  />
                </div>

                <div className={styles.col3}>
                  <Typography.Text className={styles.totalText}>
                    Tổng: {formatPrice(total.toString())}đ
                  </Typography.Text>
                  <Popconfirm
                    title="Bạn có chắc chắn muốn xóa sản phẩm này?"
                    onConfirm={() => onDeleteItem(item)}
                    okText="Có"
                    cancelText="Không"
                    okButtonProps={{
                      style: {
                        fontWeight: "500",
                        backgroundColor: "#ffb700",
                        borderColor: "#ffb700",
                        color: "#fff",
                      },
                    }}
                    cancelButtonProps={{
                      style: {
                        backgroundColor: "#f0f0f0",
                        borderColor: "#d9d9d9",
                        color: "#000",
                      },
                    }}
                  >
                    <button
                      className={styles.deleteButton}
                      type="button"
                    >
                      <DeleteOutlined className={styles.deleteIcon} />
                    </button>
                  </Popconfirm>
                </div>
              </div>
            </Card>
          );
        })}
    </>
  );
};

export default Cart;
