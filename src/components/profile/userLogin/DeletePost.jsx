/* eslint-disable react/prop-types */
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import { useDeletePost } from "../../../utils/mutation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function DeletePost({ open, onClose, id }) {
  const mutateDeletePost = useDeletePost();
  const queryClient = useQueryClient();
  const url = useLocation().pathname;
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.user.profile);

  function deletePostHandler(id) {
    mutateDeletePost.mutate(id, {
      onSuccess(d) {
        onClose();
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        if (url.includes("/post/")) {
          navigate("/profile/" + userLogin.id);
        }
        toast.success(d.data.message);
      },
      onError(e) {
        console.log("delete post error is", e);
        toast.error(e.response.data.message);
      },
    });
  }
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle sx={{ textAlign: "center", mb: 4 }}>
        Are you sure to delete this post?
      </DialogTitle>
      <DialogContent sx={{ display: "flex", justifyContent: "space-around" }}>
        <Button color="error" onClick={() => deletePostHandler(id)}>
          Yes
        </Button>
        <Button onClick={onClose}>No</Button>
      </DialogContent>
    </Dialog>
  );
}
