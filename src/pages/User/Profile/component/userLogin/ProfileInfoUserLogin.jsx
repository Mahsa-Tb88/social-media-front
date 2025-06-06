import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import MyIconButton from "../../../../../components/Customized/MyIconButton";
import noImage from "../../../../../assets/images/user.png";

import { Edit } from "@mui/icons-material";
import ProfileImgChange from "./ProfileImgChange";
import { useNavigate } from "react-router-dom";

export default function ProfileInfoUserLogin() {
  const userLogin = useSelector((state) => state.user.profile);
  const navigate = useNavigate();
  console.log("userlogin", userLogin);

  const [profileImgOpen, setProfileImgOpen] = useState(false);
  const [profileImg, setProfileImg] = useState(
    userLogin.profileImg ? SERVER_URL + userLogin.profileImg : noImage
  );

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
              <Typography sx={{}}>
                {userLogin.friends.listFriend.length + " friends"}
              </Typography>
              <AvatarGroup max={4}>
                {userLogin.friends.listFriend.map((f) => {
                  return (
                    <Avatar
                      key={f._id}
                      alt={f.username[0].toUpperCase()}
                      src={SERVER_URL + f.profileImg}
                      onClick={() => navigate("/profile/" + f.id)}
                      sx={{ cursor: "pointer", width: 35, height: 35 }}
                    />
                  );
                })}
              </AvatarGroup>
            </Stack>
            <Stack sx={{ flexDirection: "row", gap: 2 }}>
              <Button
                size="large"
                sx={{
                  fontSize: 17,
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
