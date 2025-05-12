import { Button, Stack } from "@mui/material";
import React from "react";
import Comment from "./Comment";

export default function CommentList({
  postComments,
  setPostComments,
  setShowComments,
  showComments,
  postId,
}) {
  return (
    <Stack>
      {showComments && postComments.length > 0 && (
        <Button
          variant="outlined"
          sx={{ mb: 3, width: "150px" }}
          onClick={() => setShowComments(false)}
        >
          Hide comments
        </Button>
      )}
      <Stack sx={{ maxHeight: "400px", overflowY: "auto" }}>
        {showComments &&
          postComments.map((c, index) => {
            return (
              <Stack key={index}>
                <Comment
                  c={c}
                  setPostComments={setPostComments}
                  postComments={postComments}
                  postId={postId}
                />
              </Stack>
            );
          })}
      </Stack>
    </Stack>
  );
}
