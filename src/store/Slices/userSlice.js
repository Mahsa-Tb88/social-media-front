import { StarRateOutlined } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  profile: {
    email: "",
    username: "",
    id: "",
    profileImg: "",
    backgroundImg: "",
    bio: "",
    viewer: "",
    messages: [],
    friends: {
      // listFriend: [
      //   { id: 1, username: "mah", profileImag: "" },
      //   { id: "2", username: "gol", profileImg: "" },
      // ],
      // listFriendRequest:[{ id: "3", username: "gfhf", profileImg: "" },]
    },
  },
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
    setIsAdmin(state, action) {
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
