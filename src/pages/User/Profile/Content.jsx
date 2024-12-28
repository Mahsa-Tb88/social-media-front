import {
  Box,
  Button,
  Container,
  Divider,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { purple, red } from "@mui/material/colors";
import { useSelector } from "react-redux";
import FriendSection from "./FriendSection";
import MainSection from "./MainSection";

export default function Content({ user }) {
  const theme = useSelector((state) => state.app.theme);
  const userLogin = useSelector((state) => state.user.profile);

  if (user.viewer == "private" && user._id != userLogin._id) {
    return (
      <Container sx={{ mt: 30 }}>
        <Stack>This is Private</Stack>
      </Container>
    );
  }

  return (
    <Stack
      sx={{
        mt: 30,
        py: 4,
        bgcolor: theme === "dark" ? "grey.800" : "grey.200",
      }}
    >
      <Container maxWidth="md">
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, lg: 4 }}>
            <FriendSection />
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 8 }}>
            <MainSection profile={user} />
          </Grid2>
        </Grid2>
      </Container>
    </Stack>
  );
}
