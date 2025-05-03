import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLikePost } from "../../../../../../../utils/mutation";
import { useQueryClient } from "@tanstack/react-query";
import { Box, Stack } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NumberOfLike from "./NumberOfLike";

export default function postLike({ post }) {
  const userLogin = useSelector((state) => state.user.profile);
  const findLike = post?.likes.find((l) => l._id == userLogin.id);
  const [isLike, setIsLike] = useState(findLike ? true : false);
  const mutation = useLikePost();
  const queryClient = useQueryClient();

  function likeHandler(postId) {
    setIsLike(!isLike);
    const data = {
      userId: userLogin.id,
      id: postId,
    };

    mutation.mutate(data, {
      onSuccess(d) {
        queryClient.invalidateQueries({ queryKey: ["posts", post.userId] });
      },
      onError(e) {
        console.log("error is", e);
      },
    });
  }

  return (
    <Stack sx={{ flexDirection: "row", gap: 1 }}>
      <Stack onClick={() => likeHandler(post._id)}>
        {isLike ? (
          <Box sx={{ "&:hover": { color: "blue" } }}>
            <FavoriteIcon
              sx={{
                color: "#f50057",
                cursor: "pointer",
              }}
            />
          </Box>
        ) : (
          <Box>
            <FavoriteBorderIcon
              sx={{
                cursor: "pointer",
                "&:hover": { color: "#f50057" },
              }}
            />
          </Box>
        )}
      </Stack>
      <NumberOfLike post={post} />
    </Stack>
  );
}
