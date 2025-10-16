import axios from 'axios';
import { Camera, Link, Mic, SendHorizontal } from 'lucide-react'
import { useState } from 'react'

const ChatInput = ({chat, token, socket}) => {
    const [msg, setMsg] = useState("");
    const [typing, setTyping] = useState(false);
    
    
    const handleChange = (e) => {
    setTyping(true);
    setMsg((prev) => e.target.value);
  };

  const handleSubmit = async (e) => {
   
    e.preventDefault();
    if (!msg) return;

    try {
      const { data } = await axios.post(
        `http://192.168.1.40:5000/api/messages/`,
        { content: msg, chatId: chat },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMsg("");
      setTyping(false);

      // ✅ Emit socket event
      console.log(socket);
      
      socket?.emit("new message", data);

    } catch (err) {
      console.error(err);
      setMsg("");
      setTyping(false);
    }

    // setMsg(prev => )
  };



  return (
    <div className="w-full md:w-1/2 flex gap-2 items-center justify-center fixed bottom-0 px-2 pb-4 bg-[#4f0186] ">
          <div className="flex flex-1 bg-white rounded-full px-3 py-1  ">
            <div className=" flex-1 max-w-full flex items-center ">
              <input
                type="text"
                className="outline-0 flex-1 "
                placeholder="Type a message"
                onChange={handleChange}
                value={msg}
              />
            </div>
            <div className=" h-[40px] w-[40px] flex items-center justify-center rounded-full active:bg-[#aba9a975] hover:bg-[#aba9a975]  ">
              <Link className=" h-full " />
            </div>
            {!typing && (
              <div className=" h-[40px] w-[40px] flex items-center justify-center rounded-full active:bg-[#aba9a975] hover:bg-[#aba9a975] ">
                <Camera />
              </div>
            )}
          </div>
          {!typing && (
            <button className="h-[50px] w-[50px] flex items-center justify-center text-white bg-[#25D366] rounded-full hover:bg-[#aba9a975] active:bg-[#aba9a975] ">
              <Mic className="h-full" />
            </button>
          )}
          {typing && (
            <button className="h-[50px] w-[50px] flex items-center justify-center text-white bg-[#25D366] rounded-full hover:bg-[#aba9a975] active:bg-[#aba9a975] ">
              <SendHorizontal onClick={handleSubmit} />
            </button>
          )}
        </div>
  )
}

export default ChatInput