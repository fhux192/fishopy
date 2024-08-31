import { Button, Form, Input, message, Modal, Select } from "antd";
import { toggleModalAddUser } from "../../../redux/features/toggle/toggleSlice";
import { useDispatch, useSelector } from "react-redux";
import { callAddUser } from "../../../services/api";

const ModalAddUser = ({ setUsers }) => {
  const { modalAddUser } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      return message.error("Xác nhận mật khẩu không trùng khớp");
    }

    try {
      const res = await callAddUser(values);
      if (res.vcode === 0) {
        message.success(res.message);
        dispatch(toggleModalAddUser());
        setUsers((prev) => [...prev, res.data]);
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      title="Thêm người dùng"
      open={modalAddUser}
      onCancel={() => dispatch(toggleModalAddUser())}
      footer={null}
    >
      <Form
        form={form}
        labelCol={24}
        onFinish={onFinish}
        initialValues={{
          role: "USER",
        }}
      >
        <Form.Item
          label="Tên người dùng"
          labelCol={{ span: 24 }}
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên người dùng!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          labelCol={{ span: 24 }}
          name="phone"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          labelCol={{ span: 24 }}
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Xác nhận mật khẩu"
          labelCol={{ span: 24 }}
          name="confirmPassword"
          rules={[{ required: true, message: "Vui lòng xác nhận mật khẩu!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Quyền"
          labelCol={{ span: 24 }}
          name="role"
          rules={[{ required: true, message: "Vui lòng chọn quyền của người dùng!" }]}
        >
          <Select
            options={[
              { label: "ADMIN", value: "ADMIN" },
              { label: "USER", value: "USER" },
            ]}
          />
        </Form.Item>
        <Form.Item style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalAddUser;
