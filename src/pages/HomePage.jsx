import { Container, Grid2, Stack, TextField } from "@mui/material";
import React from "react";

export default function HomePage() {
  return (
    <Container fixed sx={{mt:3}}>
      <Grid2 container>
        <Grid2>
          <TextField label="search" variant="outlined" />
        </Grid2>
      </Grid2>
    </Container>
  );
}
