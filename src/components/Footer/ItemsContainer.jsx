export const ItemsContainer = () => {
  const PRODUCTS = [
    { text: "Hướng Dẫn Thanh Toán ", link: "#" },
    { text: "Địa chỉ: 10/5C ấp 3 xã Đông Thạnh huyện Hóc Môn", link: "#" },
    
  ];
  const CONTACT = [
    { text: "Số Điện Thoại: 0941087880", link: "#" },
    { text: "Email: hoangphuc395@gmail.com", link: "#" },
    { text: "Zalo: Nguyễn Hoàng Phúc", link: "#" },
    { text: "Facebook: Phúc Nguyễn", link: "#" },
  ];
  const COSTOMER = [
    { text: "Giỏ Hàng", link: "#" },
    { text: "Kiểm Tra Đơn Hàng", link: "#" },
  ];
  return (
    <div className=" grid bg-primaryBlack grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 ">
      <ul>
        <h1 className="mb-1 font-semibold text-white text-2xl">Khách Hàng</h1>
        {COSTOMER.map((link) => (
          <li key={link.text}>
            <a
              className="text-white hover:text-teal-400 duration-300
          text-sm cursor-pointer leading-6"
              href={link.link}
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>
      <ul>
        <h1 className="mb-1 font-semibold text-white text-2xl">Liên Hệ</h1>
        {CONTACT.map((link) => (
          <li key={link.text}>
            <a
              className="text-white hover:text-teal-400 duration-300
          text-sm cursor-pointer leading-6"
              href={link.link}
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>
      <ul>
        <h1 className="mb-1 font-semibold text-white text-2xl">Liên Hệ</h1>
        {CONTACT.map((link) => (
          <li key={link.text}>
            <a
              className="text-white hover:text-teal-400 duration-300
          text-sm cursor-pointer leading-6"
              href={link.link}
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>
      <ul>
        <h1 className="mb-1 font-semibold text-white text-2xl">Thông Tin</h1>
        {PRODUCTS.map((link) => (
          <li key={link.text}>
            <a
              className="text-white hover:text-teal-400 duration-300
          text-sm cursor-pointer leading-6"
              href={link.link}
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
