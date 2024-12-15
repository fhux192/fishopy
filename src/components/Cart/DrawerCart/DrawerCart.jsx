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
  Card,
} from "antd";
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
import MyButton from "@components/Common/MyButton/MyButton";

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
        if (res.vcode != 0) {
          return message.error(res.msg);
        }
        message.success(res.msg);
        dispatch(
          updateAccount({ cart: user.cart.filter((item) => item._id !== id) })
        );
      } catch (error) {
        message.error(error);
      } finally {
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

  const getItemVariants = (index) => {
    const isEven = index % 2 === 0;
    return {
      initial: { opacity: 0, y: isEven ? 100 : 0, x: isEven ? 0 : 100 },
      animate: { opacity: 1, y: 0, x: 0 },
      exit: { opacity: 0, y: isEven ? 100 : 0, x: isEven ? 0 : 100 },
    };
  };

  const renderItemCard = (item, index) => {
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
                src={item.id_combo?.imgs[0] || item.id_product?.imgs[0]}
                alt={item.id_combo?.name || item.id_product?.name}
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
                  {item.id_combo?.name || item.id_product?.name}
                </Text>
                <CloseCircleOutlined
                  onClick={() => handleDeleteCartItem(item._id)}
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
                  {item.id_combo?.price.toLocaleString() ||
                    item.id_product?.price.toLocaleString()}
                  đ
                </Text>
              </Space>

              <Space style={{ marginTop: "8px" }}>
                <Button
                  type="link"
                  icon={<MinusCircleOutlined />}
                  disabled={item.quantity <= 1}
                  onClick={() =>
                    handleQuantityChange(item._id, item.quantity - 1)
                  }
                />
                <InputNumber
                  min={1}
                  value={item.quantity}
                  style={{
                    width: "50px",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                  onBlur={(e) => {
                    handleQuantityChange(item._id, e.target.value);
                  }}
                />
                <Button
                  type="link"
                  icon={<PlusCircleOutlined />}
                  onClick={() =>
                    handleQuantityChange(item._id, item.quantity + 1)
                  }
                />
              </Space>
            </Col>
          </Row>
        </Card>
      </motion.div>
    );
  };

  const renderList = (list) => (
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
          <React.Fragment key={item.id_combo?._id || item.id_product?._id}>
            {renderItemCard(item, index)}
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
      onClose={() => dispatch(toggle("drawerCart"))}
      open={drawerCart}
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
    >
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {renderList(user.cart)}
      </div>
      <MyButton text={"Xem giỏ hàng"} to={"/order"} />
    </Drawer>
  );
};

export default CartDrawer;
