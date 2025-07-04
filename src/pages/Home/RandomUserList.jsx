/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useDispatch, useSelector } from "react-redux";
import React from "react";

import { useGetAllUser } from "../../utils/queries";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import LoadingError from "../../components/LoadingError";
import noImage from "../../assets/images/user.png";
import { Stack, Box, Typography, Button } from "@mui/material";
import { useAddFriend, useRemoveRequestFriend } from "../../utils/mutation";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoginFirst from "./LoginFirst";
import { userActions } from "../../store/slices/userSlice";

export default function RandomUserList({ userList }) {
  const userLogin = useSelector((state) => state.user.profile);
  const theme = useSelector((state) => state.app.theme);
  const dispatch = useDispatch();
  const { isPending, data, error, refetch } = useGetAllUser();

  const [users, setUsers] = useState([]);
  const [openLoginUser, setOpenLoginUser] = useState(false);

  useEffect(() => {
    if (data) {
      // filter users to show only users that not friends or in friend request
      filterUsers();
    }
  }, [data, userList]);

  function filterUsers() {
    let updatedUserList = data.data.body;
    const friends = userLogin.friends?.listFriend || [];
    const userRequestList = userLogin.friends?.friendRequestList || [];
    friends.forEach((element) => {
      updatedUserList = updatedUserList.filter((f) => f._id != element.id);
    });
    userRequestList.forEach((element) => {
      updatedUserList = updatedUserList.filter((f) => f._id != element.id);
    });
    let newList = [];
    updatedUserList.forEach((u) => {
      const findUser = userList.find((f) => f.id == u._id);
      if (!findUser) {
        newList.push(u);
      }
    });

    setUsers(newList);
  }
  //add friend
  const addFriendMutation = useAddFriend();
  function handleAddFriend(user) {
    if (!userLogin.id) {
      setOpenLoginUser(true);
      return;
    }
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
      onError(error) {
        console.log("error is", error.response.data.message);
        toast.error(error.response.data.message);
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
      onError(error) {
        console.log("eeror is", error);
        toast.error(error.response.data.message);
      },
    });
  }
  return (
    <Stack sx={{ mt: 1, minHeight: "350px" }}>
      {isPending ? (
        <Box>
          <Loading message="Is Loading" />
        </Box>
      ) : error ? (
        <Box>
          <LoadingError
            handleAction={refetch}
            message={error.response.data.message}
          />
        </Box>
      ) : users.length ? (
        users.map((user) => {
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
                    objectFit: "cover",
                    display: "block",
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
        })
      ) : (
        "There is no user!"
      )}
      <LoginFirst open={openLoginUser} onClose={setOpenLoginUser} />
    </Stack>
  );
}
