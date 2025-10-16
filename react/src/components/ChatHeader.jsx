import { EllipsisVertical, MoveLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

const ChatHeader = ({otherUser}) => {
    const navigate = useNavigate()
  return (
    <div data-aos="slide-down"
        id="chat"
        className="   w-full py-2 px-1 flex items-center bg-[#40016d] cursor-pointer "
      >
        <MoveLeft onClick={() => navigate("/dashboard")} className="active:text-white" />
        <div className="bg-white h-[50px] w-[50px] ml-1 rounded-full md:h-[70px] md:w-[70px] ">
          <img
            src={otherUser?.profilePic}
            className=" h-full w-full rounded-full "
          />
        </div>
        <div className="px-2 relative flex-1 text-white md:px-4">
          <h1 className=" text-[20px] font-bold md:text-[32px] ">
            {otherUser ? otherUser.name : ""}
          </h1>
          <p className=" text-[15px] text-[#aaaaaa] md:text-[21px] ">
            Last seen -{" "}
            {otherUser?.lastSeen
              ? new Date(otherUser.lastSeen).toLocaleString()
              : "Unknown"}
          </p>
          <p className="absolute right-1 top-[50%] translate-y-[-50%] text-[12px] text-[#aaaaaa] hover:text-black active:text-black md:text-[19px] md:right-2 ">
            <EllipsisVertical />
          </p>
        </div>
      </div>
  )
}

export default ChatHeader