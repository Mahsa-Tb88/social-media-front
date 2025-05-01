import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NumberOfComLike from "./NumberOfComLike";
import {
  useLikeComment,
  useLikeReply,
} from "../../../../../../../utils/mutation";
import { useSelector } from "react-redux";

export default function CommentLike({ comment, userLike }) {
  const [isLike, setIsLike] = useState(userLike);
  const [numOfLike, setNumOfLike] = useState(comment.like.length);
  const userLogin = useSelector((state) => state.user.profile);
  const mutationLikeComment = useLikeComment();
  const mutationLikeReply = useLikeReply();
  console.log("commentLikee", comment);
  function likeHandler(id) {
    const data = {
      id: comment.replyId ? comment.replyId : id,
      postId: comment.postId,
      username: userLogin.username,
      profileImg: userLogin.profileImg,
      userId: userLogin.id,
      isLike: !isLike,
      notifiId: comment.notifiId,
    };
    if (comment.replyId) {
      mutationLikeReply.mutate(data, {
        onSuccess(d) {
          setIsLike(!isLike);
          if (isLike) {
            setNumOfLike((n) => n - 1);
          } else {
            setNumOfLike((n) => n + 1);
          }
        },
        onError(e) {
          console.log("error is ", e);
        },
      });
    } else {
      mutationLikeComment.mutate(data, {
        onSuccess(d) {
          setIsLike(!isLike);
          if (isLike) {
            setNumOfLike((n) => n - 1);
          } else {
            setNumOfLike((n) => n + 1);
          }
        },
        onError(e) {
          console.log("error is ", e);
        },
      });
    }
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
      <NumberOfComLike numOfLike={numOfLike} />
    </Stack>
  );
}
