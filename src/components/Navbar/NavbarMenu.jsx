import {
  AdminPanelSettings,
  EditRounded,
  Logout,
  Message,
  Person,
} from "@mui/icons-material";
import {
  Badge,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function NavbarMenu({ open, anchorEl, handleClose }) {
  const userLogin = useSelector((state) => state.user.profile);
  let unSeenMsg = [];
  if (userLogin.notificationList) {
    unSeenMsg = userLogin.messages.filter((n) => n.isRead == false);
  }


  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClick={handleClose}
      MenuListProps={{ sx: { p: 0 } }}
    >
      <List disablePadding>
        <ListItem divider>
          <ListItemButton LinkComponent={Link} to={`/profile/${userLogin.id}`}>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </ListItemButton>
        </ListItem>
        {userLogin.isAdmin ? (
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
              <ListItemButton LinkComponent={Link} to={`/edit/user/${userLogin.id}`}>
                <ListItemIcon>
                  <EditRounded />
                </ListItemIcon>
                <ListItemText>Edit Profile</ListItemText>
              </ListItemButton>
            </ListItem>
          </>
        )}
        <ListItem divider>
          <ListItemButton LinkComponent={Link} to={`/Messages/${userLogin.id}`}>
            <ListItemIcon>
              <Badge
                badgeContent={unSeenMsg?.length}
                color="error"
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                overlap="circular"
              >
                <Message />
              </Badge>
            </ListItemIcon>
            <ListItemText>Messages</ListItemText>
          </ListItemButton>
        </ListItem>
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
