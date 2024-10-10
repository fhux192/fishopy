import { useEffect } from "react";
const AddressPage = () => {
  useEffect(() => {
    document.title = "Địa Chỉ | Guppy Hóc Môn ";
  }, []);
  return (
    <div>
      <div className="mx-8">
        <div className="flex lg:pb-0 lg:mt-0 pt-[1rem] w-full justify-center whitespace-nowrap">
          <h1 className="p-1 px-3 bg-Black border-[1px] border-Grey2 text-White rounded-full mt-[4rem] lg:mt-20 font-bold cursor-default lg:text-[1.2rem] text-[0.9rem] text-center">
            ĐỊA CHỈ TRẠI CÁ GUPPY HÓC MÔN
          </h1>
        </div>
        <p className="font-bold md:mt-[2rem] border-0   mt-[2rem] lg:block lg:text-xl text-lg text-White">
          Guppy Hóc Môn - Trại Cá Guppy Bất Ổn
        </p>
        <p className="lg:block lg:text-xl text-md text-White">
          22/9/2 ấp 3, Đông Thạnh, Hóc Môn, Hồ Chí Minh
        </p>
        <iframe
          className="rounded-xl "
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.670350349125!2d106.64703537590695!3d10.912638156664741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d74bcae49d8f%3A0xb4fa7b384cac0bde!2zVHLhuqFpIGPDoSBHdXBweSBIw7NjIE3DtG4!5e0!3m2!1svi!2s!4v1722662159246!5m2!1svi!2s"
          width="100%"
          height="700"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default AddressPage;
