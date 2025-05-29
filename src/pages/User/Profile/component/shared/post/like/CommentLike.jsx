import { Box, Stack } from "@mui/material";
import { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { redirectIfNotLoggedIn } from "../../../../../../../utils/customeFunction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NumberOfComLike from "./NumberOfComLike";
import { useLikeComment } from "../../../../../../../utils/mutation";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CommentLike({ comment, userLike }) {
  const [isLike, setIsLike] = useState(userLike);
  const [numOfLike, setNumOfLike] = useState(comment?.likes.length);
  const userLogin = useSelector((state) => state.user.profile);
  const navigate = useNavigate();
  const mutation = useLikeComment();

  function likeHandler() {
    // if (redirectIfNotLoggedIn(userLogin, navigate)) return;
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
        console.log("eeror is ", e);
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
