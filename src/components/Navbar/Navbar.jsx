import {
  DarkMode,
  LightMode,
  Message,
  NotificationImportant,
  Notifications,
  Person2,
  Person2Outlined,
  Person3,
  PersonAdd,
  PersonOffTwoTone,
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

export default function Navbar() {
  const profile = useSelector((state) => state.user);
  const theme = useSelector((state) => state.app.theme);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const menuAnchor = useRef(null);

  function chageHandlerTheme() {
    if (theme == "light") {
      dispatch(appActions.setTheme("dark"));
    } else {
      dispatch(appActions.setTheme("light"));
    }
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
            {!profile?.user ? (
              <Stack direction="row" spacing={3} alignItems="center">
                <Badge
                  badgeContent={3}
                  invisible={""}
                  color="error"
                  anchorOrigin={{ vertical: "top", horizontal: "left" }}
                  overlap="circular"
                >
                  <MyIconButton sx={{ width: 30, height: 30 }}>
                    <Notifications />
                  </MyIconButton>
                </Badge>

                <Badge
                  badgeContent={3}
                  invisible={""}
                  color="error"
                  anchorOrigin={{ vertical: "top", horizontal: "left" }}
                  overlap="circular"
                >
                  <MyIconButton sx={{ width: 30, height: 30 }}>
                    <Message />
                  </MyIconButton>
                </Badge>
                <Badge
                  badgeContent={2}
                  invisible={""}
                  color="error"
                  anchorOrigin={{ vertical: "top", horizontal: "left" }}
                  overlap="circular"
                >
                  <MyIconButton sx={{ width: 30, height: 30 }}>
                    <PersonAdd />
                  </MyIconButton>
                </Badge>

                <Box>
                  <img
                    src={noImage}
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
                  >
                    Sign In
                  </Button>
                  <Button
                    disableElevation
                    sx={{ fontSize: 15, fontWeight: "bold" }}
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
        open={open}
        anchorEl={menuAnchor.current}
        handleClose={() => setOpen(false)}
      />
    </AppBar>
  );
}
