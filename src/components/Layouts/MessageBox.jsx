import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SiZalo } from "react-icons/si";

const MessageBox = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [animateWave, setAnimateWave] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowMessage(true);
      const hideTimer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);

      return () => clearTimeout(hideTimer);
    }, 5000);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    const waveTimer = setTimeout(() => {
      setAnimateWave(true);
      const stopWaveTimer = setTimeout(() => {
        setAnimateWave(false);
      }, 2000);

      return () => clearTimeout(stopWaveTimer);
    }, 5000); 

    return () => clearTimeout(waveTimer);
  }, []);

  return (
    <div className="fixed bottom-[1rem] right-[1rem] z-[22] flex flex-col items-end">
      {showMessage && (
        <motion.div
          initial={{ x: 10 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
          className="bg-white shadow-md shadow-gray-500 rounded-xl rounded-b-none rounded-l-xl p-3 mr-[2.8rem] mb-[0.2rem] text-sm text-gray-800"
        >
          Chào bạn! Bạn cần giúp gì không?
        </motion.div>
      )}
      <motion.a
        whileHover={{ scale: 1.5 }}
        href="#"
        target="_blank"
        className={`relative w-[50px] h-[50px] shadow-md shadow-gray-500 rounded-full bg-white cursor-pointer ${
          animateWave ? "waving-icon" : ""
        }`}
      >
        <div className="rounded-full border-white border-4">
          <SiZalo className="w-[40px] h-[40px] text-blue-500 animate-pulse" />
        </div>
        <div className="light-rays"></div>
      </motion.a>
      <style>
        {`
          @keyframes wave {
            0% { transform: rotate(0deg); }
            10% { transform: rotate(14deg); }
            20% { transform: rotate(-8deg); }
            30% { transform: rotate(14deg); }
            40% { transform: rotate(-4deg); }
            50% { transform: rotate(10deg); }
            60% { transform: rotate(0deg); }
            100% { transform: rotate(0deg); }
          }
          .waving-icon {
            animation: wave 2s 1;
          }
          .light-rays {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 50%;
            background: radial-gradient(circle, transparent 60%, rgba(0, 100, 250, 0.5) 80%);
            pointer-events: none;
            animation: light-ray-animation 2s infinite;
          }
          @keyframes light-ray-animation {
            0% {
              box-shadow: 0 0 10px 12px rgba(0, 100, 250, 0.5),
                          0 0 10px 7px rgba(0, 100, 250, 0.3),
                          0 0 10px 4px rgba(0, 100, 250, 0.1);
            }
            50% {
              box-shadow: 0 0 10px 2px rgba(0, 100, 250, 0.5),
                          0 0 10px 5px rgba(0, 100, 250, 0.3),
                          0 0 10px 6px rgba(0, 100, 250, 0.1);
            }
            100% {
              box-shadow: 0 0 10px 6px rgba(0, 100, 250, 0.5),
                          0 0 10px 8px rgba(0, 100, 250, 0.3),
                          0 0 10px 10px rgba(0, 100, 250, 0.1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default MessageBox;
