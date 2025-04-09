import {
  Avatar,
  Box,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useLogin } from "../../../../../utils/mutation";

export default function Chat() {
  const theme = useSelector((state) => state.app.theme);
  const userLogin = useSelector((state) => state.user.profile);
  const id = useParams().id;
  const userId = id.replace(userLogin.id, "");

  return (
    <Stack
      sx={{
        bgcolor: theme === "dark" ? "grey.800" : "grey.200",
        height: "100vh",
      }}
    >
      <Container sx={{ py: 4 }}>
        <Stack
          sx={{
            bgcolor: theme === "dark" ? "black" : "white",
            py: 5,
            px: 3,
            borderRadius: "5px",
          }}
        >
          <Stack>
            <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
              {userLogin.profileImg ? (
                <Avatar
                  alt="Remy Sharp"
                  src={SERVER_URL + userLogin.profileImg}
                />
              ) : (
                <Avatar>{userLogin.username[0]}</Avatar>
              )}
              <Typography sx={{ ml: 1 }}>{userLogin.username}</Typography>
            </Stack>
            <Typography
              sx={{
                mt: 2,
                display: "inline-block",
                bgcolor: theme === "dark" ? "grey.800" : "grey.200",
                px: 2,
                py: 3,
                borderRadius: "4px",
              }}
            >
              heeey
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}
