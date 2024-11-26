import React, { useState } from "react";
import { CssBaseline, Stack, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import Initializer from "./Layouts/Initializer";
import { useSelector } from "react-redux";

export default function App() {
  const initialized = useSelector((state) => state.app.initialized);
  console.log(initialized);
  return (
    <Stack>
      <CssBaseline />
      {initialized ? <Outlet /> : <Initializer />}
    </Stack>
  );
}
