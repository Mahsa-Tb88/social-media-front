import { Box, Stack } from "@mui/material";
import React, { useRef, useState } from "react";

export default function NumberOfComLike({ c }) {
  const menuUserLike = useRef(null);
  const [openMenuLike, setOpenMenuLike] = useState(false);
  return (
    <Stack>
      <Box
        sx={{
          cursor: "pointer",
          "&:hover": { fontWeight: "bold" },
        }}
        ref={menuUserLike}
        onClick={() => setOpenMenuLike(true)}
      >
        {c?.like.length}
      </Box>
      {/*  <MenuUserLike
        open={openMenuLike}
        anchorEl={menuUserLike.current}
        handleClose={() => setOpenMenuLike(false)}
        likes={post.like}
      /> */}
    </Stack>
  );
}
