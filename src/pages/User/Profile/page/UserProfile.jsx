import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import Navbar from "../component/shared/Navbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileHeaderUser from "../component/user/ProfileHeaderUser";

export default function UserProfile({ user }) {
  console.log("user not login", user);
  // const userLogin = useSelector((state) => state.user.profile);

  // function isPrivate() {
  //   const findFriend = userLogin.friends.listFriend.find(
  //     (f) => f.id == user._id
  //   );
  //   if (findFriend) {
  //     if (findFriend.status == "pending") {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } else {
  //     return true;
  //   }
  // }

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
