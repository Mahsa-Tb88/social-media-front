import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLikePost } from "../../../../../../../utils/mutation";
import { useQueryClient } from "@tanstack/react-query";
import { Box, Stack } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NumberOfLike from "./NumberOfLike";
import LoginFirst from "../../../../page/Home/LoginFirst";
import { useLocation } from "react-router-dom";

export default function postLike({ post }) {
  const userLogin = useSelector((state) => state.user.profile);
  const findLike = post?.likes.find((l) => l._id == userLogin.id);
  const [openLoginUser, setOpenLoginUser] = useState(false);

  const [isLike, setIsLike] = useState(findLike ? true : false);

  const mutation = useLikePost();
  const queryClient = useQueryClient();

  const location = useLocation();

  function likeHandler(postId) {
    if (!userLogin.id) {
      setOpenLoginUser(true);
      return;
    }
    setIsLike(!isLike);

    const data = {
      userId: userLogin.id,
      id: postId,
    };
    mutation.mutate(data, {
      onSuccess(d) {
        if (location.pathname.includes("profile")) {
          queryClient.invalidateQueries({ queryKey: ["posts", post.userId] });
        } else if (location.pathname.includes("post")) {
          queryClient.invalidateQueries({
            queryKey: ["singlePost", post._id],
          });
        } else {
          queryClient.invalidateQueries({
            queryKey: ["publicPosts", userLogin.id],
          });
        }
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
      <LoginFirst open={openLoginUser} onClose={setOpenLoginUser} />
    </Stack>
  );
}
