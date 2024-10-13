import { Card, Flex, Image, Typography } from "antd";
import styles from "./CartItemChoose.module.css";
import formatPrice from "../../utils/formatPrice";

const CartItemChoose = ({ item }) => {
  return (
    <Card span={24} style={{ marginBottom: "10px", backgroundColor: '#0000004d' }}>
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
