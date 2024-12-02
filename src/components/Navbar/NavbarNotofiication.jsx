import { NotificationAdd } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
} from "@mui/material";
import React from "react";

export default function NavbarNotofiication({ open, anchorEl, handleClose }) {
  const notificationList = ["notification1", "notification2"];
  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClick={handleClose}
      MenuListProps={{ sx: { p: 0 } }}
    >
      <List disablePadding>
        {notificationList.map((not) => {
          return (
            <ListItem key={not} divider disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <NotificationAdd />
                </ListItemIcon>
                <ListItemText>{not}</ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Menu>
  );
}
