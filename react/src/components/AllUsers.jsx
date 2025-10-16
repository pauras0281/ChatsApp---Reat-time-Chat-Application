import axios from "axios"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/authSlice";
import './Loader.css'



const AllUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const {token} = useSelector(selectAuth)   
  
  

const handleOpenChat = (chat) => {

  console.log(chat);
  

  // dispatch(setCurrentChat({ chatId: chat._id, chatData: chat }));
  // navigate(`/chat/${chat._id}`)
};


    useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await axios.get("http://192.168.1.40:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(data);
        console.log(data);
        
      } catch (error) {
        console.error("Error fetching chats:", error);
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

    <div className=" " >
    
    
    {loading ? <div class="spinnerContainer relative top-[40%] ">
  <div class="spinner"></div>
  <div class="sloader">
    <p>Loading</p>
    <div class="words">
      <span class="word">users</span>
      <span class="word">all users</span>
      <span class="word">online users</span>
    </div>
  </div>
</div>:
     users.map((user)=>{
         return <div data-aos="fade-down"
               key={user._id}
               className="py-2 px-4 flex items-center cursor-pointer" 
               onClick={()=>handleOpenChat(user)}
             >
              <div className="bg-white h-[50px] w-[50px] rounded-full md:h-[70px] md:w-[70px] flex items-center justify-center text-[#bd84e5] font-bold">
                  {user.name.charAt(0).toUpperCase()
                    }
                </div>
 
               <div className="px-2 relative flex-1 text-white md:px-4">
                 <h1 className="text-[20px] font-bold md:text-[32px] ">
                   {user.name}
                 </h1>
                 <p className="text-[15px] text-[#aaaaaa] md:text-[21px]">
                   Add to Chat with {user.name}
                 </p>
                 
               </div>
               <button className=" p-1 px-2 bg-white rounded border-2 transition-all duration-[0.3s] ease-in-out hover:bg-[#bd84e5] hover:font-[700] hover:border-b-[crimson] hover:border-r-white hover:border-l-[crimson] hover:border-t-white active:bg-[#bd84e5] " >Add Friend</button>
             </div>
     })
    }
    </div>
  )
}

export default AllUsers