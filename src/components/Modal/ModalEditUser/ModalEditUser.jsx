import { Button, Form, Input, Modal, Select } from "antd";
import { toggleModalEditUser } from "../../../redux/features/toggle/toggleSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const ModalEditUser = ({ userEdit, setUsers }) => {
  const { modalEditUser } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(userEdit);
  }, [userEdit]);

  const onFinish = async (values) => {
    try {
      const res = await callEditUser(values);
      if (res.vcode === 0) {
        message.success(res.message);
        dispatch(toggleModalEditUser());
        setUsers((prev) => [...prev, res.data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      title="Cập nhật người dùng"
      open={modalEditUser}
      onCancel={() => dispatch(toggleModalEditUser())}
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
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalEditUser;
