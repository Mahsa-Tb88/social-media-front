import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetOverview } from "../../../../../utils/queries";
import Loading from "../../../../../components/Loading";
import LoadingError from "../../../../../components/LoadingError";
import IntroUser from "../user/IntroUser";
import IntroUserLogin from "../userLogin/IntroUserLogin";

export default function Intro() {
  const user = useSelector((state) => state.user.profile);
  const id = useParams().id;
  const { isPending, data, error, refetch } = useGetOverview(id);
  const overview = data?.data?.body;

 

  return (
    <Paper sx={{ p: 2 }}>
      <Typography component="h6" variant="h6" sx={{ mb: 3 }}>
        Intro
      </Typography>
      {isPending ? (
        <Loading message="is loading..." />
      ) : error ? (
        <LoadingError
          handleAction={refetch}
          message={error.response.data.message}
        />
      ) : user.id != id ? (
        <IntroUser overview={overview} />
      ) : (
        <IntroUserLogin overview={overview} />
      )}
    </Paper>
  );
}
