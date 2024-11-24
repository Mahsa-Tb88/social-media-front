import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdmin: false,
  isLoggedIn: false,
  profile: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAdmin(state, action) {
      state.isAdmin = action.payload;
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setProfile(state, action) {
      state.profile.username = action.payload.username;
    },
  },
});

export default userSlice;
