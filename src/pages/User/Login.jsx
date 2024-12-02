import { Container, Grid2, Typography } from "@mui/material";
import React from "react";

export default function Login() {
  return (
    <Container fixed maxWidth="sm">
      <Grid2 container>
        <Grid2 size={12}>
          <Typography>Login</Typography>
        </Grid2>
      </Grid2>
    </Container>
  );
}
