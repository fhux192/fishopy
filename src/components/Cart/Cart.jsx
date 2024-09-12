import { Card, Checkbox, Image, InputNumber, message, Typography } from "antd";
import styles from "./Cart.module.css";
import { DeleteOutlined } from "@ant-design/icons";
import formatPrice from "../../utils/formatPrice";
import { callUpdateCartItem } from "../../services/api";
import { useDispatch } from "react-redux";
import {
  chooseProduct,
  updateAccount,
} from "../../redux/features/user/userSlice";

const Cart = ({ cart }) => {
  const dispatch = useDispatch();
  const onChange = async (e, item) => {
    try {
      const res = await callUpdateCartItem(item._id, {
        quantity: Number(e.target.value),
      });
      if (res.vcode == 0) {
        dispatch(updateAccount({ cart: res.data }));
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChooseProduct = (item) => {
    dispatch(chooseProduct({ _id: item._id }));
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
                    <Image
                      className={`${styles.imageProduct}`}
                      src={
                        import.meta.env.VITE_BASE_URL +
                        "/images/fish/" +
                        item.product.images[0]
                      }
                    />
                  </div>

                  <Typography.Text className={styles.title}>
                    {item.product.name}
                  </Typography.Text>
                </div>
                <div className={styles.groupSum}>
                  <Typography.Text className={styles.title2}>
                    {item.product.name}
                  </Typography.Text>
                  <Typography.Text>
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
                <Typography.Text className={styles.sumProduct}>
                  Tổng :{" "}
                  {formatPrice((item.quantity * item.product.price).toString())}
                  đ
                </Typography.Text>
                <DeleteOutlined className={styles.deleteIcon} />
              </div>
            </Card>
          );
        })}
    </>
  );
};
export default Cart;
