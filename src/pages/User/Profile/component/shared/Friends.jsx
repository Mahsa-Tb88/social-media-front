import { Container, Paper, Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserLoginFriends from "../userLogin/UserLoginFriends";
import UserFriends from "../user/UserFriends";

export default function Friends() {
  const userLogin = useSelector((state) => state.user.profile);
  const theme = useSelector((state) => state.app.theme);
  const id = useParams().id;

  return (
    <Stack sx={{ py: 4, bgcolor: theme === "dark" ? "grey.800" : "grey.200" }}>
      <Container maxWidth="md">
        <Paper sx={{ p: 4 }}>
          {userLogin.id == id ? <UserLoginFriends /> : <UserFriends />}
        </Paper>
      </Container>
    </Stack>
  );
}
