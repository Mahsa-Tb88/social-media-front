import {
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useSendChat } from "../../../../../utils/mutation";
import { useGetChats } from "../../../../../utils/queries";
import Loading from "../../../../../components/Loading";
import LoadingError from "../../../../../components/LoadingError";
import { useQueryClient } from "@tanstack/react-query";

export default function Chat() {
  const theme = useSelector((state) => state.app.theme);
  const userLogin = useSelector((state) => state.user.profile);
  const id = useParams().id;
  const userId = id.replace(userLogin.id, "");

  console.log("userLogin", userLogin);
  const [msg, setMsg] = useState("");

  const { isPending, error, refetch, data } = useGetChats(id);
  const mutation = useSendChat();
  const queryClient = useQueryClient();

  function sendMsgHandler() {
    if (msg) {
      const data = { id, msg };
      mutation.mutate(data, {
        onSuccess(d) {
          setMsg("");
          queryClient.invalidateQueries({ queryKey: ["chats", id] });
        },
        onError(e) {},
      });
    }
  }

  console.log("dataaa chat", data);
  const chats = data?.data?.body.chats;
  const user = data?.data?.body.user;

  return (
    <Stack
      sx={{
        bgcolor: theme === "dark" ? "grey.800" : "grey.200",
        height: "100vh",
      }}
    >
      {isPending ? (
        <Loading message="is loading..." />
      ) : error ? (
        <LoadingError handleAction={refetch} message={error.message} />
      ) : (
        <Container sx={{ py: 4 }}>
          <Stack
            sx={{
              bgcolor: theme === "dark" ? "black" : "white",
              py: 5,
              px: 3,
              borderRadius: "5px",
            }}
          >
            {chats.map((c) => {
              if (c.userId == userLogin.id) {
                return (
                  <UserLoginMsgs userLogin={userLogin} c={c} theme={theme} />
                );
              } else {
                return <UserMsgs user={user} theme={theme} />;
              }
            })}
          </Stack>
          <Stack sx={{ mt: 5, bgcolor: theme === "dark" ? "balck" : "white" }}>
            <TextField onChange={(e) => setMsg(e.target.value)} value={msg} />
          </Stack>
          <Button sx={{ mt: 2, px: 6 }} size="large" onClick={sendMsgHandler}>
            Send
          </Button>
        </Container>
      )}
    </Stack>
  );
}

function UserLoginMsgs({ userLogin, theme, c }) {
  return (
    <Stack sx={{ justifyContent: "flex-start", mb: 3 }}>
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {userLogin.profileImg ? (
          <Avatar alt="Remy Sharp" src={SERVER_URL + userLogin.profileImg} />
        ) : (
          <Avatar>{userLogin.username[0]}</Avatar>
        )}
        <Typography sx={{ ml: 1 }}>{userLogin.username}</Typography>
      </Stack>
      <Typography
        sx={{
          mt: 1,
          alignSelf: "flex-start",
          bgcolor: theme === "dark" ? "grey.800" : "grey.200",
          px: 2,
          py: 1,
          borderRadius: "4px",
        }}
      >
        {c.msg}
      </Typography>
    </Stack>
  );
}

function UserMsgs({ user }) {
  return (
    <Stack
      sx={{
        bgcolor: theme === "dark" ? "black" : "white",
        py: 5,
        px: 3,
        borderRadius: "5px",
      }}
    >
      <Stack sx={{}}>
        <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
          {user.profileImg ? (
            <Avatar alt="Remy Sharp" src={SERVER_URL + user.profileImg} />
          ) : (
            <Avatar>{user.username[0]}</Avatar>
          )}
          <Typography sx={{ ml: 1 }}>{user.username}</Typography>
        </Stack>
        <Typography
          sx={{
            mt: 2,
            alignSelf: "flex-start",
            bgcolor: theme === "dark" ? "grey.800" : "grey.200",
            px: 2,
            py: 1,
            borderRadius: "4px",
          }}
        >
          heeey hshs nsns snsnsn sn
        </Typography>
      </Stack>
    </Stack>
  );
}
