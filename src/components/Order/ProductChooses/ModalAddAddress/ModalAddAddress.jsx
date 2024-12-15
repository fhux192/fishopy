import { Form, Input, message, Modal, Select, Typography } from "antd";
const { Title } = Typography;
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { toggle } from "@redux/features/toggle/toggleSlice";
import { updateAccount } from "@redux/features/user/userSlice";
import {
  user_addAddress,
  free_getCities,
  free_getDistricts,
  free_getWards,
} from "@services/api";

const phoneRegex = /^0\d{9}$/;
const nameRegex = /^[a-zA-ZÀ-Ỷà-ỷ\s]{3,50}$/u;
const addressRegex = /^.{5,}$/;

const ModalAddAddress = () => {
  const { modalAddAddress } = useSelector((state) => state.toggle);
  const { isAuthenticated, user } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const [form] = useForm();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    if (modalAddAddress) {
      getCitys();
    }
  }, [modalAddAddress]);

  const getCitys = async () => {
    try {
      const res = await free_getCities();
      if (res.vcode != 0) {
        return message.error(
          "Không thể lấy danh sách thành phố. Vui lòng thử lại!"
        );
      }
      setProvinces(
        res.data.map((item) => ({
          value: item.province_id,
          label: item.province_name,
        }))
      );
    } catch (error) {
      console.error("Lỗi khi lấy danh sách tỉnh/thành: ", error);
      message.error("Đã xảy ra lỗi khi lấy danh sách thành phố.");
    }
  };

  const getDistricts = async (provinceId, update) => {
    try {
      if (!provinceId) return;
      const res = await free_getDistricts(provinceId);
      if (res.vcode != 0) {
        return message.error(
          "Không thể lấy danh sách quận/huyện. Vui lòng thử lại!"
        );
      }

      setDistricts(
        res.data.map((item) => ({
          value: item.district_id,
          label: item.district_name,
        }))
      );

      if (update) {
        form.setFieldsValue({ district: undefined, ward: undefined });
        setWards([]);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách quận/huyện: ", error);
      message.error("Đã xảy ra lỗi khi lấy danh sách quận/huyện.");
    }
  };

  const getWards = async (districtId, update) => {
    try {
      if (!districtId) return;
      const res = await free_getWards(districtId);
      if (res.vcode != 0) {
        return message.error(
          "Không thể lấy danh sách xã/phường. Vui lòng thử lại!"
        );
      }
      setWards(
        res.data.map((item) => ({
          value: item.ward_id,
          label: item.ward_name,
        }))
      );
      if (update) {
        form.setFieldsValue({ ward: undefined });
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách xã/phường: ", error);
      message.error("Đã xảy ra lỗi khi lấy danh sách xã/phường.");
    }
  };

  const onFinish = async (values) => {
    const selectedProvince = provinces.find(
      (item) => item.value === values.province
    );
    const selectedDistrict = districts.find(
      (item) => item.value === values.district
    );
    const selectedWard = wards.find((item) => item.value === values.ward);

    if (!selectedProvince || !selectedDistrict || !selectedWard) {
      message.error("Vui lòng chọn đầy đủ tỉnh/thành, quận/huyện, xã/phường!");
      return;
    }

    const data = {
      city: selectedProvince.label,
      district: selectedDistrict.label,
      ward: selectedWard.label,
      name: values.name.trim(),
      phone: values.phone.trim(),
      address: values.address.trim(),
      default: !user.addresses.length,
    };

    try {
      if (isAuthenticated) {
        const res = await user_addAddress(data);
        if (res.vcode != 0) {
          return message.error(res.msg);
        }
        dispatch(updateAccount({ addresses: res.data }));
        dispatch(toggle("modalAddAddress"));
        message.success(res.msg);
      } else {
        // Lưu vào localStorage nếu người dùng chưa đăng nhập
        dispatch(updateAccount({ addresses: [data] }));
        localStorage.setItem("addresses", JSON.stringify([data]));
        dispatch(toggle("modalAddAddress"));
        message.success("Thêm địa chỉ thành công");
      }
    } catch (error) {
      console.error(error.message);
      message.error("Đã xảy ra lỗi khi thêm địa chỉ. Vui lòng thử lại!");
    }
  };

  return (
    <Modal
      open={modalAddAddress}
      onCancel={() => dispatch(toggle("modalAddAddress"))}
      footer={null}
      destroyOnClose
    >
      <Title level={4}>Thêm địa chỉ mới</Title>
      <Form
        form={form}
        labelCol={{ span: 24 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Tên người nhận"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên người nhận!" },
            {
              validator: (_, value) => {
                if (!value || nameRegex.test(value.trim())) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(
                    "Tên phải chứa ít nhất 3 ký tự và không chứa ký tự đặc biệt!"
                  );
                }
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            {
              validator: (_, value) => {
                if (!value || phoneRegex.test(value.trim())) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(
                    "Số điện thoại không đúng định dạng (VD: 0xxxxxxxxx)!"
                  );
                }
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Thành phố"
          name="province"
          rules={[{ required: true, message: "Vui lòng chọn thành phố!" }]}
        >
          <Select
            options={provinces}
            onChange={(value) => getDistricts(value, true)}
          />
        </Form.Item>
        <Form.Item
          label="Quận/huyện"
          name="district"
          rules={[{ required: true, message: "Vui lòng chọn quận/huyện!" }]}
        >
          <Select
            options={districts}
            onChange={(value) => getWards(value, true)}
          />
        </Form.Item>
        <Form.Item
          label="Xã/phường"
          name="ward"
          rules={[{ required: true, message: "Vui lòng chọn xã/phường!" }]}
        >
          <Select options={wards} />
        </Form.Item>
        <Form.Item
          label="Địa chỉ nhận hàng"
          name="address"
          rules={[
            { required: true, message: "Vui lòng nhập địa chỉ nhận hàng!" },
            {
              validator: (_, value) => {
                if (!value || addressRegex.test(value.trim())) {
                  return Promise.resolve();
                } else {
                  return Promise.reject("Địa chỉ phải chứa ít nhất 5 ký tự.");
                }
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <button
            type="submit"
            style={{
              padding: "8px 16px",
              background: "#1890ff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Thêm địa chỉ
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddAddress;
