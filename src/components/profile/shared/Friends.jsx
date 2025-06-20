import { Container, Paper, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserLoginFriends from "../userLogin/UserLoginFriends";
import UserFriends from "../user/UserFriends";
import { useGetFriends } from "../../../utils/queries";
import Loading from "../../Loading";
import LoadingError from "../../LoadingError";

export default function Friends() {
  const userLogin = useSelector((state) => state.user.profile);
  const id = useParams().id;
  const { data, isPending, error, refetch } = useGetFriends(id);

  return (
    <Stack sx={{ py: 4, bgcolor: "backgroundColor.light" }}>
      <Container maxWidth="md">
        {isPending ? (
          <Loading message="is loading..." />
        ) : error ? (
          <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
            <LoadingError
              handleAction={refetch}
              message={error.response.data.message}
            />
          </Stack>
        ) : (
          <Paper sx={{ p: 4 }}>
            {userLogin.id == id ? (
              <UserLoginFriends friends={data.data.body} />
            ) : (
              <UserFriends friends={data.data.body} />
            )}
          </Paper>
        )}
      </Container>
    </Stack>
  );
}
