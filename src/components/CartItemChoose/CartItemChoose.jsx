import { Card, Flex, Image, Typography } from "antd";
import styles from "./CartItemChoose.module.css";
import formatPrice from "../../utils/formatPrice";

const CartItemChoose = ({ item }) => {
  return (
    <Card span={24} className="mx-2" style={{ marginBottom: "10px" ,backgroundColor:"rgba(30, 30, 30, 1)",border:"2px solid rgba(255, 255, 255, 0.1)"}}>
      <div className={styles.cardContainer}>
        <Flex gap={10}>
          <div className={styles.groupImage}>
            <Image className={styles.imageProduct} src={item.product.images[0]} />
            <Typography.Text style={{color: 'white'}} className={styles.title}>{item.product.name}</Typography.Text>
          </div>
          <div className={styles.groupSum}>
            <Typography.Text style={{color: 'white'}} className={styles.title2}>{item.product.name}</Typography.Text>
            <Typography.Text style={{color: 'white'}}>{formatPrice(item.product.discountedPrice)}đ </Typography.Text>
            <Typography.Text style={{color: 'white'}}>Số lượng: {item.quantity} </Typography.Text>
          </div>
        </Flex>
        <Typography.Text style={{color: 'white'}} className={styles.sumProduct}>
          Tổng : <strong>{formatPrice(item.quantity * item.product.discountedPrice)}đ</strong>
        </Typography.Text>
      </div>
    </Card>
  );
};
export default CartItemChoose;
