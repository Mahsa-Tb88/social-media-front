import { Box, Stack } from "@mui/material";
import React, { useRef, useState } from "react";
import MenuUserLike from "../../MenuUserLike";

export default function NumberOfLike({ post }) {
  const menuUserLike = useRef(null);
  const [openMenuLike, setOpenMenuLike] = useState(false);
  console.log("post mikan like", post);
  return (
    <Stack>
      <Box
        sx={{
          cursor: "pointer",
          "&:hover": { fontWeight: "bold" },
          width: "20px",
        }}
        ref={menuUserLike}
        onClick={() => setOpenMenuLike(true)}
      >
        {post?.likes.length > 0 && post?.likes.length}
      </Box>
      <MenuUserLike
        open={openMenuLike}
        anchorEl={menuUserLike.current}
        handleClose={() => setOpenMenuLike(false)}
        likes={post.likes}
      />
    </Stack>
  );
}
