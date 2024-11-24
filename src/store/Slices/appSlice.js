import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobile: false,
  initialized: false,
  categories: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setMobile(state, action) {
      state.isMobile = action.payload;
    },
    setInitialized(state, action) {
      state.initialized = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
  },
});

export default appSlice