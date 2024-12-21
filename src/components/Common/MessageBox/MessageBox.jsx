import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { SiZalo } from "react-icons/si";

const MessageBox = () => {
  const location = useLocation();

  const messages = [
    "Bạn cần giúp gì không?",
    "Hôm nay của bạn thế nào?",
    "Đừng ngại hỏi mình nhé!",
    "Cần hỗ trợ thì nói mình nhé!",
    "Bạn dẫn mình đi mua cá đi!",
  ];

  // Danh sách khách hàng, logic random quantity, v.v.
  const customers = [
    { name: "Nguyễn Phúc An", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Trần Long Quang", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Lê Duy Khánh", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Phạm Minh Tùng", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Hoàng Thiên Sơn", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Vũ Tân Huy", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Đặng Quang Bình", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Bùi Hùng Dũng", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Đỗ Bình An", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Ngô Hải Long", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Trần Quang Hùng", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Lê Minh Châu", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Nguyễn Thị Lan", quantity: Math.floor(Math.random() * 7) + 1 },
    {
      name: "Nguyễn Thị Hải Yến",
      quantity: Math.floor(Math.random() * 7) + 1,
    },
    { name: "Phan Đức Lộc", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Vũ Quang Huy", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Lương Thị Kiều", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Trần Quang Tiến", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Nguyễn Quỳnh Hoa", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Hoàng Thị Lan Anh", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Đặng Tuấn Anh", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Trương Thị Lệ", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Nguyễn Duy Khánh", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Nguyễn Tiến Lộc", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Trần Tâm Hồng", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Phạm Minh Trường", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Lê Tuấn Anh", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Nguyễn Lan Phương", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Đinh Ngọc Trâm", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Nguyễn Quang Minh", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Vũ Thanh Mai", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Đỗ Quang Huy", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Bùi Duy Kiên", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Lý Thị Thu", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Lê Duy Quang", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Phạm Hải Long", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Nguyễn Ngọc Quỳnh", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Trần Thanh Mai", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Hoàng Quốc Toàn", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Phan Thanh Tâm", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Lê Hồng Thái", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Nguyễn Hoài An", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Vũ Trí Duy", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Nguyễn Xuân Dương", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Trần Thị Thanh", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Nguyễn Bảo Quân", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Lê Thanh Tài", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Trần Quỳnh Hoa", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Nguyễn Kiều Ngân", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Vũ Minh Tân", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Bùi Khánh Minh", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Lý Minh Tuấn", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Trần Hoài Thu", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Phạm Quỳnh", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Trần Thanh Lan", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Nguyễn Hoài Thu", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Vũ Minh Đức", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Lê Thị Thu", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Trần Thanh Vân", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Lý Hải Duy", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Tạ Tuấn Anh", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Phan Văn Tú", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Trần Đình Khoa", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Nguyễn Minh Trí", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Lê Tín Hoàng", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Vũ Hải Đăng", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Bùi Lương Tuấn", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Hoàng Duy Anh", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Nguyễn Cảnh Lâm", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Phạm Tiến Dũng", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Trương Anh Khoa", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Lê Hữu Sơn", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Nguyễn Bá Tuấn", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Đặng Trọng Quân", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Vũ Tuấn Anh", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Cao Xuân Tùng", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Lê Thị Yến", quantity: Math.floor(Math.random() * 7) + 1 },
    {
      name: "Nguyễn Hương Giang",
      quantity: Math.floor(Math.random() * 7) + 1,
    },
    { name: "Trần Khánh Linh", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Phan Trường Giang", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Bùi Thanh Tú", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Nguyễn Tiến Thanh", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Vũ Bảo Nam", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Trần Đinh Trí", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Lê Minh Tuấn", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Nguyễn Thu Giang", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Trần Hồng Lan", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Vũ Thanh Đào", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Lê Quang Thắng", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Nguyễn Hữu Thiện", quantity: Math.floor(Math.random() * 7) + 1 },
    { name: "Phạm Thảo My", quantity: Math.floor(Math.random() * 7) + 1 },
  ];

  // Các state quản lý hiển thị tin nhắn
  const [showMessage, setShowMessage] = useState(false);
  const [animateWave, setAnimateWave] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(messages[0]);

  // Random từ 7s đến 37s
  const getRandomTime = () => Math.floor(Math.random() * 30000) + 7000;

  useEffect(() => {
    // Định kỳ hiển thị tin ngẫu nhiên
    const showMessageInterval = setInterval(() => {
      setShowMessage(true);
      setCurrentMessage(messages[Math.floor(Math.random() * messages.length)]);

      // Lấy 1 khách hàng random
      const customer = customers[Math.floor(Math.random() * customers.length)];

      setCurrentMessage(
        <span>
          <span style={{ color: "#09D1C7", fontWeight: "bold" }}>
            {customer.name}
          </span>{" "}
          vừa mua {customer.quantity} cặp cá
        </span>
      );

      setAnimateWave(true);

      // Sau 4 giây thì ẩn tin nhắn
      const hideTimer = setTimeout(() => {
        setShowMessage(false);
        setAnimateWave(false); // Tắt hiệu ứng lắc icon
      }, 4000);

      return () => clearTimeout(hideTimer);
    }, getRandomTime());

    return () => clearInterval(showMessageInterval);
  }, []);

  // Khi showMessage = true, ta bật animate icon
  useEffect(() => {
    if (showMessage) {
      setAnimateWave(true);
    }
  }, [showMessage]);

  return (
    <div className="fixed bottom-[5rem] lg:bottom-[1rem] lg:right-[1rem] right-[1rem] z-[9999]">
      {/* Ẩn MessageBox nếu đang ở trang /order (theo logic ban đầu) */}
      {location.pathname !== "/order" && (
        <>
          <div className="flex flex-col items-end">
            <AnimatePresence>
              {showMessage && (
                <motion.div
                  key="message"
                  /* 
                    Thay đổi animation để tạo hiệu ứng bounce:
                    - initial: scale nhỏ, dịch xuống, ẩn
                    - animate: scale 1, hiển thị, dịch về vị trí ban đầu
                    - exit: scale nhỏ lại, ẩn dần
                    - transition: dùng type: 'spring' + stiffness + damping 
                  */
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 30 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  className="bg-Black min-w-[9rem] rounded-xl rounded-b-none rounded-l-xl font-semibold p-3 mb-2 text-sm text-gray-800"
                  style={{
                    position: "absolute",
                    bottom: "30px",
                    right: "45px",
                    textAlign: "center",
                  }}
                >
                  <p className="text-White">{currentMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Link sang Zalo, icon + hiệu ứng */}
            <motion.a
              whileHover={{ scale: 1.3 }}
              href="https://zalo.me/0388811160"
              target="_blank"
              rel="noopener noreferrer"
              className={`relative max-w-[100px] h-[40px] shadow-md shadow-gray-500 rounded-full bg-white cursor-pointer flex justify-center items-center ${
                animateWave ? "waving-icon" : ""
              }`}
            >
              <div className="flex justify-center items-center w-[40px] h-[40px]">
                <SiZalo
                  className="text-blue-500"
                  style={{ fontSize: "32px" }}
                />
              </div>
              <div className="light-rays"></div>
            </motion.a>
          </div>

          {/* CSS cho hiệu ứng lắc icon + ánh sáng tỏa */}
          <style>
            {`
            @keyframes wave {
              0% { transform: rotate(0deg); }
              7% { transform: rotate(14deg); }
              20% { transform: rotate(-8deg); }
              30% { transform: rotate(14deg); }
              40% { transform: rotate(-4deg); }
              50% { transform: rotate(10deg); }
              60% { transform: rotate(0deg); }
              100% { transform: rotate(0deg); }
            }
            .waving-icon {
              animation: wave 1s 1;
            }
            .light-rays {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              border-radius: 50%;
              background: radial-gradient(circle, transparent 60%, rgba(0, 100, 250, 0.5) 80%);
              pointer-events: none;
              animation: light-ray-animation 2s infinite;
            }
            @keyframes light-ray-animation {
              0% {
                box-shadow: 0 0 10px 12px rgba(0, 100, 250, 0.5),
                            0 0 10px 7px rgba(0, 100, 250, 0.3),
                            0 0 10px 4px rgba(0, 100, 250, 0.1);
              }
              50% {
                box-shadow: 0 0 10px 2px rgba(0, 100, 250, 0.5),
                            0 0 10px 5px rgba(0, 100, 250, 0.3),
                            0 0 10px 6px rgba(0, 100, 250, 0.1);
              }
              100% {
                box-shadow: 0 0 10px 6px rgba(0, 100, 250, 0.5),
                            0 0 10px 8px rgba(0, 100, 250, 0.3),
                            0 0 10px 10px rgba(0, 100, 250, 0.1);
              }
            }
          `}
          </style>
        </>
      )}
    </div>
  );
};

export default MessageBox;
