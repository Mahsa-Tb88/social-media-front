import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useLeaveComment } from "../../../../../../../utils/mutation";
import { Box, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";
import MyIconButton from "../../../../../../../components/Customized/MyIconButton";
import MoodIcon from "@mui/icons-material/Mood";
import { green } from "@mui/material/colors";
import EmojiPicker from "emoji-picker-react";

export default function InputComment({ postId, replyTo, setReply }) {
  const theme = useSelector((state) => state.app.theme);
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const userLogin = useSelector((state) => state.user.profile);
  const mutation = useLeaveComment();
  const queryClient = useQueryClient();

  function sendText() {
    const data = {};
    data.postId = postId;
    data.text = text;
    data.userId = userLogin.id;
    data.replyTo = replyTo ? replyTo : "";
    mutation.mutate(data, {
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
  console.log(" Text", text);

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
            setText(e.target.value);
            setShowEmoji(false);
          }}
          error={text.length >= 1100}
          inputProps={{ maxLength: 1100 }}
        />
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
            top: "100%", // or adjust like `top: 60px` depending on design
            right: 0,
            zIndex: 10,
          }}
        >
          <EmojiPicker onEmojiClick={handleEmoji} />
        </Stack>
      )}
    </Box>
  );
}
