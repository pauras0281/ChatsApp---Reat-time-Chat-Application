import {
  BoltIcon,
  MoveLeft,
  QrCode,
  LockKeyhole,
  MessageSquareText,
  Bell,
  Info,
  Users,
  KeySquare,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CommonHeader from "../../components/CommonHeader";

const buttonList = [
  {
    name: "Account",
    info: "Security Notifications, change email",
    icon: <KeySquare />,
    route: "/settings/account"
  },
  {
    name: "Privacy",
    info: "Block users, disappearing messages",
    icon: <LockKeyhole />,
    route: "/settings/privacy"
  },
  {
    name: "Chats",
    info: "Theme, wallpapers,chat history",
    icon: <MessageSquareText />,
    route: "/settings/chats"
  },
  { name: "Notifications", info: "Message, ring", icon: <Bell /> },
  {
    name: "Help",
    info: "Help center, contact us, privacy policy",
    icon: <Info />,
    route: "/settings/help"
  },
  { name: "Invite a friend", info: "", icon: <Users />,route: "/settings/invite" },
];

const Settings = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-[#40016d] min-h-screen flex flex-col justify-baseline pb-6 ">
      <CommonHeader name="settings" />
      <div
        id="chat"
        className=" h-[10%] px-4 py-10 flex items-center md:h-[13%] hover:bg-[#4f0186] cursor-pointer  border-b-[1px] border-[#aaaaaa] "
      >
        <div className="bg-white  h-[50px] w-[50px] rounded-full md:h-[70px] md:w-[70px] ">
          <img
            src="data:image/jpeg;base64,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"
            alt=""
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div className="px-2 relative flex-1 text-white md:px-4">
          <h1 className=" text-[20px] font-bold md:text-[32px] ">
            Yash Lokhande
          </h1>
          <p className=" text-[15px] text-[#aaaaaa] md:text-[21px] ">
            Hello! I am a Full Stack Developer
          </p>
          <p className="absolute right-0 top-1 text-[12px] text-[#aaaaaa] md:top-6 md:text-[30px] md:right-2 hover:text-white ">
            <QrCode />
          </p>
        </div>
      </div>

      {buttonList.map((btn,i) => {
        return (
          <div onClick={()=>navigate(`${btn.route}`)} key={i} className=" py-2 px-4 flex items-center md:h-[13%] hover:bg-[#4f0186] cursor-pointer ">
            <div className="bg-white  h-[50px] w-[50px] rounded-full md:h-[60px] md:w-[60px] flex justify-center items-center ">
              {btn.icon}
            </div>
            
            <div className="px-2 relative flex-1 text-white md:px-4">
              <h1 className=" text-[20px] md:text-[32px] ">{btn.name}</h1>
              <p className=" text-[13px] text-[#aaaaaa] md:text-[17px] ">
                {btn.info}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Settings;
