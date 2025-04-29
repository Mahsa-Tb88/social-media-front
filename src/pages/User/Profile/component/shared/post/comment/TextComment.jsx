import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import CommentLike from "../like/CommentLike";
import InputComment from "./InputComment";
import Comment from "./Comment";

export default function TextComment({ c, filterCommnets }) {
  const [isLong, setIsLong] = useState(c.text.length > 200 ? true : false);
  const [reply, setReply] = useState(false);

  function findReplyCommnet() {
    let replyComments = [];
    if (filterCommnets) {
      replyComments = filterCommnets.filter((comm) => comm.replyId == c._id);
    }
    console.log("toooodat tooo", replyComments);
    return replyComments;
  }

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
          {c.text.length > 200 && (
            <Button
              variant="text"
              sx={{ cursor: "pointer" }}
              onClick={() => setIsLong(true)}
            >
              Back
            </Button>
          )}
          {findReplyCommnet().length > 0 &&
            findReplyCommnet().map((c, index) => {
              return (
                <Stack key={index} sx={{ ml: 2 }}>
                  <Comment
                    c={c}
                    // postComments={findReplyCommnet()}
                    postId={c.postId}
                    id={c._id}
                    // filterCommnets={filterCommnets}
                  />
                </Stack>
              );
            })}
        </Stack>
      )}
    </Stack>
  );
}
