import { DatePicker, Divider, Drawer, Form, Input, List } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../../../redux/features/toggle/toggleSlice";
import formatPrice from "../../../../utils/formatPrice";
import { useEffect } from "react";
import moment from "moment";

const DrawerOrderDetail = ({ orderDetail }) => {
  const { modalOrderDetail } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (orderDetail) {
      form.setFieldsValue({
        name: orderDetail.shippingAddress.name,
        phone: orderDetail.shippingAddress.phone,
        province: orderDetail.shippingAddress.city,
        district: orderDetail.shippingAddress.district,
        ward: orderDetail.shippingAddress.ward,
        address: orderDetail.shippingAddress.address,
        createdAt: moment(orderDetail.createdAt),
        itemsPrice: formatPrice(orderDetail.itemsPrice),
        shippingPrice: formatPrice(orderDetail.shippingPrice),
      });
    }
  });

  return (
    <Drawer
      open={modalOrderDetail}
      onClose={() => dispatch(toggle("modalOrderDetail"))}
    >
      <List
        itemLayout="horizontal"
        dataSource={orderDetail?.orderItems}
        renderItem={(item, index) => (
          <List.Item>
            <div className="flex  gap-4">
              <img className="w-24 h-24" src={item.product.images[0]} alt="" />
              <div>
                <strong> {item.product.name}</strong>
                <p>{formatPrice(item.product.discountedPrice)}đ</p>
                <p>x{item.quantity}</p>
              </div>
            </div>
          </List.Item>
        )}
      />

      <Divider />

      <Form form={form} labelCol={24}>
        <Form.Item
          label="Tên người nhận"
          labelCol={{ span: 24 }}
          name="name"
          rules={[{ required: true, msg: "Vui lòng nhập tên người nhận!" }]}
        >
          <Input disabled readOnly />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          labelCol={{ span: 24 }}
          name="phone"
          rules={[{ required: true, msg: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input disabled readOnly />
        </Form.Item>
        <Form.Item
          label="Thành phố "
          labelCol={{ span: 24 }}
          name="province"
          rules={[{ required: true, msg: "Vui lòng chọn thành phố!" }]}
        >
          <Input disabled readOnly />
        </Form.Item>

        <Form.Item
          label="Quận/huyện"
          labelCol={{ span: 24 }}
          name="district"
          rules={[{ required: true, msg: "Vui lòng chọn quận/huyện!" }]}
        >
          <Input disabled readOnly />
        </Form.Item>
        <Form.Item
          label="Xã/phường"
          labelCol={{ span: 24 }}
          name="ward"
          rules={[{ required: true, msg: "Vui lòng chọn xã/phường!" }]}
        >
          <Input disabled readOnly />
        </Form.Item>

        <Form.Item
          label="Địa chỉ nhận hàng"
          name="address"
          labelCol={{ span: 24 }}
          rules={[{ required: true, msg: "Vui lòng nhập địa chỉ nhận hàng!" }]}
        >
          <Input disabled readOnly />
        </Form.Item>
        <Form.Item
          label="Thời gian đặt hàng"
          name="createdAt"
          labelCol={{ span: 24 }}
          rules={[{ required: true, msg: "Vui lòng nhập thời gian đặt hàng!" }]}
        >
          <DatePicker disabled format={"DD/MM/YYYY"} />
        </Form.Item>
        <Form.Item
          label="Tiền hàng"
          name="itemsPrice"
          labelCol={{ span: 24 }}
          rules={[{ required: true, msg: "Vui lòng nhập địa chỉ nhận hàng!" }]}
        >
          <Input disabled readOnly />
        </Form.Item>

        <Form.Item
          label="Phí vận chuyển"
          name="shippingPrice"
          labelCol={{ span: 24 }}
          rules={[{ required: true, msg: "Vui lòng nhập địa chỉ nhận hàng!" }]}
        >
          <Input disabled readOnly />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
export default DrawerOrderDetail;
