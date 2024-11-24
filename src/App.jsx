import React from "react";
import { CssBaseline, Stack } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { Outlet } from "react-router-dom";
import Initializer from "./Layouts/Initializer";

export default function App() {
  const initialized = 1;
  return (
    <ThemeProvider>
      <CssBaseline />
      {initialized ? <Outlet /> : <Initializer />}
    </ThemeProvider>
  );
}
