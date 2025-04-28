import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import InputComment from "./InputComment";

export default function ReplyToComment({ replyId }) {
  return (
    <Stack>
      <Button
        variant="text"
        sx={{ maxWidth: "80px" }}
        onClick={() => setReply(true)}
      >
        Reply
      </Button>
      
    </Stack>
  );
}
