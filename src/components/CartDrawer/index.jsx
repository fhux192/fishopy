import { useDispatch, useSelector } from "react-redux";
import { Button, Drawer, Image, InputNumber, message } from "antd";
import { toggleDrawerCart } from "../../redux/features/toggle/toggleSlice";
import { CloseCircleOutlined, MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { callRemoveCartItem } from "../../services/api";
import { setLoading, updateAccount } from "../../redux/features/user/userSlice";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { isShowDawerCart } = useSelector((state) => state.toggle);
  const user = useSelector((state) => state.account.user);

  const handleViewCart = () => {
    dispatch(toggleDrawerCart());
  };

  const handleRemoveCartItem = async (id) => {
    try {
      const res = await callRemoveCartItem(id);
      if (res.vcode == 0) {
        message.success(res.message);
        dispatch(updateAccount({ cart: user.cart.filter((item) => item._id !== id) }));
      } else {
        console.error("error", res.message);
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  return (
    <Drawer onClose={() => dispatch(toggleDrawerCart())} open={isShowDawerCart}>
      <div className="w-full h-10 mx-auto py-4">
        <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 100px)" }}>
          {user?.cart &&
            user?.cart.map((item) => (
              <div key={item._id} className="flex items-center py-4 border-b border-gray-200">
                <Image
                  width={100}
                  src={import.meta.env.VITE_BASE_URL + "/images/fish/" + item.product.images[0]}
                  className="mr-4"
                />
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-xl">{item.product.title}</p>
                  </div>
                  <p className="text-teal-700 text-lg">{item?.price?.toLocaleString()}</p>
                  <div className="flex items-center mt-2">
                    {/* <Button
                      type="link"
                      icon={<MinusCircleOutlined className="text-2xl" />}
                      onClick={() =>
                        handleQuantityChange(item.product.id, item.product.quantity - 1)
                      }
                      className="p-0 flex items-center justify-center w-10 h-10"
                    /> */}
                    {/* <InputNumber
                      min={1}
                      value={}
                      onChange={(value) => handleQuantityChange(item.product.id, value)}
                      className="mx-2 w-16"
                    /> */}
                    {/* <Button
                      type="link"
                      icon={<PlusCircleOutlined className="text-2xl" />}
                      onClick={() =>
                        handleQuantityChange(item.product.id, item.product.quantity + 1)
                      }
                      className="p-0 flex items-center justify-center w-10 h-10"
                    /> */}
                    <p>Số lượng: {item.quantity}</p>
                  </div>
                </div>
                <CloseCircleOutlined
                  onClick={() => handleRemoveCartItem(item._id)}
                  className="text-red-500 cursor-pointer text-3xl"
                />
              </div>
            ))}
        </div>

        {user?.cart?.length > 0 ? (
          <div className="flex space-x-2 mt-4">
            <Link to={"/order"} className="w-full">
              <Button
                type="default"
                className="w-full rounded-md bg-gray-200 text-black h-12 text-lg"
                onClick={handleViewCart}
              >
                XEM GIỎ HÀNG
              </Button>
            </Link>
          </div>
        ) : (
          <div className="text-center text-xl mt-4">
            <p>Giỏ hàng trống</p>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default CartDrawer;
