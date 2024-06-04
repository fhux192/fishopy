import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/Admin/NavBar/NavBar";

const InfoPay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [formData, setFormData] = useState({
    recipientName: "",
    phoneNumber: "",
    address: "",
    paymentMethod: "",
    orderNote: "",
    discountCode: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.recipientName)
      newErrors.recipientName = "Tên người nhận là bắt buộc";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Số điện thoại là bắt buộc";
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
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    Địa chỉ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Địa chỉ"
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
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Chọn phương thức thanh toán</option>
                    <option>Thanh toán khi nhận hàng</option>
                    <option>Thanh toán bằng thẻ</option>
                    <option>Thanh toán qua ví điện tử</option>
                  </select>
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
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Ghi chú"
                  ></textarea>
                </div>
              </div>
              <div>
                <div className="border-t border-gray-300 mt-6 pt-4">
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
                    <span className="text-gray-700">{product?.title}</span>
                    <span className="text-gray-700">{product?.price}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      type="text"
                      name="discountCode"
                      value={formData.discountCode}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Mã giảm giá"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <button
                      type="button"
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
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
                  <div className="flex justify-between items-center font-bold mb-4">
                    <span className="text-gray-700">Tổng thanh toán:</span>
                    <span className="text-gray-700">{product?.price}</span>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-black hover:bg-primaryTeal text-white font-bold py-3 px-4 rounded"
                  >
                    THANH TOÁN
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded mt-4"
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
