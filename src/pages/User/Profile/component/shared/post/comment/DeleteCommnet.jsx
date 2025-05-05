import React from "react";
import { useDeleteComment } from "../../../../../../../utils/mutation";
import { Stack } from "@mui/material";
import MyIconButton from "../../../../../../../components/Customized/MyIconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSelector } from "react-redux";

export default function DeleteCommnet({
  setPostComments,
  postComments,
  comment,
  postId,
  replyTo,
}) {
  const userLogin = useSelector((state) => state.user.profile);
  const mutation = useDeleteComment();

  function DeleteComment() {
    const data = { id: comment._id, postId, replyTo, userId: userLogin.id };
    mutation.mutate(data, {
      onSuccess(d) {
        if (replyTo) {
          const UpdatedPostComments = postComments.map((c) => {
            if (c._id == comment.replyTo) {
              const updatedReplies = c.replies.filter(
                (c) => c._id != comment._id
              );
              return { ...c, replies: updatedReplies };
            } else {
              return c;
            }
          });

          setPostComments(UpdatedPostComments);
        } else {
          const comments = postComments.filter((c) => c._id != comment._id);
          setPostComments(comments);
        }
      },
      onError(e) {
        console.log("error is ", e);
      },
    });
  }

  return (
    <Stack>
      <MyIconButton onClick={() => DeleteComment()}>
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
