import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import Navbar from "../component/shared/Navbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileHeaderUser from "../component/user/ProfileHeaderUser";

export default function UserProfile({ user }) {
  console.log("user not login", user);

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
