import Message from "../models/Message.js";
import User from "../models/User.js";
import Chat from "../models/Chat.js";

// @desc    Send a new message
// @route   POST /api/messages
// @access  Protected
export const sendMessage = async (req, res, io) => {
  const { content, chatId } = req.body;

  
  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.status(400).json({ message: "Invalid data" });
  }
  
  try {
    let newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };
    
    let message = await Message.create(newMessage);
    
    message = await message.populate("sender", "name profilePic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name profilePic email",
    });
    //     message = await message.populate({
      //   path: "chat.users",
      //   select: "name profilePic email"
      // });
      
    io.to(chatId).emit("message received", message);
    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all messages for a chat
// @route   GET /api/messages/:chatId
// @access  Protected
export const allMessages = async (req, res) => {
  try {
    
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name profilePic email")
      // .populate("chat")     it was like this but to get the name of the user 
      .populate({
        path: "chat",
        populate: {
          path: "users",
          select: "name profilePic email",
        },
      });

    res.json(messages);
  } catch (error) {
    console.error("Error in allMessages:", error);
    res.status(500).json({ message: "Server error" });
  }
};
