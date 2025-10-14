// /redux/socketSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { toast } from "react-hot-toast";

const initialState = {
  socket: null,
  connected: false,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action) => {
                
      state.socket = action.payload;
      state.connected = true;

    },
    clearSocket: (state) => {
      if (state.socket) {
        state.socket.disconnect();
      }
      state.socket = null;
      state.connected = false;
    },
  },
});

export const selectSocket = (state) => state.socket.socket;
export const { setSocket, clearSocket } = socketSlice.actions;
export default socketSlice.reducer;
