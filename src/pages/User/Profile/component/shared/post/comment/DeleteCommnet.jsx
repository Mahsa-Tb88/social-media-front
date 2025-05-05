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
  console.log("commentsPost", postComments);

  function DeleteComment() {
    const data = { id: comment._id, postId, replyTo, userId: userLogin.id };
    console.log("delete", data);
    mutation.mutate(data, {
      onSuccess(d) {
        if (replyTo) {
          const updatedReplies = comment.replies.filter(
            (c) => c._id != comment._id
          );
          console.log("updatedReplies", updatedReplies);

          const UpdatedPostComments = postComments.map((c) => {
            console.log("c", c);
            if (c._id == comment.replyTo) {
              return { ...c, replies: updatedReplies };
            } else {
              return c;
            }
          });
          console.log("UpdatedPostComments", UpdatedPostComments);

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
