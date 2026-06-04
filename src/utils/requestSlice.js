import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    addRequest: (state, action) => {
      // accept array (replace) or single request object (append if not exists)
      // if (Array.isArray(action.payload)) return action.payload;
      // if (!action.payload) return state;
      // const payload = action.payload;
      // // support payload being a request or a nested user (fromUserId)
      // const id =
      //   payload._id ||
      //   payload.id ||
      //   payload.fromUserId?._id ||
      //   payload.fromUserId?.id;
      // if (!id) return state;
      // const exists = state.some(
      //   (r) => r._id === id || r.fromUserId?._id === id || r.id === id,
      // );
      // if (exists) return state;
      //return [...state, payload];
      return action.payload;
    },
    removeRequest: (state, action) => {
      const id =
        typeof action.payload === "string"
          ? action.payload
          : action.payload?._id ||
            action.payload?.id ||
            action.payload?.fromUserId?._id;
      return state.filter(
        (request) =>
          request._id !== id &&
          request.fromUserId?._id !== id &&
          request.id !== id,
      );
    },
  },
});

export const { addRequest, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
