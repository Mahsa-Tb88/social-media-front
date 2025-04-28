import { Box, Stack } from "@mui/material";
import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NumberOfComLike from "./NumberOfComLike";

export default function CommentLike({ comment }) {
  const [isLike, setIsLike] = useState("");
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
      <NumberOfComLike />
    </Stack>
  );
}
