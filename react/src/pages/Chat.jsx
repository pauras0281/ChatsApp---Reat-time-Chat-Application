
import "./Component.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ChatInput from "../components/ChatInput";
import { selectAuth } from "../redux/authSlice";
import { useSelector } from "react-redux";
import { selectSocket } from "../redux/socketSlice";
import ChatHeader from "../components/ChatHeader";


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
          `http://192.168.1.40:5000/api/messages/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setChats(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching chats:", error);
        setLoading(false);
      }
    };

    getAllMessages();
  }, [token]);

  useEffect(() => {
    // Delay 2 seconds before showing chats
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-screen bg-[#4f0186] flex flex-col items-center relative overflow-y-scroll overflow-hidden ">
      <ChatHeader otherUser={otherUser} />
      {/* chat */}
      <div //data-aos="fade-left"
        className="w-full h-full flex-1 flex flex-col items-baseline overflow-y-scroll overflow-x-hidden chats  "
      >
        {loading ? (
          // <h1 className="text-white text-4xl m-auto animate-pulse">Getting messages...</h1>
          // <div class="loader m-auto "></div>
<div class="loader mx-auto relative top-[20%] ">
  <label>Loading chat...</label>
  <div class="loading h-[2px] w-[50%] "></div>
</div>

        ) : chats.length > 0 ? (
          chats.map((chat, i) => (            
            <p
              key={chat._id}
              data-aos={i % 2 === 0 ? "fade-left" : "fade-right"}
              className={`${
                chat.sender._id === myId
                  ? "my-message bg-[#40016d] self-end text-white"
                  : "user-message bg-[#bd84e5] text-[#2f0150]"
              } relative right-0 px-3 py-2 rounded-[6px] m-3 md:text-3xl md:px-5 max-w-[70%] md:max-w-[50%]`}
            >
              {chat.content}
            </p>
          ))
        ) : (
          <p className="text-gray-300 m-auto">No messages yet</p>
        )}
      </div>
      <ChatInput chat={chats[0]?.chat?._id} token={token} socket={socket} />
    </div>
  );
};

export default Chat;
