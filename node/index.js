import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";



import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());


app.use(cors({
  origin: ["http://localhost:3000" ,"http://192.168.1.40:3000"],  // This is your PC's IP address
  credentials: true,
}));

// 192.168.1.39


// ✅ Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ API Routes

app.get("/", (req, res) => {
  res.send("🚀 ChatsApp backend running successfully");
});

// ✅ Create HTTP server
const server = createServer(app);

// ✅ Initialize Socket.io
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  },
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes(io));
app.use("/api/requests", requestRoutes);

// ✅ Socket.io Real-Time Logic
io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  // Join user to their own room (for direct messages)
  socket.on("setup", (userData) => {
    console.log(userData);
    console.log("hello socket");
    
    
    socket.join(userData);
    socket.emit("connected");
    console.log(`User ${userData} connected`);
  });

  // Join specific chat room
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  // Handle typing indicators
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  // Handle sending new messages
  socket.on("new message", (newMessageReceived) => {
    
    const chat = newMessageReceived.chat;
    if (!chat.users) return console.log("Chat users not defined");
    
    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;
      socket.in(user._id).emit("message received", newMessageReceived);
      
    });
  });

  // Handle disconnection
  socket.off("setup", (userData) => {
    console.log("🔴 User disconnected:", userData._id);
    socket.leave(userData._id);
  });
});


// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server running on port ${PORT}`));


