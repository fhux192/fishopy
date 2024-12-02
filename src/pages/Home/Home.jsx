import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../scss/home.scss";
import { FaFishFins } from "react-icons/fa6";
import { FaCircleArrowDown } from "react-icons/fa6";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const [startAnimation, setStartAnimation] = useState(false);

  const handleNavigation = () => {
    setStartAnimation(true);
    navigate("/product");
  };

  useEffect(() => {
    // Cập nhật các thẻ meta để tối ưu SEO và chia sẻ trên mạng xã hội
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute("content", "https://link.to/your-thumbnail.jpg");
    } else {
      const metaOgImage = document.createElement("meta");
      metaOgImage.setAttribute("property", "og:image");
      metaOgImage.setAttribute("content", "https://link.to/your-thumbnail.jpg");
      document.head.appendChild(metaOgImage);
    }

    const metaOgTitle = document.createElement("meta");
    metaOgTitle.setAttribute("property", "og:title");
    metaOgTitle.setAttribute("content", "Guppy Hóc Môn | Trại Cá Guppy Bất Ổn");
    document.head.appendChild(metaOgTitle);

    const metaOgDescription = document.createElement("meta");
    metaOgDescription.setAttribute("property", "og:description");
    metaOgDescription.setAttribute(
      "content",
      "Trang Web Chính Thức của Trại Cá Guppy Bất Ổn. Cung cấp cá Guppy chất lượng cao, đa dạng chủng loại, giao hàng toàn quốc. Bảo hành 1 đổi 1"
    );
    document.head.appendChild(metaOgDescription);

    const metaOgType = document.createElement("meta");
    metaOgType.setAttribute("property", "og:type");
    metaOgType.setAttribute("content", "website");
    document.head.appendChild(metaOgType);
  }, []);

  return (
    <div className="min-h-screen pb-10 flex items-center justify-center">
      <div className="container px-6">
        <div className="bg-black mt-20 rounded-3xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Nội dung */}
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <h1 className="text-5xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                Cá{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg,#15919B, #09D1C7, #46DFB1 47%, #0C6478)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Guppy
                </span>
              </h1>

              <p className="text-Grey font-semibold text-lg sm:text-xl mb-6">
                Cung cấp cá guppy chất lượng cao, đa dạng chủng loại, giao hàng
                toàn quốc. <span className="text-white">Bảo hành 1 đổi 1</span>{" "}
                cá có vấn đề khi nhận hàng.
              </p>

              <button
                onClick={handleNavigation}
                className="flex items-center justify-center bg-teal-500 py-3 text-white font-semibold rounded-full transition duration-300"
              >
                <FaFishFins className="mr-3 min-w-[20px] text-lg" />
                Xem Tất Cả Sản Phẩm
              </button>
            </div>

            {/* Hình ảnh với hiệu ứng mờ ở dưới */}
            <div className="md:w-1/2 relative">
              <img
                src="https://png.pngtree.com/png-vector/20231018/ourmid/pngtree-guppy-fish-isolated-on-white-background-small-png-image_10243212.png" // Thay thế bằng URL hình ảnh của bạn
                alt="Guppy Fish"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mũi tên xuống */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, 15, 0] }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="flex justify-center mt-8"
        >
          <FaCircleArrowDown className="text-white text-3xl animate-bounce" />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
