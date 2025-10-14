// /redux/chatSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentChatId: null,
  activeChat: null, // could hold chat object
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChatId = action.payload.chatId;
      state.activeChat = action.payload.chatData || null;
    },
    clearCurrentChat: (state) => {
      state.currentChatId = null;
      state.activeChat = null;
      state.messages = [];
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { setCurrentChat, clearCurrentChat, setMessages, addMessage } =
  chatSlice.actions;

export default chatSlice.reducer;
