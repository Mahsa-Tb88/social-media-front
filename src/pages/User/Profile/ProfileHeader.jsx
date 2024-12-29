import {
  Box,
  Button,
  Container,
  Grid2,
  Stack,
  Typography,
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

export default function ProfileHeader({ user }) {
  const userLogin = useSelector((state) => state.user.profile);
  const theme = useSelector((state) => state.app.theme);

  const [backgroundOpen, setBackgroundOpen] = useState(false);
  const [backgroundImg, setBackgroundImg] = useState(
    user.backgroundImg ? SERVER_URL + user.backgroundImg : backGround
  );

  const [profileImgOpen, setProfileImgOpen] = useState(false);
  const [profileImg, setProfileImg] = useState(
    user.profileImg ? SERVER_URL + user.profileImg : noImage
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
              {userLogin.username == user.username && (
                <MyIconButton
                  sx={{ position: "absolute", bottom: "10px", right: "10px" }}
                  onClick={() => setBackgroundOpen(true)}
                >
                  <Edit />
                </MyIconButton>
              )}
            </Stack>
            <Stack
              sx={{
                position: "absolute",
                top: "80%",
                left: "10%",
                width: "80%",
              }}
            >
              <Stack
                sx={{ flexDirection: "row", alignItems: "center", gap: 7 }}
              >
                <Stack sx={{ position: "relative" }}>
                  <Box
                    component="img"
                    src={profileImg}
                    sx={{
                      border: "var(--border)",
                      borderRadius: "50%",
                      width: "200px",
                      height: "200px",
                    }}
                  />
                  {userLogin.username == user.username && (
                    <MyIconButton
                      sx={{
                        position: "absolute",
                        bottom: "10%",
                        right: "0",
                      }}
                      onClick={() => setProfileImgOpen(true)}
                    >
                      <Edit />
                    </MyIconButton>
                  )}
                </Stack>
                <Stack
                  sx={{
                    width: "100%",
                    flexDirection: "row",
                    mt: 8,
                    justifyContent: "space-between",
                  }}
                >
                  <Stack>
                    <Typography sx={{ fontWeight: "bold", fontSize: 30 }}>
                      {user.username}
                    </Typography>
                    <Typography sx={{ fontSize: 17 }}>
                      {user.friends.length ? user.friends + "friends" : " "}
                      {user.mutual ? ", " + user.mutual + "mutual" : ""}
                    </Typography>
                  </Stack>
                  <Stack sx={{ flexDirection: "row", gap: 2 }}>
                    <Button
                      startIcon={
                        user._id != userLogin._id ? (
                          <PersonAddAlt1Icon />
                        ) : (
                          <AddIcon />
                        )
                      }
                      size="large"
                      sx={{ fontSize: 17 }}
                      disableElevation
                    >
                      {user._id != userLogin._id
                        ? "Add friend"
                        : "Add to story"}
                    </Button>
                    <Button
                      size="large"
                      sx={{
                        fontSize: 17,
                        bgcolor: theme == "light" ? "grey.200" : "grey.800",
                        color: theme == "light" ? "grey.800" : "grey.200",
                        "&:hover": {
                          bgcolor: theme == "light" ? "grey.300" : "grey.900",
                        },
                      }}
                      startIcon={
                        user._id != userLogin._id ? <MessageIcon /> : <Edit />
                      }
                      disableElevation
                    >
                      {user._id != userLogin._id ? "Message" : "Edit profile"}
                    </Button>
                  </Stack>
                </Stack>
              </Stack>

              {/*  <Stack sx={{ textAlign: "center" }}>
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
                    {user.username}
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
                    {user.livesIn}
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
                    {user.work}
                  </Typography>
                </Box>
              </Stack> */}
            </Stack>
          </Stack>
        </Grid2>
      </Grid2>
      {userLogin.username == user.username && (
        <BackgroundChange
          open={backgroundOpen}
          onClose={() => setBackgroundOpen(false)}
          setBackgroundImg={setBackgroundImg}
        />
      )}
      {userLogin.username == user.username && (
        <ProfileImgChange
          open={profileImgOpen}
          onClose={() => setProfileImgOpen(false)}
          setProfileImg={setProfileImg}
        />
      )}
    </Container>
  );
}
