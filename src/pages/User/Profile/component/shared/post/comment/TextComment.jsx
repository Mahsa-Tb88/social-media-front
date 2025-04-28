import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import CommentLike from "../like/CommentLike";
import ReplyToComment from "./ReplyToComment";
import InputComment from "./InputComment";

export default function TextComment({ c }) {
  const [isLong, setIsLong] = useState(c.text.length > 200 ? true : false);
  const [reply, setReply] = useState(false);

  return (
    <Stack sx={{ mt: 1 }}>
      {isLong ? (
        <Stack>
          <Typography>{c.text.slice(0, 200) + " ..."}</Typography>
          <Button
            variant="text"
            sx={{ textAlign: "left" }}
            onClick={() => setIsLong(false)}
          >
            View more
          </Button>
        </Stack>
      ) : (
        <Stack>
          <Typography sx={{ ml: 1, mb: 2 }}>{c.text}</Typography>
          <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
            <CommentLike comment={c} />
            <Button
              variant="text"
              sx={{ maxWidth: "80px" }}
              onClick={() => setReply(true)}
            >
              Reply
            </Button>
          </Stack>
          {reply && <InputComment type="reply" replyId={c._id} />}
          {c.text.length > 200 && (
            <Button
              variant="text"
              sx={{ cursor: "pointer" }}
              onClick={() => setIsLong(true)}
            >
              Back
            </Button>
          )}
        </Stack>
      )}
    </Stack>
  );
}
