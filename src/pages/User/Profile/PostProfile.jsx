import { Dialog, Divider, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import MyIconButton from "../../../components/Customized/MyIconButton";
import { Close } from "@mui/icons-material";

export default function PostProfile({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <Stack  sx={{ flexDirection: "row", alignItems: "center" }}>
        <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
          Create Post
        </Typography>
        <MyIconButton>
          <Close />
        </MyIconButton>
      </Stack>
      <Divider />
    </Dialog>
  );
}
