import { Person } from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import noImage from "../../assets/images/user.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useConfirmFriend, useRemoveRequestFriend } from "../../utils/mutation";
import { userActions } from "../../store/slices/userSlice";

export default function NavbarFriend({ open, anchorEl, handleClose }) {
  const userLogin = useSelector((state) => state.user.profile);
  const [requestList, setRequestList] = useState([]);
  useEffect(() => {
    if (userLogin.friends?.friendRequestList?.length) {
      setRequestList(userLogin.friends?.friendRequestList);
    }
  }, [userLogin]);

  const dispatch = useDispatch();

  function mutualFriends(id) {
    return userLogin?.friends?.listFriend.filter((f) => f.id == id);
  }

  const theme = useSelector((state) => state.app.theme);
  const navigate = useNavigate();

  const confirmMutation = useConfirmFriend();
  function confirmHandler(event, friend) {
    event.stopPropagation();

    const data = {
      id: friend.id,
      profileImg: friend.profileImg,
      username: friend.username,
      userId: userLogin.id,
    };
    confirmMutation.mutate(data, {
      onSuccess(d) {
        console.log("success");
        const updatedListFriends = [
          ...userLogin?.friends.listFriend,
          {
            id: friend.id,
            profileImg: friend.profileImg,
            username: friend.username,
          },
        ];
        const updateRequestList = userLogin.friends.friendRequestList.filter(
          (f) => f.id != friend.id
        );
        dispatch(
          userActions.setProfile({
            ...userLogin,
            friends: {
              ...userLogin?.friends,
              listFriend: updatedListFriends,
              friendRequestList: updateRequestList,
            },
          })
        );

        //update request List

        const updatedRequestList = requestList.map((f) => {
          if (f.id == friend.id) {
            return { id: f.id, username: "" };
          } else {
            return f;
          }
        });
        setRequestList(updatedRequestList);
      },
      onError(e) {
        console.log("error is ", e);
      },
    });
  }

  const removeRequestMutation = useRemoveRequestFriend();
  function deleteHandler(event, id) {
    event.stopPropagation();

    const data = {
      userId: id,
      id: userLogin.id,
    };
    removeRequestMutation.mutate(data, {
      onSuccess(d) {
        const updatedFriendRequestList =
          userLogin?.friends?.friendRequestList.filter((f) => f.id != user._id);
        dispatch(
          userActions.setProfile({
            ...userLogin,
            friends: {
              ...userLogin.friends,
              friendRequestList: updatedFriendRequestList,
            },
          })
        );
      },
      onError(e) {
        console.log("eeror is", e);
      },
    });
  }

  function gotoProfile(id) {
    navigate(`/profile/${id}`);
  }

  console.log("userlogin....", userLogin);

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
              {friend.username == "" ? (
                <ListItemButton
                  onClick={() => gotoProfile(friend.id)}
                  sx={{ gap: 4, borderRadius: "3px" }}
                >
                  <ListItemText>
                    <Typography>
                      You make new friend, go to their profile
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              ) : (
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
                    <Typography>{friend.username}</Typography>
                    {mutualFriends(friend.id)?.length > 1 ? (
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
                                f.profileImg
                                  ? SERVER_URL + f.profileImg
                                  : noImage
                              }
                            />;
                          })}
                        </AvatarGroup>
                      </Stack>
                    ) : (
                      ""
                    )}
                    <Stack sx={{ flexDirection: "row", mt: 1, gap: 2 }}>
                      <Button
                        size="small"
                        disableElevation
                        onClick={(event) => confirmHandler(event, friend)}
                      >
                        Confirm
                      </Button>
                      <Button
                        size="small"
                        sx={{
                          bgcolor: theme == "light" ? "grey.300" : "grey.800",
                          color: theme == "light" ? "grey.800" : "grey.300",
                        }}
                        disableElevation
                        onClick={() => deleteHandler(friend.id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </ListItemText>
                </ListItemButton>
              )}
            </ListItem>
          );
        })}
      </List>
    </Menu>
  );
}
