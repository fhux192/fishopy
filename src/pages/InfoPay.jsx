import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, Select, Modal, message } from "antd";
import axios from "axios";
import { useForm } from "antd/es/form/Form";
import firebase from "../../firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { toggleVerify } from "../redux/features/toggle/toggleSlice.js";
import OTPInput from "react-otp-input";
import { CloseOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom"; // Import useLocation

const { Option } = Select;

const InfoPay = ({ setStep }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const location = useLocation(); // Use useLocation to get passed state
  const { product, quantity } = location.state; // Extract product and quantity from state

  const dispatch = useDispatch();
  const { isShowVerify } = useSelector((state) => state.toggle);
  const [otp, setOtp] = useState("");
  const verifyOTP = () => {
    window.confirmationResult
      .confirm(otp)
      .then(() => {
        dispatch(toggleVerify());
        message.success("Đặt hàng thành công");
        setStep(3);
      })
      .catch((error) => {
        if (error.message.includes("SESSION_EXPIRED")) {
          message.error("OTP đã hết hạn. Vui lòng thử lại.");
        } else if (error.message.includes("OTP is incorrect")) {
          message.error("OTP không chính xác. Vui lòng nhập lại.");
        } else {
          message.error(error.message);
        }
      });
  };

  const [form] = useForm();

  const getCities = async () => {
    const res = await axios.get("https://vapi.vnappmob.com/api/province/");
    if (res.status === 200) {
      setProvinces(
        res.data.results.map((item) => ({
          value: item.province_id,
          label: item.province_name,
        }))
      );
    }
  };

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        defaultCountry: "VN",
      }
    );
  };

  const sendOTP = async () => {
    const appVerifier = window.recaptchaVerifier;
    await firebase
      .auth()
      .signInWithPhoneNumber(
        formatPhoneNumber(form.getFieldValue("phone")),
        appVerifier
      )
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        message.success("Gửi OTP thành công!");
        dispatch(toggleVerify());
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  useEffect(() => {
    setupRecaptcha();
    getCities();
  }, []);

  const handleChangeProvince = async (value) => {
    const res = await axios.get(
      `https://vapi.vnappmob.com/api/province/district/${value}`
    );
    if (res.status === 200) {
      setDistricts(
        res.data.results.map((item) => ({
          value: item.district_id,
          label: item.district_name,
        }))
      );
    }
    form.setFieldsValue({ district: null, ward: null });
    setWards([]);
  };

  const handleChangeDistrict = async (value) => {
    const res = await axios.get(
      `https://vapi.vnappmob.com/api/province/ward/${value}`
    );
    if (res.status === 200) {
      setWards(
        res.data.results.map((item) => ({
          value: item.ward_id,
          label: item.ward_name,
        }))
      );
    }
    form.setFieldsValue({ ward: null });
  };

  const paymentMethods = [
    { value: "COD", label: "Thanh toán khi nhận hàng" },
    { value: "BankTransfer", label: "Chuyển khoản ngân hàng" },
    { value: "Momo", label: "Chuyển khoản qua Momo" },
  ];

  const formatPhoneNumber = (phoneNumber) => {
    if (phoneNumber.startsWith("0")) {
      return "+84" + phoneNumber.substring(1);
    }
    return phoneNumber;
  };

  return (
    <div className="w-full flex items-center justify-center bg-gray-100">
      <div className="p-4 w-full max-w-lg">
        <Card style={{ width: "100%" }}>
          <h2 className="text-xl font-bold mb-4">Thông tin thanh toán</h2>

          <Form
            form={form}
            variant="filled"
            style={{ maxWidth: 600 }}
            onFinish={sendOTP}
          >
            <Form.Item
              label="Tên người nhận"
              name="name"
              labelCol={{ span: 24 }}
              rules={[
                { required: true, message: "Vui lòng nhập tên người nhận!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              labelCol={{ span: 24 }}
              name="phone"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.resolve();
                    }
                    if (!value.startsWith("0")) {
                      return Promise.reject(
                        new Error("Số điện thoại phải bắt đầu bằng 0.")
                      );
                    }
                    if (value.length !== 10) {
                      return Promise.reject(
                        new Error("Số điện thoại phải có 10 chữ số.")
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Thành phố"
              labelCol={{ span: 24 }}
              name="province"
              rules={[{ required: true, message: "Vui lòng chọn thành phố!" }]}
            >
              <Select options={provinces} onChange={handleChangeProvince} />
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
              rules={[
                { required: true, message: "Vui lòng nhập địa chỉ nhận hàng!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phương thức thanh toán"
              name="paymentmethod"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn phương thức thanh toán!",
                },
              ]}
            >
              <Select options={paymentMethods} />
            </Form.Item>
            <div className="flex text-lg justify-between mb-2">
              <h3 className="text-xl ml-4 font-bold">{product.title}</h3>
              <div className="flex text-gray-600 gap-4">
                <h3>{product.discount}₫</h3>
                <h3>x{quantity}</h3>
              </div>
            </div>

            <div className="flex  text-md justify-center items-center mb-0 mt-4">
              <img
                src={product.proImg}
                alt="Cá Dumbo"
                className="w-[10rem] h-[10rem] object-contain mr-4"
              />
            </div>
            <h3 className="text-lg mb-8 text-end  text-gray-900">
              Tổng thanh toán:
              <div className="flex justify-end w-full text-white text-lg">
                <div className="bg-teal-700 rounded px-2 w-[10rem]">
                  {product.discount * quantity}.000₫
                </div>
              </div>
            </h3>
            <Form.Item>
              <button
                type="submit"
                className="w-full text-xl shadow-md shadow-gray-400 bg-black hover:bg-primaryTeal text-white font-bold py-2 px-4 rounded-xl"
              >
                THANH TOÁN
              </button>
            </Form.Item>
            <div id="recaptcha-container"></div>
          </Form>

          <Modal
            open={isShowVerify}
            footer={
              <button
                className="w-[10rem] bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-xl mt-4"
                onClick={verifyOTP}
                type="primary"
              >
                Xác nhận
              </button>
            }
            closeIcon={
              <CloseOutlined onClick={() => dispatch(toggleVerify())} />
            }
          >
            <div className="mt-10">
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  width: "100%",
                  border: "1px solid black",
                  height: "3rem",
                }}
              />
            </div>
          </Modal>
        </Card>
      </div>
    </div>
  );
};

export default InfoPay;
