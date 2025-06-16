/* eslint-disable react/prop-types */
import { Delete, Edit } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PostProfile from "./PostProfile";
import DeletePost from "./DeletePost";

export default function MenuPost({ open, anchorEl, handleClose, post }) {
  const [openEditPost, setOpenEditPost] = useState(false);
  const [openDeletePost, setOpenDeletePost] = useState(false);

  function deleteCloseHandler() {
    setOpenDeletePost(false);
    handleClose();
  }

  function editCloseHandler() {
    setOpenEditPost(false);
    handleClose();
  }

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
        onClose={editCloseHandler}
        type="edit"
        post={post}
      />
      <DeletePost
        open={openDeletePost}
        onClose={deleteCloseHandler}
        id={post._id}
      />
    </Menu>
  );
}
