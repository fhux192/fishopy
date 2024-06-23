import { useDispatch, useSelector } from "react-redux";
import { toggleDrawerCart } from "../../redux/features/toggle/toggleSlice";
import { Button, Drawer, Image, InputNumber } from "antd";
import { CloseCircleOutlined, MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { removeCartLocal, updateCartQuantity } from "../../redux/features/user/userSlice";
import { Link } from "react-router-dom";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { isShowDawerCart } = useSelector((state) => state.toggle);
  const cart = useSelector((state) => state.user.account.cart);

  const handleQuantityChange = (id, value) => {
    if (value <= 0) {
      dispatch(removeCartLocal(id));
    } else {
      dispatch(updateCartQuantity({ id, quantity: value }));
    }
  };

  const handleViewCart = () => {
    dispatch(toggleDrawerCart());
  };

  return (
    <Drawer
      onClose={() => dispatch(toggleDrawerCart())}
      open={isShowDawerCart}
      width=""
      className=""
    >
      <div className="w-full h-10 mx-auto py-4">
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 100px)' }}>
          {cart?.map((item) => (
            <div key={item.id} className="flex items-center py-4 border-b border-gray-200">
              
              <Image width={100} src={item.proImg} className="mr-4" />
              <div className="flex-grow">
                
                <div className="flex justify-between items-start">
                  <p className="font-bold text-xl">{item.title}</p>
                  
                </div>
                <p className="text-teal-700 text-lg">{item.price.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <Button
                    type="link"
                    icon={<MinusCircleOutlined className="text-2xl" />}
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="p-0 flex items-center justify-center w-10 h-10"
                  />
                  <InputNumber
                    min={1}
                    value={item.quantity}
                    onChange={(value) => handleQuantityChange(item.id, value)}
                    className="mx-2 w-16"
                  />
                  <Button
                    type="link"
                    icon={<PlusCircleOutlined className="text-2xl" />}
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="p-0 flex items-center justify-center w-10 h-10"
                  />
                </div>
              </div>
              <CloseCircleOutlined
                    onClick={() => dispatch(removeCartLocal(item.id))}
                    className="text-red-500 cursor-pointer text-3xl"
                  />
            </div>
          ))}
        </div>

        {cart.length > 0 ? (
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
