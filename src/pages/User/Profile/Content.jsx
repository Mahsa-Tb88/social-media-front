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

export default function Content() {
  const theme = useSelector((state) => state.app.theme);

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
            <MainSection />
          </Grid2>
        </Grid2>
      </Container>
    </Stack>
  );
}
