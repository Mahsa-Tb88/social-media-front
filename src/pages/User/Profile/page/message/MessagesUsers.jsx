import {
  Avatar,
  Badge,
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useGetListMsg } from "../../../../../utils/queries";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../../../components/Loading";
import LoadingError from "../../../../../components/LoadingError";
import { useDispatch, useSelector } from "react-redux";
import { useChangeToRead } from "../../../../../utils/mutation";
import { userActions } from "../../../../../store/slices/userSlice";
import { useQueryClient } from "@tanstack/react-query";

export default function MessagesUserss() {
  const id = useParams().id;
  const userLogin = useSelector((state) => state.user.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.app.theme);
  const { isPending, data, error, refetch } = useGetListMsg(id);
  console.log("data is", data);

  function getDate(dateString) {
    const myDate = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = myDate.toLocaleDateString("en-GB", options);
    return formattedDate;
  }

  const mutation = useChangeToRead();
  const queryClient = useQueryClient();

  function clickHandler(msgId, chatId, isRead) {
    const data = { id: msgId, chatId };
    if (isRead) {
      navigate("/chat/" + chatId);
      return;
    }

    mutation.mutate(data, {
      onSuccess(d) {
        const updatedMsgs = userLogin.messages.filter((m) => m.id != msgId);
        console.log("updatedddd", updatedMsgs);
        dispatch(
          userActions.setProfile({ ...userLogin, messages: updatedMsgs })
        );
        queryClient.invalidateQueries({
          queryKey: ["messages", id],
        });
        navigate("/chat/" + chatId);
      },
      onError(e) {
        console.log("error", e);
      },
    });
  }

  return (
    <Stack>
      {isPending ? (
        <Loading message="is loading..." />
      ) : error ? (
        <LoadingError handleAction={refetch} message={error.message} />
      ) : (
        <Stack component={Paper} sx={{ width: "75%", mx: "auto", mt: 9 }}>
          <TableContainer aria-label="user table">
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    bgcolor: theme === "dark" ? "grey.800" : "grey.200",
                  }}
                >
                  <TableCell sx={{ textAlign: "center" }}>Username</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Message</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    Last update
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.data.body.map((msg) => {
                  return (
                    <TableRow>
                      <TableCell
                        onClick={() => navigate("/profile/" + msg.userId)}
                        sx={{
                          cursor: "pointer",
                          textAlign: "center",
                          transition: "transform 0.3s ease-in-out",
                          "&:hover": {
                            transform: "scale(1.08)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          {msg.profileImg ? (
                            <Avatar
                              alt="Remy Sharp"
                              src={SERVER_URL + msg.profileImg}
                            />
                          ) : (
                            <Avatar
                              sx={{
                                bgcolor:
                                  theme === "dark" ? "#1769aa" : "#64b5f6",
                              }}
                            >
                              {msg.username[0].toUpperCase()}
                            </Avatar>
                          )}
                        </Box>
                        <Typography sx={{ mt: 1 }}>
                          {msg.username[0].toUpperCase() +
                            msg.username.slice(1)}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          cursor: "pointer",
                          textAlign: "center",

                          transition: "transform 0.3s ease-in-out",
                          "&:hover": {
                            transform: "scale(1.08)",
                          },
                        }}
                        onClick={() =>
                          clickHandler(msg.msgId, msg.chatId, msg.isRead)
                        }
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography sx={{ mr: 3 }}>
                            {msg.msg.slice(0, 10) + "..."}
                          </Typography>
                          {!msg.isRead && msg.userId != userLogin.id && (
                            <Badge
                              badgeContent={"New"}
                              color="error"
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "left",
                              }}
                              overlap="circular"
                            ></Badge>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {getDate(msg.updatedAt)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      )}
    </Stack>
  );
}
