import { Card, Checkbox, Image, InputNumber, message, Popconfirm, Typography } from "antd";
import styles from "./Cart.module.css";
import { DeleteOutlined } from "@ant-design/icons";
import formatPrice from "../../utils/formatPrice";
import { callRemoveCartItem, callUpdateCartItem } from "../../services/api";
import { useDispatch } from "react-redux";
import { chooseProduct, updateAccount } from "../../redux/features/user/userSlice";

const Cart = ({ cart }) => {
  const dispatch = useDispatch();
  const onChange = async (e, item) => {
    try {
      const res = await callUpdateCartItem(item._id, {
        quantity: Number(e.target.value),
      });
      if (res.vcode == 0) {
        const newCart = cart.map((cartItem) => {
          if (cartItem._id === item._id) {
            return { ...cartItem, quantity: Number(e.target.value) };
          }
          return cartItem;
        });
        dispatch(updateAccount({ cart: newCart }));
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChooseProduct = (item) => {
    dispatch(chooseProduct({ _id: item._id }));
  };

  const onDeleteItem = async (id) => {
    try {
      const res = await callRemoveCartItem(id);

      if (res.vcode == 0) {
        message.success(res.message);
        const newCart = cart.filter((item) => item._id !== id);
        dispatch(updateAccount({ cart: newCart }));
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      {cart &&
        cart.map((item) => {
          return (
            <Card key={item._id} span={24} style={{ marginBottom: "10px" }}>
              <div className={styles.cardContainer}>
                <div className={styles.groupImage}>
                  <Checkbox
                    checked={item.checked}
                    className={styles.checkBox}
                    onClick={() => handleChooseProduct(item)}
                  />
                  <div className="rounded-xl h-14 mr-4 overflow-hidden">
                    <Image className={`${styles.imageProduct}`} src={item.product.images[0]} />
                  </div>

                  <Typography.Text
                    style={{ color: "#707070", fontWeight: "bold", fontSize: "16px" }}
                    className={styles.title}
                  >
                    {item.product.name}
                  </Typography.Text>
                </div>
                <div className={styles.groupSum}>
                  <Typography.Text
                    style={{ color: "#707070", fontWeight: "bold", fontSize: "16px" }}
                    className={styles.title2}
                  >
                    {item.product.name}
                  </Typography.Text>
                  <Typography.Text
                    style={{ color: "#2daab6", fontWeight: "600", fontSize: "16px" }}
                  >
                    {formatPrice(item.product.discountedPrice.toString())}đ{" "}
                  </Typography.Text>
                  <InputNumber
                    className={styles.quantityInput}
                    min={1}
                    max={10}
                    defaultValue={item.quantity}
                    onBlur={(value) => onChange(value, item)}
                  />
                </div>
                <Typography.Text
                  style={{ fontWeight: "bold", fontSize: "16px" }}
                  className={styles.sumProduct}
                >
                  Tổng : {formatPrice((item.quantity * item.product.discountedPrice).toString())}đ
                </Typography.Text>

                <DeleteOutlined onClick={onDeleteItem} className={styles.deleteIcon} />
              </div>
            </Card>
          );
        })}
    </>
  );
};
export default Cart;
