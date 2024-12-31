import {
  Box,
  Button,
  Container,
  Grid2,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import BackgroundChange from "../BackgroundChange";
import ProfileImgChange from "./ProfileImgChange";
import MyIconButton from "../../../components/Customized/MyIconButton";
import { Edit } from "@mui/icons-material";
import { useSelector } from "react-redux";
import backGround from "../../../assets/images/back.jpg";
import noImage from "../../../assets/images/user.png";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import MessageIcon from "@mui/icons-material/Message";
import AddIcon from "@mui/icons-material/Add";
import ProfileInfo from "./ProfileInfo";

export default function ProfileHeader({ user }) {
  const userLogin = useSelector((state) => state.user.profile);
  const theme = useSelector((state) => state.app.theme);

  const [backgroundOpen, setBackgroundOpen] = useState(false);
  const [backgroundImg, setBackgroundImg] = useState(
    user.backgroundImg ? SERVER_URL + user.backgroundImg : backGround
  );

  // const [profileImgOpen, setProfileImgOpen] = useState(false);
  // const [profileImg, setProfileImg] = useState(
  //   user.profileImg ? SERVER_URL + user.profileImg : noImage
  // );
  return (
    <Container>
      <Grid2 container>
        <Grid2 size={12} sx={{ mt: 3 }}>
          <Stack sx={{ height: "300px", position: "relative" }}>
            <Stack sx={{ width: "100%", height: "100%" }}>
              <Box
                src={backgroundImg}
                sx={{
                  objectFit: "cover",
                  objectPosition: "center",
                  width: "100%",
                  height: "100%",
                  borderRadius: "5px",
                }}
                component="img"
              />
              {userLogin.username == user.username && (
                <MyIconButton
                  sx={{ position: "absolute", bottom: "10px", right: "10px" }}
                  onClick={() => setBackgroundOpen(true)}
                >
                  <Edit />
                </MyIconButton>
              )}
            </Stack>
          </Stack>
        </Grid2>
      </Grid2>
      <ProfileInfo user={user} />
      {userLogin.username == user.username && (
        <BackgroundChange
          open={backgroundOpen}
          onClose={() => setBackgroundOpen(false)}
          setBackgroundImg={setBackgroundImg}
        />
      )}
    </Container>
  );
}
