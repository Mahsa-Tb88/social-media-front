import { Box, Stack } from "@mui/material";
import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function PublicLayout() {
  return (
    <Stack minHeight="100vh">
      <Navbar />
      <Box flexGrow={1}>
        <Outlet />
      </Box>
      <Footer/>
    </Stack>
  );
}
