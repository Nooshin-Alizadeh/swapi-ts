import { createSlice } from "@reduxjs/toolkit";
export const modalManager = createSlice({
  name: "baseModalSlice",
  initialState: { config: null },
  reducers: {
    modalConfig(state, action) {
      state.config = action.payload.config;
    },
  },
});
export const modalAction = modalManager.actions;
export default modalManager;
