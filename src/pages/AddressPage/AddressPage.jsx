import { useEffect } from "react";
import { motion } from "framer-motion";

const AddressPage = () => {
  useEffect(() => {
    document.title = "Địa Chỉ | Guppy Hóc Môn ";
  }, []);

  return (
    <div>
      <div className="mx-4 lg:mx-20 lg:pb-20">
        <div className="flex lg:pb-0 lg:mt-0 pt-[3rem] w-full justify-center whitespace-nowrap">
          <div className="pt-1 px-3 text-white rounded-full mt-[2rem] lg:mt-[4.7rem] font-bold cursor-default lg:text-[1.2rem] text-[0.9rem] text-center"></div>
        </div>
        <div className="font-[700] text-center px-2 border-0 mt-[1rem] lg:block lg:text-xl text-lg text-White">
          <p className="text-center">Trại Cá Guppy Bất Ổn </p>
          <span
            className="text-3xl text-center lg:text-4xl"
            style={{
              backgroundImage:
                "linear-gradient(70deg,#fff, #09D1C7, #fff, #46DFB1 ,#fff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% auto",
              animation: "gradientCycle 10s infinite",
            }}
          >
            Guppy Hóc Môn
          </span>{" "}
          <div className="lg:block lg:text-xl text-md mt-1 text-Grey">
            <p>22/9/2 ấp 3, Đông Thạnh, Hóc Môn</p>
          </div>
        </div>

        <motion.iframe
          className="rounded-3xl lg:h-[48rem] h-[38rem] mt-3"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.670350349125!2d106.64703537590695!3d10.912638156664741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d74bcae49d8f%3A0xb4fa7b384cac0bde!2zVHLhuqFpIGPDoSBHdXBweSBIw7NjIE3DtG4!5e0!3m2!1svi!2s!4v1722662159246!5m2!1svi!2s"
          width="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        ></motion.iframe>
      </div>
      <style>
        {`
          @keyframes gradientCycle {
            0% {
              background-position: 0% 50%;
            }
            30% {
              background-position: 100% 50%;
            }
            70% {
              background-position: 0% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AddressPage;
