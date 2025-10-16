import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/authSlice";
import { ThumbsDown, ThumbsUp } from "lucide-react";

import "./hoverbtn.css";


const AllRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

    const { token } = useSelector(selectAuth);


  useEffect( () => {
    const fetchRequests = async () => {
      try {
        const { data } = await axios.get(
          "http://192.168.1.40:5000/api/requests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // setLoading(false)
        setRequests(data);
        // setLoading(false);
        console.log(data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchRequests();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return <div data-aos="slide-down" className=" flex flex-col gap-3 justify-center py-10 px-2 pl-10 ">
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
        requests.map((rq) => {
          return (
           <div
            //   data-aos="fade-down"
              key={rq._id}
              className=" relative req-hover-btn overflow-hidden px-5 w-[70vw] md:w-[80vw] py-5 md:py-10 flex items-center justify-center cursor-pointer  rounded-2xl backdrop-blur-md shadow-lg transition-all duration-300"
              onClick={() => handleAddFriend(user._id)}
            >
              <div className="z-30 bg-white overflow-hidden h-[70px] w-[70px] rounded-full md:h-[70px] md:w-[70px] flex items-center justify-center text-[#bd84e5] font-bold">
                {!rq.sender.profilePic && user.name.charAt(0).toUpperCase()}
                {rq.sender.profilePic && (
                  <img className="w-full h-full" src={rq.sender.profilePic} alt="" />
                )}
              </div>
              <div className=" z-30 px-2 relative flex-1 text-white md:px-4">
                <h1 className="text-[20px] font-bold md:text-[32px]">
                  {rq.sender.name}
                </h1>
                <p className="text-[12px] mb-2 md:mb-[10px] text-[#aaaaaa] md:text-[21px]">
                {rq.sender.name} wants to be your friend
                </p>
              </div>

              <div className="flex flex-col gap-2"  >
              <button className=" z-30 flex flex-col-reverse items-center px-3 py-2 md:p-1 md:px-2 bg-white  rounded-[10px] border-2 transition-all duration-[0.3s] ease-in-out hover:bg-green-400 active:bg-green-400 active:font-[700] ">
                 <span className={`hidden md:block`} >Accept</span> <ThumbsUp />
              </button>
              <button className=" z-30 flex flex-col-reverse items-center px-3 py-2 md:p-1 md:px-2 bg-white rounded-[10px] border-2 transition-all duration-[0.3s] ease-in-out hover:bg-red-500 active:bg-red-500 active:font-[700] ">
                 <span className={`hidden md:block`} >Reject</span> <ThumbsDown />
              </button>
              </div>
            </div>
          );
        })
      )}
    </div>;
};

export default AllRequests;
