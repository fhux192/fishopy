import { Button, Form, Input, message, Modal, Select } from "antd";
import { toggle } from "@redux/features/toggle/toggleSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { admin_updateUser } from "@services/api";

const ModalEditUser = ({ userEdit, setUsers, users }) => {
  const { modalEditUser } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (modalEditUser) {
      form.setFieldsValue(userEdit);
    } else form.resetFields();
  }, [modalEditUser]);

  const onFinish = async (values) => {
    try {
      const res = await admin_updateUser(userEdit._id, values);
      if (res.vcode !== 0) {
        return message.error(res.msg);
      }

      message.success(res.msg);
      dispatch(toggle("modalEditUser"));
      setUsers(
        users.map((user) => (user._id === userEdit._id ? res.data : user))
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      title="Cập nhật người dùng"
      open={modalEditUser}
      onCancel={() => dispatch(toggle("modalEditUser"))}
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
          rules={[{ required: true, msg: "Vui lòng nhập tên người dùng!" }]}
        >
          <Input />
        </Form.Item>
        {userEdit.phone && (
          <Form.Item
            label="Số điện thoại"
            labelCol={{ span: 24 }}
            name="phone"
            rules={[{ required: true, msg: "Vui lòng nhập số điện thoại!" }]}
          >
            <Input />
          </Form.Item>
        )}

        {userEdit.email && (
          <Form.Item
            label="Email"
            labelCol={{ span: 24 }}
            name="email"
            rules={[{ required: true, msg: "Vui lòng nhập email!" }]}
          >
            <Input />
          </Form.Item>
        )}
        <Form.Item
          label="Quyền"
          labelCol={{ span: 24 }}
          name="role"
          rules={[
            { required: true, msg: "Vui lòng chọn quyền của người dùng!" },
          ]}
        >
          <Select
            options={[
              { label: "ADMIN", value: "ADMIN" },
              { label: "USER", value: "USER" },
            ]}
          />
        </Form.Item>
        <Form.Item style={{ textAlign: "right" }}>
          <Button htmlType="submit">Cập nhật</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalEditUser;
