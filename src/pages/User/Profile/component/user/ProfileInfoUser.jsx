import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import noImage from "../../../../../assets/images/user.png";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddFriend,
  useRemoveRequestFriend,
} from "../../../../../utils/mutation";
import { userActions } from "../../../../../store/slices/userSlice";
import NavbarFriendRequest from "./NavbarFriendRequest";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import NavbarHandleFriend from "./NavbarHandleFriend";

export default function ProfileInfoUser({ user }) {
  const theme = useSelector((state) => state.app.theme);
  const userLogin = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const [profileImg, setProfileImg] = useState(
    user.profileImg ? SERVER_URL + user.profileImg : noImage
  );
  const [openRequest, setOpenRequest] = useState(false);
  const [openHandleFriend, setOpenHandleFriend] = useState(false);
  const requestAnchor = useRef();
  const HandleFriendAnchor = useRef();

  const addFriendMutation = useAddFriend();

  function findFriend() {
    const findFriend = userLogin?.friends?.listFriend?.find(
      (f) => f.id == user._id
    );
    if (findFriend) {
      return { status: findFriend.status };
    } else {
      return false;
    }
  }

  function findUserInRequestList() {
    const findUserInRequestList = userLogin?.friends?.friendRequestList || [];
    const findUser = findUserInRequestList.find((f) => f.id == user._id);
    console.log("findUser---->", findUser);
    if (findUser && findUser.status != "accept") {
      return true;
    } else {
      return false;
    }
  }

  function addFriend() {
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
      },
      onError(e) {
        console.log("eeror is", e);
      },
    });
  }

  const removeRequestMutation = useRemoveRequestFriend();

  function cancelRequest() {
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
      },
      onError(e) {
        console.log("eeror is", e);
      },
    });
  }

  return (
    <Container
      fixed
      maxWidth="md"
      sx={{
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Stack
        sx={{
          position: "absolute",
          top: "-40px",
          width: "100%",
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: 7,
          }}
        >
          <Stack sx={{ position: "relative" }}>
            <Box
              component="img"
              src={profileImg}
              sx={{
                border: "var(--border)",
                borderRadius: "50%",
                width: "200px",
                height: "200px",
              }}
            />
          </Stack>

          <Stack
            sx={{
              width: "100%",
              flexDirection: "row",
              mt: 8,
              justifyContent: "space-between",
            }}
          >
            <Stack>
              <Typography sx={{ fontWeight: "bold", fontSize: 30 }}>
                {user.username}
              </Typography>
              <Typography sx={{ fontSize: 17 }}>
                {/*  {user?.friends.length ? user.friends + "friends" : " "}
        {user?.mutual ? ", " + user.mutual + "mutual" : ""} */}
              </Typography>
            </Stack>
            <Stack sx={{ flexDirection: "row", gap: 2 }}>
              {findUserInRequestList() ? (
                <Button
                  startIcon={<PersonIcon />}
                  size="large"
                  sx={{ fontSize: 17 }}
                  disableElevation
                  onClick={() => setOpenRequest(true)}
                  ref={requestAnchor}
                >
                  Sent request
                </Button>
              ) : !findFriend() ? (
                <Button
                  startIcon={<PersonAddAlt1Icon />}
                  size="large"
                  sx={{ fontSize: 17 }}
                  disableElevation
                  onClick={addFriend}
                >
                  Add Friend
                </Button>
              ) : findFriend()?.status == "pending" ? (
                <Button
                  startIcon={<PersonIcon />}
                  size="large"
                  sx={{ fontSize: 17 }}
                  disableElevation
                  onClick={cancelRequest}
                >
                  Cancel Request
                </Button>
              ) : (
                <Button
                  startIcon={<CheckCircleOutlineIcon />}
                  size="large"
                  sx={{ fontSize: 17 }}
                  disableElevation
                  onClick={() => setOpenHandleFriend(true)}
                  ref={HandleFriendAnchor}
                >
                  Your friend
                </Button>
              )}

              <Button
                size="large"
                sx={{
                  fontSize: 17,
                  bgcolor: theme == "light" ? "grey.200" : "grey.800",
                  color: theme == "light" ? "grey.800" : "grey.200",
                  "&:hover": {
                    bgcolor: theme == "light" ? "grey.300" : "grey.900",
                  },
                }}
                startIcon={<MessageIcon />}
                disableElevation
              >
                Message
              </Button>
              <NavbarFriendRequest
                open={openRequest}
                anchorEl={requestAnchor.current}
                handleClose={() => setOpenRequest(false)}
                user={user}
              />
              <NavbarHandleFriend
                open={openHandleFriend}
                anchorEl={HandleFriendAnchor.current}
                handleClose={() => setOpenHandleFriend(false)}
                user={user}
                deleteFriend={cancelRequest}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
