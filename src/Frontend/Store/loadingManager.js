/* eslint-disable eqeqeq */
import { createSlice } from "@reduxjs/toolkit";

export const loadingManager = createSlice({
  name: "loading",
  initialState: { loadin: {} },
  reducers: {
    isLoading(state, action) {
      
      if (action.payload.valueState == false) {
        delete state.loadin[action.payload.id];
      } else {
        state.loadin[action.payload.id] = action.payload.valueState;
      }
    }
  }
});
export const loadingAction = loadingManager.actions;

export default loadingManager;
