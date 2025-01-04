import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  message,
  Modal,
  Select,
  Typography,
  Button,
  Row,
  Col,
  Divider,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "antd/es/form/Form";
import { toggle } from "@redux/features/toggle/toggleSlice";
import { updateAccount } from "@redux/features/user/userSlice";
import {
  user_addAddress,
  free_getCities,
  free_getDistricts,
  free_getWards,
} from "@services/api";
import { motion, AnimatePresence } from "framer-motion"; // <-- Import Framer Motion

const { Title, Text } = Typography;

// Regex
const phoneRegex = /^0\d{9}$/;
const nameRegex = /^[a-zA-ZÀ-Ỷà-ỷ\s]{3,50}$/u;
const addressRegex = /^.{5,}$/;

const ModalAddAddress = () => {
  const dispatch = useDispatch();

  // Lấy state từ Redux
  const { modalAddAddress } = useSelector((state) => state.toggle);
  const { isAuthenticated, user } = useSelector((state) => state.account);

  // Hook form của Ant Design
  const [form] = useForm();

  // State cho danh sách tỉnh/thành, quận/huyện, xã/phường
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  // Khi mở modal, tự động load danh sách tỉnh/thành
  useEffect(() => {
    if (modalAddAddress) {
      getCitys();
    }
  }, [modalAddAddress]);

  // Hàm lấy danh sách tỉnh/thành
  const getCitys = async () => {
    try {
      const res = await free_getCities();
      if (res.vcode !== 0) {
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

  // Hàm lấy danh sách quận/huyện
  const getDistrictsData = async (provinceId, update) => {
    try {
      if (!provinceId) return;
      const res = await free_getDistricts(provinceId);
      if (res.vcode !== 0) {
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

  // Hàm lấy danh sách xã/phường
  const getWardsData = async (districtId, update) => {
    try {
      if (!districtId) return;
      const res = await free_getWards(districtId);
      if (res.vcode !== 0) {
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

  // Xử lý submit form
  const onFinish = async (values) => {
    const selectedProvince = provinces.find(
      (item) => item.value === values.province
    );
    const selectedDistrict = districts.find(
      (item) => item.value === values.district
    );
    const selectedWard = wards.find((item) => item.value === values.ward);

    if (!selectedProvince || !selectedDistrict || !selectedWard) {
      message.error(
        "Vui lòng chọn đầy đủ tỉnh/thành, quận/huyện, xã/phường!"
      );
      return;
    }

    const data = {
      city: selectedProvince.label,
      district: selectedDistrict.label,
      ward: selectedWard.label,
      name: values.name.trim(),
      phone: values.phone.trim(),
      address: values.address.trim(),
      default: !user?.addresses?.length, // nếu user chưa có địa chỉ => đây là địa chỉ mặc định
    };

    try {
      if (isAuthenticated) {
        const res = await user_addAddress(data);
        if (res.vcode !== 0) {
          return message.error(res.msg);
        }
        dispatch(updateAccount({ addresses: res.data }));
        dispatch(toggle("modalAddAddress"));
        message.success(res.msg);
      } else {
        // Lưu vào localStorage nếu người dùng chưa đăng nhập
        const existingAddresses = JSON.parse(
          localStorage.getItem("addresses") || "[]"
        );
        const updatedAddresses = [...existingAddresses, data];
        dispatch(updateAccount({ addresses: updatedAddresses }));
        localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
        dispatch(toggle("modalAddAddress"));
        message.success("Thêm địa chỉ thành công");
      }
    } catch (error) {
      console.error(error.message);
      message.error("Đã xảy ra lỗi khi thêm địa chỉ. Vui lòng thử lại!");
    }
  };

  // Đóng modal
  const handleCancel = () => {
    dispatch(toggle("modalAddAddress"));
  };

  // Các biến Framer Motion - cài đặt hiệu ứng spring "bật nảy"
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25,
        // To create a more pronounced bounce, you can adjust these values
      },
    },
    exit: {
      opacity: 0,
      scale: 0.6,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {modalAddAddress && (
        <Modal
          open={modalAddAddress}
          onCancel={handleCancel}
          footer={null}
          centered
          destroyOnClose
          maskClosable={true} // Bật tính năng đóng modal khi click ra ngoài
          bodyStyle={{
            padding: "2px",
          }}
          maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          // Tùy chỉnh để tránh xung đột animation
          // Ant Design Modal vẫn sẽ quản lý animation của mask và dialog
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            // Bạn có thể thêm các thuộc tính bổ sung nếu cần
          >
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <Title level={3} style={{ margin: 0 }}>
                Thêm địa chỉ mới
              </Title>
              <Text type="secondary" style={{ fontSize: "14px" }}>
                Vui lòng nhập đầy đủ thông tin để nhận hàng
              </Text>
            </div>

            <Divider />

            <Form
              form={form}
              layout="vertical" // Sắp xếp label ở trên Input
              onFinish={onFinish}
              autoComplete="off"
              style={{ marginTop: "16px" }}
            >
              {/* Tên người nhận và số điện thoại */}
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Tên người nhận"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên người nhận!",
                      },
                      {
                        validator: (_, value) => {
                          if (!value || nameRegex.test(value.trim())) {
                            return Promise.resolve();
                          } else {
                            return Promise.reject(
                              new Error(
                                "Tên phải chứa ít nhất 3 ký tự và không chứa ký tự đặc biệt!"
                              )
                            );
                          }
                        },
                      },
                    ]}
                  >
                    <Input placeholder="Ví dụ: Nguyễn Văn A" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại!",
                      },
                      {
                        validator: (_, value) => {
                          if (!value || phoneRegex.test(value.trim())) {
                            return Promise.resolve();
                          } else {
                            return Promise.reject(
                              new Error(
                                "Số điện thoại không đúng định dạng (VD: 0xxxxxxxxx)!"
                              )
                            );
                          }
                        },
                      },
                    ]}
                  >
                    <Input placeholder="Ví dụ: 0123456789" />
                  </Form.Item>
                </Col>
              </Row>

              {/* Tỉnh/thành, quận/huyện, xã/phường */}
              <Row gutter={16}>
                <Col xs={24} sm={8}>
                  <Form.Item
                    label="Tỉnh/Thành phố"
                    name="province"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn tỉnh/thành phố!",
                      },
                    ]}
                  >
                    <Select
                      options={provinces}
                      placeholder="Chọn tỉnh/thành..."
                      onChange={(value) => getDistrictsData(value, true)}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item
                    label="Quận/Huyện"
                    name="district"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn quận/huyện!",
                      },
                    ]}
                  >
                    <Select
                      options={districts}
                      placeholder="Chọn quận/huyện..."
                      onChange={(value) => getWardsData(value, true)}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item
                    label="Xã/Phường"
                    name="ward"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn xã/phường!",
                      },
                    ]}
                  >
                    <Select
                      options={wards}
                      placeholder="Chọn xã/phường..."
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* Địa chỉ nhận hàng */}
              <Form.Item
                label="Địa chỉ nhận hàng"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ nhận hàng!",
                  },
                  {
                    validator: (_, value) => {
                      if (!value || addressRegex.test(value.trim())) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject(
                          new Error("Địa chỉ phải chứa ít nhất 5 ký tự.")
                        );
                      }
                    },
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Ví dụ: Số 1, Đường ABC, Phường XYZ..."
                  rows={2}
                />
              </Form.Item>

              {/* Nút submit */}
              <Form.Item style={{ marginTop: "24px", textAlign: "right" }}>
                <Button
                  style={{ marginRight: 8 }}
                  onClick={handleCancel}
                >
                  Hủy
                </Button>
                <Button htmlType="submit">
                  Thêm địa chỉ
                </Button>
              </Form.Item>
            </Form>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default ModalAddAddress;
