import { Box, Button, Divider, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import {
  useAddFriend,
  useRemoveRequestFriend,
} from "../../../../../utils/mutation";
import noImage from "../../../../../assets/images/user.png";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function SearchBar({ users }) {
  const userLogin = useSelector((state) => state.user.profile);
  const theme = useSelector((state) => state.app.theme);
  const dispatch = useDispatch();

  //add friend
  const addFriendMutation = useAddFriend();
  function handleAddFriend(user) {
    const data = {
      userId: userLogin.id,
      userProfileImg: userLogin.profileImg ? userLogin.profileImg : "",
      userUsername: userLogin.username,
      id: user._id,
      username: user.username,
      profileImg: user.profileImg,
      status: "pending",
    };
    addFriendMutation.mutate(data, {
      onSuccess(d) {
        const updatedListFriends = [
          ...userLogin.friends.listFriend,
          {
            id: user._id,
            username: user.username,
            profileImg: user.profileImg,
            status: "pending",
          },
        ];

        dispatch(
          userActions.setProfile({
            ...userLogin,
            friends: { ...userLogin.friends, listFriend: updatedListFriends },
          })
        );

        const updatedUsers = users.map((u) => {
          if (u._id == user._id) {
            return {
              _id: user._id,
              username: user.username,
              profileImg: user.profileImg,
              status: "pending",
            };
          } else {
            return u;
          }
        });
        setUsers(updatedUsers);
      },
      onError(e) {
        console.log("eeror is", e);
      },
    });
  }

  //cancel request friend
  const removeRequestMutation = useRemoveRequestFriend();
  function handleCancelRequest(user) {
    const data = {
      userId: userLogin.id,
      id: user._id,
    };
    removeRequestMutation.mutate(data, {
      onSuccess(d) {
        const updatedListFriends = userLogin?.friends?.listFriend.filter(
          (f) => f.id != user._id
        );
        dispatch(
          userActions.setProfile({
            ...userLogin,
            friends: { ...userLogin.friends, listFriend: updatedListFriends },
          })
        );

        const updatedUsers = users.map((u) => {
          if (u._id == user._id) {
            return {
              _id: user._id,
              username: user.username,
              profileImg: user.profileImg,
              status: "",
            };
          } else {
            return u;
          }
        });
        setUsers(updatedUsers);
      },
      onError(e) {
        console.log("eeror is", e);
      },
    });
  }
  return (
    <Stack>
      <TextField label="Search" variant="outlined" sx={{ width: "100%" }} />
      <Typography sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }}>
        Make new friends
      </Typography>
      <Divider sx={{ mt: 2 }} />
      <Stack>
        {users.map((user) => {
          return (
            <Stack
              key={user._id}
              sx={{
                my: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                p: 1,
                borderRadius: "5px",
                "&:hover": {
                  bgcolor: theme == "light" ? "grey.200" : "grey.800",
                },
              }}
            >
              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                  textDecoration: "none",
                }}
                component={Link}
                to={`profile/${user._id}`}
              >
                <Box
                  component="img"
                  sx={{
                    height: "50px",
                    width: "50px",
                    borderRadius: "50%",
                  }}
                  src={user.profileImg ? SERVER_URL + user.profileImg : noImage}
                />
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: 17,
                    color: theme == "light" ? "grey.800" : "grey.200",
                  }}
                >
                  {user.username[0].toUpperCase() + user.username.slice(1)}
                </Typography>
              </Stack>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                {user?.status == "pending" ? (
                  <Button onClick={() => handleCancelRequest(user)}>
                    Cancel Request
                  </Button>
                ) : (
                  <Button onClick={() => handleAddFriend(user)}>
                    Add friend
                  </Button>
                )}
              </Box>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}
