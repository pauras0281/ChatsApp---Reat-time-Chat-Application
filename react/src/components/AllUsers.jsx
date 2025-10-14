import axios from "axios"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/authSlice";



const AllUsers = () => {
  const [users, setUsers] = useState([])
  const {token} = useSelector(selectAuth)    

    useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/users", {
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
  return (

    <div className=" " >
    
    
    {
     users.map((user)=>{
         return <div data-aos="fade-down"
               key={user._id}
               className="py-2 px-4 flex items-center cursor-pointer"
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
               <button className=" p-1 px-2 bg-white rounded-xl hover:bg-[#bd84e5] active:bg-[#bd84e5] " >Add Friend</button>
             </div>
     })
    }
    </div>
  )
}

export default AllUsers