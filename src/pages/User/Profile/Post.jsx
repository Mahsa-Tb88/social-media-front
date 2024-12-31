import { Container, Grid2, Stack, Typography } from "@mui/material";
import React from "react";
import { purple, red } from "@mui/material/colors";
import { useSelector } from "react-redux";
import FriendSection from "./FriendSection";
import MainSection from "./MainSection";
import { useGetUserById } from "../../../utils/queries";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import LoadingError from "../../../components/LoadingError";
import Intro from "./Intro";

export default function Post() {
  const theme = useSelector((state) => state.app.theme);
  const userLogin = useSelector((state) => state.user.profile);
  const id = useParams().id;
  const { isPending, data, error, refetch } = useGetUserById(id);

  if (
    data?.data?.body.viewer == "private" &&
    data?.data?.body._id != userLogin._id
  ) {
    return (
      <Container sx={{ mt: 30 }}>
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            bgcolor: theme == "dark" ? "grey.800" : "grey.200",
            borderRadius: "5px",
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: 20, my: 3 }}>
            This profile is private!
          </Typography>
        </Stack>
      </Container>
    );
  }

  return (
    <Stack
      sx={{
        py: 4,
        bgcolor: theme === "dark" ? "grey.800" : "grey.200",
      }}
    >
      <Container maxWidth="lg">
        {isPending ? (
          <Loading message="Is loading..." />
        ) : error ? (
          <LoadingError handleAction={refetch} message={error.message} />
        ) : (
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, lg: 4 }}>
              <Intro />
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 8 }}>
              <MainSection profile={data.data.body} />
            </Grid2>
          </Grid2>
        )}
      </Container>
    </Stack>
  );
}
