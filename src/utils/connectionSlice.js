import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: [],
  reducers: {
    addConnection: (state, action) => {
      // accept array (replace) or single connection (append if not exists)
      if (Array.isArray(action.payload)) return action.payload;
      if (!action.payload) return state;
      const payload = action.payload;
      const id = payload._id || payload.id;
      if (!id) return state;
      if (state.some((c) => c._id === id || c.id === id)) return state;
      return [...state, payload];
    },
    removeConnection: (state, action) => {
      const id =
        typeof action.payload === "string"
          ? action.payload
          : action.payload?._id || action.payload?.id;
      return state.filter((c) => c._id !== id && c.id !== id);
    },
  },
});

export const { addConnection, removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer;
