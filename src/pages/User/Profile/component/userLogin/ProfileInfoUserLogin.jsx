import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import MyIconButton from "../../../../../components/Customized/MyIconButton";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import noImage from "../../../../../assets/images/user.png";

import { Edit } from "@mui/icons-material";
import ProfileImgChange from "./ProfileImgChange";
import { useNavigate } from "react-router-dom";

export default function ProfileInfoUserLogin() {
  const theme = useSelector((state) => state.app.theme);
  const userLogin = useSelector((state) => state.user.profile);
  const navigate = useNavigate();

  const [profileImgOpen, setProfileImgOpen] = useState(false);
  const [profileImg, setProfileImg] = useState(
    userLogin.profileImg ? SERVER_URL + userLogin.profileImg : noImage
  );

  console.log("user login", userLogin);
  function addStory() {}

  return (
    <Container
      fixed
      maxWidth="md"
      sx={{
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Stack
        sx={{
          position: "absolute",
          top: "-40px",
          width: "100%",
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: 7,
          }}
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
                {userLogin.username}
              </Typography>
              <Typography sx={{ fontSize: 17 }}>
                {/*  {user?.friends.length ? user.friends + "friends" : " "}
            {user?.mutual ? ", " + user.mutual + "mutual" : ""} */}
              </Typography>
            </Stack>
            <Stack sx={{ flexDirection: "row", gap: 2 }}>
              <Button
                startIcon={<PersonAddAlt1Icon />}
                size="large"
                sx={{ fontSize: 17 }}
                disableElevation
                onClick={addStory}
              >
                Add story
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
                startIcon={<Edit />}
                disableElevation
                onClick={() => navigate("/edit/user/" + userLogin.id)}
              >
                Edit profile
              </Button>
            </Stack>
          </Stack>
        </Stack>

        <ProfileImgChange
          open={profileImgOpen}
          onClose={() => setProfileImgOpen(false)}
          setProfileImg={setProfileImg}
        />
      </Stack>
    </Container>
  );
}
