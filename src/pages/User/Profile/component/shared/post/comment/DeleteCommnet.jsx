import React from "react";
import { useDeleteComment } from "../../../../../../../utils/mutation";
import { Stack } from "@mui/material";
import MyIconButton from "../../../../../../../components/Customized/MyIconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function DeleteCommnet({
  setPostComments,
  postComments,
  id,
  postId,
  replyTo,
}) {
  const mutation = useDeleteComment(postId);

  function DeleteComment() {
    const data = { id, postId, replyTo };
    let comments;
    mutation.mutate(data, {
      onSuccess(d) {
        if (replyTo) {
          comments = postComments.replies.filter((c) => c.id != id);
        } else {
          comments = postComments.filter((c) => c._id != id);
        }
        setPostComments(comments);
      },
      onError(e) {
        console.log("error is ", e);
      },
    });
  }

  return (
    <Stack>
      <MyIconButton onClick={() => DeleteComment(id)}>
        <DeleteOutlineIcon
          sx={{
            fontSize: "17px",
            "&:hover": { color: "red" },
          }}
        />
      </MyIconButton>
    </Stack>
  );
}
