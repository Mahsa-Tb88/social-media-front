import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobile: false,
  theme: "light",
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
    setTheme(state, action) {
      localStorage.theme = action.payload;
      state.theme = action.payload;
    },
    setInitialized(state, action) {
      state.initialized = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
  },
});

export default appSlice;
const appActions = appSlice.actions;
export { appActions };
