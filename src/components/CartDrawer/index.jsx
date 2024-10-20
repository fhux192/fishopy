import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Drawer,
  Image,
  InputNumber,
  message,
  Row,
  Col,
  Typography,
  Space,
  Spin,
} from "antd";
import { CloseCircleOutlined, MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { toggleDrawerCart } from "../../redux/features/toggle/toggleSlice";
import { callRemoveCartItem, callUpdateCartItem } from "../../services/api";
import { updateAccount, updateCartLocal } from "../../redux/features/user/userSlice";
import { toast } from "react-toastify";

const { Text } = Typography;

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { isShowDawerCart } = useSelector((state) => state.toggle);
  const {user, cart} = useSelector((state) => state.account);
  const [drawerWidth, setDrawerWidth] = useState(400);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDrawerWidth("100%");
      } else {
        setDrawerWidth(400);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleViewCart = () => {
    dispatch(toggleDrawerCart());
  };

  const handleRemoveCartItem = async (id) => {
    if(user) {
      try {
        setLoading(true);
        const res = await callRemoveCartItem(id);
        if (res.vcode === 0) {
          message.success(res.message);
          dispatch(updateAccount({ cart: user.cart.filter((item) => item._id !== id) }));
        } else {
          message.error(res.message);
        }
      } catch (error) {
        message.error("Failed to remove item from cart.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.success('Xóa sản phẩm khỏi giỏ hàng thành công!');
      const updatedCart = cart.filter((item) => item.product._id !== id);
      dispatch(updateCartLocal(updatedCart));
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const handleQuantityChange = async (id, value) => {
    if (value < 1) return;
    try {
      setLoading(true);
      const res = await callUpdateCartItem(id, {
        quantity: value,
      });
      if (res.vcode === 0) {
        const updatedCart = user.cart.map((item) =>
          item._id === id ? { ...item, quantity: value } : item
        );
        dispatch(updateAccount({ cart: updatedCart }));
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChangeLocal = (id, value) => {
    if (value < 1) return;
    const updatedCart = cart.map((item) =>
      item.product._id === id ? { ...item, quantity: value } : item
    );
    dispatch(updateCartLocal(updatedCart));
  }

  return (
    <Drawer
      title={<span style={{ color: "#707070", fontSize: "18px" }}>Giỏ hàng</span>}
      placement="right"
      onClose={() => dispatch(toggleDrawerCart())}
      open={isShowDawerCart}
      width={drawerWidth}
      styles={{
        body: {
          padding: 0,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          position: "relative",
        },
      }}
      // Ensure the Drawer takes the full height on mobile
      height={drawerWidth === "100%" ? "100vh" : undefined}
      // Optional: Adjust other styles if needed
    >
      { user?.cart?.length > 0 ? (
        <>
          <div
            className="overflow-y-auto"
            style={{
              flexGrow: 1,
              overflowY: "auto",
              padding: "20px",
              maxHeight: "calc(100vh - 120px)", // Ensures the cart content doesn't overflow beyond screen height
            }}
          >
            {user.cart.map((item, index) => (
              <div key={item._id} style={{ marginBottom: "20px" }}>
                <Row gutter={[32, 32]} align={"middle"}>
                  <Col xs={6}>
                    <Image
                      width={80}
                      style={{ borderRadius: "10px" }}
                      src={item.product.images[0]}
                      alt={item.product.name}
                    />
                  </Col>
                  <Col xs={14}>
                    <Space direction="vertical" size={""}>
                      <Text className="text-Grey" style={{ fontSize: "20px" }} strong>
                        {item.product.name}
                      </Text>
                      <Text
                        type="secondary"
                        style={{
                          color: "#2daab6",
                          fontSize: "17px",
                          fontWeight: "700",
                        }}
                      >
                        {item.product.discountedPrice
                          ? `${item.product.discountedPrice.toLocaleString()}₫`
                          : "Price not available"}
                      </Text>
                      <div className="quantity-control mt-2">
                        <Button
                          type="link"
                          icon={<MinusCircleOutlined />}
                          onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        />
                        <InputNumber
                          min={1}
                          value={item.quantity}
                          onChange={(value) => handleQuantityChange(item._id, value)}
                          style={{ width: "60px", textAlign: "center" }}
                        />
                        <Button
                          type="link"
                          icon={<PlusCircleOutlined />}
                          onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                        />
                      </div>
                    </Space>
                  </Col>
                  <Col xs={4} style={{ textAlign: "right" }}>
                    <CloseCircleOutlined
                      onClick={() => handleRemoveCartItem(item._id)}
                      style={{
                        color: "red",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                    />
                  </Col>
                </Row>

                {/* Add divider after each product, except the last one */}
                {index < user.cart.length - 1 && (
                  <div
                    style={{
                      borderBottom: "1px solid #f0f0f0",
                      marginTop: "20px",
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          <div
            className="cart-footer"
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px", // Padding around the button
              borderTop: "1px solid #f0f0f0",
              textAlign: "center",
              width: "100%",
            }}
          >
            <Link to="/order">
              <Button
                onClick={handleViewCart}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "auto",
                  borderRadius: "20px",
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "#2daab6",
                  borderColor: "#cfefeb",
                  padding: "20px 30px",
                }}
              >
                <p>Xem giỏ hàng</p>
              </Button>
            </Link>
          </div>
        </>
      ) : cart?.length > 0 ?  (
        <>
          <div
            className="overflow-y-auto"
            style={{
              flexGrow: 1,
              overflowY: "auto",
              padding: "20px",
              maxHeight: "calc(100vh - 120px)", // Ensures the cart content doesn't overflow beyond screen height
            }}
          >
            {cart.map((item, index) => (
              <div key={item.product._id} style={{ marginBottom: "20px" }}>
                <Row gutter={[32, 32]} align={"middle"}>
                  <Col xs={6}>
                    <Image
                      width={80}
                      style={{ borderRadius: "10px" }}
                      src={item.product.images[0]}
                      alt={item.product.name}
                    />
                  </Col>
                  <Col xs={14}>
                    <Space direction="vertical" size={""}>
                      <Text className="text-Grey" style={{ fontSize: "20px" }} strong>
                        {item.product.name}
                      </Text>
                      <Text
                        type="secondary"
                        style={{
                          color: "#2daab6",
                          fontSize: "17px",
                          fontWeight: "700",
                        }}
                      >
                        {item.product.discountedPrice
                          ? `${item.product.discountedPrice.toLocaleString()}₫`
                          : "Price not available"}
                      </Text>
                      <div className="quantity-control mt-2">
                        <Button
                          type="link"
                          icon={<MinusCircleOutlined />}
                          onClick={() => handleQuantityChangeLocal(item._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        />
                        <InputNumber
                          min={1}
                          value={item.quantity}
                          onChange={(value) => handleQuantityChangeLocal(item._id, value)}
                          style={{ width: "60px", textAlign: "center" }}
                        />
                        <Button
                          type="link"
                          icon={<PlusCircleOutlined />}
                          onClick={() => handleQuantityChangeLocal(item._id, item.quantity + 1)}
                        />
                      </div>
                    </Space>
                  </Col>
                  <Col xs={4} style={{ textAlign: "right" }}>
                    <CloseCircleOutlined
                      onClick={() => handleRemoveCartItem(item.product._id)}
                      style={{
                        color: "red",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                    />
                  </Col>
                </Row>

                {/* Add divider after each product, except the last one */}
                {index < cart.length - 1 && (
                  <div
                    style={{
                      borderBottom: "1px solid #f0f0f0",
                      marginTop: "20px",
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          <div
            className="cart-footer"
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px", // Padding around the button
              borderTop: "1px solid #f0f0f0",
              textAlign: "center",
              width: "100%",
            }}
          >
            <Link to="/order">
              <Button
                onClick={handleViewCart}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "auto",
                  borderRadius: "20px",
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "#2daab6",
                  borderColor: "#cfefeb",
                  padding: "20px 30px",
                }}
              >
                <p>Xem giỏ hàng</p>
              </Button>
            </Link>
          </div>
        </>
      )
      : <div style={{ textAlign: "center", paddingTop: "50px" }}>
      <Text type="secondary">Giỏ hàng trống</Text>
     </div>
    }

      

      {loading && (
        <div className="flex justify-center items-center absolute w-full h-full bg-overlay">
          <Spin />
        </div>
      )}
    </Drawer>
  );
};

export default CartDrawer;
