import { StarRateOutlined } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  profile: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setProfile(state, action) {
      state.profile = action.payload;
    },
    setLogout(state) {
      state.profile = {};
      state.isLoggedIn = false;
    },
  },
});

export default userSlice;
const userActions = userSlice.actions;
export { userActions };
