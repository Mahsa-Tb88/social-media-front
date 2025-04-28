import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import InputComment from "./InputComment";

export default function ReplyToComment() {
  const [reply, setReply] = useState(false);
  return (
    <Stack>
      <Button variant="text" sx={{ maxWidth: "80px" }}>
        Reply
      </Button>
    </Stack>
  );
}
