import { Box, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

export default function PublicLayout() {
  return (
    <Stack minHeight="100vh">
      <Navbar />
      <Box flexGrow={1}>
        <Outlet />
      </Box>
    </Stack>
  );
}
