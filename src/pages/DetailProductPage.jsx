import { useParams } from "react-router-dom";
import fish1 from "../assets/fishCardImg/fish (1).png";
import ImageGallery from "react-image-gallery";

const DetailProductPage = () => {
  const { id } = useParams();
  const fish = {
    id: 1,
    cardImg: fish1,
    proImg: fish1,
    title: "Ca Vang 1",
    price: "100.000đ",
    description: "Cá vằng tươi, ngon, giàu dinh dưỡng.",
    status: "new",
    introduction:
      "Cá vằng là loài cá biển phổ biến, có thân hình dài và ít xương, thích hợp với nhiều món ăn khác nhau.",
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
    <div className="w-[1200px] h-[50rem] mt-[150px] mx-auto">
      <div className="grid grid-cols-2 gap-4  ">
        <div class="">
          <ImageGallery items={images} />
          <button className="bg-primaryBlack text-white py-2 ">
            Thêm Vào Giỏ Hàng
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl">{fish.title}</h1>
          <p className="">
            Giá: <span className="text-red-500">{fish.price}</span>
          </p>
          <p className="">Tình trạng: {fish.status}</p>
          <span className="text-2xl">Giới Thiệu</span>
          <p>{fish.introduction}</p>
          <span className="text-2xl"> Mô Tả</span>
          <p>{fish.description}</p>
        </div>
      </div>
    </div>
  );
};
export default DetailProductPage;
