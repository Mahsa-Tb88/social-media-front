import { Person } from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

import noImage from "../../assets/images/user.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NavbarFriend({
  open,
  anchorEl,
  handleClose,
  requestList,
}) {
  const userFriends = useSelector(
    (state) => state.user.profile.friends.listFriend
  );

  function mutualFriends(id) {
    return userFriends.filter((f) => f.id == id);
  }

  const theme = useSelector((state) => state.app.theme);
  const navigate = useNavigate();
  function confirm(event) {
    event.stopPropagation();
    console.log("confirmmm");
  }

  function gotoProfile(id) {
    navigate(`/profile/${id}`);
  }
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
            <ListItem key={friend.id} disablePadding sx={{ p: 1 }} Divider>
              <ListItemButton
                onClick={() => gotoProfile(friend.id)}
                sx={{ gap: 4, borderRadius: "3px" }}
              >
                <ListItemIcon>
                  <Box
                    component="img"
                    src={
                      friend.profileImg
                        ? SERVER_URL + friend.profileImg
                        : noImage
                    }
                    height={50}
                    width={50}
                    sx={{ borderRadius: 50 }}
                  />
                </ListItemIcon>
                <ListItemText>
                  <Typography component="h6" variant="h6">
                    {friend.username}
                  </Typography>
                  {mutualFriends(friend.id).length ? (
                    <Stack>
                      <Typography component="h6" variant="h6">
                        {mutualFriends(friend.id).length} friends
                      </Typography>
                      <AvatarGroup
                        max={4}
                        total={mutualFriends(friend.id).length}
                      >
                        {mutualFriends.map((f) => {
                          <Avatar
                            src={
                              f.profileImg ? SERVER_URL + f.profileImg : noImage
                            }
                          />;
                        })}
                      </AvatarGroup>
                    </Stack>
                  ) : (
                    ""
                  )}
                  <Stack sx={{ flexDirection: "row", mt: 1, gap: 2 }}>
                    <Button size="small" disableElevation onClick={confirm}>
                      Confirm
                    </Button>
                    <Button
                      size="small"
                      sx={{
                        bgcolor: theme == "light" ? "grey.300" : "grey.800",
                        color: theme == "light" ? "grey.800" : "grey.300",
                      }}
                      disableElevation
                    >
                      Delete
                    </Button>
                  </Stack>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Menu>
  );
}
