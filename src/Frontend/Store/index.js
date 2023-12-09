//Redux logic
import { configureStore } from "@reduxjs/toolkit";
import loadingManager from "./loadingManager";
import navbarManager from "./navbarManager";
import modalManager from "./modalManager";
import alertManager from "./alertManager";

const store = configureStore({
  reducer: {
    navbar: navbarManager.reducer,
    loading: loadingManager.reducer,
    modal: modalManager.reducer,
    alert: alertManager.reducer,
  },
});

export default store;
