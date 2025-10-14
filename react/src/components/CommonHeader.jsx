import { MoveLeft } from 'lucide-react'
import React from 'react'
import { Link, useNavigate, useResolvedPath } from 'react-router-dom'


const CommonHeader = ({name}) => {
  const {pathname} = useResolvedPath()
  
  
  return (
    <div className=" mx-4 mb-4 sticky top-0 bg-[#40016d] z-40 pt-4 ">
        <p className=" text-2xl text-[#aaaaaa] mb-4 font-extrabold relative md:text-5xl md:mb-6 md:mx-2 ">
          ChatsApp
        </p>
        <Link to={pathname === '/settings'? '/dashboard': '/settings'} className=" flex items-center font-bold text-[20px] hover:text-white  active:text-white ">
          <MoveLeft /> <span className="ml-2">{name}</span>
        </Link>
      </div>
  )
}

export default CommonHeader