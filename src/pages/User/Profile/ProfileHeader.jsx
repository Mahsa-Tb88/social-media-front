import { Box, Container, Grid2, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import BackgroundChange from "../BackgroundChange";
import ProfileImgChange from "./ProfileImgChange";
import MyIconButton from "../../../components/Customized/MyIconButton";
import { Edit, PersonPin } from "@mui/icons-material";
import { useSelector } from "react-redux";
import backGround from "../../../assets/images/back.jpg";
import noImage from "../../../assets/images/user.png";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";

export default function ProfileHeader() {
  const user = useSelector((state) => state.user);

  const [backgroundOpen, setBackgroundOpen] = useState(false);
  const [backgroundImg, setBackgroundImg] = useState(
    user.profile?.backgroundImg
      ? SERVER_URL + user.profile.backgroundImg
      : backGround
  );

  const [profileImgOpen, setProfileImgOpen] = useState(false);
  const [profileImg, setProfileImg] = useState(
    user.profile.profileImg ? SERVER_URL + user.profile.profileImg : noImage
  );
  return (
    <Container>
      <Grid2 container>
        <Grid2 size={12} sx={{ mt: 3 }}>
          <Stack sx={{ height: "400px", position: "relative" }}>
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
              <MyIconButton
                sx={{ position: "absolute", bottom: "10px", right: "10px" }}
                onClick={() => setBackgroundOpen(true)}
              >
                <Edit />
              </MyIconButton>
            </Stack>
            <Stack
              sx={{
                position: "absolute",
                bottom: "-50%",
                left: "10%",
                heigh: "20%",
                width: "20%",
              }}
            >
              <Stack sx={{ position: "relative" }}>
                <Box
                  component="img"
                  src={profileImg}
                  sx={{
                    border: "var(--border)",
                    borderRadius: "50%",
                  }}
                />
                <MyIconButton
                  sx={{ position: "absolute", bottom: "10px", right: "10px" }}
                  onClick={() => setProfileImgOpen(true)}
                >
                  <Edit />
                </MyIconButton>
              </Stack>
              <Stack sx={{ textAlign: "center", mt: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 2,
                  }}
                >
                  <PersonIcon />
                  <Typography sx={{ fontWeight: "bold", fontSize: 25 }}>
                    {user.profile.username}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 2,
                  }}
                >
                  <HomeIcon />
                  <Typography sx={{ fontWeight: "bold", fontSize: 25 }}>
                    {user.profile.livesIn}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 2,
                  }}
                >
                  <WorkIcon />
                  <Typography sx={{ fontWeight: "bold", fontSize: 25 }}>
                    {user.profile.work}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Grid2>
      </Grid2>
      <BackgroundChange
        open={backgroundOpen}
        onClose={() => setBackgroundOpen(false)}
        setBackgroundImg={setBackgroundImg}
      />
      <ProfileImgChange
        open={profileImgOpen}
        onClose={() => setProfileImgOpen(false)}
        setProfileImg={setProfileImg}
      />
    </Container>
  );
}
