import { AdminPanelSettings, EditRounded, Logout } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Stack,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function NavbarMenu({ open, anchorEl, handleClose }) {
  const isAdmin = useSelector((state) => state.user.isAdmin);

  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClick={handleClose}
      MenuListProps={{ sx: { p: 0 } }}
    >
      <List disablePadding>
        {isAdmin ? (
          <>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <AdminPanelSettings />
                </ListItemIcon>
                <ListItemText></ListItemText>
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <EditRounded />
                </ListItemIcon>
                <ListItemText>Edit Profile</ListItemText>
              </ListItemButton>
            </ListItem>
          </>
        )}
        <ListItem component={Link} to="/logout">
          <ListItemButton>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText>Sign Out</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Menu>
  );
}
