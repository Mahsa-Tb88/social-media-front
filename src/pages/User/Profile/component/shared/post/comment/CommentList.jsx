import { Button, Stack } from "@mui/material";
import React from "react";
import Comment from "./Comment";

export default function CommentList({
  postComments,
  setShowComments,
  showComments,
  filterCommnets,
  setPostComments,
  postId,
}) {
  return (
    <Stack>
      {showComments && (
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
          postComments
            .sort((a, b) => b.date - a.date)
            .map((c, index) => {
              return (
                <Stack key={index}>
                  <Comment
                    c={c}
                    setPostComments={setPostComments}
                    postComments={postComments}
                    postId={postId}
                    filterCommnets={filterCommnets}
                  />
                </Stack>
              );
            })}
      </Stack>
    </Stack>
  );
}
