import { useEffect } from "react";
const AddressPage = () => {
  useEffect(() => {
    document.title = "Địa Chỉ | Guppy Hóc Môn ";
  }, []);
  return (
    <div>
      <div className="mx-4  ">
        <div className="flex mb-6 pt-4 pb-2 lg:pb-0 w-full justify-center whitespace-nowrap">
          <h1 className="w-[30rem] mt-[4rem] lg:mt-20 font-extrabold cursor-default text-primaryBlack lg:text-[2rem] text-[1.5rem] text-center border-b-2">
            Địa Chỉ Guppy Hóc Môn
          </h1>
        </div>
        <p className="font-bold lg:block lg:text-xl text-primaryBlack">Trại cá Guppy Hóc Môn</p>
        <p className="lg:block lg:text-xl text-md text-primaryGrey">22/9/2 ấp3, Đông Thạnh, Hóc Môn, Hồ Chí Minh</p>
        <iframe
          className="rounded-xl pb-14"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.670350349125!2d106.64703537590695!3d10.912638156664741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d74bcae49d8f%3A0xb4fa7b384cac0bde!2zVHLhuqFpIGPDoSBHdXBweSBIw7NjIE3DtG4!5e0!3m2!1svi!2s!4v1722662159246!5m2!1svi!2s"
          width="100%"
          height="550"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default AddressPage;
