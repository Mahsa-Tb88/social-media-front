import { useQueryClient } from "@tanstack/react-query";
import React, { useState, useRef, useEffect } from "react";
import { useLeaveComment } from "../../../../../../../utils/mutation";
import { useGetSearchUser } from "../../../../../../../utils/queries";
import { Box, Paper, Stack, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import noImage from "../../../../../../../../src/assets/images/user.png";
import { useSelector } from "react-redux";
import MyIconButton from "../../../../../../../components/Customized/MyIconButton";
import MoodIcon from "@mui/icons-material/Mood";
import { green } from "@mui/material/colors";
import EmojiPicker from "emoji-picker-react";
import Loading from "../../../../../../../components/Loading";
import LoadingError from "../../../../../../../components/LoadingError";

export default function InputComment({ postId, replyTo, setReply }) {
  const theme = useSelector((state) => state.app.theme);
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [search, setSearch] = useState(false);
  const [q, setQ] = useState(false);
  const searchRef = useRef(null);
  const userLogin = useSelector((state) => state.user.profile);

  const mutationLeaveComm = useLeaveComment();
  const { isPending, data, error, refetch } = useGetSearchUser(search);
  const queryClient = useQueryClient();

  console.log("dataa users search", data);
  console.log("error users search", error);

  useEffect(() => {
    setSearch(q);
    const timeOut = setTimeout(setSearch(q), 2000);
    return () => clearTimeout(timeOut);
  }, [q]);

  function sendText() {
    const data = {};
    data.postId = postId;
    data.text = text;
    data.userId = userLogin.id;
    data.replyTo = replyTo ? replyTo : "";
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
  function inputHandler(value) {
    if (value[0] == "@") {
      setText(value);
      setQ(value.slice(1));
    } else {
      setText(value);
      setShowEmoji(false);
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
        <Stack sx={{ width: "100%" }}>
          <TextField
            placeholder="Write your comment"
            multiline
            sx={{
              width: "100%",
              fontSize: 15,
              px: 1,
              py: 1,
            }}
            value={text}
            onChange={(e) => {
              inputHandler(e.target.value);
            }}
            error={text.length >= 1100}
            inputProps={{ maxLength: 1100 }}
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
      {q && isPending ? (
        <Loading message="Is loading..." />
      ) : error ? (
        <LoadingError handleAction={refetch} message={error.message} />
      ) : (
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
          {data?.data?.body.map((user) => {
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
              >
                <Box
                  component={"img"}
                  src={user.profileImg ? user.profileImg : noImage}
                  sx={{ width: "20px", height: "20px", borderRadius: "50%" }}
                />
                <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                  {user.username}
                </Typography>
              </Stack>
            );
          })}
        </Paper>
      )}
    </Box>
  );
}
