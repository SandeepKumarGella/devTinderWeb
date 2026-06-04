import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chats",
  initialState: {
    messages: [],
  },
  reducers: {
    updateMessages: (state, action) => {
      state.messages = action.payload;
      return state;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
      return state;
    },
  },
});

export const { updateMessages, addMessage } = chatSlice.actions;

export default chatSlice.reducer;
