import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import styles from "./ProductChooses.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toggle } from "@redux/features/toggle/toggleSlice";
import CartItemChoose from "@components/Order/CartItemChoose/CartItemChoose";
import ModalAddAddress from "./ModalAddAddress/ModalAddAddress";
import Title from "antd/es/typography/Title";
import { updateAccount } from "@redux/features/user/userSlice";
import {
  free_getCities,
  free_getDistricts,
  free_getWards,
} from "@services/api";
const phoneRegex = /^0\d{9}$/;
const nameRegex = /^[a-zA-ZÀ-Ỷà-ỷ\s]{3,50}$/u;
const addressRegex = /^.{5,}$/;

const ProductChooses = ({ addressDelivery, setAddressDelivery }) => {
  let { user, isAuthenticated } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const [modalChooseAddress, setModalChooseAddress] = useState(false);
  let cartChoosed = user.cart.filter((item) => item.checked);
  const [form] = Form.useForm();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

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

  const onFinish = (values) => {
    const selectedProvince = provinces.find(
      (item) => item.value === values.province || item.label === values.province
    );
    const selectedDistrict = districts.find(
      (item) => item.value === values.district || item.label === values.district
    );
    const selectedWard = wards.find(
      (item) => item.value === values.ward || item.label === values.ward
    );
    values.city = selectedProvince.label;
    values.district = selectedDistrict.label;
    values.ward = selectedWard.label;

    console.log("values", values);

    setAddressDelivery({ ...values, default: true });
    dispatch(updateAccount({ addresses: [{ ...values, default: true }] }));
    localStorage.setItem(
      "addresses",
      JSON.stringify([{ ...values, default: true }])
    );
    setModalChooseAddress(false);
    form.resetFields();
  };

  useEffect(() => {
    getCitys();
  }, []);

  useEffect(() => {
    if (modalChooseAddress && !isAuthenticated && addressDelivery) {
      form.setFieldsValue({
        name: addressDelivery.name,
        phone: addressDelivery.phone,
        province: addressDelivery.city,
        district: addressDelivery.district,
        ward: addressDelivery.ward,
        address: addressDelivery.address,
      });

      const getDistricts_byProvinceId = async () => {
        const provinceId = provinces.find(
          (item) => item.label === addressDelivery.city
        )?.value;
        const res = await free_getDistricts(provinceId);
        if (res.vcode != 0)
          return message.error(
            "Không thể lấy danh sách quận/huyện. Vui lòng thử lại!"
          );
        let dis = res.data.map((item) => ({
          value: item.district_id,
          label: item.district_name,
        }));
        setDistricts(dis);

        getWards(
          dis.find((item) => item.label === addressDelivery.district)?.value,
          false
        );
      };

      getDistricts_byProvinceId();
    }
  }, [modalChooseAddress]);

  return (
    <>
      <Card
        className="mx-2"
        style={{
          marginBottom: "20px",
          backgroundColor: "rgba(30, 30, 30, 1)",
          border: "2px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* nếu đã có địa chỉ thì hiển thị modal cập nhật địa chỉ, không thì hiển thị modal thêm địa chỉ */}
        {addressDelivery ? (
          <Flex justify="space-between" align="center">
            <div>
              <Typography.Title level={4} style={{ color: "white" }}>
                Địa chỉ nhận hàng
              </Typography.Title>
              <Row>
                <Col style={{ color: "white" }}>
                  <strong>{addressDelivery.name}</strong>
                  <Divider type="vertical" />
                  {addressDelivery.phone}
                </Col>
                <Divider type="vertical" />
                <Col style={{ color: "white" }}>
                  {addressDelivery.address}, {addressDelivery.ward},{" "}
                  {addressDelivery.district}, {addressDelivery.city}
                  {addressDelivery.active && <strong> (Mặc định)</strong>}
                </Col>
              </Row>
            </div>
            <button
              className="border-[1px] min-w-[5rem] bg-Black border-Grey3 font-bold rounded-full p-2 px-2 text-Teal3"
              onClick={() => {
                setModalChooseAddress((pre) => (pre = !pre));
              }}
            >
              Thay đổi
            </button>
          </Flex>
        ) : (
          <Flex justify="space-between" align="center">
            <p className="text-Red mr-1 font-semibold text-[16px]">
              Chưa có địa chỉ nhận hàng
            </p>
            <button
              className="border-[1px] min-w-[5rem] bg-Black border-Grey3 font-bold rounded-full p-2 px-2 text-Red"
              onClick={() => dispatch(toggle("modalAddAddress"))}
            >
              Thêm
            </button>
          </Flex>
        )}
      </Card>
      {/* danh sách sản phẩm */}
      {cartChoosed?.map((item) => {
        return <CartItemChoose key={item._id} item={item} />;
      })}

      <Modal
        open={modalChooseAddress}
        title={isAuthenticated ? "Chọn địa chỉ" : null}
        footer={null}
        onCancel={() => setModalChooseAddress(false)}
      >
        {isAuthenticated ? (
          user.addresses.map((item) => {
            return (
              <Card
                key={item._id}
                onClick={() => {
                  setAddressDelivery(item);
                  setModalChooseAddress(false);
                }}
                className={styles.cardAddress}
                style={{ marginBottom: "10px" }}
                hoverable
              >
                <Flex justify="space-between" align="center">
                  <div>
                    <Typography.Title level={4}>{item.name}</Typography.Title>
                    <Row>
                      <Col>
                        <strong>{item.name}</strong>
                        <Divider type="vertical" />
                        {item.phone}
                      </Col>
                      <Divider type="vertical" />
                      <Col>
                        {item.address}, {item.ward}, {item.district},{" "}
                        {item.city}
                        {item.active && <strong> (Mặc định)</strong>}
                      </Col>
                    </Row>
                  </div>
                  {item._id == addressDelivery?._id && (
                    <Button disabled>Đang sử dụng</Button>
                  )}
                </Flex>
              </Card>
            );
          })
        ) : (
          <>
            <Title level={4}>Cập nhật địa chỉ</Title>
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
                rules={[
                  { required: true, message: "Vui lòng chọn thành phố!" },
                ]}
              >
                <Select
                  options={provinces}
                  onChange={(value) => getDistricts(value, true)}
                />
              </Form.Item>
              <Form.Item
                label="Quận/huyện"
                name="district"
                rules={[
                  { required: true, message: "Vui lòng chọn quận/huyện!" },
                ]}
              >
                <Select
                  options={districts}
                  onChange={(value) => getWards(value, true)}
                />
              </Form.Item>
              <Form.Item
                label="Xã/phường"
                name="ward"
                rules={[
                  { required: true, message: "Vui lòng chọn xã/phường!" },
                ]}
              >
                <Select options={wards} />
              </Form.Item>
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
                          "Địa chỉ phải chứa ít nhất 5 ký tự."
                        );
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
                  Cập nhật địa chỉ
                </button>
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>

      <ModalAddAddress />
    </>
  );
};
export default ProductChooses;
