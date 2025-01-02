import {
  Button,
  Container,
  Divider,
  Grid2,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import LoadingError from "../../../components/LoadingError";
import { NavLink } from "react-router-dom";

export default function About() {
  const theme = useSelector((state) => state.app.theme);
  return (
    <Stack sx={{ py: 4, bgcolor: theme === "dark" ? "grey.800" : "grey.200" }}>
      <Container maxWidth="md">
        {/* isPending ? <Loading message="Is loading..."/> :error ? <LoadingError handleAction={refetch} message={error.message}/> */}
        <Paper sx={{ p: 4 }}>
          <Grid2 container>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <Typography sx={{ fontWeight: "bold", mb: 3, fontSize: "20px" }}>
                About
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Button
                disableElevation
                sx={{
                  width: "100%",
                }}
                LinkComponent={NavLink}
                size="large"
                variant="text"
              >
                Overview
              </Button>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 8 }}></Grid2>
          </Grid2>
        </Paper>
      </Container>
    </Stack>
  );
}
