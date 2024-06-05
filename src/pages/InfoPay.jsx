/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { vietnamData } from "../data/VietNamData.jsx";

const InfoPay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [formData, setFormData] = useState({
    recipientName: "",
    phoneNumber: "",
    address: "",
    city: null,
    district: null,
    ward: null,
    paymentMethod: null,
    orderNote: "",
    discountCode: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: selectedOption };
      
      if (name === "city" || name === "district" || name === "ward") {
        const newAddress = [
          newData.ward?.label,
          newData.district?.label,
          newData.city?.label
        ].filter(Boolean).join(", ");

        return { ...newData, address: newAddress };
      }

      return newData;
    });
  };

  const isPhoneNumberValid = (phoneNumber) => {
    const phoneRegex = /^(0|\+84)[3-9][0-9]{8}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.recipientName)
      newErrors.recipientName = "Tên người nhận là bắt buộc";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Số điện thoại là bắt buộc";
    else if (!isPhoneNumberValid(formData.phoneNumber))
      newErrors.phoneNumber = "Số điện thoại không hợp lệ";
    if (!formData.address) newErrors.address = "Địa chỉ là bắt buộc";
    if (!formData.paymentMethod)
      newErrors.paymentMethod = "Phương thức thanh toán là bắt buộc";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      // Handle form submission
      alert("Thông tin đã được gửi!");
    }
  };

  const cityOptions = Object.keys(vietnamData).map((city) => ({
    value: city,
    label: city,
  }));

  const districtOptions = formData.city
    ? Object.keys(vietnamData[formData.city.value] || {}).map((district) => ({
        value: district,
        label: district,
      }))
    : [];

  const wardOptions =
    formData.city && formData.district
      ? (vietnamData[formData.city.value][formData.district.value] || []).map(
          (ward) => ({
            value: ward,
            label: ward,
          })
        )
      : [];

  const paymentMethods = [
    { value: "COD", label: "Thanh toán khi nhận hàng" },
    { value: "BankTransfer", label: "Chuyển khoản ngân hàng" },
    { value: "Momo", label: "Chuyển khoản qua Momo" },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "none",
      boxShadow: "none",
      minHeight: "3rem", // Set minimum height to match input fields
      height: "3rem", // Set height to match input fields
      "&:hover": {
        border: "none",
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "3rem", // Set height to match input fields
      padding: "0 1rem",
    }),
    input: (provided) => ({
      ...provided,
      margin: 0,
    }),
    indicatorSeparator: (provided) => ({
      display: "none",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "3rem", // Set height to match input fields
    }),
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex justify-center items-center p-4 lg:p-10">
        <div className="w-full max-w-5xl bg-white shadow-md rounded p-6 lg:p-10">
          <h2 className="text-3xl font-bold mb-6">Thanh toán</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Tên người nhận <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Tên người nhận"
                  />
                  {errors.recipientName && (
                    <p className="text-red-500 text-xs italic">
                      {errors.recipientName}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Số điện thoại"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs italic">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Thành phố
                  </label>
                  <Select
                    name="city"
                    value={formData.city}
                    onChange={handleSelectChange}
                    options={cityOptions}
                    styles={customStyles}
                    className="shadow appearance-none border rounded-xl w-full px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Chọn thành phố"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs italic">{errors.city}</p>
                  )}
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Quận/Huyện
                  </label>
                  <Select
                    name="district"
                    value={formData.district}
                    onChange={handleSelectChange}
                    options={districtOptions}
                    styles={customStyles}
                    className="shadow appearance-none border rounded-xl w-full px-1  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Chọn quận/huyện"
                    isDisabled={!formData.city}
                  />
                  {errors.district && (
                    <p className="text-red-500 text-xs italic">
                      {errors.district}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Xã/Phường
                  </label>
                  <Select
                    name="ward"
                    value={formData.ward}
                    onChange={handleSelectChange}
                    options={wardOptions}
                    styles={customStyles}
                    className="shadow appearance-none border rounded-xl w-full px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Chọn xã/phường"
                    isDisabled={!formData.district}
                  />
                  {errors.ward && (
                    <p className="text-red-500 text-xs italic">{errors.ward}</p>
                  )}
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Địa chỉ nhận hàng <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="VD: 10/5C ấp 3 xã Đông Thạnh huyện Hóc Môn TP.HCM"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs italic">
                      {errors.address}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Phương thức thanh toán{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <Select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleSelectChange}
                    options={paymentMethods}
                    styles={customStyles}
                    className="shadow appearance-none border rounded-xl w-full py-0 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Chọn phương thức thanh toán"
                  />
                  {errors.paymentMethod && (
                    <p className="text-red-500 text-xs italic">
                      {errors.paymentMethod}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Ghi chú đơn hàng
                  </label>
                  <textarea
                    name="orderNote"
                    value={formData.orderNote}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Ghi chú"
                  ></textarea>
                </div>
              </div>
              <div>
                <div className="border-t border-gray-300 mt-[-1rem] lg:mt-6 pt-4">
                  <h3 className="text-xl font-bold mb-4">
                    Đơn hàng (1 cặp cá)
                  </h3>
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
                  <div className="flex gap-4 mb-7">
                    <input
                      type="text"
                      name="discountCode"
                      value={formData.discountCode}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded-xl w-[60%] lg:text-md text-sm py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Mã giảm giá"
                    />
                    <button
                      type="button"
                      className="bg-gray-500 w-[40%] lg:text-md text-sm hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-xl"
                    >
                      Áp dụng
                    </button>
                  </div>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default InfoPay;
