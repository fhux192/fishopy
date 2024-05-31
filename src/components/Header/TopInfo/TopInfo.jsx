
import Logo from "../../assets/Logo.png";


const TopInfo = () => {
  return (
    <div className="w-full h-full">
    <div className="flex">
      <div className="flex items-center  w-[80rem]">
       <img src={Logo} className='ml-[2rem] mt-[0.5rem] duration-300 w-[6rem] hover:scale-[1.1]  font-body  text-primaryTeal'></img>
      </div>
      <div className="flex flex-col items-center w-full">
        <span className=" text-[2.5rem] text-primaryTeal ">
          TRẠI CÁ GUPPY HOÀNG QUÂN
        </span>
        <span className="text-[1.2rem] text-primaryBlack">
          Chuyên Cung Cấp Cá Cảnh & Phụ Kiện Chất Lượng
        </span>
      </div>
      <div className="flex items-center justify-center w-[80rem]">
        <button className=" w-[14rem] h-10 rounded-full shadow-md shadow-black hover:bg-primaryBlack hover:text-teal-500 hover:shadow-teal-700 duration-300 bg-white">Liên Hệ: 0941087880</button>
      </div>
    </div>
    <div className='h-[0.7rem]'></div>
  </div>
  )
}

export default TopInfo
