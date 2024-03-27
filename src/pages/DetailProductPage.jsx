import { useParams } from "react-router-dom";
import fish1 from "../assets/fishCardImg/fish (1).png";
import ImageGallery from "react-image-gallery";

const DetailProductPage = () => {
  const { id } = useParams();
  const fish = {
    id: 1,
    cardImg: fish1,
    proImg: fish1,
    title: "Cá Vàng",
    price: "100.000đ",
    description: "Cá tươi, ngon, giàu dinh dưỡng.",
    status: "Còn Hàng",
    introduction: `Nói đến cá bảy màu, người ta sẽ nghĩ ngay đến đây đặc điểm nổi bật này. Đó là chúng có nhiều màu sắc khác nhau và thân khá nhỏ.

      Bởi loài cá này thuộc họ cá Khổng tước, chỉ dài khoảng 2,5cm-6 cm. Và chúng là dạng cá đẻ con. Nên việc gia tăng quân số cũng sẽ dễ dàng hơn.
  
      Cá bảy màu còn được gọi thông dụng trong tiếng anh là Guppy. Cá bảy màu đã được đưa vào nhiều quốc gia khác nhau tại mọi châu lục. Bởi đây là giống cá dễ nuôi, dễ chăm sóc, sinh sản nhanh, đa dạng và khá phong phú.

      Cá bảy màu thường đẻ nhiều, thời gian mang thai trung bình khoảng 28 ngày. Đặc biệt loại cá này sống và phát triển trong môi trường nước ngọt.

      Cá bảy màu là một trong những loại cá được yêu thích và ưa chuộng. Bởi không những làm lạ mắt và đa dạng hóa trong bể cá nhà bạn. Mà nó còn mang đến sự lung linh đến huyền diệu.`,
  };

  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];

  return (
    <div className="w-[78rem] h-[50rem] mx-auto">
      <div className="h-10"></div>
      <div className="grid grid-cols-2 gap-4  ">
        <div className="w-[38.8rem]">
          <ImageGallery className="w-full h-full" items={images} />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl">{fish.title}</h1>
          <p className="">
            Giá: <span className="text-red-500">{fish.price}</span>
          </p>
          <div className="flex gap-4">
            Tình trạng:
            <p className={`${fish.status === "Còn Hàng" ? "text-green-500" : "text-red-500"}`}>{fish.status}</p>  
          </div>

          <div className="h-[15rem]  shadow-md shadow-primaryGrey overflow-y-auto">
            <div className=" my-[1rem] mx-[1rem] ">
              <span className=" text-2xl">Giới Thiệu</span>
              <p className="  whitespace-pre-line text-md overflow-hidden">
                {fish.introduction}
              </p>
            </div>
          </div>
          <button className=" bg-primaryBlack rounded-full shadow-md shadow-black hover:shadow-teal-500 hover:text-teal-500 text-lg text-white py-2 ">
            Thêm Vào Giỏ Hàng
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="text-center mt-10">
          <span className="text-3xl"> Mô Tả</span>
          <p>{fish.description}</p>
        </div>
      </div>
    </div>
  );
};
export default DetailProductPage;
