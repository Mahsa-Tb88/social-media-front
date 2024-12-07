import { StarRateOutlined } from "@mui/icons-material";
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
      state.profile = action.payload;
    },
    setLogout(state) {
      state.profile = {};
      state.isLoggedIn = false;
      state.isAdmin = false;
    },
  },
});

export default userSlice;
const userActions = userSlice.actions;
export { userActions };
