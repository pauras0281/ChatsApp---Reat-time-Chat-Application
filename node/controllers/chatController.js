import Chat from "../models/Chat.js";
import User from "../models/User.js";

// @desc    Access or create one-on-one chat
// @route   POST /api/chats
// @access  Protected
export const accessChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  console.log(userId);
  

  try {
    let chat = await Chat.findOne({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

      console.log("after chat find" + chat);
      

    chat = await User.populate(chat, {
      path: "latestMessage.sender",
      select: "name email",
    });

    if (chat) return res.send(chat);

    const user1 = await User.findById(req.user._id);
    const user2 = await User.findById(userId);

    // Create new chat if not exists
    const chatData = {
      chatName: `${user1.name} and ${user2.name}`,
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    const createdChat = await Chat.create(chatData);
    const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
      "users",
      "-password"
    );

    res.status(200).send(fullChat);
  } catch (error) {
    console.error("Error in accessChat:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Fetch all chats for a user
// @route   GET /api/chats
// @access  Protected
export const fetchChats = async (req, res) => {
  try {              

    const chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });      
    
            

    res.status(200).send(chats);
  } catch (error) {
    console.error("Error in fetchChats:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Create a new group chat
// @route   POST /api/chats/group
// @access  Protected
export const createGroupChat = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  let users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .json({ message: "More than 2 users are required to form a group chat" });
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    console.error("Error in createGroupChat:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Rename Group
// @route   PUT /api/chats/rename
// @access  Protected
export const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { chatName },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    return res.status(404).json({ message: "Chat not found" });
  } else {
    res.json(updatedChat);
  }
};

// @desc    Add user to group
// @route   PUT /api/chats/groupadd
// @access  Protected
export const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  const added = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    return res.status(404).json({ message: "Chat not found" });
  } else {
    res.json(added);
  }
};

// @desc    Remove user from group
// @route   PUT /api/chats/groupremove
// @access  Protected
export const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    return res.status(404).json({ message: "Chat not found" });
  } else {
    res.json(removed);
  }
};
