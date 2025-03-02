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
  const profile = useSelector((state) => state.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const theme = useSelector((state) => state.app.theme);
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const menuAnchor = useRef(null);

  const [openAddFriend, setOpenAddFriend] = useState(false);
  const addFriendAnchor = useRef(null);

  const [openNotification, setopenNotification] = useState(false);
  const notificationAnchor = useRef(null);

  const [openMsg, setopenMsg] = useState(false);
  const msgAnchor = useRef(null);

  function chageHandlerTheme() {
    if (theme == "light") {
      dispatch(appActions.setTheme("dark"));
    } else {
      dispatch(appActions.setTheme("light"));
    }
  }

  function handleOpenListRequest() {
    if (profile.profile.friends.friendRequestList?.length) {
      console.log("pppp");
      setOpenAddFriend(!openAddFriend);
    }
  }

  function numOfFriendrequest() {
    const list = profile?.profile?.friends?.friendRequestList?.filter(
      (f) => f.status == undefined
    );
    return list.length;
  }
  return (
    <AppBar
      position="sticky"
      sx={{ bgcolor: "var(--palette-background-paper)" }}
    >
      <Container fixed>
        <Toolbar>
          <Stack flexGrow={1}>
            <Typography
              variant="h4"
              component="h1"
              color="info"
              fontWeight={600}
            >
              VibeLink
            </Typography>
          </Stack>
          <Stack direction="row" spacing={3} alignItems="center">
            <MyIconButton LinkComponent={Link} to="/">
              <Home />
            </MyIconButton>
            <MyIconButton
              onClick={chageHandlerTheme}
              sx={{ width: 30, height: 30 }}
            >
              {theme === "light" ? (
                <DarkMode />
              ) : (
                <LightMode sx={{ color: "yellow" }} />
              )}
            </MyIconButton>
            {isLoggedIn ? (
              <Stack direction="row" spacing={3} alignItems="center">
                <Badge
                  badgeContent={3}
                  invisible={""}
                  color="error"
                  anchorOrigin={{ vertical: "top", horizontal: "left" }}
                  overlap="circular"
                >
                  <MyIconButton
                    sx={{ width: 30, height: 30 }}
                    onClick={() => setopenNotification(!openNotification)}
                  >
                    <Notifications ref={notificationAnchor} />
                  </MyIconButton>
                </Badge>
                <Badge
                  badgeContent={3}
                  invisible={""}
                  color="error"
                  anchorOrigin={{ vertical: "top", horizontal: "left" }}
                  overlap="circular"
                >
                  <MyIconButton
                    sx={{ width: 30, height: 30 }}
                    onClick={() => setopenMsg(!openMsg)}
                  >
                    <Message ref={msgAnchor} />
                  </MyIconButton>
                </Badge>
                <Badge
                  badgeContent={
                    profile.profile.friends?.friendRequestList &&
                    numOfFriendrequest()
                    // profile.profile.friends.friendRequestList.length
                  }
                  color="error"
                  anchorOrigin={{ vertical: "top", horizontal: "left" }}
                  overlap="circular"
                >
                  <MyIconButton
                    sx={{ width: 30, height: 30 }}
                    onClick={handleOpenListRequest}
                  >
                    <PersonAdd ref={addFriendAnchor} />
                  </MyIconButton>
                  )
                </Badge>

                <Box
                  onClick={() => {
                    setOpenMenu(!openMenu);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <img
                    src={profile?.img ? profile.img : noImage}
                    width={40}
                    height={40}
                    style={{ border: "var(--border)", borderRadius: "50%" }}
                    ref={menuAnchor}
                  />
                </Box>
              </Stack>
            ) : (
              <>
                <Stack direction="row" spacing={2}>
                  <Button
                    disableElevation
                    variant="outlined"
                    sx={{ fontSize: 15, fontWeight: "bold" }}
                    component={NavLink}
                    to="login"
                  >
                    Sign In
                  </Button>
                  <Button
                    disableElevation
                    sx={{ fontSize: 15, fontWeight: "bold" }}
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
