import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth } from "../redux/authSlice";
import { setCurrentChat } from "../redux/chatSlice";
import "./Loader.css";


const MyChats = ({data}) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();  
  

  const { token, user } = useSelector(selectAuth);

  const socket = useSelector((state)=>state.socket)  
  
  const myId = user?._id;

  const handleOpenChat = (chat) => {

  dispatch(setCurrentChat({ chatId: chat._id, chatData: chat }));
  navigate(`/chat/${chat._id}`)
};




  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await axios.get("http://192.168.1.40:5000/api/chats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChats(data);
        // setLoading(false)
      } catch (error) {
        console.error("Error fetching chats:", error);
        setLoading(false);
      }
    };

    fetchChats();
  }, [token]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className=" bg-[#4f0186] flex flex-col justify-baseline">
        {loading ? (
          // <p className="text-white text-center mt-10">Loading chats...</p>
          <div className="spinnerContainer relative top-[40%] ">
  <div className="spinner"></div>
  <div className="sloader">
    <p>Loading</p>
    <div className="words">
      <span className="word">chats</span>
      <span className="word">messages</span>
      <span className="word">users</span>
      <span className="word">profile pics</span>
      <span className="word">posts</span>
    </div>
  </div>
</div>
        ) : chats.length === 0 ? (
          <p className="text-white text-center mt-10">No chats yet</p>
        ) : (
          chats.map((chat) => {
            const otherUser = chat.isGroupChat
              ? null
              : chat.users.find((u) => u._id !== myId);

            const chatName = chat.isGroupChat
              ? chat.chatName
              : chat.users.find((u) => u._id !== myId)?.name;

            const lastMsg = chat.latestMessage
              ? chat.latestMessage.content
              : "No messages yet";

            const time = chat.latestMessage
              ? new Date(chat.latestMessage.updatedAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "";

            return (
              <div  data-aos="fade-up"
                onClick={() => handleOpenChat(chat)}
                key={chat._id}
                className="py-2 px-4 flex items-center hover:bg-[#40016d] cursor-pointer"
              >
                <div  className="bg-white h-[50px] w-[50px] rounded-full md:h-[70px] md:w-[70px] overflow-hidden flex items-center justify-center  text-[#054640] font-bold">
                  {chat.isGroupChat || !otherUser?.profilePic ? (
                    // Show first letter if it's a group chat OR otherUser has no profile pic
                    chat.isGroupChat ? (
                      chat.chatName.charAt(0).toUpperCase()
                    ) : (
                      chatName.charAt(0).toUpperCase()
                    )
                  ) : (
                    <img
                      src={otherUser.profilePic}
                      alt={otherUser.name}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>

                <div className="px-2 relative flex-1 text-white md:px-4">
                  <h1 className="text-[20px] font-bold md:text-[32px]">
                    {chatName}
                  </h1>
                  <p className="text-[15px] text-[#aaaaaa] md:text-[21px]">
                    {lastMsg}
                  </p>
                  <p className="absolute right-10 top-1 text-[12px] text-[#aaaaaa] md:text-[19px] md:right-2">
                    {time}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default MyChats;
