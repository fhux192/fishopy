import { useDispatch, useSelector } from "react-redux";
import { toggleDrawerCart } from "../../redux/features/toggle/toggleSlice";
import { Button, Drawer, Image } from "antd";
import styles from "./CartDrawer.module.css";
import { CloseCircleOutlined } from "@ant-design/icons";
import { removeCartLocal } from "../../redux/features/user/userSlice";
import { Link } from "react-router-dom";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { isShowDawerCart } = useSelector((state) => state.toggle);
  const cart = useSelector((state) => state.user.account.cart);

  return (
    <Drawer onClose={() => dispatch(toggleDrawerCart())} open={isShowDawerCart}>
      {cart?.map((item) => (
        <div key={item.id} className={styles.cartItem}>
          <div className={styles.cartItemLeft}>
            <Image width={100} src={item.proImg} />
            <div>
              <p>{item.title}</p>
              <div className="flex justify-between">
                {item.quantity} x {item.price}
              </div>
            </div>
          </div>
          <CloseCircleOutlined onClick={() => dispatch(removeCartLocal(item.id))} />
        </div>
      ))}

      {cart.length > 0 ? (
        <Link to={"/order"}>
          <Button
            type="primary"
            style={{
              width: "100%",
              backgroundColor: "#000000",
            }}
          >
            Xem giỏ hàng
          </Button>
        </Link>
      ) : (
        <div className="text-center">
          <p>Giỏ hàng trống</p>
        </div>
      )}
    </Drawer>
  );
};
export default CartDrawer;
