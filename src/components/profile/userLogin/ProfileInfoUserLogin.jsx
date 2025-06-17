/* eslint-disable no-undef */
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import MyIconButton from "../../../components/Customized/MyIconButton";
import noImage from "../../../assets/images/user.png";

import { Edit } from "@mui/icons-material";
import ProfileImgChange from "./ProfileImgChange";
import { useNavigate } from "react-router-dom";

export default function ProfileInfoUserLogin() {
  const userLogin = useSelector((state) => state.user.profile);
  const navigate = useNavigate();
  const isMobile = useSelector((state) => state.app.isMobile);

  const [profileImgOpen, setProfileImgOpen] = useState(false);
  const [profileImg, setProfileImg] = useState(
    userLogin.profileImg
      ? userLogin.profileImg.includes(SERVER_URL)
        ? userLogin.profileImg
        : SERVER_URL + userLogin.profileImg
      : noImage
  );
  console.log("profileImg", profileImg);
  console.log("userLogin", userLogin);

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
              // src={profileImg ? SERVER_URL + profileImg : noImage}
              src={profileImg}
              sx={{
                border: "var(--border)",
                borderRadius: "50%",
                width: isMobile ? "150px" : "200px",
                height: isMobile ? "150px" : "200px",
                objectFit: "cover",
                display: "block",
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
              flexDirection: isMobile ? "column" : "row",
              mt: 8,
              justifyContent: "space-between",
            }}
          >
            <Stack sx={{ alignItems: "flex-start" }}>
              <Typography
                sx={{ fontWeight: "bold", fontSize: isMobile ? 20 : 30 }}
              >
                {userLogin.username}
              </Typography>
              <Typography sx={{ fontSize: isMobile ? "12px" : "16px" }}>
                {userLogin.friends.listFriend.length + " friends"}
              </Typography>
              <AvatarGroup
                max={4}
                sx={{
                  "& .css-wze2on-MuiAvatar-root": {
                    width: isMobile ? 20 : 35,
                    height: isMobile ? 20 : 35,
                    fontSize: isMobile ? "12px" : "18px",
                  },
                }}
              >
                {userLogin.friends.listFriend.map((f) => {
                  return (
                    <Avatar
                      key={f.id}
                      alt={f.username[0].toUpperCase()}
                      src={SERVER_URL + f.profileImg}
                      onClick={() => navigate("/profile/" + f.id)}
                      sx={{
                        cursor: "pointer",
                        transition: "transform 0.3s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.08)",
                        },
                        width: isMobile ? 20 : 35,
                        height: isMobile ? 20 : 35,
                        fontSize: isMobile ? "12px" : "18px",
                      }}
                    />
                  );
                })}
              </AvatarGroup>
            </Stack>
            <Stack>
              <Button
                size={isMobile ? "small" : "large"}
                sx={{
                  fontSize: isMobile ? 12 : 17,
                  mt: isMobile ? "10px" : "",
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
