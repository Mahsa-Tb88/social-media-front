import { Container, Grid2, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import Feed from "./Feed";
import { useState } from "react";

export default function HomePage() {
  const theme = useSelector((state) => state.app.theme);

  return (
    <Stack
      sx={{
        minHeight: "100vh",
        p: 5,
        bgcolor: theme === "dark" ? "grey.800" : "grey.200",
      }}
    >
      <Container fixed>
        <Grid2 container spacing={5}>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <SearchBar />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Feed />
          </Grid2>
        </Grid2>
      </Container>
    </Stack>
  );
}
