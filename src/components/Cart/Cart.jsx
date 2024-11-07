import { Button, Card, Checkbox, Image, InputNumber, message, Popconfirm, Typography } from "antd";
import styles from "./Cart.module.css";
import { DeleteOutlined } from "@ant-design/icons";
import formatPrice from "../../utils/formatPrice";
import { callRemoveCartItem, callUpdateCartItem } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { chooseProduct, chooseProductLocal, updateAccount, updateCartLocal } from "../../redux/features/user/userSlice";

const Cart = ({ cart }) => {
  const {isAuthenticated, cart:cartLocal} = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const onChange = async (e, item) => {
    if(isAuthenticated) {
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
    } else {
      const newCart = cartLocal.map((cartItem) => {
        if (cartItem._id === item._id) {
          return { ...cartItem, quantity: Number(e.target.value) };
        }
        return cartItem;
      });
      dispatch(updateCartLocal(newCart));
    }
  };

  const handleChooseProduct = (item) => {
    dispatch(isAuthenticated ? chooseProduct({ _id: item._id }) : chooseProductLocal({ _id: item.product._id }));
  };

  const onDeleteItem = async (item) => {
    if(isAuthenticated) {
      try {
        const res = await callRemoveCartItem(item._id);
        if (res.vcode == 0) {
          message.success(res.message);
          const newCart = cart.filter((prod) => prod._id !== item._id);
          dispatch(updateAccount({ cart: newCart }));
        }
      } catch (error) {
        console.error(error.message);
      }
    } else {
      const newCart = cartLocal.filter((prod) => prod._id !== item._id);
      dispatch(updateCartLocal(newCart));
    }
  };

  return (
    <>
      {cart &&
        cart.map((item) => {
          return (
            <Card className="mx-2" key={item._id} span={24} style={{ marginBottom: "10px", backgroundColor:"rgba(30, 30, 30, 1)",border:"2px solid rgba(255, 255, 255, 0.1)" }}>
              <div className={styles.cardContainer}>
                <div className={styles.groupImage}>
                  <Checkbox
                    checked={item.checked}
                    className={styles.checkBox}
                    onClick={() => handleChooseProduct(item)}
                  />
                  <div className="rounded-lg h-16 mr-4 overflow-hidden">
                    <Image className={`${styles.imageProduct}`} src={item.product.images[0]} />
                  </div>

                  <Typography.Text
                    style={{ color: "#fff", fontWeight: "bold", fontSize: "16px" }}
                    className={styles.title}
                  >
                    {item.product.name}
                  </Typography.Text>
                </div>
                <div className={styles.groupSum}>
                  <Typography.Text
                    style={{ color: "#fff", fontWeight: "bold", fontSize: "16px" }}
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
                    className="w-14 font-semibold"
                    min={1}
                    max={100}
                    defaultValue={item.quantity}
                    onBlur={(value) => onChange(value, item)}
                  />
                </div>
                <Typography.Text
                  style={{ fontWeight: "bold", fontSize: "16px", color: 'white' }}
                  className={styles.sumProduct}
                >
                  Tổng : {formatPrice((item.quantity * item.product.discountedPrice).toString())}đ
                </Typography.Text>

                <Popconfirm
                  title="Bạn có chắc chắn muốn xóa sản phẩm này?"
                  onConfirm={()  => onDeleteItem(item)}
                  okText="Có"
                  cancelText="Không"
                >
                  <DeleteOutlined  className={styles.deleteIcon} style={{color: 'red'}} />
                </Popconfirm>
                
              </div>
            </Card>
          );
        })}
    </>
  );
};
export default Cart;
