import { useEffect } from "react";
const AddressPage = () => {
  useEffect(() => {
    document.title = "Địa Chỉ | Guppy Hóc Môn ";
  }, []);
  return (
    <div>
      <div className="mx-4 lg:mx-20 lg:pb-20">
        <div className="flex lg:pb-0 lg:mt-0 pt-[3rem] w-full justify-center whitespace-nowrap">
          <div className="pt-1 px-3  text-white rounded-full mt-[2rem] lg:mt-[4.7rem] font-bold cursor-default lg:text-[1.2rem] text-[0.9rem] text-center">
      
          </div>
        </div>
        <div className="font-[700] text-center px-2 border-0 mt-[1rem] lg:block lg:text-xl text-lg text-White">
          <p className="text-center">Trại Cá Guppy Bất Ổn </p>
          <span
            className="text-3xl text-center lg:text-4xl"
            style={{
              backgroundImage:
                "linear-gradient(90deg,#15919B, #09D1C7, #46DFB1 47%, #0C6478)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Guppy Hóc Môn
          </span>{" "}
          <div className="lg:block lg:text-xl text-md mt-1 text-Grey">
           <p>22/9/2 ấp 3, Đông Thạnh, Hóc Môn</p>
           
          </div>
        </div>

        <iframe
          className="rounded-3xl lg:h-[48rem] h-[38rem] mt-3"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.670350349125!2d106.64703537590695!3d10.912638156664741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d74bcae49d8f%3A0xb4fa7b384cac0bde!2zVHLhuqFpIGPDoSBHdXBweSBIw7NjIE3DtG4!5e0!3m2!1svi!2s!4v1722662159246!5m2!1svi!2s"
          width="100%"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default AddressPage;
