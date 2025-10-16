import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { BellPlus, BoltIcon, Search } from "lucide-react";


const CDcopy = () => {
  const [active, setActive] = useState("chats");
  const navigate = useNavigate()

  const handleChange = (location)=>{
    setActive(location)
    navigate(location)
  }

  return (
    <div className="min-h-screen bg-[#4f0186] flex flex-col justify-baseline">
      {/* Sticky header */}
      <div
        data-aos=""
        className="flex flex-col sticky top-0 z-40 bg-[#40016d] pt-6"
      >
        <p className="text-2xl text-[#aaaaaa] mb-4 mx-4 font-extrabold relative md:text-5xl md:mb-6 md:mx-6">
          ChatsApp{" "}
          <span className="absolute right-1 top-1 flex gap-5 ">
            <Link
              to="/notifications"
              className="hover:text-black flex items-center "
            >
              <BellPlus />
            </Link>
            <Link
              to="/settings"
              className="hover:text-black flex items-center "
            >
              <BoltIcon />
            </Link>
          </span>
        </p>

        <input
          onFocus={() => handleChange("all-users")}
          type="text"
          placeholder="Search for Users"
          className="bg-[#fff] h-10 rounded-full px-4 outline-0 mb-4 mx-4 md:text-2xl md:mb-6 md:mx-6 md:w-1/2 "
        />
        <div className="flex bg-[#bd84e5] justify-between gap-3 p-4 border-t-[1px] border-black">
          <button
            onClick={() => handleChange("chats")}
            className={` ${
              active != "chats"
                ? "hover:bg-[#969494] text-white hover:text-black hover:font-bold "
                : ""
            }  ${
              active === "chats" ? "bg-[#4f0186] text-white underline   " : ""
            } py-1 px-2 flex-1 rounded-full text-black transition-all duration-[0.5s] `}
          >
            Chats
          </button>
          <button
            onClick={() => handleChange("stories")}
            className={` ${
              active != "stories"
                ? "hover:bg-[#969494] text-white hover:text-black hover:font-bold"
                : ""
            }  ${
              active === "stories" ? "bg-[#4f0186] text-white underline " : ""
            } py-1 flex-1 px-2 rounded-full text-black transition-all duration-[0.5s] `}
          >
            Stories
          </button>
          <button
            onClick={() => handleChange("requests")}
            className={` ${
              active != "requests"
                ? "hover:bg-[#969494] text-white hover:text-black hover:font-bold"
                : ""
            }  ${
              active === "requests" ? "bg-[#4f0186] text-white underline  " : ""
            } py-1 px-2 flex-1 rounded-full text-black transition-all duration-[0.5s] `}
          >
            Requests
          </button>
          <button
            onClick={() => handleChange("all-users")}
            className={` ${
              active != "all-users"
                ? "hover:bg-[#969494] text-white hover:text-black hover:font-bold"
                : ""
            }  ${
              active === "all-users"
                ? "bg-[#4f0186] text-white underline  "
                : ""
            } py-1 flex-1 px-2 rounded-full text-black transition-all duration-[0.5s] `}
          >
            All users
          </button>
        </div>
      </div>

      <Outlet data="this is data" />

      {/* {active == "chats" && <MyChats chats={chats} loading={loading} />}
      {active == "all-users" && <AllUsers chats={chats} loading={loading} />}
      {active == "requests" && <AllRequests chats={chats} loading={loading} />} */}
    </div>
  );
};

export default CDcopy;
