import { Person } from "@mui/icons-material";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
} from "@mui/material";
import React from "react";

import noImage from "../../assets/images/user.png";

export default function NavbarFriend({
  open,
  anchorEl,
  handleClose,
  requestList,
}) {
  const friendListRequested = ["Mahsa Tabesh", "Nasim Tabesh"];
  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClick={handleClose}
      MenuListProps={{ sx: { p: 0 } }}
    >
      <List disablePadding>
        {requestList.map((friend) => {
          return (
            <ListItem key={friend.id} divider disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Box
                    component="img"
                    src={
                      friend.profileImg
                        ? SERVER_URL + friend.profileImg
                        : noImage
                    }
                    height={25}
                    width={25}
                    sx={{ borderRadius: 50 }}
                  />
                </ListItemIcon>
                <ListItemText>{friend.username}</ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Menu>
  );
}
