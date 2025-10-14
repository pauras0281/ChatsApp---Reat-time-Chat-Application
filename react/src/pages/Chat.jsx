import {

  MoveLeft,
  EllipsisVertical
} from "lucide-react";
import "./Component.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ChatInput from "../components/ChatInput";
import { selectAuth } from "../redux/authSlice";
import { useSelector } from "react-redux";
import { selectSocket } from "../redux/socketSlice";


const Chat = () => {
  const { userId } = useParams();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const {user, token} = useSelector(selectAuth)
  const socket = useSelector(selectSocket);

  console.log(socket);
  

  console.log(useSelector(selectAuth));
    
  const myId = user._id  

  

  const otherUser =
    chats.length > 0 ? chats[0].chat.users.find((u) => u._id !== myId) : null;
    

  useEffect(() => {
    const getAllMessages = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/messages/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setChats(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error("Error fetching chats:", error);
        setLoading(false);
      }
    };

    getAllMessages();
  }, [token]);

  return (
    <div   className="h-screen w-screen bg-[#4f0186] flex flex-col items-center relative overflow-hidden ">
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
      {/* chat */}
      <div data-aos="fade-left"
        className="w-full h-full flex flex-col items-baseline  "
      >
        {chats.map((chat,i) => {
          

          return (
            <p
              key={chat._id} 
              data-aos={i%2==0 ? "fade-left": "fade-right"}
              // data-aos={chat.sender._id == myId ? "fade-left": "fade-right"}
              className={` ${
                chat.sender._id == myId
                  ? "my-message bg-[#40016d] self-end text-white "
                  : "user-message bg-[#bd84e5] text-[#2f0150] "
              } relative right-0 p-2 rounded-[6px] m-3 md:text-3xl md:px-5 max-w-[70%] md:max-w-[50%]  `}
            >
              {chat.content}
            </p>
          );
        })}

      </div>
        <ChatInput chat={chats[0]?.chat?._id} token={token} socket={socket} />
    </div>
  );
};

export default Chat;
