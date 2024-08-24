import { Button, Form, Input, message, Modal, Select, Typography } from "antd";
const { Title } = Typography;
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { updateAccount } from "../../../redux/features/user/userSlice";
import { toggleModalAddAddress } from "../../../redux/features/toggle/toggleSlice";
import { callAddAddress } from "../../../services/api";

const ModalAddAddress = () => {
  const { modalAddAddress } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();
  const [form] = useForm();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  useEffect(() => {
    getCitys();
  }, []);

  const getCitys = async () => {
    const res = await axios.get("https://vapi.vnappmob.com/api/province/");
    if (res.status === 200) {
      setProvinces(
        res.data.results.map((item) => {
          return {
            value: item.province_id,
            label: item.province_name,
          };
        })
      );
    }
  };

  const handleChangeProvice = async () => {
    const res = await axios.get(
      `https://vapi.vnappmob.com/api/province/district/${form.getFieldValue("province")}`
    );
    if (res.status === 200) {
      setDistricts(
        res.data.results.map((item) => {
          return {
            value: item.district_id,
            label: item.district_name,
          };
        })
      );
    }
  };

  const handleChangeDistrict = async () => {
    const res = await axios.get(
      `https://vapi.vnappmob.com/api/province/ward/${form.getFieldValue("district")}`
    );
    if (res.status === 200) {
      setWards(
        res.data.results.map((item) => {
          return {
            value: item.ward_id,
            label: item.ward_name,
          };
        })
      );
    }
  };

  const onFinish = async (values) => {
    try {
      const data = {
        city: provinces.find((item) => item.value === values.province).label,
        district: districts.find((item) => item.value === values.district).label,
        ward: wards.find((item) => item.value === values.ward).label,
        name: values.name,
        phone: values.phone,
        address: values.address,
      };
      const res = await callAddAddress(data);
      console.log("check res", res);
      if (res.vcode == 0) {
        dispatch(updateAccount({ addresses: res.data }));
        dispatch(toggleModalAddAddress());
        message.success(res.message);
      } else message.error(res.message);
    } catch (error) {
      console.error("error", error.message);
    }
  };

  return (
    <Modal open={modalAddAddress} onCancel={() => dispatch(toggleModalAddAddress())} footer={null}>
      <Title>Thêm địa chỉ mới</Title>
      <Form form={form} labelCol={24} onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="Tên người nhận"
          labelCol={{ span: 24 }}
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên người nhận!" }]}
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
          label="Thành phố "
          labelCol={{ span: 24 }}
          name="province"
          rules={[{ required: true, message: "Vui lòng chọn thành phố!" }]}
        >
          <Select options={provinces} onChange={handleChangeProvice} />
        </Form.Item>

        <Form.Item
          label="Quận/huyện"
          labelCol={{ span: 24 }}
          name="district"
          rules={[{ required: true, message: "Vui lòng chọn quận/huyện!" }]}
        >
          <Select options={districts} onChange={handleChangeDistrict} />
        </Form.Item>
        <Form.Item
          label="Xã/phường"
          labelCol={{ span: 24 }}
          name="ward"
          rules={[{ required: true, message: "Vui lòng chọn xã/phường!" }]}
        >
          <Select options={wards} />
        </Form.Item>

        <Form.Item
          label="Địa chỉ nhận hàng"
          name="address"
          labelCol={{ span: 24 }}
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ nhận hàng!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm địa chỉ
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalAddAddress;
