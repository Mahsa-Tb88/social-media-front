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

export default function NavbarMsg({ open, anchorEl, handleClose }) {
  const msgList = ["messsage 1", "message 2"];
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
            <ListItem key={msg} divider disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Message />
                </ListItemIcon>
                <ListItemText>{msg}</ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Menu>
  );
}
