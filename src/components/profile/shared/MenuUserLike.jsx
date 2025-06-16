/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  Menu,
  Typography,
} from "@mui/material";
import React from "react";

import noImage from "../../../assets/images/user.png";
import { useNavigate } from "react-router-dom";

export default function MenuUserLike({ likes, open, anchorEl, handleClose }) {
  const navigate = useNavigate();
  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      MenuListProps={{ sx: { p: 0 } }}
    >
      <List disablePadding>
        {likes.map((l, index) => {
          return (
            <ListItem disablePadding sx={{ p: 1 }} divider key={index}>
              <ListItemButton onClick={() => navigate("/profile/" + l._id)}>
                <Box
                  component="img"
                  src={
                    l.deleted
                      ? noImage
                      : l.profileImg
                        ? SERVER_URL + l.profileImg
                        : noImage
                  }
                  sx={{ height: "30px", width: "30px", borderRadius: "50%" }}
                />
                <Typography sx={{ ml: 1 }}>
                  {l.deleted ? "Deleted User" : l.username}
                </Typography>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Menu>
  );
}
