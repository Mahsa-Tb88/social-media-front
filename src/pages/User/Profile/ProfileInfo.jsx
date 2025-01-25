import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import noImage from "../../../assets/images/user.png";
import MyIconButton from "../../../components/Customized/MyIconButton";
import { Edit } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import ProfileImgChange from "./ProfileImgChange";

export default function ProfileInfo({ user }) {
  const theme = useSelector((state) => state.app.theme);
  const userLogin = useSelector((state) => state.user.profile);
  const [profileImg, setProfileImg] = useState(
    user.profileImg ? SERVER_URL + user.profileImg : noImage
  );
  const [profileImgOpen, setProfileImgOpen] = useState(false);

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
               {/*  {user?.friends.length ? user.friends + "friends" : " "}
                {user?.mutual ? ", " + user.mutual + "mutual" : ""} */}
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
                {user._id != userLogin._id ? "Add friend" : "Add to story"}
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
        {userLogin.username == user.username && (
          <ProfileImgChange
            open={profileImgOpen}
            onClose={() => setProfileImgOpen(false)}
            setProfileImg={setProfileImg}
          />
        )}
      </Stack>
    </Container>
  );
}
