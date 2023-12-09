import { createSlice } from "@reduxjs/toolkit";

export const navbarManager = createSlice({
  name: "navBar",
  initialState: {},
  reducers: {
    navbarSearch(state1, action) {
      
      state1.navbarSearch = action.payload;
    },
  },
});
export const navbarAction = navbarManager.actions;
export default navbarManager;
