import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/authSlice";
import { toast } from "react-hot-toast";
import { User } from 'lucide-react'


import "./Loader.css";
import "./hoverbtn.css";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState(null);

  const { token } = useSelector(selectAuth);



  const handleAddFriend = async (userId) => {
  try {
    console.log("one");
    
    const { data } = await axios.post(
      "http://192.168.1.40:5000/api/requests/send",
      { receiverId: userId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("one");
    console.log("Response:", data);
    toast.success("Friend request sent!");
  } catch (error) {
    console.error("Error sending request:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Failed to send request");
  }
};
 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("http://192.168.1.40:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchUsers();
  }, [token]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className=" flex flex-wrap justify-center  gap-5  pt-10 px-2 ">
      {loading ? (
        <div className="spinnerContainer relative top-[40%] ">
          <div className="spinner"></div>
          <div className="sloader">
            <p>Loading</p>
            <div className="words">
              <span className="word">users</span>
              <span className="word">all users</span>
              <span className="word">online users</span>
            </div>
          </div>
        </div>
      ) : (
        users.map((user) => {
          return (
           <div
              data-aos="fade-down"
              key={user._id}
              className=" relative hover-btn overflow-hidden px-0 w-[43vw] md:w-[30vw] py-5 md:py-10 flex flex-col items-center cursor-pointer border-2 border-white rounded-2xl bg-white/10 backdrop-blur-md shadow-lg transition-all hover:scale-105 duration-300"
              onClick={() => handleAddFriend(user._id)}
            >
              <div className="z-30 bg-white overflow-hidden h-[50px] w-[50px] rounded-full md:h-[70px] md:w-[70px] flex items-center justify-center text-[#bd84e5] font-bold">
                {!user.profilePic && user.name.charAt(0).toUpperCase()}
                {user.profilePic && (
                  <img className="w-full h-full" src={user.profilePic} alt="" />
                )}
              </div>
              <div className=" z-30 px-2 relative flex-1 text-white md:px-4">
                <h1 className="text-[20px] font-bold md:text-[32px] text-center">
                  {user.name}
                </h1>
                <p className="text-[12px] mb-2 md:mb-[10px] text-[#aaaaaa] md:text-[21px]">
                  Add to Chat with {user.name} 
                </p>
              </div>
              <button className=" z-30 flex flex-col-reverse items-center p-1 md:p-1 md:px-2 bg-white rounded-[10px] border-2 transition-all duration-[0.3s] ease-in-out hover:bg-[#bd84e5] hover:font-[700] hover:border-b-[crimson] hover:border-r-white hover:border-l-[crimson] hover:border-t-white active:bg-[#bd84e5] active:font-[700] active:border-b-[crimson] active:border-r-white active:border-l-[crimson] active:border-t-white">
                Add Friend<User />
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default AllUsers;
