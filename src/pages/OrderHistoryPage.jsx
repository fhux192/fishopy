import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
 // Assume this is a function to fetch order history

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();



  return (
    <div className="container mx-auto">
        <div className="flex lg:mt-20 pt-4 pb-2 lg:pb-0 w-full justify-center whitespace-nowrap">
        <h1 className="w-[20rem] font-extrabold cursor-default text-primaryBlack lg:text-[2rem] text-[1.5rem] text-center border-b-2">
            Lịch Sử Đơn Hàng
        </h1>
      </div>
      {orders.length === 0 ? (
        <p className="mx-8">Hello, World!</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h2 className="text-lg font-semibold">Order #{order.id}</h2>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <div className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </div>
              </div>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>x{item.quantity}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold">${order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
