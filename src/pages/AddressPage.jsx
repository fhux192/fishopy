import  { useEffect } from "react";
const AddressPage = () => {
  useEffect(() => {
    document.title = "Địa Chỉ | Guppy Hóc Môn ";
  }, []);
  return (
    <div>
      <div className="mx-4  ">
        <div className="flex lg:mt-16 mb-4 pt-4 pb-2 lg:pb-0 w-full justify-center whitespace-nowrap">
          <h1 className="w-[30rem] font-extrabold cursor-default text-primaryBlack lg:text-[2rem] text-[1.5rem] text-center border-b-2">
            Địa Chỉ Guppy Hóc Môn
          </h1>
        </div>
        <iframe className="rounded-xl"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.6703503491244!2d106.64703537591424!3d10.912638156664787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d74bcae49d8f%3A0xb4fa7b384cac0bde!2sQu%C3%A2n%20Guppy%20Fram!5e0!3m2!1svi!2sus!4v1719137867232!5m2!1svi!2sus"
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
