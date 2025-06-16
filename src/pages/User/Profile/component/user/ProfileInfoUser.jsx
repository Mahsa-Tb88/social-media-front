/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
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
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ProfileInfoUser({ user, mutualFriend, numOfFriend }) {
  const userLogin = useSelector((state) => state.user.profile);
  const isMobile = useSelector((state) => state.app.isMobile);
  const userId = useParams().id;
  const navigate = useNavigate();
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
        toast.error(e.response.data.message);
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
        console.log("error is", e);
        toast.error(e.response.data.message);
      },
    });
  }

  const chatId =
    userLogin.id > userId ? userLogin.id + userId : userId + userLogin.id;

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
                width: isMobile ? "150px" : "200px",
                height: isMobile ? "150px" : "200px",
              }}
            />
          </Stack>

          <Stack
            sx={{
              width: "100%",
              flexDirection: isMobile ? "column" : "row",
              mt: 8,
              justifyContent: "space-between",
            }}
          >
            <Stack sx={{ alignItems: "flex-start" }}>
              <Typography
                sx={{ fontWeight: "bold", fontSize: isMobile ? 20 : 30 }}
              >
                {user?.username &&
                  user.username[0].toUpperCase() + user?.username.slice(1)}
              </Typography>
              <Typography sx={{ fontSize: isMobile ? "12px" : "16px" }}>
                {numOfFriend?.length > 0 ? numOfFriend.length + " friends" : ""}
                {mutualFriend?.length > 0
                  ? ", " + mutualFriend.length + " mutual"
                  : ""}
              </Typography>
              <AvatarGroup
                max={4}
                sx={{
                  "& .css-wze2on-MuiAvatar-root": {
                    width: isMobile ? 20 : 35,
                    height: isMobile ? 20 : 35,
                    fontSize: isMobile ? "12px" : "18px",
                  },
                }}
              >
                {mutualFriend.map((f) => {
                  return (
                    <Avatar
                      key={f.id}
                      alt={f.username[0].toUpperCase()}
                      src={SERVER_URL + f.profileImg}
                      onClick={() => navigate("/profile/" + f.id)}
                      sx={{
                        cursor: "pointer",
                        width: isMobile ? 20 : 35,
                        height: isMobile ? 20 : 35,
                        fontSize: isMobile ? "12px" : "18px",
                      }}
                    />
                  );
                })}
              </AvatarGroup>
            </Stack>
            <Stack>
              <Stack
                sx={{
                  flexDirection: isMobile ? "column" : "row",
                  gap: 2,
                  mt: isMobile ? "10px" : "",
                }}
              >
                {findUserInRequestList() ? (
                  <Button
                    startIcon={<PersonIcon />}
                    size={isMobile ? "medium" : "large"}
                    sx={{ fontSize: isMobile ? 12 : 17 }}
                    disableElevation
                    onClick={() => setOpenRequest(true)}
                    ref={requestAnchor}
                  >
                    Sent request
                  </Button>
                ) : !findFriend() ? (
                  <Button
                    startIcon={<PersonAddAlt1Icon />}
                    size={isMobile ? "medium" : "large"}
                    sx={{ fontSize: isMobile ? 12 : 17 }}
                    disableElevation
                    onClick={addFriend}
                  >
                    Add Friend
                  </Button>
                ) : findFriend()?.status == "pending" ? (
                  <Button
                    startIcon={<PersonIcon />}
                    size={isMobile ? "medium" : "large"}
                    sx={{ fontSize: isMobile ? 12 : 17 }}
                    disableElevation
                    onClick={cancelRequest}
                  >
                    Cancel Request
                  </Button>
                ) : (
                  <Button
                    startIcon={<CheckCircleOutlineIcon />}
                    size={isMobile ? "medium" : "large"}
                    sx={{ fontSize: isMobile ? 12 : 17 }}
                    disableElevation
                    onClick={() => setOpenHandleFriend(true)}
                    ref={HandleFriendAnchor}
                  >
                    Your friend
                  </Button>
                )}

                <Button
                  size={isMobile ? "medium" : "large"}
                  sx={{
                    fontSize: isMobile ? 12 : 17,
                    bgcolor: "backgroundColor.dark",
                    color: "backgroundColor.text",
                    "&:hover": {
                      bgcolor: "backgroundColor.light",
                    },
                  }}
                  startIcon={<MessageIcon />}
                  disableElevation
                  LinkComponent={Link}
                  to={`/chat/` + chatId}
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
      </Stack>
    </Container>
  );
}
