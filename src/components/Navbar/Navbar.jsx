/* eslint-disable no-undef */
import {
  DarkMode,
  Home,
  LightMode,
  Message,
  Notifications,
  PersonAdd,
} from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import noImage from "../../assets/images/user.png";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyIconButton from "../Customized/MyIconButton";
import { appActions } from "../../store/slices/appSlice";
import NavbarMenu from "./NavbarMenu";
import NavbarFriend from "./NavbarFriend";
import NavbarNotofiication from "./NavbarNotofiication";
import NavbarMsg from "./NavbarMsg";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const userLogin = useSelector((state) => state.user.profile);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const app = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const menuAnchor = useRef(null);

  let unSeenNotification = [];
  if (userLogin.notificationList) {
    unSeenNotification = userLogin.notificationList.filter(
      (n) => n.isSeen == false
    );
  }

  let unSeenMsg = [];
  if (userLogin.notificationList) {
    unSeenMsg = userLogin.messages.filter((n) => n.isRead == false);
  }

  const [openAddFriend, setOpenAddFriend] = useState(false);
  const addFriendAnchor = useRef(null);

  const [openNotification, setopenNotification] = useState(false);
  const notificationAnchor = useRef(null);

  const [openMsg, setopenMsg] = useState(false);
  const msgAnchor = useRef(null);

  function chageHandlerTheme() {
    if (app.theme == "light") {
      dispatch(appActions.setTheme("dark"));
    } else {
      dispatch(appActions.setTheme("light"));
    }
  }

  function handleOpenListRequest() {
    if (userLogin.friends.friendRequestList?.length) {
      setOpenAddFriend(!openAddFriend);
    }
  }

  function numOfFriendrequest() {
    const list = userLogin?.friends?.friendRequestList?.filter(
      (f) => f.status == undefined
    );
    return list.length;
  }
  return (
    <AppBar
      position="sticky"
      sx={{ bgcolor: "var(--palette-background-paper)" }}
    >
      <Container fixed sx={{ px: 0 }}>
        <Toolbar>
          <Stack flexGrow={1}>
            <Typography
              variant={app.isMobile ? "h6" : "h4"}
              component={app.isMobile ? "h5" : "h1"}
              color="info"
              fontWeight={600}
            >
              VibeLink
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={app.isMobile ? 1 : 3}
            alignItems="center"
          >
            <MyIconButton LinkComponent={Link} to="/">
              <Home sx={{ fontSize: app.isMobile ? "large" : "24px" }} />
            </MyIconButton>
            <MyIconButton onClick={chageHandlerTheme}>
              {app.theme === "light" ? (
                <DarkMode sx={{ fontSize: app.isMobile ? "large" : "24px" }} />
              ) : (
                <LightMode
                  sx={{
                    color: "yellow",
                    fontSize: app.isMobile ? "large" : "24px",
                  }}
                />
              )}
            </MyIconButton>
            {isLoggedIn ? (
              <Stack
                direction="row"
                spacing={app.isMobile ? 1 : 3}
                alignItems="center"
              >
                <Badge
                  badgeContent={unSeenNotification.length}
                  color="error"
                  anchorOrigin={{ vertical: "top", horizontal: "left" }}
                  overlap="circular"
                >
                  <MyIconButton
                    onClick={() => setopenNotification(!openNotification)}
                  >
                    <Notifications
                      ref={notificationAnchor}
                      sx={{ fontSize: app.isMobile ? "large" : "24px" }}
                    />
                  </MyIconButton>
                </Badge>
                <Badge
                  badgeContent={unSeenMsg.length}
                  color="error"
                  anchorOrigin={{ vertical: "top", horizontal: "left" }}
                  overlap="circular"
                >
                  <MyIconButton onClick={() => setopenMsg(!openMsg)}>
                    <Message
                      ref={msgAnchor}
                      sx={{ fontSize: app.isMobile ? "large" : "24px" }}
                    />
                  </MyIconButton>
                </Badge>
                <Badge
                  badgeContent={
                    userLogin.friends?.friendRequestList && numOfFriendrequest()
                  }
                  color="error"
                  anchorOrigin={{ vertical: "top", horizontal: "left" }}
                  overlap="circular"
                >
                  <MyIconButton onClick={handleOpenListRequest}>
                    <PersonAdd
                      ref={addFriendAnchor}
                      sx={{ fontSize: app.isMobile ? "large" : "24px" }}
                    />
                  </MyIconButton>
                </Badge>

                <Box
                  onClick={() => {
                    setOpenMenu(!openMenu);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <img
                    src={
                      userLogin.profileImg
                        ? userLogin.profileImg.includes(SERVER_URL)
                          ? userLogin.profileImg
                          : SERVER_URL + userLogin.profileImg
                        : noImage
                    }
                    width={app.isMobile ? 35 : 45}
                    height={app.isMobile ? 35 : 45}
                    style={{ border: "var(--border)", borderRadius: "50%" }}
                    ref={menuAnchor}
                  />
                </Box>
              </Stack>
            ) : (
              <>
                <Stack direction="row" spacing={app.isMobile ? 1 : 2}>
                  <Button
                    disableElevation
                    variant="outlined"
                    sx={{
                      fontSize: app.isMobile ? 12 : 15,
                      fontWeight: "bold",
                    }}
                    component={NavLink}
                    to="login"
                  >
                    Sign In
                  </Button>
                  <Button
                    disableElevation
                    sx={{
                      fontSize: app.isMobile ? 12 : 15,
                      fontWeight: "bold",
                    }}
                    component={NavLink}
                    to="register"
                  >
                    Join Us
                  </Button>
                </Stack>
              </>
            )}
          </Stack>
        </Toolbar>
      </Container>
      <NavbarMenu
        open={openMenu}
        anchorEl={menuAnchor.current}
        handleClose={() => setOpenMenu(false)}
      />
      <NavbarFriend
        open={openAddFriend}
        anchorEl={addFriendAnchor.current}
        handleClose={() => setOpenAddFriend(false)}
      />
      <NavbarMsg
        open={openMsg}
        anchorEl={msgAnchor.current}
        handleClose={() => setopenMsg(false)}
      />
      <NavbarNotofiication
        open={openNotification}
        anchorEl={notificationAnchor.current}
        handleClose={() => setopenNotification(false)}
      />
    </AppBar>
  );
}
