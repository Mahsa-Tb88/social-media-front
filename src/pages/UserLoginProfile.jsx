import { Stack } from "@mui/material";
import React from "react";
import ProfileHeaderUserLogin from "../components/profile/userLogin/ProfileHeaderUserLogin";
import Navbar from "../components/profile/shared/Navbar";
import { Outlet } from "react-router-dom";

export default function userLoginProfile() {
  return (
    <Stack>
      <Stack sx={{ bgcolor: "backgroundColor.default" }}>
        <ProfileHeaderUserLogin />
      </Stack>
      <Stack>
        <Stack sx={{ bgcolor: "backgroundColor.default" }}>
          <Navbar />
        </Stack>
        <Outlet />
      </Stack>
    </Stack>
  );
}
