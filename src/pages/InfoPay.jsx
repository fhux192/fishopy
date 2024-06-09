/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input, Select} from "antd";
import { vietnamData } from "../data/VietNamData.jsx";

const { Option } = Select;

const InfoPay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [form] = Form.useForm();

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const handleFinish = (values) => {
    alert("Thông tin đã được gửi!");
  };

  const handleFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const cityOptions = Object.keys(vietnamData).map((city) => ({
    value: city,
    label: city,
  }));

  const getDistrictOptions = (city) =>
    city
      ? Object.keys(vietnamData[city] || {}).map((district) => ({
          value: district,
          label: district,
        }))
      : [];

  const getWardOptions = (city, district) =>
    city && district
      ? (vietnamData[city][district] || []).map((ward) => ({
          value: ward,
          label: ward,
        }))
      : [];

  const handleCityChange = (value) => {
    setSelectedCity(value);
    form.setFieldsValue({ district: null, ward: null });
    setSelectedDistrict(null);
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    form.setFieldsValue({ ward: null });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex justify-center items-center p-4 lg:p-10">
        <div className="w-full max-w-5xl bg-white shadow-md rounded p-6 lg:p-10">
          <h2 className="text-3xl font-bold mb-6">Thanh toán</h2>
          <Form
            form={form}
            onFinish={handleFinish}
            onFinishFailed={handleFinishFailed}
            layout="vertical"
            initialValues={{
              recipientName: "",
              phoneNumber: "",
              city: null,
              district: null,
              ward: null,
              paymentMethod: null,
              orderNote: "",
              discountCode: "",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <Form.Item
                  label="Tên người nhận"
                  name="recipientName"
                  rules={[{ required: true, message: "Tên người nhận là bắt buộc" }]}
                >
                  <Input placeholder="Tên người nhận" />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="phoneNumber"
                  rules={[
                    { required: true, message: "Số điện thoại là bắt buộc" },
                    {
                      pattern: /^(0|\+84)[3-9][0-9]{8}$/,
                      message: "Số điện thoại không hợp lệ",
                    },
                  ]}
                >
                  <Input placeholder="Số điện thoại" />
                </Form.Item>
                <Form.Item label="Thành phố" name="city">
                  <Select
                    placeholder="Chọn thành phố"
                    onChange={handleCityChange}
                  >
                    {cityOptions.map((option) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="Quận/Huyện" name="district">
                  <Select
                    placeholder="Chọn quận/huyện"
                    onChange={handleDistrictChange}
                    disabled={!selectedCity}
                  >
                    {getDistrictOptions(selectedCity).map((option) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="Xã/Phường" name="ward">
                  <Select
                    placeholder="Chọn xã/phường"
                    disabled={!selectedDistrict}
                  >
                    {getWardOptions(selectedCity, selectedDistrict).map((option) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Địa chỉ nhận hàng"
                  name="address"
                  rules={[{ required: true, message: "Địa chỉ là bắt buộc" }]}
                >
                  <Input placeholder="VD: 10/5C ấp 3 xã Đông Thạnh huyện Hóc Môn TP.HCM" />
                </Form.Item>
                <Form.Item
                  label="Phương thức thanh toán"
                  name="paymentMethod"
                  rules={[{ required: true, message: "Phương thức thanh toán là bắt buộc" }]}
                >
                  <Select placeholder="Chọn phương thức thanh toán">
                    <Option value="COD">Thanh toán khi nhận hàng</Option>
                    <Option value="BankTransfer">Chuyển khoản ngân hàng</Option>
                    <Option value="Momo">Chuyển khoản qua Momo</Option>
                  </Select>
                </Form.Item>
                <Form.Item className="border-teal-700" label="Ghi chú đơn hàng" name="orderNote">
                  <Input.TextArea placeholder="Ghi chú" />
                </Form.Item>
              </div>
              <div>
                <div className="border-t border-gray-300 mt-[-1rem] lg:mt-6 pt-4">
                  <h3 className="text-xl font-bold mb-4">Đơn hàng (1 cặp cá)</h3>
                  <div className="flex justify-center mb-6">
                    <img
                      src={product?.proImg}
                      alt={product?.title}
                      className="w-[10rem] h-[10rem] object-contain"
                    />
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700 text-md lg:text-xl">
                      {product?.title}
                    </span>
                    <span className="text-gray-700 text-md lg:text-xl">
                      {product?.price}/đôi(cặp)
                    </span>
                  </div>
                  <Form.Item name="discountCode">
                    <div className="flex gap-4 mb-7">
                      <Input
                        placeholder="Mã giảm giá"
                        className="shadow appearance-none border rounded-xl w-[60%] lg:text-md text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <button
                        type="button"
                        className="bg-gray-500 w-[40%] lg:text-md text-sm hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-xl"
                      >
                        Áp dụng
                      </button>
                    </div>
                  </Form.Item>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Tạm tính:</span>
                    <span className="text-gray-700">{product?.price}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Giảm giá:</span>
                    <span className="text-gray-700">0đ</span>
                  </div>
                  <div className="flex justify-between items-center font-bold mb-7">
                    <span className="text-gray-700">Tổng thanh toán:</span>
                    <span className="text-gray-700">{product?.price}</span>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-black hover:bg-primaryTeal text-white font-bold py-3 px-4 rounded-xl"
                  >
                    THANH TOÁN
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-xl mt-4"
                  >
                    QUAY LẠI
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default InfoPay;
