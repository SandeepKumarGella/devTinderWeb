import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeed: (state, action) => {
      if (Array.isArray(action.payload)) {
        return action.payload;
      }
      if (!action.payload) return state;
      const payload = action.payload;
      const id = payload._id || payload.id;
      return [...state.filter((u) => u._id !== id), payload];
    },
    removeFeed: (state, action) => {
      const id =
        typeof action.payload === "string"
          ? action.payload
          : action.payload?._id || action.payload?.id;
      return state.filter((item) => item._id !== id);
    },
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
