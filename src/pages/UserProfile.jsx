/* eslint-disable react/prop-types */
import { Stack } from "@mui/material";
import React from "react";
import Navbar from "../components/profile/shared/Navbar";
import { Outlet } from "react-router-dom";
import ProfileHeaderUser from "../components/profile/user/ProfileHeaderUser";

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
