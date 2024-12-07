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
import styles from "./Cart.module.css";
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

const Cart = ({cart}) => {
  const { isAuthenticated } = useSelector((state) => state.account); 
  const dispatch = useDispatch();

  const onChange = async (e, item) => {
    if (isAuthenticated) {
      try {
        const res = await callUpdateCartItem(item._id, {
          quantity: Number(e.target.value),
        });
        if (res.vcode === 0) {
          const newCart = cart.map((cartItem) => {
            if (cartItem._id === item._id) {
              return { ...cartItem, quantity: Number(e.target.value) };
            }
            return cartItem;
          });
          dispatch(updateAccount({ cart: newCart }));
        } else {
          message.error(res.message || 'Failed to update quantity');
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
      message.success('Quantity updated.');
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
        console.log('API Response:', res); 
        if (res.vcode === 0) {
          message.success(res.message);
          const newCart = cart.filter((prod) => prod._id !== item._id);
          dispatch(updateAccount({ cart: newCart }));
        } else {
          message.error(res.message || 'Failed to remove item');
        }
      } catch (error) {
        console.error('Error removing item:', error.message);
        message.error('An error occurred while removing the item.');
      }
    } else {
      const newCart = cartLocal.filter((prod) => prod._id !== item._id);
      dispatch(updateCartLocal(newCart));
      message.success('Xóa sản phẩm thành công.');
    }
  };

  return (
    <>
      {cart &&
        cart.map((item) => {
          return (
            <Card
              key={item._id}
              span={24}
              className="mx-2 lg:px-2 p-0"
              style={{
                marginBottom: "20px",
                background:
                  "linear-gradient(70deg,#15919B, #09D1C7,  #46DFB1 47%, #0C6478)",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "18px",
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div className={styles.cardContainer}>
                <div className={styles.groupImage}>
                  <Checkbox
                    checked={item.checked}
                    className={styles.checkBox}
                    onClick={() => handleChooseProduct(item)}
                  />
                  <div className="rounded-lg mr-4 ">
                    <Image
                      className={`${styles.imageProduct}`}
                      src={item.product.images[0]}
                    />
                  </div>

                  <Typography.Text
                    style={{
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                    className={styles.title}
                  >
                    {item.product.name}
                  </Typography.Text>
                </div>
                <div className={styles.groupSum}>
                  <Typography.Text
                    style={{
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                    className={styles.title2}
                  >
                    {item.product.name}
                  </Typography.Text>
                  <Typography.Text
                    style={{
                      color: "#46DFB1",
                      fontWeight: "700",
                      fontSize: "14px",
                    }}
                  >
                    Đơn giá:{" "}
                    {formatPrice(item.product.discountedPrice.toString())}đ{" "}
                  </Typography.Text>
                  <InputNumber
                    className="w-12 mt-1 rounded-lg font-bold"
                    min={1}
                    max={100}
                    defaultValue={item.quantity}
                    onBlur={(value) => onChange(value, item)}
                  />
                </div>
                <Typography.Text
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "#08ea79",
                  }}
                  className={styles.sumProduct}
                >
                  Tổng :{" "}
                  {formatPrice(
                    (item.quantity * item.product.discountedPrice).toString()
                  )}
                  đ
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
                    className="flex justify-center bg-Black border-[1px] border-Grey3 w-full rounded-xl p-1"
                    type="button" 
                  >
                    <DeleteOutlined
                      className={styles.deleteIcon}
                      style={{ color: "red", fontSize: "18px" }}
                    />
                  </button>
                </Popconfirm>
              </div>
            </Card>
          );
        })}
    </>
  );
};

export default Cart;
