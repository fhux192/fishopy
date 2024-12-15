import { Button, Form, Input, message, Modal, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "@redux/features/toggle/toggleSlice";
import { updateAccount } from "@redux/features/user/userSlice";
import {
  free_getCities,
  free_getDistricts,
  free_getWards,
  user_updateAddress,
} from "@services/api";

const ModalEditAddress = ({ address }) => {
  const { modalEditAddress } = useSelector((state) => state.toggle);
  const { user, isAuthenticated } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  useEffect(() => {
    if (modalEditAddress) {
      form.setFieldsValue({
        name: address.name,
        phone: address.phone,
        province: address.city,
        district: address.district,
        ward: address.ward,
        address: address.address,
        default: address.default,
      });
      getCities();
    }
  }, [modalEditAddress]);

  const getCities = async () => {
    const res = await free_getCities();
    if (res.vcode != 0)
      return message.error(
        "Không thể lấy danh sách thành phố. Vui lòng thử lại!"
      );
    const dataCities = res.data.map((item) => {
      return {
        value: item.province_id,
        label: item.province_name,
      };
    });
    setProvinces(dataCities);
    handleChangeProvice(
      dataCities.find(
        (item) => item.label === address.city || item.value === address.city
      ).value
    );
  };

  const handleChangeProvice = async (idProvince) => {
    const res = await free_getDistricts(idProvince);
    if (res.vcode != 0)
      return message.error(
        "Không thể lấy danh sách quận/huyện. Vui lòng thử lại!"
      );
    const dataDistricts = res.data.map((item) => {
      return {
        value: item.district_id,
        label: item.district_name,
      };
    });
    setDistricts(dataDistricts);
    handleChangeDistrict(
      dataDistricts.find((item) => item.label === address.district).value
    );
  };

  const handleChangeDistrict = async (idDistrict) => {
    const res = await free_getWards(idDistrict);
    if (res.vcode != 0)
      return message.error(
        "Không thể lấy danh sách xã/phường. Vui lòng thử lại!"
      );
    setWards(
      res.data.map((item) => {
        return {
          value: item.ward_id,
          label: item.ward_name,
        };
      })
    );
  };

  const onFinish = async (values) => {
    if (isAuthenticated) {
      try {
        const data = {
          city: provinces.find(
            (item) =>
              item.value === values.province || item.label == values.province
          )?.label,
          district: districts.find(
            (item) =>
              item.value === values.district || item.label == values.district
          ).label,
          ward: wards.find(
            (item) => item.value === values.ward || item.label == values.ward
          ).label,
          name: values.name,
          phone: values.phone,
          address: values.address,
          default: values.default,
        };

        const res = await user_updateAddress(address._id, data);
        if (res.vcode != 0) {
          return message.error(res.msg);
        }

        if (data.default) {
          const newAddress = user.addresses.map((item) => {
            return { ...item, default: item._id === address._id };
          });
          dispatch(updateAccount({ addresses: newAddress }));

          newAddress.forEach(async (item) => {
            if (item._id != address._id) {
              await user_updateAddress(item._id, {
                default: item.default,
              });
            }
          });
        } else {
          dispatch(updateAccount({ addresses: res.data }));
        }

        dispatch(toggle("modalEditAddress"));
        message.success(res.msg);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <Modal
      open={modalEditAddress}
      title="Cập nhật địa chỉ"
      onCancel={() => dispatch(toggle("modalEditAddress"))}
      footer={null}
    >
      <Form form={form} labelCol={24} onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="Tên người nhận"
          labelCol={{ span: 24 }}
          name="name"
          rules={[{ required: true, msg: "Vui lòng nhập tên người nhận!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          labelCol={{ span: 24 }}
          name="phone"
          rules={[{ required: true, msg: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Thành phố "
          labelCol={{ span: 24 }}
          name="province"
          rules={[{ required: true, msg: "Vui lòng chọn thành phố!" }]}
        >
          <Select
            options={provinces}
            onChange={() => {
              form.setFieldsValue({ district: "", ward: "" });
              handleChangeProvice(
                provinces.find(
                  (item) => item.value === form.getFieldValue("province")
                ).value
              );
            }}
          />
        </Form.Item>

        <Form.Item
          label="Quận/huyện"
          labelCol={{ span: 24 }}
          name="district"
          rules={[{ required: true, msg: "Vui lòng chọn quận/huyện!" }]}
        >
          <Select
            options={districts}
            onChange={() => {
              form.setFieldsValue({ ward: "" });
              handleChangeDistrict(
                districts.find(
                  (item) => item.value === form.getFieldValue("district")
                ).value
              );
            }}
          />
        </Form.Item>
        <Form.Item
          label="Xã/phường"
          labelCol={{ span: 24 }}
          name="ward"
          rules={[{ required: true, msg: "Vui lòng chọn xã/phường!" }]}
        >
          <Select options={wards} />
        </Form.Item>

        <Form.Item
          label="Địa chỉ nhận hàng"
          name="address"
          labelCol={{ span: 24 }}
          rules={[{ required: true, msg: "Vui lòng nhập địa chỉ nhận hàng!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Đặt làm địa chỉ mặc định"
          name="default"
          labelCol={{ span: 24 }}
        >
          <Switch />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cập nhật địa chỉ
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEditAddress;
