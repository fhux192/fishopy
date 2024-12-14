import { Card, Flex, Image, Typography } from "antd";
import styles from "./CartItemChoose.module.css";
import formatPrice from "../../../utils/formatPrice";

const CartItemChoose = ({ item }) => {
  return (
    <Card
      span={24}
      className="mx-2 lg:px-0 lg:p-0 md:p-0 p-4 px-10"
      style={{
        marginBottom: "20px",
        padding: "10px",
        background:
          "linear-gradient(90deg,#15919B, #09D1C7,  #46DFB1 47%, #0C6478)",
        border: "2px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "10px",
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className={styles.cardContainer}>
        <div className={styles.groupImage}>
          <Image
            className={styles.imageProduct}
            src={item.id_product.imgs[0]}
            alt={item.id_product.name}
          />
        </div>
        <Flex
          direction="row"
          align="center"
          justify="space-between"
          wrap="wrap"
          gap={20}
        >
          <div className={styles.groupInfo}>
            <p className={styles.productName}>{item.id_product.name}</p>

            <div className={styles.productDetails}>
              <p className="font-bold price" style={{ color: "#46DFB1" }}>
                Đơn giá: {formatPrice(item.id_product.price)}đ
              </p>
              <p className="font-bold quantity" style={{ color: "#bdc3c7" }}>
                Số lượng: {item.quantity}
              </p>
            </div>
            <p className={styles.sumProduct}>
              Tổng:{" "}
              <strong>
                {formatPrice(item.quantity * item.id_product.price)}đ
              </strong>
            </p>
          </div>
        </Flex>
      </div>
    </Card>
  );
};

export default CartItemChoose;
