import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
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
  },
});

export default userInfoSlice;
const userInfoActions = userInfoSlice.actions;
export { userInfoActions };
