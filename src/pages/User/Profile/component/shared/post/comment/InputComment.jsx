import { useQueryClient } from "@tanstack/react-query";
import React, { useState, useRef, useEffect } from "react";
import { useLeaveComment } from "../../../../../../../utils/mutation";
import { useGetSearchUser } from "../../../../../../../utils/queries";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import noImage from "../../../../../../../../src/assets/images/user.png";
import { useSelector } from "react-redux";
import MyIconButton from "../../../../../../../components/Customized/MyIconButton";
import MoodIcon from "@mui/icons-material/Mood";
import { green } from "@mui/material/colors";
import EmojiPicker from "emoji-picker-react";
import Loading from "../../../../../../../components/Loading";
import LoadingError from "../../../../../../../components/LoadingError";
import { Close } from "@mui/icons-material";

export default function InputComment({ postId, replyTo, setReply }) {
  const theme = useSelector((state) => state.app.theme);
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [search, setSearch] = useState("");
  const [q, setQ] = useState("");
  const [usernameList, setUsernameList] = useState("");
  const [mentionUserId, setMentionUserId] = useState("");
  const userLogin = useSelector((state) => state.user.profile);

  const mutationLeaveComm = useLeaveComment();
  const { isPending, data, error, refetch } = useGetSearchUser(search);
  const queryClient = useQueryClient();

  console.log("dataa users search", data);
  console.log("error users search", error);

  useEffect(() => {
    if (q) {
      setSearch(q);
      console.log("newwwwww req");
      const timeOut = setTimeout(setSearch(q), 2000);
      return () => clearTimeout(timeOut);
    }
  }, [q]);

  function sendText() {
    const data = {};
    data.postId = postId;
    data.text = text;
    data.userId = userLogin.id;
    data.replyTo = replyTo ? replyTo : "";
    data.mentionUser = mentionUserId ? mentionUserId : null;
    console.log("submit", data);
    mutationLeaveComm.mutate(data, {
      onSuccess(d) {
        queryClient.invalidateQueries({
          queryKey: ["comments", postId],
        });
        setText("");
        setReply(false);
      },
      onError(e) {
        console.log("error", e);
      },
    });
  }

  function handleEmoji(emojiData) {
    const emoji = emojiData.emoji;
    // Insert emoji at the cursor position
    const newText = text + emoji;
    setText(newText);
  }
  console.log("q", q);
  console.log("text", text);

  function inputHandler(value) {
    setText(value);

    if (text[0] == "@") {
      const firstSpaceIndex = value.indexOf(" ");
      setUsernameList(true);
      if (firstSpaceIndex > 1) {
        setQ(value.slice(1, firstSpaceIndex));
      } else {
        if (value.slice(1) && firstSpaceIndex != 1) {
          setQ(value.slice(1));
        } else {
          setUsernameList(false);
        }
      }
    } else {
      setUsernameList(false);
    }
  }

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Stack
        sx={{
          mt: 3,
          px: 1,
          gap: 2,
          flexDirection: "row",
          alignItems: "center",
          borderRadius: "6px",
          border: "1px solid",
          borderColor: theme === "dark" ? "grey.800" : "grey.200",
          bgcolor: theme === "dark" ? "grey.800" : "grey.200",
          "&:focus": {
            outline: "none",
            borderColor: theme === "dark" ? "grey.200" : "grey.800",
          },
        }}
      >
        <Stack
          sx={{ width: "100%", flexDirection: "row", alignItems: "center" }}
        >
          {mentionUserId && (
            <Stack sx={{ position: "relative" }}>
              <Box
                sx={{ "&:hover": { color: "#f50057" } }}
                onClick={() => {
                  setQ("");
                  setMentionUserId(false);
                }}
              >
                <Close
                  sx={{
                    fontSize: "12px",
                    position: "absolute",
                    bottom: "100%",
                    left: "0",
                    cursor: "pointer",
                  }}
                />
              </Box>
              <Typography sx={{ color: "blue", whiteSpace: "nowrap" }}>
                {q}
              </Typography>
            </Stack>
          )}
          <TextField
            placeholder="Write your comment"
            multiline
            fullWidth
            variant="standard"
            sx={{
              fontSize: 15,
              px: 1,
              py: 1,
              color: "info",
            }}
            value={text}
            onChange={(e) => {
              inputHandler(e.target.value);
            }}
            error={text.length >= 1100}
            InputProps={{
              sx: {
                maxLength: 1100,
                mb: 2,
              },
            }}
          />
        </Stack>
        <MyIconButton tooltip="post" onClick={() => setShowEmoji(!showEmoji)}>
          <MoodIcon sx={{ color: green[500] }} />
        </MyIconButton>

        <Box sx={{ cursor: "pointer" }} onClick={sendText}>
          <SendIcon
            sx={
              text ? { color: "#1976d2", "&:hover": { color: "#1769aa" } } : ""
            }
          />
        </Box>
      </Stack>
      {showEmoji && (
        <Stack
          sx={{
            position: "absolute",
            top: "100%",
            right: 0,
            zIndex: 10,
          }}
        >
          <EmojiPicker onEmojiClick={handleEmoji} />
        </Stack>
      )}
      {isPending ? (
        <Loading message="Is loading..." />
      ) : error ? (
        <LoadingError handleAction={refetch} message={error.message} />
      ) : (
        usernameList && (
          <Paper
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              zIndex: 10,
              width: "30%",
              p: 2,
            }}
          >
            {data?.data?.body.length
              ? data?.data?.body.map((user) => {
                  return (
                    <Stack
                      key={user._id}
                      sx={{
                        mb: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1,
                        bgcolor: theme === "dark" ? "grey.800" : "grey.200",
                        borderRadius: "5px",
                        p: "7px",
                      }}
                      onClick={() => {
                        setQ("@ " + user.username + " ");
                        setUsernameList(false);
                        setText(text.replace(/^@\S+\s*/, ""));
                        setMentionUserId(user._id);
                      }}
                    >
                      <Box
                        component={"img"}
                        src={user.profileImg ? user.profileImg : noImage}
                        sx={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                        }}
                      />
                      <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                        {user.username}
                      </Typography>
                    </Stack>
                  );
                })
              : "Nothing to show!"}
          </Paper>
        )
      )}
    </Box>
  );
}
