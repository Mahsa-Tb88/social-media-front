import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import CommentLike from "../like/CommentLike";
import InputComment from "./InputComment";
import Comment from "./Comment";

export default function TextComment({ c }) {
  const [isLong, setIsLong] = useState(c.text.length > 200 ? true : false);
  const [showMore, setShowMore] = useState(false);
  const [reply, setReply] = useState(false);
  const [replyComments, setReplyComments] = useState(c.reply);
  console.log("ccc", c);
  return (
    <Stack sx={{}}>
      {isLong ? (
        <Typography>
          {!showMore ? c.text.slice(0, 200) + " ..." : c.text}
          <Button
            variant="text"
            sx={{ textAlign: "left", width: "100px" }}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Back" : "View more"}
          </Button>
        </Typography>
      ) : (
        <Stack sx={{ ml: 1, mb: 1 }}>
          <Typography>{c.text}</Typography>
        </Stack>
      )}
      <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
        <CommentLike comment={c} />
        {c.replyId == "" && (
          <Button
            variant="text"
            sx={{ maxWidth: "80px" }}
            onClick={() => setReply(true)}
          >
            Reply
          </Button>
        )}
      </Stack>
      {reply && c.replyId == "" && (
        <InputComment type="reply" replyId={c._id} post={c} />
      )}

      {c.replyId == "" &&
        c?.reply.length > 0 &&
        c.reply.map((r, index) => {
          return (
            <Stack sx={{}} key={c._id}>
              <Comment
                c={r}
                setPostComments={setReplyComments}
                postComments={replyComments}
                postId={r.postId}
              />
            </Stack>
          );
        })}
    </Stack>
  );
}
