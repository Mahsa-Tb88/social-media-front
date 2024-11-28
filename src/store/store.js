import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/appSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
