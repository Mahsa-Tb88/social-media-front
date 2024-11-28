import { DarkMode, LightMode } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export default function Navbar() {
  const profile = useSelector((state) => state.user);
  const theme = useSelector((state) => state.app.theme);
  return (
    <AppBar
      position="sticky"
      sx={{ bgcolor: "var(--palette-background-paper)" }}
    >
      <Container fixed>
        <Toolbar>
          {profile?.user ? (
            <></>
          ) : (
            <>
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

              <Stack direction="row" spacing={2}>
                <Box>{theme == "light" ? <DarkMode /> : <LightMode />}</Box>
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}
