import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Drawer,
  Image,
  InputNumber,
  message,
  Typography,
  Space,
  Card,
} from "antd";
import { Link } from "react-router-dom";
import {
  CloseCircleOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { toggle } from "@redux/features/toggle/toggleSlice";
import { user_deleteCartItem, user_updateCartItem } from "@services/api";
import { updateAccount } from "@redux/features/user/userSlice";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const { Text } = Typography;

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { drawerCart } = useSelector((state) => state.toggle);
  const { user, isAuthenticated } = useSelector((state) => state.account);
  const [drawerWidth, setDrawerWidth] = useState(400);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDrawerWidth("100%");
      } else {
        setDrawerWidth(400);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (drawerCart) {
      setAnimationKey((prev) => prev + 1);
    }
  }, [drawerCart]);

  const handleDeleteCartItem = async (id) => {
    if (isAuthenticated) {
      try {
        const res = await user_deleteCartItem(id);
        if (res.vcode !== 0) {
          return message.error(res.msg);
        }
        message.success(res.msg);
        dispatch(
          updateAccount({ cart: user.cart.filter((item) => item._id !== id) })
        );
      } catch (error) {
        message.error(error);
      }
    } else {
      const updatedCart = user.cart.filter((item) => item._id !== id);
      dispatch(updateAccount({ cart: updatedCart }));
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Xóa sản phẩm khỏi giỏ hàng thành công!");
    }
  };

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
  };

  const calculateTotal = () => {
    return user.cart.reduce((total, item) => {
      const price = item.id_combo?.price || item.id_product?.price;
      return total + price * item.quantity;
    }, 0);
  };

  const getItemVariants = (index) => {
    const isEven = index % 2 === 0;
    return {
      initial: { opacity: 0, y: isEven ? 50 : -50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: isEven ? 50 : -50 },
    };
  };

  return (
    <Drawer
      title={
        <span style={{ color: "#707070", fontSize: "18px" }}>Giỏ hàng</span>
      }
      placement="right"
      onClose={() => dispatch(toggle("drawerCart"))}
      open={drawerCart}
      width={drawerWidth}
      styles={{
        body: {
          padding: 0,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          background: "#f7f7f7",
        },
      }}
    >
      <div style={{ flexGrow: 1, overflowY: "auto", padding: "20px" }}>
        <AnimatePresence>
          {user.cart.map((item, index) => (
            <motion.div
              key={item._id || item.product._id}
              variants={getItemVariants(index)}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 15,
                duration: 0.5,
                delay: index * 0.1,
              }}
              style={{ marginBottom: "20px" }}
            >
              <Card
                style={{
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
                  <div style={{ flex: "0 0 80px", marginRight: "16px" }}>
                    <Image
                      width={80}
                      height={80}
                      style={{ borderRadius: "8px", objectFit: "cover" }}
                      src={item.id_combo?.imgs[0] || item.id_product?.imgs[0]}
                      alt={item.id_combo?.name || item.id_product?.name}
                      preview={false}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Space
                      direction="horizontal"
                      size="small"
                      style={{
                        justifyContent: "space-between",
                        width: "100%",
                        marginBottom: "8px",
                      }}
                    >
                      <Text strong style={{ fontSize: "16px" }}>
                        {item.id_combo?.name || item.id_product?.name}
                      </Text>
                      <CloseCircleOutlined
                        onClick={() => handleDeleteCartItem(item._id)}
                        style={{
                          color: "red",
                          fontSize: "18px",
                          cursor: "pointer",
                          transition: "color 0.3s",
                        }}
                        onMouseOver={(e) => (e.target.style.color = "#ff4d4f")}
                        onMouseOut={(e) => (e.target.style.color = "red")}
                      />
                    </Space>
                    <Text
                      style={{
                        color: "#2daab6",
                        fontSize: "14px",
                        fontWeight: "bold",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      {(item.id_combo?.price || item.id_product?.price).toLocaleString()}đ
                    </Text>
                    <Space>
                      <Button
                        type="link"
                        icon={<MinusCircleOutlined />}
                        disabled={item.quantity <= 1}
                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                        style={{ padding: 0 }}
                      />
                      <InputNumber
                        min={1}
                        value={item.quantity}
                        style={{ width: "50px", textAlign: "center" }}
                        onChange={(value) => handleQuantityChange(item._id, value)}
                      />
                      <Button
                        type="link"
                        icon={<PlusCircleOutlined />}
                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                        style={{ padding: 0 }}
                      />
                    </Space>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div
        style={{
          background: "#fff",
          borderTop: "2px solid #e8e8e8",
          padding: "20px",
          boxShadow: "0 -2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <Space
          direction="horizontal"
          size="large"
          style={{ justifyContent: "space-between", width: "100%" }}
        >
          <Text strong style={{color: "#707070", fontSize: "16px" }}>
            Tổng cộng: {calculateTotal().toLocaleString()}đ
          </Text>
          <Link to="/order">
            <Button
              onClick={() => dispatch(toggle("drawerCart"))}
              style={{
                borderRadius: "10px",
                border: "2px solid #cfefeb",
                fontWeight: "600",
                fontSize: "16px",
                backgroundColor: "#fff",
                color: "#2daab6",
                padding: "10px 20px",
                height: "auto",
              }}
              hoverStyle={{
                backgroundColor: "#cfefeb",
                color: "#2daab6",
              }}
            >
              Xem giỏ hàng
            </Button>
          </Link>
        </Space>
      </div>
    </Drawer>
  );
};

export default CartDrawer;