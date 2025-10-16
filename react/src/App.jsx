import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import HomePage from "./pages/HomePage";
import ChatDashboard from "./pages/ChatDashboard";
import Chat from "./pages/Chat";
import "./App.css";
import Settings from "./pages/settings/Settings";
import ChatSettings from "./pages/settings/ChatSettings";
import AccountSettings from "./pages/settings/AccountSettings";
import PrivacySettings from "./pages/settings/PrivacySettings";
import HelpSettings from "./pages/settings/HelpSettings";
import InviteSettings from "./pages/settings/InviteSettings";
import AOS from "aos";
import "aos/dist/aos.css";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import ToastPop from "./components/ToastPop";
import MyChats from "./components/MyChats";
import Stories from "./pages/Stories";
import AllUsers from "./components/AllUsers";
import AllRequests from "./components/AllRequests";
import CDcopy from "./pages/CDcopy";


const App = () => {
  const { socket } = useSelector((state) => state.socket);
  const { user } = useSelector((state) => state.auth);
  const { currentChatId } = useSelector((state) => state.chat);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("message received", (message) => {
      // Don't show toast if user is currently in that chat
      console.log("hi front");
      console.log(message);

      if (message.chat._id !== currentChatId) {
        toast.custom((t) => <ToastPop t={t} data={message} />);

        // toast.success(`💬 ${message.sender.name}: "${message.content}"`, {
        //   duration: 4000,
        //   position: "bottom-right",
        //   style: {
        //     background: "#054640",
        //     color: "white",
        //     borderRadius: "10px",
        //     fontSize: "14px",
        //     width: window.innerWidth < 768 ? "80%" : "400px",
        //   },
        // });
      }
    });

    return () => {
      socket.off("message received");
    };
  }, [socket, currentChatId]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/dashboard" element={<ChatDashboard />} /> */}

        <Route path="/dashboard" element={<CDcopy />}>
          <Route index element={<MyChats />} />
          <Route path="chats" element={<MyChats />} />
          <Route path="stories" element={<Stories />} />
          <Route path="requests" element={<AllRequests />} />
          <Route path="all-users" element={<AllUsers />} />
        </Route>

        <Route path="/chat/:userId" element={<Chat />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/chats" element={<ChatSettings />} />
        <Route path="/settings/account" element={<AccountSettings />} />
        <Route path="/settings/privacy" element={<PrivacySettings />} />
        <Route path="/settings/help" element={<HelpSettings />} />
        <Route path="/settings/invite" element={<InviteSettings />} />
      </Routes>
      <Toaster position="top-center" />
    </Router>
  );
};

export default App;
