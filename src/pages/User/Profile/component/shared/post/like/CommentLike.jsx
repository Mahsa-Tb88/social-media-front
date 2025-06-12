/* eslint-disable react/prop-types */
import { Box, Stack } from "@mui/material";
import React from "react";
import { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NumberOfComLike from "./NumberOfComLike";
import { useLikeComment } from "../../../../../../../utils/mutation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function CommentLike({ comment, userLike }) {
  const [isLike, setIsLike] = useState(userLike);
  const [numOfLike, setNumOfLike] = useState(comment?.likes.length);
  const userLogin = useSelector((state) => state.user.profile);
  const mutation = useLikeComment();

  function likeHandler() {
    const data = {
      userId: userLogin.id,
      postId: comment.postId,
      commentId: comment._id,
    };

    mutation.mutate(data, {
      onSuccess(d) {
        setIsLike(!isLike);
        if (isLike) {
          setNumOfLike((n) => n - 1);
        } else {
          setNumOfLike((n) => n + 1);
        }
      },
      onError(e) {
        toast.error(e.response.data.message);
      },
    });
  }

  return (
    <Stack sx={{ flexDirection: "row", gap: 1 }}>
      <Stack
        onClick={() => likeHandler(comment._id)}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        {isLike ? (
          <Box
            sx={{
              "&:hover": { color: "blue" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FavoriteIcon
              sx={{
                color: "#f50057",
                cursor: "pointer",
              }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FavoriteBorderIcon
              sx={{
                cursor: "pointer",
                "&:hover": { color: "#f50057" },
              }}
            />
          </Box>
        )}
      </Stack>
      <NumberOfComLike numOfLike={numOfLike} likes={comment.likes} />
    </Stack>
  );
}
