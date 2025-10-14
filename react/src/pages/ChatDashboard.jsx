import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { BoltIcon } from "lucide-react";
import AllUsers from "../components/AllUsers"; 
import MyChats from "../components/MyChats";


const ChatDashboard = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("chats");
  


  return (
    <div className="min-h-screen bg-[#4f0186] flex flex-col justify-baseline">
      {/* Sticky header */}
      <div data-aos="" className="flex flex-col sticky top-0 z-40 bg-[#40016d] pt-6">
        <p className="text-2xl text-[#aaaaaa] mb-4 mx-4 font-extrabold relative md:text-5xl md:mb-6 md:mx-6">
          ChatsApp{" "}
          <span className="absolute right-1 top-1">
            <Link to="/settings">
              <BoltIcon />
            </Link>
          </span>
        </p>
        <input
          type="text"
          placeholder="Search for Users"
          className="bg-[#fff] h-10 rounded-full px-4 outline-0 mb-4 mx-4 md:text-2xl md:mb-6 md:mx-6 md:w-1/2 "
        />
      <div className="flex bg-[#bd84e5] justify-between gap-3 p-4 border-t-[1px] border-black" >
        <button onClick={()=>setActive("chats")} className={`${active === 'chats'? 'bg-[#4f0186] text-white ': ''} py-1 px-2 flex-1 rounded-full text-black `} >All chats</button>
        <button onClick={()=>setActive("unseen")} className={`${active === 'unseen'? 'bg-[#4f0186] text-white ': ''} py-1 px-2 flex-1 rounded-full text-black `} >Unseen</button>
        <button onClick={()=>setActive("all-users")} className={`${active === 'all-users'? 'bg-[#4f0186] text-white ': ''} py-1 flex-1 px-2 rounded-full text-black`}  >All users</button>
      </div>
      </div>




      {active == 'chats' && <MyChats chats={chats} loading={loading} />}
      {active == 'all-users' && <AllUsers chats={chats} loading={loading} />}
      {active == 'unseen' && <MyChats chats={chats} loading={loading} />}
    </div>
  );
};

export default ChatDashboard;
