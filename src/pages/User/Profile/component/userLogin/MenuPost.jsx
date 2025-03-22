import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PostProfile from "./PostProfile";
import DeletePost from "./DeletePost";

export default function MenuPost({ open, anchorEl, handleClose, p }) {
  const [openEditPost, setOpenEditPost] = useState(false);
  const [openDeletePost, setOpenDeletePost] = useState(false);
  console.log("edit", openEditPost);
  console.log("delete", openDeletePost);
  console.log("handleClose", handleClose);
  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      MenuListProps={{ sx: { p: 0 } }}
    >
      <List disablePadding>
        <ListItem
          disablePadding
          sx={{ p: 1 }}
          divider
          onClick={() => setOpenEditPost(true)}
        >
          <ListItemButton sx={{ gap: 4, borderRadius: "3px" }}>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText>
              <Typography>Edit post</Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem onClick={() => setOpenDeletePost(true)}>
          <ListItemButton sx={{ gap: 4, borderRadius: "3px" }}>
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            <ListItemText>
              <Typography>Delete post</Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <PostProfile
        open={openEditPost}
        onClose={() => setOpenEditPost(false)}
        type="edit"
        p={p}
      />
      <DeletePost
        open={openDeletePost}
        onClose={() => setOpenDeletePost(false)}
        id={p._id}
      />
    </Menu>
  );
}
