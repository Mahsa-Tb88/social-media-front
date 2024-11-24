import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./Slices/appSlice";
import userSlice from "./Slices/userSlice";

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
