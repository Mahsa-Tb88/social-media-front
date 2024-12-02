import { Person } from "@mui/icons-material";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
} from "@mui/material";
import React from "react";

export default function NavbarFriend({ open, anchorEl, handleClose }) {
  const friendListRequested = ["Mahsa Tabesh", "Nasim Tabesh"];
  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClick={handleClose}
      MenuListProps={{ sx: { p: 0 } }}
    >
      <List disablePadding>
        {friendListRequested.map((friend) => {
          return (
            <ListItem key={friend} divider disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText>{friend}</ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Menu>
  );
}
