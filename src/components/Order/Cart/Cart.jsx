import {
  Card,
  Checkbox,
  Image,
  InputNumber,
  message,
  Popconfirm,
  Typography,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import formatPrice from "@utils/formatPrice";
import { user_deleteCartItem, user_updateCartItem } from "@services/api";
import { useDispatch, useSelector } from "react-redux";
import { updateAccount } from "@redux/features/user/userSlice";
import styles from "./Cart.module.css";

const Cart = () => {
  const { isAuthenticated, user } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  let total = 0;
  const handleQuantityChange = async (id, value) => {
    if (value < 1) return;
    if (isAuthenticated) {
      try {
        const res = await user_updateCartItem(id, { quantity: Number(value) });
        if (res.vcode !== 0) {
          return message.error(res.msg);
        }

        const updatedCart = user.cart.map((item) =>
          item._id === id ? { ...item, quantity: Number(value) } : item
        );
        dispatch(updateAccount({ cart: updatedCart }));
      } catch (error) {
        console.error(error.message);
      }
    } else {
      const updatedCart = user.cart.map((item) =>
        item._id === id ? { ...item, quantity: Number(value) } : item
      );
      dispatch(updateAccount({ cart: updatedCart }));
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    calculateTotal();
  };
  const handleChooseProduct = (item) => {
    const updatedCart = user.cart.map((cartItem) =>
      cartItem._id === item._id
        ? { ...cartItem, checked: !cartItem.checked }
        : cartItem
    );
    dispatch(updateAccount({ cart: updatedCart }));
  };

  const handleDeleteCartItem = async (id) => {
    if (isAuthenticated) {
      try {
        const res = await user_deleteCartItem(id);
        if (res.vcode != 0) {
          return message.error(res.msg);
        }
        message.success(res.msg);
        dispatch(
          updateAccount({ cart: user.cart.filter((item) => item._id !== id) })
        );
      } catch (error) {
        message.error(error);
      } finally {
      }
    } else {
      const updatedCart = user.cart.filter((item) => item._id !== id);
      dispatch(updateAccount({ cart: updatedCart }));
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      message.success("Xóa sản phẩm khỏi giỏ hàng thành công!");
    }
  };
  const calculateTotal = () => {
    total = user.cart.reduce((acc, item) => {
      return (
        acc + item.id_combo?.price || item.id_product.price * item.quantity
      );
    }, 0);
  };

  return (
    <>
      {user.cart.map((item) => {
        return (
          <Card key={item._id} className={`${styles.cardCustom} p-4`}>
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
                      src={item.id_combo?.imgs[0] || item.id_product.imgs[0]}
                      preview={false}
                      alt={item.id_combo?.name || item.id_product.name}
                    />
                  </div>
                </div>
                <Typography.Text className={styles.productName}>
                  {item.id_combo?.name || item.id_product.name}
                </Typography.Text>
              </div>

              <div className={styles.col2}>
                <Typography.Text className={styles.priceText}>
                  Đơn giá:{" "}
                  {formatPrice(
                    item.id_combo?.price.toString() ||
                      item.id_product.price.toString()
                  )}
                  đ
                </Typography.Text>
                <InputNumber
                  className={styles.quantityInput}
                  min={1}
                  max={100}
                  value={item.quantity}
                  onBlur={(value) =>
                    handleQuantityChange(item._id, value.target.value)
                  }
                />
              </div>

              <div className={styles.col3}>
                <Typography.Text className={styles.totalText}>
                  Tổng:{" "}
                  {formatPrice(
                    item.quantity * item.id_combo?.price ||
                      item.id_product.price
                  )}
                  đ
                </Typography.Text>
                <Popconfirm
                  title="Bạn có chắc chắn muốn xóa sản phẩm này?"
                  onConfirm={() => handleDeleteCartItem(item._id)}
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
                  <button className={styles.deleteButton} type="button">
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
