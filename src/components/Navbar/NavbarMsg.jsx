import { Message } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export default function NavbarMsg({ open, anchorEl, handleClose }) {
  const userLoging = useSelector((state) => state.user.profile);
  const msgList = userLoging.messages || [];
  
  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClick={handleClose}
      MenuListProps={{ sx: { p: 0 } }}
    >
      <List disablePadding>
        {msgList.map((msg) => {
          return (
            <ListItem key={msg._id} divider disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Message />
                </ListItemIcon>
                <ListItemText>{msg.username}</ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Menu>
  );
}
