import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useLeaveComment } from "../../../../../../../utils/mutation";
import { Box, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";

export default function InputComment({
  postId,
  replyTo,
  setReply,
  userGetComm,
}) {
  const theme = useSelector((state) => state.app.theme);
  const [text, setText] = useState("");
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

  return (
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
        onChange={(e) => setText(e.target.value)}
        error={text.length >= 1100}
        inputProps={{ maxLength: 1100 }}
      />
      <Box sx={{ cursor: "pointer" }} onClick={sendText}>
        <SendIcon
          sx={text ? { color: "#1976d2", "&:hover": { color: "#1769aa" } } : ""}
        />
      </Box>
    </Stack>
  );
}
