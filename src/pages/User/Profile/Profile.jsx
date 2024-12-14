import { Box, Container, Grid2, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import backGround from "../../../assets/images/back.jpg";
import noImage from "../../../assets/images/user.png";
import { Edit } from "@mui/icons-material";
import MyIconButton from "../../../components/Customized/MyIconButton";
import BackgroundChange from "../BackgroundChange";
import ProfileImgChange from "./ProfileImgChange";
import ProfileHeader from "./ProfileHeader";
import Content from "./Content";

export default function Profile() {
  // const user = useSelector((state) => state.user);

  // const [backgroundOpen, setBackgroundOpen] = useState(false);
  // const [backgroundImg, setBackgroundImg] = useState(
  //   user.profile?.backgroundImg
  //     ? SERVER_URL + user.profile.backgroundImg
  //     : backGround
  // );

  // const [profileImgOpen, setProfileImgOpen] = useState(false);
  // const [profileImg, setProfileImg] = useState(
  //   user.profile.profileImg ? SERVER_URL + user.profile.profileImg : noImage
  // );

  return (
    <Stack>
    
      <ProfileHeader />
      <Content />
    </Stack>
  );
}
