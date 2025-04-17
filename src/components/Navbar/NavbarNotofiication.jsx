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
import { useSelector } from "react-redux";

export default function NavbarNotofiication({ open, anchorEl, handleClose }) {
  const userLogin = useSelector((state) => state.user.profile);
  console.log("....", userLogin);
  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClick={handleClose}
      MenuListProps={{ sx: { p: 0 } }}
    >
      <List disablePadding>
        {userLogin.notificationList.map((not) => {
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
