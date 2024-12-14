import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Modal,
  Select,
  TreeSelect,
  message,
} from "antd";
import axios from "axios";
import { useForm } from "antd/es/form/Form";
import firebase from "../../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { toggleVerify } from "../../../redux/features/toggle/toggleSlice";
import OTPInput from "react-otp-input";
import { CloseOutlined } from "@ant-design/icons";

const Payment = ({ setStep, cart }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const dispatch = useDispatch();
  const { showVerify } = useSelector((state) => state.toggle);
  const [otp, setOtp] = useState("");
  const verifyOTP = () => {
    window.confirmationResult
      .confirm(otp)
      .then(() => {
        // User signed in successfully.
        dispatch(toggleVerify());
        message.success("Đặt hàng thành công");
        setStep(3);
      })
      .catch((error) => {
        // Giả sử error.message chứa thông điệp lỗi từ server
        if (error.message.includes("SESSION_EXPIRED")) {
          message.error("OTP đã hết hạn. Vui lòng thử lại.");
        } else if (error.message.includes("OTP is incorrect")) {
          message.error("OTP không chính xác. Vui lòng nhập lại.");
        } else {
          message.error(error.message);
        }
      });
  };

  // use form
  const [form] = Form.useForm();

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

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        defaultCountry: "VN",
      }
    );
  };

  const sentOTP = async () => {
    const appVerifier = window.recaptchaVerifier;
    await firebase
      .auth()
      .signInWithPhoneNumber(
        formatPhoneNumber(form.getFieldValue("phone")),
        appVerifier
      )
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        message.success("Sent OTP successfully!");
        dispatch(toggleVerify());
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  useEffect(() => {
    setupRecaptcha();
    getCitys();
  }, []);

  const handleChangeProvice = async () => {
    const res = await axios.get(
      `https://vapi.vnappmob.com/api/province/district/${form.getFieldValue(
        "province"
      )}`
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
      `https://vapi.vnappmob.com/api/province/ward/${form.getFieldValue(
        "district"
      )}`
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

  const paymentMethods = [
    { value: "COD", label: "Thanh toán khi nhận hàng" },
    { value: "BankTransfer", label: "Chuyển khoản ngân hàng" },
    { value: "Momo", label: "Chuyển khoản qua Momo" },
  ];

  // Hàm để format số điện thoại
  const formatPhoneNumber = (phoneNumber) => {
    if (phoneNumber.startsWith("0")) {
      return "+84" + phoneNumber.substring(1);
    }
    return phoneNumber; // Trả về nguyên vẹn nếu không bắt đầu bằng '0'
  };

  return (
    <Card>
      <Form
        form={form}
        variant="filled"
        style={{ maxWidth: 600 }}
        onFinish={sentOTP}
      >
        <Form.Item
          label="Tên người nhận"
          name="name"
          labelCol={{ span: 24 }}
          rules={[{ required: true, msg: "Vui lòng nhập tên người nhận!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          labelCol={{ span: 24 }}
          name="phone"
          rules={[
            { required: true, msg: "Vui lòng nhập số điện thoại!" },
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
          label="Thành phố "
          labelCol={{ span: 24 }}
          name="province"
          rules={[{ required: true, msg: "Vui lòng chọn thành phố!" }]}
        >
          <Select options={provinces} onChange={handleChangeProvice} />
        </Form.Item>

        <Form.Item
          label="Quận/huyện"
          labelCol={{ span: 24 }}
          name="district"
          rules={[{ required: true, msg: "Vui lòng chọn quận/huyện!" }]}
        >
          <Select options={districts} onChange={handleChangeDistrict} />
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
          label="Phương thức thanh toán"
          name="paymentmethod"
          labelCol={{ span: 24 }}
          rules={[
            { required: true, msg: "Vui lòng chọn phương thức thanh toán!" },
          ]}
        >
          <Select options={paymentMethods} />
        </Form.Item>
        <Form.Item>
          <button
            type="submit"
            className="w-full bg-black hover:bg-primaryTeal text-white font-bold py-3 px-4 rounded-xl"
          >
            Thanh toán
          </button>
        </Form.Item>
        <div id="recaptcha-container"></div>
      </Form>

      <Modal
        open={showVerify}
        footer={
          <button
            className="w-[10rem] bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-xl mt-4"
            onClick={verifyOTP}
            type="primary"
          >
            Xác nhận
          </button>
        }
        closeIcon={<CloseOutlined onClick={() => dispatch(toggleVerify())} />}
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
  );
};
export default Payment;
