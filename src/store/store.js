import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/appSlice";
import userSlice from "./slices/userSlice";
import userInfoSlice from "./slices/userInfoSlice";

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    user: userSlice.reducer,
    userInfo: userInfoSlice.reducer,
  },
});

export default store;
