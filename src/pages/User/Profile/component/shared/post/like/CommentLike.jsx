import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NumberOfComLike from "./NumberOfComLike";
import { useLikeComment } from "../../../../../../../utils/mutation";
import { useSelector } from "react-redux";

export default function CommentLike({ comment, userLike }) {
  console.log("userLike", userLike);
  const [isLike, setIsLike] = useState(userLike);
  const userLogin = useSelector((state) => state.user.profile);
  const mutation = useLikeComment();

  useEffect(() => {
    // const user = comment.like.find((c) => c.userId == userLogin.id);
    // if(user){
    //   setIsLike(true)
    // }
  }, []);

  console.log("commentLikee", comment);
  function likeHandler(id) {
    console.log("likeeee", comment);

    const data = {
      id,
      postId: comment.postId,
      username: userLogin.username,
      profileImg: userLogin.profileImg,
      userId: userLogin.id,
      isLike: !isLike,
    };
    mutation.mutate(data, {
      onSuccess(d) {
        setIsLike(!isLike);
      },
      onError(e) {
        console.log("error is ", e);
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
      <NumberOfComLike c={comment} />
    </Stack>
  );
}
