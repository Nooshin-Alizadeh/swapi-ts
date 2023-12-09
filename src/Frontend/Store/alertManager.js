import { createSlice } from "@reduxjs/toolkit";
export const alertManager = createSlice({
  name: "baseAlertSlice",
  initialState: { config: null },
  reducers: {
    alertConfig(state, action) {
      if (action.payload.config == null) state.config = null;
      else {
        if (!state.config) state.config = [];
        state.config.push(action.payload.config);
      }
    },
  },
});
export const alertAction = alertManager.actions;
export default alertManager;
