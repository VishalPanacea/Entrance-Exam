import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./signupSlice"; 
import loginReducer from "./loginSlice";
import lpSideMenuReducer from "./lpSideMenuSlice";
import lpMainAreaReducer from "./lpMainAreaSlice";
import confirmPhoneReducer from "./confirmPhoneSlice";

const store = configureStore({
  reducer: {
    signup: signupReducer, 
    login: loginReducer,
    confirmPhone: confirmPhoneReducer,
    lpSideMenu: lpSideMenuReducer,
    lpMainArea: lpMainAreaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
