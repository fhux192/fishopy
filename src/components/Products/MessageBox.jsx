import React from 'react'
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

const MessageBox = () => {
  return (
    <div className='fixed w-[2rem] h-[2rem] hover:scale-110 right-[0.75rem] top-[43rem] cursor-pointer'>
      <IoChatbubbleEllipsesSharp className='w-full h-full bg-white rounded-full border-4 hover:text-primaryTeal text-primaryBlack'/>
    </div>
  )
}

export default MessageBox
