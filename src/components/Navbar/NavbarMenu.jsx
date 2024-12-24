import {
  AdminPanelSettings,
  EditRounded,
  Logout,
  Person,
} from "@mui/icons-material";
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
  const user = useSelector((state) => state.user.profile);

  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClick={handleClose}
      MenuListProps={{ sx: { p: 0 } }}
    >
      <List disablePadding>
        <ListItem divider>
          <ListItemButton LinkComponent={Link} to={`/profile/${user._id}`}>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </ListItemButton>
        </ListItem>
        {user.isAdmin ? (
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
            <ListItem divider>
              <ListItemButton
                LinkComponent={Link}
                to={`/edit/user/${user._id}`}
              >
                <ListItemIcon>
                  <EditRounded />
                </ListItemIcon>
                <ListItemText>Edit Profile</ListItemText>
              </ListItemButton>
            </ListItem>
          </>
        )}

        <ListItem>
          <ListItemButton LinkComponent={Link} to="/logout">
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
