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

import "../scss/infoPay.scss"; // Import your new SCSS file

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
    <div className="info-pay-container">
      <div className="info-pay-wrapper">
        <Card style={{ width: "100%" }}>
          <h2 className="title">Thông tin thanh toán</h2>

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
            <div className="product-summary">
              <h3 className="product-title">{product.title}</h3>
              <div className="product-info">
                <h3>{product.discount}₫</h3>
                <h3>x{quantity}</h3>
              </div>
            </div>

            <div className="product-image">
              <img
                src={product.proImg}
                alt="Cá Dumbo"
                className="image"
              />
            </div>
            <h3 className="total">
              Tổng thanh toán:
              <div className="total-amount">
                <div className="amount">
                  {product.discount * quantity}.000₫
                </div>
              </div>
            </h3>
            <Form.Item>
              <button
                className="pay-button"
              >
                <p className="button-text">THANH TOÁN</p>
              </button>
            </Form.Item>
            <div id="recaptcha-container"></div>
          </Form>

          <Modal
            open={isShowVerify}
            footer={
              <button
                className="verify-button"
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
            <div className="otp-input-container">
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
