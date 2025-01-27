import { StarRateOutlined } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  profile: {},
  overview: [],
  contact: [],
  education: [],
  placeLived: [],
  work: [],
  relationship: {},
  family: [],
  websites: [],
  baseInfo: [],
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
    setOverview(state, action) {
      console.log("action", action);
      state.overview = action.payload;
    },
    setContact(state, action) {
      state.contact = action.contact;
    },
    setRelationship(state, action) {
      state.relationship = action.relationship;
    },
    setWebsites(state, action) {
      state.websites = action.websites;
    },
    setBaseInfo(state, action) {
      state.baseInfo = action.baseInfo;
    },
    setEducation(state, action) {
      state.education = action.education;
    },
    setPlaceLived(state, action) {
      state.placeLived = action.placeLived;
    },
    setWork(state, action) {
      state.work = action.work;
    },
    setFamily(state, action) {
      state.family = action.family;
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
