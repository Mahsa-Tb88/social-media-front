import { Stack } from "@mui/material";
import React from "react";
import ProfileHeaderUserLogin from "../component/userLogin/ProfileHeaderUserLogin";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";

export default function userLoginProfile() {
  return (
    <Stack>
      <ProfileHeaderUserLogin />
      <Stack>
        <Navbar />
        <Outlet />
      </Stack>
    </Stack>
  );
}
