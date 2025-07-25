import React, { useEffect } from "react";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Initializer from "./Layouts/Initializer";
import { useDispatch, useSelector } from "react-redux";
import { appActions } from "./store/slices/appSlice";
import darkTheme from "./themes/darkTheme";
import lightTheme from "./themes/lightTheme";

export default function App() {
  const initialized = useSelector((state) => state.app.initialized);
  const theme = useSelector((state) => state.app.theme);

  const isMobile = useMediaQuery("(max-width:899px)");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(appActions.setMobile(isMobile));
  }, [isMobile]);

  useEffect(() => {
    if (localStorage.theme == "dark") {
      dispatch(appActions.setTheme("dark"));
    }
  }, []);

  return (
    <ThemeProvider theme={theme == "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      {initialized ? <Outlet /> : <Initializer />}
    </ThemeProvider>
  );
}
