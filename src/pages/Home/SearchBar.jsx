/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-undef */
import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";

import { useFindUser } from "../../utils/queries";
import LoginFirst from "./LoginFirst";
import noImage from "../../assets/images/user.png";
import RandomUserList from "./RandomUserList";
import Loading from "../../components/Loading";
import LoadingError from "../../components/LoadingError";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  useAddFriend,
  useConfirmFriend,
  useRemoveFriend,
  useRemoveRequestFriend,
} from "../../utils/mutation";
import { userActions } from "../../store/slices/userSlice";
import { toast } from "react-toastify";

export default function SearchBar() {
  const userLogin = useSelector((state) => state.user.profile);
  const [search, setSearch] = useState(false);
  const [userList, setUserList] = useState([]);
  const [q, setQ] = useState("");
  const dispatch = useDispatch();
  const [openLoginUser, setOpenLoginUser] = useState(false);
  const theme = useSelector((state) => state.app.theme);
  const isMobile = useSelector((state) => state.app.isMobile);

  const { isPending, isFetching, data, error, refetch } = useFindUser(q);
  console.log("dataaa", data);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setQ(search);
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [search]);

  useEffect(() => {
    setUserList(data?.data?.body || []);
  }, [data]);

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
      id: user.id,
      username: user.username,
      profileImg: user.profileImg,
      status: "pending",
    };
    addFriendMutation.mutate(data, {
      onSuccess(d) {
        const updatedListFriends = [
          ...userLogin.friends.listFriend,
          {
            id: user.id,
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
        // update userlist
        const updatedList = userList.map((u) => {
          if (u.id == user.id) {
            return { ...u, status: "pending" };
          } else {
            return u;
          }
        });

        setUserList(updatedList);
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
      id: user.id,
    };
    removeRequestMutation.mutate(data, {
      onSuccess(d) {
        const updatedListFriends = userLogin?.friends?.listFriend.filter(
          (f) => f.id != user.id
        );
        dispatch(
          userActions.setProfile({
            ...userLogin,
            friends: { ...userLogin.friends, listFriend: updatedListFriends },
          })
        );
        // update userlist
        const updatedList = userList.map((u) => {
          if (u.id == user.id) {
            return { ...u, status: "" };
          } else {
            return u;
          }
        });

        setUserList(updatedList);
      },
      onError(error) {
        console.log("eeror is", error);
        toast.error(error.response.data.message);
      },
    });
  }

  //accept request friend
  const confirmMutation = useConfirmFriend();
  function handleAcceptRequest(user) {
    const data = {
      id: user.id,
      profileImg: user.profileImg,
      username: user.username,
      userId: userLogin.id,
    };
    confirmMutation.mutate(data, {
      onSuccess(d) {
        const updatedListFriends = [
          ...userLogin?.friends.listFriend,
          {
            id: user.id,
            profileImg: user.profileImg,
            username: user.username,
            status: "accepted",
          },
        ];
        const updateRequestList = userLogin.friends.friendRequestList.map(
          (f) => {
            if (f.id == user.id) {
              return { ...f, status: "accept" };
            } else {
              return f;
            }
          }
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

        // update userlist
        const updatedList = userList.map((u) => {
          if (u.id == user.id) {
            return { ...u, status: "accepted" };
          } else {
            return u;
          }
        });

        setUserList(updatedList);
      },
      onError(e) {
        console.log("error is ", e);
        toast.error(e.response.data.message);
      },
    });
  }

  //remove friend
  const removeFriendMutation = useRemoveFriend();
  function handleRemoveFriend(user) {
    const data = {
      userId: userLogin.id,
      id: user.id,
    };
    removeFriendMutation.mutate(data, {
      onSuccess(d) {
        const updatedListFriends = userLogin?.friends?.listFriend.filter(
          (f) => f.id != user.id
        );
        dispatch(
          userActions.setProfile({
            ...userLogin,
            friends: { ...userLogin.friends, listFriend: updatedListFriends },
          })
        );
        // update userlist
        const updatedList = userList.map((u) => {
          if (u.id == user.id) {
            return { ...u, status: "" };
          } else {
            return u;
          }
        });

        setUserList(updatedList);
      },
      onError(e) {
        console.log("eeror is", e);
        toast.error(e.response.data.message);
      },
    });
  }

  return (
    <Paper sx={{ p: 2 }}>
      <TextField
        label="Search user"
        variant="outlined"
        sx={{ width: "100%" }}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Stack sx={{ mt: 2 }}>
        {isFetching ? (
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
        ) : userList.length ? (
          <Stack>
            {userList.map((user) => {
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
                      src={
                        user.profileImg ? SERVER_URL + user.profileImg : noImage
                      }
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
                    ) : user?.status == "requested" ? (
                      <Button onClick={() => handleAcceptRequest(user)}>
                        Sent request
                      </Button>
                    ) : user?.status == "accepted" ? (
                      <Button onClick={() => handleRemoveFriend(user)}>
                        Remove friend
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
        ) : !userList.length && search && !isPending ? (
          <Typography>Nothing found!</Typography>
        ) : (
          ""
        )}
      </Stack>

      {!isMobile && (
        <Stack>
          <Typography sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }}>
            Make new friends
          </Typography>
          <Divider sx={{ mt: 2 }} />
          <RandomUserList
            handleAddFriend={handleAddFriend}
            handleCancelRequest={handleCancelRequest}
          />
        </Stack>
      )}
      <LoginFirst open={openLoginUser} onClose={setOpenLoginUser} />
    </Paper>
  );
}
