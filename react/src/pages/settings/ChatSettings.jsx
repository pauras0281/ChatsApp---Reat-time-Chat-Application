import { LightbulbOff, Lightbulb, Palette } from "lucide-react";
import CommonHeader from "../../components/CommonHeader";
import Modal from "../../components/Modal";
import { useState } from "react";

const buttonList = [
  {
    name: "Theme",
    info: "Dark",
    icon: [<LightbulbOff />, <Lightbulb />],
    setting: "theme",
  },
  {
    name: "Chat Theme",
    info: "Default",
    icon: [<Palette />],
    setting: "chatTheme",
  },
  {
    name: "Font Size",
    info: "Medium",
    setting: "fontSize",
  },
];

const ChatSettings = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null); // The content of the modal
  const [settingType, setSettingType] = useState(""); // Type of setting to be changed

  const openModal = (setting) => {
    setSettingType(setting.setting);
    setModalContent(getModalContent(setting.setting)); // Get dynamic content for the modal
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getModalContent = (setting) => {
    switch (setting) {
      case "theme":
        return (
          <div>
            <button
              // onClick={() => themeContext.setTheme("light")}
              className="w-full text-center py-2 mb-2 bg-light"
            >
              Light Theme
            </button>
            <button
              // onClick={() => themeContext.setTheme("dark")}
              className="w-full text-center py-2 bg-dark"
            >
              Dark Theme
            </button>
          </div>
        );
      case "fontSize":
        return (
          <div>
            <button
              className="w-full py-2 mb-2"
              onClick={() => setFontSize("small")}
            >
              Small
            </button>
            <button
              className="w-full py-2 mb-2"
              onClick={() => setFontSize("medium")}
            >
              Medium
            </button>
            <button
              className="w-full py-2"
              onClick={() => setFontSize("large")}
            >
              Large
            </button>
          </div>
        );
      default:
        return <p>No content available for this setting.</p>;
    }
  };

  // Example of changing font size (you can save it in the context or state)
  const setFontSize = (size) => {
    document.body.style.fontSize =
      size === "small" ? "14px" : size === "medium" ? "16px" : "18px";
  };

  return (
    <div className="bg-[#40016d] min-h-screen flex flex-col justify-baseline py-6 ">
      <CommonHeader name="Chats" />

      {buttonList.map((btn, i) => {
        return (
          <div
            onClick={()=>openModal(btn)}
            key={i}
            className=" py-2 px-4 flex items-center md:h-[13%] hover:bg-[#4f0186] cursor-pointer "
          >
            <div className="bg-transparent h-[50px] w-[50px] rounded-full md:h-[60px] md:w-[60px] flex justify-center items-center ">
              {btn.icon ? btn.icon[0] : btn.icon}
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
      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        title={settingType.charAt(0).toUpperCase() + settingType.slice(1)}
        content={modalContent}
      />
    </div>
  );
};

export default ChatSettings;
