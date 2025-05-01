import React from "react";
import { useDeleteComment } from "../../../../../../../utils/mutation";
import { Stack } from "@mui/material";
import MyIconButton from "../../../../../../../components/Customized/MyIconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function DeleteCommnet({
  setPostComments,
  id,
  postComments,
  postId,
  setFilterComments,
  filterComments,
  replyId,
}) {
  const mutation = useDeleteComment(postId);
  function DeleteComment() {
    let updatedComments;
    if (replyId) {
      updatedComments = filterComments.filter((c) => c._id !== id);
    } else {
      updatedComments = postComments.filter((c) => c._id !== id);
    }
    const data = {};
    data.id = id;
    data.postId = postId;
    data.notifiId = id;
    mutation.mutate(data, {
      onSuccess(d) {
        if (replyId) {
          setFilterComments(updatedComments);
        } else {
          setPostComments(updatedComments);
        }
      },
      onError(e) {
        console.log("error is ", error);
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
