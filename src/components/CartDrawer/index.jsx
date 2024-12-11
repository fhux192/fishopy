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
  Card,
} from "antd";
import {
  CloseCircleOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { toggleDrawerCart } from "../../redux/features/toggle/toggleSlice";
import { callRemoveCartItem, callUpdateCartItem } from "../../services/api";
import {
  updateAccount,
  updateCartLocal,
} from "../../redux/features/user/userSlice";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const { Text } = Typography;

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { isShowDawerCart } = useSelector((state) => state.toggle);
  const { user, cart } = useSelector((state) => state.account);
  const [drawerWidth, setDrawerWidth] = useState(400);
  const [loading, setLoading] = useState(false);
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
    if (isShowDawerCart) {
      setAnimationKey((prev) => prev + 1);
    }
  }, [isShowDawerCart]);

  const handleViewCart = () => {
    dispatch(toggleDrawerCart());
  };

  const handleRemoveCartItem = async (id) => {
    if (user) {
      try {
        setLoading(true);
        const res = await callRemoveCartItem(id);
        if (res.vcode === 0) {
          message.success(res.msg);
          dispatch(
            updateAccount({ cart: user.cart.filter((item) => item._id !== id) })
          );
        } else {
          message.error(res.msg);
        }
      } catch (error) {
        message.error("Failed to remove item from cart.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.success("Xóa sản phẩm khỏi giỏ hàng thành công!");
      const updatedCart = cart.filter((item) => item.product._id !== id);
      dispatch(updateCartLocal(updatedCart));
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const handleQuantityChange = async (id, value) => {
    if (value < 1) return;
    try {
      setLoading(true);
      const res = await callUpdateCartItem(id, { quantity: value });
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
  };

  const getItemVariants = (index) => {
    const isEven = index % 2 === 0;
    return {
      initial: { opacity: 0, y: isEven ? 100 : 0, x: isEven ? 0 : 100 },
      animate: { opacity: 1, y: 0, x: 0 },
      exit: { opacity: 0, y: isEven ? 100 : 0, x: isEven ? 0 : 100 },
    };
  };

  const renderItemCard = (
    item,
    index,
    handleQuantity,
    handleRemove,
    isUser
  ) => {
    const variants = getItemVariants(index);
    return (
      <motion.div
        key={item._id || item.product._id}
        variants={variants}
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
          bodyStyle={{ padding: "10px" }}
          style={{
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Row gutter={[16, 16]} align="middle">
            <Col xs={8}>
              <Image
                width={80}
                style={{ borderRadius: "8px" }}
                src={item.product.images[0]}
                alt={item.product.name}
                preview={false}
              />
            </Col>
            <Col xs={16}>
              <Space
                direction="horizontal"
                size="small"
                style={{ justifyContent: "space-between", width: "100%" }}
                align="center"
              >
                <Text strong style={{ fontSize: "16px", fontWeight: "bold" }}>
                  {item.product.name}
                </Text>
                <CloseCircleOutlined
                  onClick={() =>
                    handleRemove(isUser ? item._id : item.product._id)
                  }
                  style={{
                    color: "red",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                />
              </Space>
              <Space
                direction="horizontal"
                size="small"
                style={{ marginTop: "4px" }}
              >
                <Text
                  style={{
                    color: "#2daab6",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  {item.product.discountedPrice
                    ? `${item.product.discountedPrice.toLocaleString()}₫`
                    : "N/A"}
                </Text>
              </Space>

              <Space style={{ marginTop: "8px" }}>
                <Button
                  style={{ marginLeft: "12px" }}
                  type="link"
                  icon={<MinusCircleOutlined />}
                  onClick={() =>
                    handleQuantity(
                      isUser ? item._id : item.product._id,
                      (isUser ? item.quantity : item.quantity) - 1
                    )
                  }
                  disabled={(isUser ? item.quantity : item.quantity) <= 1}
                />
                <InputNumber
                  min={1}
                  value={isUser ? item.quantity : item.quantity}
                  onChange={(value) =>
                    handleQuantity(isUser ? item._id : item.product._id, value)
                  }
                  style={{
                    width: "50px",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                />
                <Button
                  type="link"
                  icon={<PlusCircleOutlined />}
                  onClick={() =>
                    handleQuantity(
                      isUser ? item._id : item.product._id,
                      (isUser ? item.quantity : item.quantity) + 1
                    )
                  }
                />
              </Space>
            </Col>
          </Row>
        </Card>
      </motion.div>
    );
  };

  const renderList = (list, isUser) => (
    <div
      className="overflow-y-auto"
      style={{
        flexGrow: 1,
        overflowY: "auto",
        padding: "20px",
        maxHeight: "calc(100vh - 120px)",
      }}
    >
      <AnimatePresence key={animationKey} initial={true}>
        {list.map((item, index) => (
          <React.Fragment key={item._id || item.product._id}>
            {renderItemCard(
              item,
              index,
              isUser ? handleQuantityChange : handleQuantityChangeLocal,
              handleRemoveCartItem,
              isUser
            )}
          </React.Fragment>
        ))}
      </AnimatePresence>
    </div>
  );

  return (
    <Drawer
      title={
        <span style={{ color: "#707070", fontSize: "18px" }}>Giỏ hàng</span>
      }
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
          background: "#f7f7f7",
        },
      }}
    ></Drawer>
  );
};

export default CartDrawer;
