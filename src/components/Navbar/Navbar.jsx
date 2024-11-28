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
  return (
    <AppBar
      position="sticky"
      sx={{ bgcolor: "var(--palette-background-paper)" }}
    >
      <Container fixed>
        <Toolbar>
          {profile?.user ? (
            <Stack></Stack>
          ) : (
            <Stack direction="row" spacing={1}>
              <Typography variant="h4" component="h1" color="info" flexGrow={1}>
                VibeLink
              </Typography>
              <Box>
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
              </Box>
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
