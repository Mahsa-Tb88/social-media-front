/* eslint-disable react/prop-types */
import { Stack } from "@mui/material";
import React from "react";
import Navbar from "../component/shared/Navbar";
import { Outlet } from "react-router-dom";
import ProfileHeaderUser from "../component/user/ProfileHeaderUser";

export default function UserProfile({ user }) {
  return (
    <Stack>
      <ProfileHeaderUser user={user} />
      <Stack>
        <Navbar />
        <Outlet />
      </Stack>
    </Stack>
  );
}
