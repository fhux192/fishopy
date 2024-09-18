/* eslint-disable react/prop-types */
import { useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "../../scss/allProduct.scss";
import { Link } from "react-router-dom";
import "./Countdown.css"
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const COUNTDOWN_FROM = tomorrow.toISOString().split("T")[0];

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const ShiftingCountdown = () => {
  return (
    <div className="flex h-full lg:border-b-0 lg:mx-0 md:border-b-0 md:mx-0 border-Grey border-b-[1px] mx-8  items-center justify-center mt-[0rem] md:mt-[2rem] lg:mt-[0rem]">
      {" "}
      <div className="flex flex-col  justify-center countdown-container lg:rounded-3xl md:rounded-3xl lg:mt-50 xl:w-[40%] lg:w-[50%] md:w-[70%] w-[100%]  lg:mb-0 md:h-[5rem]  h-[8rem] lg:h-full px-3  bg-primaryBlack lg:p-3">
        <p className="text-center font-bold  text-white text-[1.4rem] lg:text-[1.5rem]">
          Kết Thúc Ưu Đãi Sau
        </p>
        <div className="mx-auto mt-[0rem]  rounded-xl flex w-full h-20 lg:h-28 max-w-xl items-center type-blur2 shadow-lg ">
          <CountdownItem unit="Day" text="ngày" />
          <CountdownItem unit="Hour" text="giờ" />
          <CountdownItem unit="Minute" text="phút" />
          <CountdownItem unit="Second" text="giây" />
        </div>
      
      </div>
    </div>
  );
};

const CountdownItem = ({ unit, text }) => {
  const { ref, time } = useTimer(unit);

  return (
    <div className="flex cursor-default h-20  w-1/4 flex-col items-center justify-center gap-1  rounded-xl  font-mono lg:h-[7rem] md:h-[5rem] md:gap-2">
      <div className="relative w-full overflow-hidden text-center">
        <span
          ref={ref}
          className="block text-[20px] font-[600] text-white md:text-3xl lg:text-4xl xl:text-5xl"
        >
          {time}
        </span>
      </div>
      <span className="text-[16px]  text-Grey2 md:text-sm lg:text-base">
        {text}
      </span>
    </div>
  );
};

export default ShiftingCountdown;

// NOTE: Framer motion exit animations can be a bit buggy when repeating
// keys and tabbing between windows. Instead of using them, we've opted here
// to build our own custom hook for handling the entrance and exit animations
const useTimer = (unit) => {
  const [ref, animate] = useAnimate();

  const intervalRef = useRef(null);
  const timeRef = useRef(0);

  const [time, setTime] = useState(0);

  useEffect(() => {
    intervalRef.current = setInterval(handleCountdown, 1000);

    return () => clearInterval(intervalRef.current || undefined);
  }, []);

  const handleCountdown = async () => {
    const end = new Date(COUNTDOWN_FROM);
    const now = new Date();
    const distance = +end - +now;

    let newTime = 0;

    if (unit === "Day") {
      newTime = Math.floor(distance / DAY);
    } else if (unit === "Hour") {
      newTime = Math.floor((distance % DAY) / HOUR);
    } else if (unit === "Minute") {
      newTime = Math.floor((distance % HOUR) / MINUTE);
    } else {
      newTime = Math.floor((distance % MINUTE) / SECOND);
    }

    if (newTime !== timeRef.current) {
      // Exit animation
      await animate(
        ref.current,
        { y: ["0%", "-50%"], opacity: [1, 0] },
        { duration: 0.35 }
      );

      timeRef.current = newTime;
      setTime(newTime);

      // Enter animation
      await animate(
        ref.current,
        { y: ["50%", "0%"], opacity: [0, 1] },
        { duration: 0.35 }
      );
    }
  };

  return { ref, time };
};
