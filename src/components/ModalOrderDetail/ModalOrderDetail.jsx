import { Button, Form, Input, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const ModalOrderDetail = ({ orderDetail }) => {
  const { modalOrderDetail } = useSelector((state) => state.toggle);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (orderDetail) {
      form.setFieldsValue({
        name: orderDetail.shippingAddress.name,
        phone: orderDetail.shippingAddress.phone,
        province: orderDetail.shippingAddress.city,
        district: orderDetail.shippingAddress.district,
        ward: orderDetail.shippingAddress.ward,
        address: orderDetail.shippingAddress.address,
      });
    }
  }, [orderDetail]);

  return (
    <Modal
      open={modalOrderDetail}
      onCancel={() => dispatch(toggleModalOrderDetail())}
      footer={null}
    >
      <Form form={form} labelCol={24}>
        <Form.Item
          label="Tên người nhận"
          labelCol={{ span: 24 }}
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên người nhận!" }]}
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          labelCol={{ span: 24 }}
          name="phone"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item
          label="Thành phố "
          labelCol={{ span: 24 }}
          name="province"
          rules={[{ required: true, message: "Vui lòng chọn thành phố!" }]}
        >
          <Input readOnly />
        </Form.Item>

        <Form.Item
          label="Quận/huyện"
          labelCol={{ span: 24 }}
          name="district"
          rules={[{ required: true, message: "Vui lòng chọn quận/huyện!" }]}
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item
          label="Xã/phường"
          labelCol={{ span: 24 }}
          name="ward"
          rules={[{ required: true, message: "Vui lòng chọn xã/phường!" }]}
        >
          <Input readOnly />
        </Form.Item>

        <Form.Item
          label="Địa chỉ nhận hàng"
          name="address"
          labelCol={{ span: 24 }}
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ nhận hàng!" }]}
        >
          <Input readOnly />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalOrderDetail;
