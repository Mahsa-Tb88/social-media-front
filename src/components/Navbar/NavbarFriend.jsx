/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

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
import { useEffect, useState } from "react";

import noImage from "../../assets/images/user.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useConfirmFriend, useRemoveRequestFriend } from "../../utils/mutation";
import { userActions } from "../../store/slices/userSlice";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export default function NavbarFriend({ open, anchorEl, handleClose }) {
  const userLogin = useSelector((state) => state.user.profile);
  const [requestList, setRequestList] = useState(
    userLogin.friends?.friendRequestList || []
  );

  useEffect(() => {
    if (userLogin.friends?.friendRequestList?.length) {
      setRequestList(userLogin.friends?.friendRequestList);
    }
  }, [userLogin]);

  const dispatch = useDispatch();

  function mutualFriends(id) {
    return userLogin?.friends?.listFriend.filter((f) => f.id == id);
  }

  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
      onSuccess() {
        const updatedListFriends = [
          // eslint-disable-next-line no-unsafe-optional-chaining
          ...userLogin?.friends.listFriend,
          {
            id: friend.id,
            profileImg: friend.profileImg,
            username: friend.username,
            status: "accepted",
          },
        ];
        const updateRequestList = userLogin.friends.friendRequestList.map(
          (f) => {
            if (f.id == friend.id) {
              return { ...f, status: "accept" };
            } else {
              return f;
            }
          }
        );
        queryClient.invalidateQueries({ queryKey: ["friends", userLogin.id] });

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
      },
      onError(e) {
        console.log("error is ", e);
        toast.error(e.response.data.message);
      },
    });
  }

  const removeRequestMutation = useRemoveRequestFriend();
  function deleteHandler(event, user) {
    event.stopPropagation();

    const data = {
      userId: user.id,
      id: userLogin.id,
    };
    removeRequestMutation.mutate(data, {
      onSuccess() {
        const updatedFriendRequestList =
          userLogin.friends.friendRequestList.map((f) => {
            if (f.id == user.id) {
              return { ...f, status: "reject" };
            } else {
              return f;
            }
          });

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
            <ListItem key={friend.id} disablePadding sx={{ p: 1 }} divider>
              {friend.status == "accept" ? (
                <ListItemButton
                  onClick={() => gotoProfile(friend.id)}
                  sx={{ gap: 4, borderRadius: "3px", bgcolor: "#e0f2f1" }}
                >
                  <ListItemText>
                    <Typography>
                      {friend.username[0].toUpperCase() +
                        friend.username.slice(1) +
                        " "}
                      is your new friend
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              ) : friend.status == "reject" ? (
                <ListItemButton
                  onClick={() => gotoProfile(friend.id)}
                  sx={{
                    gap: 4,
                    borderRadius: "3px",
                    bgcolor: "#ff8a80",
                  }}
                >
                  <ListItemText>
                    <Typography>
                      you rejected
                      {friend.username[0].toUpperCase() +
                        friend.username.slice(1)}
                      friends's request
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
                      sx={{
                        borderRadius: "50%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography>
                      {friend.username[0].toUpperCase() +
                        friend.username.slice(1)}
                    </Typography>
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
                          bgcolor: "backgroundColor.light",
                          color: "backgroundColor.text",
                          "&:hover": {
                            bgcolor: "backgroundColor.dark",
                          },
                        }}
                        disableElevation
                        onClick={(event) => deleteHandler(event, friend)}
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
