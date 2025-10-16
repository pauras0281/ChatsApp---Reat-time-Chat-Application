import FriendRequest from "../models/FriendRequest.js";


// POST /api/requests/send
export const sendRequest = async (req, res) => {
  const { receiverId } = req.body;
  const senderId = req.user._id;

  console.log(`seindng req : ${receiverId}`);
  

  // Prevent duplicate or self requests
  const existing = await FriendRequest.findOne({ sender: senderId, receiver: receiverId });
  if (existing) return res.status(400).json({ message: "Request already sent" });
  if (senderId.toString() === receiverId) return res.status(400).json({ message: "Cannot add yourself" });

  const request = await FriendRequest.create({ sender: senderId, receiver: receiverId });
  res.status(201).json(request);
};


// GET /api/requests
export const getRequests = async (req, res) => {
  const requests = await FriendRequest.find({ receiver: req.user._id, status: "pending" })
    .populate("sender", "name profilePic");
  res.json(requests);
};

// POST /api/requests/respond
export const respondToRequest = async (req, res) => {
  const { requestId, action } = req.body; // action = 'accept' or 'reject'
  const request = await FriendRequest.findById(requestId);
  if (!request) return res.status(404).json({ message: "Request not found" });

  request.status = action === "accept" ? "accepted" : "rejected";
  await request.save();

  if (action === "accept") {
    // Optionally create a chat now that both agreed
    const chat = await Chat.create({ users: [request.sender, request.receiver] });
    return res.json({ message: "Request accepted", chat });
  }

  res.json({ message: `Request ${action}ed` });
};
