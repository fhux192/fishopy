/* eslint-disable no-unused-vars */
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
    description: `Cá vàng là một loài cá thuộc họ cá cảnh (Cyprinidae), được yêu thích và nuôi trồng rộng rãi trên khắp thế giới. Loài cá này có nguồn gốc từ Trung Quốc và đã được nuôi trồng từ hàng ngàn năm trước Công nguyên. Cá vàng có thể sống trong các hồ cá, ao, và các bể cá cảnh, và được biết đến với sự đa dạng về màu sắc, hình dáng, và kích thước.

    Cá vàng có thể có màu vàng, đỏ, trắng, đen, và nhiều màu khác, với các độ dài khác nhau từ vài cm đến hơn 30 cm. Loài cá này có thể sinh sản bằng cách gửi trứng và spermatozoa, và trẻ cá sinh ra sau khoảng 2-7 ngày. Cá vàng là một loài cá lưỡng cấp, ăn chủ yếu các loài sinh vật nhỏ như sinh vật sống sót, quả cá, và các loài động vật nhỏ khác.
    
    Cá vàng được nuôi trồng như một loài cá cảnh để trang trí các hồ cá, ao, và các bể cá cảnh. Loài cá này cũng được coi là một biểu tượng của may mắn và phúc lợi trong văn hóa Trung Quốc. Cá vàng yêu thích sống trong nước được lọc sạch, với độ pH từ 6,0 đến 8,0, và nhiệt độ từ 18 đến 22 độ C. Cá vàng cần được cung cấp đủ oxy và thức ăn phù hợp để duy trì sức khỏe và tăng trưởng.
    
    Ngoài việc nuôi trồng như một loài cá cảnh, cá vàng cũng được sử dụng trong các nghiên cứu khoa học và y học, bao gồm các nghiên cứu về sinh học, động lực học, và các bệnh về gan. Cá vàng là một loài cá quen thuộc và được yêu thích bởi nhiều người, và đóng một vai trò quan trọng trong việc giải trí và tạo điều kiện sống tốt cho con người.`,
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
    <div className="flex bg-gray-200 ">
      <div className="my-[1rem] mx-auto" >
        <div className="w-[80rem] h-auto rounded shadow-black bg-white">
          <div className="h-10"></div>
          <div className="grid grid-cols-2 gap-4  mx-10">
            <div className="w-[35.8rem]">
              <ImageGallery className="w-full h-full" items={images} />
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl">{fish.title}</h1>
              <p className="">
                Giá: <span className="text-red-500">{fish.price}</span>
              </p>
              <div className="flex gap-4">
                Tình trạng:
                <p
                  className={`${
                    fish.status === "Còn Hàng"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {fish.status}
                </p>
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
            <div className="grid gap-4 text-center mt-10 mx-[7rem] mb-10">
              <span className=" text-3xl"> Mô Tả</span>
              <p className="text-left text-primaryBlack whitespace-pre-line text-[20px]">{fish.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailProductPage;
