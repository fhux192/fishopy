import fish1 from "../assets/fishCardImg/fish (1).png";
import fish2 from "../assets/fishCardImg/fish (2).png";
import fish3 from "../assets/fishCardImg/fish (3).png";
import fish4 from "../assets/fishCardImg/fish (4).png";
import fish5 from "../assets/fishCardImg/fish (5).png";
import fish6 from "../assets/fishCardImg/fish (6).png";
import fish7 from "../assets/fishCardImg/fish (7).png";
import fish8 from "../assets/fishCardImg/fish (8).png";
import fish9 from "../assets/fishCardImg/fish (9).png";
import fish10 from "../assets/fishCardImg/fish (10).png";
import fish11 from "../assets/fishCardImg/fish (11).png";
import fish12 from "../assets/fishCardImg/fish (12).png";
import fish13 from "../assets/fishCardImg/fish (13).png";
import fish14 from "../assets/fishCardImg/fish (14).png";
import fish15 from "../assets/fishCardImg/fish (15).png";
import fish16 from "../assets/fishCardImg/fish (16).png";
import fish17 from "../assets/fishCardImg/fish (17).png";
import fish18 from "../assets/fishCardImg/fish (18).png";
import fish19 from "../assets/fishCardImg/fish (19).png";
import fish20 from "../assets/fishCardImg/fish (20).png";
import fish21 from "../assets/fishCardImg/fish (21).png";
import fish22 from "../assets/fishCardImg/fish (22).png";
import fish23 from "../assets/fishCardImg/fish (23).png";
import fish24 from "../assets/fishCardImg/fish (24).png";
import fish25 from "../assets/fishCardImg/fish (25).png";
import fish26 from "../assets/fishCardImg/fish (26).png";
import fish27 from "../assets/fishCardImg/fish (27).png";
import fish28 from "../assets/fishCardImg/fish (28).png";
import fish29 from "../assets/fishCardImg/fish (29).png";
import fish31 from "../assets/fishCardImg/fish (31).png";
import fish32 from "../assets/fishCardImg/fish (32).png";
import fish33 from "../assets/fishCardImg/fish (33).png";
import fish34 from "../assets/fishCardImg/fish (34).png";
import fish35 from "../assets/fishCardImg/fish (35).png";
import fish36 from "../assets/fishCardImg/fish (36).png";
import fish37 from "../assets/fishCardImg/fish (37).png";
import fish38 from "../assets/fishCardImg/fish (38).png";
import fish39 from "../assets/fishCardImg/fish (39).png";
import fish40 from "../assets/fishCardImg/fish (40).png";
import fish41 from "../assets/fishCardImg/fish (41).png";
import fish42 from "../assets/fishCardImg/fish (42).png";
import fish43 from "../assets/fishCardImg/fish (43).png";
import fish44 from "../assets/fishCardImg/fish (44).png";
import fish45 from "../assets/fishCardImg/fish (45).png";
import fish46 from "../assets/fishCardImg/fish (46).png";
import fish47 from "../assets/fishCardImg/fish (47).png";
import fish48 from "../assets/fishCardImg/fish (48).png";
import caBien from "../assets/caBien.jpeg";
import combo from "../assets/Combo.png";
import logo from "../assets/logo.png";
const ProductsData = [
  {
    _id: 1,
    cardImg: fish1,
    proImg: [fish1], // Array with one image
    title: "DUMBO TAI VOI",
    price: "90.000",
    discount: "90.000",
    description: "Cá vằng tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    videoUrl: "https://www.youtube.com/embed/LGGDHKj0ByE",
    introduction: "Cá cảnh là các loài cá được nuôi để làm cảnh trong bể cá gia đình hoặc trưng bày công cộng. Chúng được yêu thích vì màu sắc rực rỡ và vẻ đẹp thẩm mỹ.",
  },
  {
    _id: 2,
    cardImg: fish2,
    proImg: [fish2], // Array of images
    title: "HB WHITE",
    price: "100.000",
    discount: "85.000",
    description: "Cá xanh tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá xanh là loài cá biển có màu da đặc trưng, có thể được nướng, hấp hoặc luộc với nhiều loại gia vị khác nhau.",
  },
  {
    _id: 3,
    cardImg: fish3,
    proImg: [fish3], // Array with one image
    title: "TOPAZ RED TAIL",
    price: "100.000",
    discount: "80.000",
    description: "Cá các tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá các là loài cá biển có vẻ đẹp, có thể được chế biến thành nhiều món ăn ngon tuyệt vời.",
  },
  {
    _id: 4,
    cardImg: fish4,
    proImg: [fish4], // Array with one image
    title: "BETTA HALFMOON",
    price: "100.000",
    discount: "100.000",
    description: "Cá đen tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá đen là loài cá biển có màu da đen đậm, có thể được chế biến thành nhiều món ăn hấp dẫn.",
  },
  {
    _id: 5,
    cardImg: fish5,
    proImg: [caBien,caBien,caBien,logo], // Array with one image
    title: "COMBO 3",
    price: "70.000",
    discount: "50.000",
    description: "Cá biển tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá biển là một loại cá rất phổ biến, có thể được chế biến thành nhiều món ăn ngon tuyệt vời.",
  },
  {
    _id: 6,
    cardImg: fish6,
    proImg: [fish6], // Array with one image
    title: "FULL BLACK",
    price: "80.000",
    discount: "80.000",
    description: "Cá trắng tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá trắng là loài cá biển có màu da trắng tuyệt đẹp, có thể được chế biến thành nhiều món ăn hấp dẫn.",
  },
  {
    _id: 7,
    cardImg: fish7,
    proImg: [fish7], // Array with one image
    title: "FULL GOLD",
    price: "100.000",
    discount: "85.000",
    description: "Cá vằng tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá vằng là loài cá biển phổ biến, có thân hình dài và ít xương, thích hợp với nhiều món ăn khác nhau.",
  },
  {
    _id: 8,
    cardImg: fish8,
    proImg: [fish8], // Array with one image
    title: "TỲ BÀ DỌN HỒ",
    price: "100.000",
    discount: "80.000",
    description: "Cá xanh tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá xanh là loài cá biển có màu da đặc trưng, có thể được nướng, hấp hoặc luộc với nhiều loại gia vị khác nhau.",
  },
  {
    _id: 9,
    cardImg: fish9,
    proImg: [caBien], // Array with one image
    title: "FULL RED",
    price: "100.000",
    discount: "85.000",
    description: "Cá các tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá các là loài cá biển có vẻ đẹp, có thể được chế biến thành nhiều món ăn ngon tuyệt vời.",
  },
  {
    _id: 10,
    cardImg: fish10,
    proImg: [fish10], // Array with one image
    title: "METAL RED LACE",
    price: "100.000",
    discount: "80.000",
    description: "Cá đen tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá đen là loài cá biển có màu da đen đậm, có thể được chế biến thành nhiều món ăn hấp dẫn.",
  },
  {
    _id: 11,
    cardImg: fish11,
    proImg: [fish11], // Array with one image
    title: "Ca Bien 11",
    price: "100.000",
    discount: "85.000",
    description: "Cá biển tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá biển là một loại cá rất phổ biến, có thể được chế biến thành nhiều món ăn ngon tuyệt vời.",
  },
  {
    _id: 12,
    cardImg: fish12,
    proImg: [fish12], // Array with one image
    title: "FULL RED BDS",
    price: "100.000",
    discount: "100.000",
    description: "Cá trắng tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá trắng là loài cá biển có màu da trắng tuyệt đẹp, có thể được chế biến thành nhiều món ăn hấp dẫn.",
  },
  {
    _id: 13,
    cardImg: fish13,
    proImg: [fish13], // Array with one image
    title: "Ca Vang 13",
    price: "100.000",
    discount: "85.000",
    description: "Cá vằng tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá vằng là loài cá biển phổ biến, có thân hình dài và ít xương, thích hợp với nhiều món ăn khác nhau.",
  },
  {
    _id: 14,
    cardImg: fish14,
    proImg: [fish1,fish1,fish1,logo], // Array with one image
    title: "HB RED ROSE",
    price: "100.000",
    discount: "80.000",
    description: "Cá xanh tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá xanh là loài cá biển có màu da đặc trưng, có thể được nướng, hấp hoặc luộc với nhiều loại gia vị khác nhau.",
  },
  {
    _id: 15,
    cardImg: fish15,
    proImg: [fish15], // Array with one image
    title: "HB BLUE RB",
    price: "100.000",
    discount: "85.000",
    description: "Cá các tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá các là loài cá biển có vẻ đẹp, có thể được chế biến thành nhiều món ăn ngon tuyệt vời.",
  },
  {
    _id: 16,
    cardImg: fish16,
    proImg: [fish16], // Array with one image
    title: "Ca Den 16",
    price: "100.000",
    discount: "80.000",
    description: "Cá đen tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá đen là loài cá biển có màu da đen đậm, có thể được chế biến thành nhiều món ăn hấp dẫn.",
  },
  {
    _id: 17,
    cardImg: fish17,
    proImg: [fish17], // Array with one image
    title: "Ca Bien 17",
    price: "100.000",
    discount: "85.000",
    description: "Cá biển tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá biển là một loại cá rất phổ biến, có thể được chế biến thành nhiều món ăn ngon tuyệt vời.",
  },
  {
    _id: 18,
    cardImg: fish18,
    proImg: [fish18], // Array with one image
    title: "Ca Trang 18",
    price: "100.000",
    discount: "80.000",
    description: "Cá trắng tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá trắng là loài cá biển có màu da trắng tuyệt đẹp, có thể được chế biến thành nhiều món ăn hấp dẫn.",
  },
  {
    _id: 19,
    cardImg: fish19,
    proImg: [fish19], // Array with one image
    title: "Ca Vang 19",
    price: "100.000",
    discount: "80.000",
    description: "Cá vằng tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá vằng là loài cá biển phổ biến, có thân hình dài và ít xương, thích hợp với nhiều món ăn khác nhau.",
  },
  {
    _id: 20,
    cardImg: fish20,
    proImg: [fish20], // Array with one image
    title: "Ca Xanh 20",
    price: "100.000",
    discount: "80.000",
    description: "Cá xanh tươi, ngon, giàu dinh dưỡng.",
    status: "Hết hàng",
    introduction: "Cá xanh là loài cá biển có màu da đặc trưng, có thể được nướng, hấp hoặc luộc với nhiều loại gia vị khác nhau.",
  },
  {
    _id: 21,
    cardImg: fish21,
    proImg: [fish21], // Array with one image
    title: "Ca Cam 21",
    price: "100.000",
    discount: "85.000",
    description: "Cá các tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá các là loài cá biển có vẻ đẹp, có thể được chế biến thành nhiều món ăn ngon tuyệt vời.",
  },
  {
    _id: 22,
    cardImg: fish22,
    proImg: [fish22], // Array with one image
    title: "Ca Den 22",
    price: "100.000",
    discount: "80.000",
    description: "Cá đen tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá đen là loài cá biển có màu da đen đậm, có thể được chế biến thành nhiều món ăn hấp dẫn.",
  },
  {
    _id: 23,
    cardImg: fish23,
    proImg: [fish23], // Array with one image
    title: "Ca Bien 23",
    price: "100.000",
    discount: "85.000",
    description: "Cá biển tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá biển là một loại cá rất phổ biến, có thể được chế biến thành nhiều món ăn ngon tuyệt vời.",
  },
  {
    _id: 24,
    cardImg: fish24,
    proImg: [fish24], // Array with one image
    title: "Ca Trang 24",
    price: "100.000",
    discount: "80.000",
    description: "Cá trắng tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá trắng là loài cá biển có màu da trắng tuyệt đẹp, có thể được chế biến thành nhiều món ăn hấp dẫn.",
  },
  {
    _id: 25,
    cardImg: fish25,
    proImg: [fish25], // Array with one image
    title: "Ca Vang 25",
    price: "100.000",
    discount: "85.000",
    description: "Cá vằng tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá vằng là loài cá biển phổ biến, có thân hình dài và ít xương, thích hợp với nhiều món ăn khác nhau.",
  },
  {
    _id: 26,
    cardImg: fish26,
    proImg: [fish26], // Array with one image
    title: "Ca Xanh 26",
    price: "100.000",
    discount: "80.000",
    description: "Cá xanh tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá xanh là loài cá biển có màu da đặc trưng, có thể được nướng, hấp hoặc luộc với nhiều loại gia vị khác nhau.",
  },
  {
    _id: 27,
    cardImg: fish27,
    proImg: [fish27], // Array with one image
    title: "Ca Cam 27",
    price: "100.000",
    discount: "85.000",
    description: "Cá các tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá các là loài cá biển có vẻ đẹp, có thể được chế biến thành nhiều món ăn ngon tuyệt vời.",
  },
  {
    _id: 28,
    cardImg: fish28,
    proImg: [fish28], // Array with one image
    title: "Ca Den 28",
    price: "100.000",
    discount: "80.000",
    description: "Cá đen tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá đen là loài cá biển có màu da đen đậm, có thể được chế biến thành nhiều món ăn hấp dẫn.",
  },
  {
    _id: 29,
    cardImg: fish29,
    proImg: [fish29], // Array with one image
    title: "Ca Bien 29",
    price: "100.000",
    discount: "85.000",
    description: "Cá biển tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá biển là một loại cá rất phổ biến, có thể được chế biến thành nhiều món ăn ngon tuyệt vời.",
  },
  {
    _id: 31,
    cardImg: fish31,
    proImg: [fish31], // Array with one image
    title: "Ca Xanh 31",
    price: "100.000",
    discount: "85.000",
    description: "Cá xanh tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá xanh là loài cá biển có màu da đặc trưng, có thể được nướng, hấp hoặc luộc với nhiều loại gia vị khác nhau.",
  },
  {
    _id: 32,
    cardImg: fish32,
    proImg: [fish32], // Array with one image
    title: "Ca Cam 32",
    price: "100.000",
    discount: "80.000",
    description: "Cá các tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá các là loài cá biển có vẻ đẹp, có thể được chế biến thành nhiều món ăn ngon tuyệt vời.",
  },
  {
    _id: 33,
    cardImg: fish33,
    proImg: [fish33], // Array with one image
    title: "Ca Den 33",
    price: "100.000",
    discount: "85.000",
    description: "Cá đen tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá đen là loài cá biển có màu da đen đậm, có thể được chế biến thành nhiều món ăn hấp dẫn.",
  },
  {
    _id: 34,
    cardImg: fish34,
    proImg: [fish34], // Array with one image
    title: "Ca Bien 34",
    price: "100.000",
    discount: "80.000",
    description: "Cá biển tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá biển là một loại cá rất phổ biến, có thể được chế biến thành nhiều món ăn ngon tuyệt vời.",
  },
  {
    _id: 35,
    cardImg: fish35,
    proImg: [fish35], // Array with one image
    title: "Ca Trang 35",
    price: "100.000",
    discount: "85.000",
    description: "Cá trắng tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá trắng là loài cá biển có màu da trắng tuyệt đẹp, có thể được chế biến thành nhiều món ăn hấp dẫn.",
  },
  {
    _id: 36,
    cardImg: fish36,
    proImg: [fish36], // Array with one image
    title: "Ca Vang 36",
    price: "100.000",
    discount: "80.000",
    description: "Cá vằng tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá vằng là loài cá biển phổ biến, có thân hình dài và ít xương, thích hợp với nhiều món ăn khác nhau.",
  },
  {
    _id: 37,
    cardImg: fish37,
    proImg: [fish37], // Array with one image
    title: "Ca Xanh 37",
    price: "100.000",
    discount: "80.000",
    description: "Cá xanh tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá xanh là loài cá biển có màu da đặc trưng, có thể được nướng, hấp hoặc luộc với nhiều loại gia vị khác nhau.",
  },
  {
    _id: 38,
    cardImg: fish38,
    proImg: [fish38], // Array with one image
    title: "Ca Cam 38",
    price: "100.000",
    discount: "80.000",
    description: "Cá các tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá các là loài cá biển có vẻ đẹp, có thể được chế biến thành nhiều món ăn ngon tuyệt vời.",
  },
  {
    _id: 39,
    cardImg: fish39,
    proImg: [fish39], // Array with one image
    title: "Ca Den 39",
    price: "100.000",
    discount: "85.000",
    description: "Cá đen tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá đen là loài cá biển có màu da đen đậm, có thể được chế biến thành nhiều món ăn hấp dẫn.",
  },
  {
    _id: 40,
    cardImg: fish40,
    proImg: [fish40], // Array with one image
    title: "Ca Bien 40",
    price: "100.000",
    discount: "80.000",
    description: "Cá biển tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá biển là một loại cá rất phổ biến, có thể được chế biến thành nhiều món ăn ngon tuyệt vời.",
  },
  {
    _id: 41,
    cardImg: fish41,
    proImg: [fish41], // Array with one image
    title: "Ca Trang 41",
    price: "100.000",
    discount: "85.000",
    description: "Cá trắng tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá trắng là loài cá biển có màu da trắng tuyệt đẹp, có thể được chế biến thành nhiều món ăn hấp dẫn.",
  },
  {
    _id: 42,
    cardImg: fish42,
    proImg: [fish42], // Array with one image
    title: "Ca Vang 42",
    price: "100.000",
    discount: "80.000",
    description: "Cá vằng tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá vằng là loài cá biển phổ biến, có thân hình dài và ít xương, thích hợp với nhiều món ăn khác nhau.",
  },
  {
    _id: 43,
    cardImg: fish43,
    proImg: [fish43], // Array with one image
    title: "Ca Xanh 43",
    price: "100.000",
    discount: "85.000",
    description: "Cá xanh tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá xanh là loài cá biển có màu da đặc trưng, có thể được nướng, hấp hoặc luộc với nhiều loại gia vị khác nhau.",
  },
  {
    _id: 44,
    cardImg: fish44,
    proImg: [fish44], // Array with one image
    title: "Ca Cam 44",
    price: "100.000",
    discount: "80.000",
    description: "Cá các tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá các là loài cá biển có vẻ đẹp, có thể được chế biến thành nhiều món ăn ngon tuyệt vời.",
  },
  {
    _id: 45,
    cardImg: fish45,
    proImg: [fish45], // Array with one image
    title: "Ca Den 45",
    price: "100.000",
    discount: "85.000",
    description: "Cá đen tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá đen là loài cá biển có màu da đen đậm, có thể được chế biến thành nhiều món ăn hấp dẫn.",
  },
  {
    _id: 46,
    cardImg: fish46,
    proImg: [fish46], // Array with one image
    title: "Ca Bien 46",
    price: "100.000",
    discount: "80.000",
    description: "Cá biển tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá biển là một loại cá rất phổ biến, có thể được chế biến thành nhiều món ăn ngon tuyệt vời.",
  },
  {
    _id: 47,
    cardImg: fish47,
    proImg: [fish47], // Array with one image
    title: "Ca Trang 47",
    price: "100.000",
    discount: "85.000",
    description: "Cá trắng tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá trắng là loài cá biển có màu da trắng tuyệt đẹp, có thể được chế biến thành nhiều món ăn hấp dẫn.",
  },
  {
    _id: 48,
    cardImg: fish48,
    proImg: [fish48], // Array with one image
    title: "Ca Vang 48",
    price: "100.000",
    discount: "80.000",
    description: "Cá vằng tươi, ngon, giàu dinh dưỡng.",
    status: "Còn hàng",
    introduction: "Cá vằng là loài cá biển phổ biến, có thân hình dài và ít xương, thích hợp với nhiều món ăn khác nhau.",
  },
];

export default ProductsData;
