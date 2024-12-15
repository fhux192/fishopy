import { DatePicker, Divider, Drawer, Form, Input, List, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "@redux/features/toggle/toggleSlice";
import { formatPrice } from "@utils/function";
import { useEffect } from "react";
import moment from "moment";
import { admin_getOrderDetail_byFields } from "@services/api";
import { useState } from "react";

const DrawerOrderDetail = ({ orderDetail }) => {
  const { modalOrderDetail } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (modalOrderDetail) {
      const getOrderDetails = async () => {
        setLoading(true);
        try {
          const res = await admin_getOrderDetail_byFields(
            { id_order: { $eq: orderDetail._id } },
            {},
            10000,
            1
          );
          if (res.vcode != 0) return message.error(res.msg);

          form.setFieldsValue({
            name: orderDetail.shipping_address.name,
            phone: orderDetail.shipping_address.phone,
            province: orderDetail.shipping_address.city,
            district: orderDetail.shipping_address.district,
            ward: orderDetail.shipping_address.ward,
            address: orderDetail.shipping_address.address,
            createdAt: moment(orderDetail.createdAt),
            items_price: formatPrice(orderDetail.items_price),
            shipping_price: formatPrice(orderDetail.shipping_price),
            total: formatPrice(
              orderDetail.items_price + orderDetail.shipping_price
            ),
            order_items: res.data,
          });
        } catch (error) {
          message.error(error);
        } finally {
          setLoading(false);
        }
      };

      getOrderDetails();
    }
  }, [modalOrderDetail]);

  return (
    <Drawer
      open={modalOrderDetail}
      onClose={() => dispatch(toggle("modalOrderDetail"))}
    >
      {!loading && (
        <List
          itemLayout="horizontal"
          dataSource={form?.getFieldValue("order_items")}
          renderItem={(item, index) => (
            <List.Item>
              <div className="flex  gap-4">
                <img
                  className="w-24 h-24"
                  src={item.id_combo?.imgs[0] || item.id_product.imgs[0]}
                  alt=""
                />
                <div>
                  <strong>
                    {" "}
                    {item.id_combo?.name || item.id_product.name}
                  </strong>
                  <p>
                    {formatPrice(item.id_combo?.price || item.id_product.price)}
                    đ
                  </p>
                  <p>x{item.quantity}</p>
                </div>
              </div>
            </List.Item>
          )}
        />
      )}

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
          name="items_price"
          labelCol={{ span: 24 }}
          rules={[{ required: true, msg: "Vui lòng nhập địa chỉ nhận hàng!" }]}
        >
          <Input disabled readOnly />
        </Form.Item>

        <Form.Item
          label="Phí vận chuyển"
          name="shipping_price"
          labelCol={{ span: 24 }}
          rules={[{ required: true, msg: "Vui lòng nhập địa chỉ nhận hàng!" }]}
        >
          <Input disabled readOnly />
        </Form.Item>
        <Form.Item
          label="Tổng tiền"
          labelCol={{ span: 24 }}
          name="total"
          rules={[{ required: true, msg: "Vui lòng nhập địa chỉ nhận hàng!" }]}
        >
          <Input disabled readOnly />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
export default DrawerOrderDetail;
