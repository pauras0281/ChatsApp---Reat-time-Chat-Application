import React, { useEffect } from 'react'
import { sendMessage } from '../../../node/controllers/messageController';
import { useNavigate } from 'react-router-dom';

const ToastPop = ({t, data}) => {
  const navigate = useNavigate()


  console.log(t);
  
  
  useEffect(()=>{
    t.duration = 2000000
  })
  return (
   <div 
    className={`${
      t.visible ? 'animate-custom-enter' : 'animate-custom-leave'
    } w-[60vw]  md:w-[20vw] bg-black rounded-full text-white shadow-lg pointer-events-auto flex `}
  >
    <div className="flex-1 w-0 p-2  ">
      <div className="flex items-start ">
        <div className="flex-shrink-0 pt-0.5">
          <img
            className="h-12 w-12 rounded-full border-2 border-[#054640]"
            src={data.chat.users[0].profilePic}
            alt=""
          />
        </div>
        <div className="ml-3 flex-1 relative ">
          <p className=" text-lg font-bold">
            {data.chat.users.find((u)=>{
              
              return u._id == data.sender._id
              
            })?.name || "X"}
          </p>
            

          <p className="mt-0 text-[#25D366] font-medium text-md">
            {data.content}
          </p>
          <p className='absolute text-sm top-0 right-2 text-[#b2b0b0] ' >now</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ToastPop


