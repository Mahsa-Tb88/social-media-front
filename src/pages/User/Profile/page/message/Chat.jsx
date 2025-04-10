import {
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
  function getDate(dateString) {
    const myDate = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = myDate.toLocaleDateString("en-GB", options);
    return formattedDate;
  }
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
          <Stack sx={{ flexDirection: "row", alignItems: "center", mb: 2 }}>
            <Typography component="h5" variant="h5" sx={{ mr: 2 }}>
              Message to:
            </Typography>
            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
              {user.profileImg ? (
                <Avatar alt="Remy Sharp" src={SERVER_URL + user.profileImg} />
              ) : (
                <Avatar
                  sx={{ bgcolor: theme === "dark" ? "#1769aa" : "#64b5f6" }}
                >
                  {user.username[0]}
                </Avatar>
              )}
              <Typography
                sx={{ color: theme === "dark" ? "#64b5f6 " : "#1769aa" }}
                component="h6"
                variant="h6"
              >
                {user.username}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            sx={{
              bgcolor: theme === "dark" ? "black" : "white",
              py: 5,
              px: 3,
              borderRadius: "5px",
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            {chats.length
              ? chats.map((c, index) => {
                  const currentDate = getDate(c.createdAt);
                  const previousDate =
                    index > 0 ? getDate(chats[index - 1].createdAt) : null;
                  const showDate =
                    currentDate !== previousDate ? currentDate : "";
                  if (c.userId == userLogin.id) {
                    return (
                      <UserLoginMsgs
                        userLogin={userLogin}
                        c={c}
                        theme={theme}
                        date={showDate}
                      />
                    );
                  } else {
                    return (
                      <UserMsgs
                        user={user}
                        theme={theme}
                        c={c}
                        date={showDate}
                      />
                    );
                  }
                })
              : " There is no chat yet!"}
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

function UserLoginMsgs({ userLogin, theme, c, date }) {
  function getTime(time) {
    const createdAt = new Date(time);

    const hours = createdAt.getHours().toString().padStart(2, "0");
    const minutes = createdAt.getMinutes().toString().padStart(2, "0");

    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  }
  function getDate(dateString) {
    const myDate = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = myDate.toLocaleDateString("en-GB", options);
    return formattedDate;
  }

  return (
    <Stack sx={{ justifyContent: "flex-start", mb: 3 }}>
      {date && (
        <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
          <Box
            sx={{
              height: "1px",
              width: "100%",
              bgcolor: theme === "dark" ? "grey.800" : "grey.200",
            }}
          ></Box>
          <Box
            sx={{
              width: "20%",
              textAlign: "center",
              color: theme === "dark" ? "grey.800" : "grey.600",
            }}
          >
            {getDate(c.createdAt)}
          </Box>
          <Box
            sx={{
              height: "1px",
              width: "100%",
              bgcolor: theme === "dark" ? "grey.800" : "grey.200",
            }}
          ></Box>
        </Stack>
      )}

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
      <Stack
        sx={{
          mt: 1,
          alignSelf: "flex-start",
          bgcolor: theme === "dark" ? "grey.800" : "grey.200",
          px: 1,
          py: 1,
          borderRadius: "4px",
        }}
      >
        <Typography>{c.msg}</Typography>
        <Typography sx={{ mt: 2, fontSize: "12px" }}>
          {getTime(c.createdAt)}
        </Typography>
      </Stack>
    </Stack>
  );
}

function UserMsgs({ user, theme, c, date }) {
  function getTime(time) {
    const createdAt = new Date(time);

    const hours = createdAt.getHours().toString().padStart(2, "0");
    const minutes = createdAt.getMinutes().toString().padStart(2, "0");

    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  }

  function getDate(dateString) {
    const myDate = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = myDate.toLocaleDateString("en-GB", options);
    return formattedDate;
  }

  return (
    <Stack>
      {date && (
        <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
          <Box
            sx={{
              height: "1px",
              width: "100%",
              bgcolor: theme === "dark" ? "grey.800" : "grey.200",
            }}
          ></Box>
          <Box
            sx={{
              width: "20%",
              textAlign: "center",
              color: theme === "dark" ? "grey.800" : "grey.600",
            }}
          >
            {getDate(c.createdAt)}
          </Box>
          <Box
            sx={{
              height: "1px",
              width: "100%",
              bgcolor: theme === "dark" ? "grey.800" : "grey.200",
            }}
          ></Box>
        </Stack>
      )}
      <Stack
        sx={{
          alignItems: "end",
          mb: 3,
        }}
      >
        <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
          <Typography sx={{ mr: 1 }}>{user.username}</Typography>
          {user.profileImg ? (
            <Avatar alt="Remy Sharp" src={SERVER_URL + user.profileImg} />
          ) : (
            <Avatar sx={{ bgcolor: theme === "dark" ? "#1769aa" : "#64b5f6" }}>
              {user.username[0]}
            </Avatar>
          )}
        </Stack>

        <Stack
          sx={{
            mt: 1,

            bgcolor: theme === "dark" ? "#1769aa" : "#bbdefb",
            px: 1,
            py: 1,
            borderRadius: "4px",
          }}
        >
          <Typography>{c.msg}</Typography>
          <Typography sx={{ mt: 2, fontSize: "12px" }}>
            {getTime(c.createdAt)}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
