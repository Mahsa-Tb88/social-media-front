import React from "react";

import { Stack, Typography } from "@mui/material";

import { usePlaceLived } from "../../../utils/queries";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import LoadingError from "../../../components/LoadingError";
import UsedToLiveCity from "./UsedToLiveCity";
import CurrentCity from "./CurrentCity";
import Hometown from "./Hometown";

export default function PlaceLived() {
  const id = useParams().id;

  const { isPending, data, error, refetch } = usePlaceLived(id);
  const hometown = data?.data?.body.places[2];
  const currentCity = data?.data?.body.places[1];
  const usedToLiveCity = data?.data?.body.places[0];
  const isFriend = data?.data?.body.isFriend;
  const isOwner = data?.data?.body.isOwner;

  return (
    <Stack>
      {isPending ? (
        <Loading message="is loading..." />
      ) : error ? (
        <LoadingError
          handleAction={refetch}
          message={error.response.data.message}
        />
      ) : (
        <Stack>
          <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
            Places Lived
          </Typography>
          <Stack spacing={3}>
            <Hometown
              hometown={hometown}
              isOwner={isOwner}
              isFriend={isFriend}
            />
            <CurrentCity
              currentCity={currentCity}
              isOwner={isOwner}
              isFriend={isFriend}
            />
            <UsedToLiveCity
              usedToLiveCity={usedToLiveCity}
              isOwner={isOwner}
              isFriend={isFriend}
            />
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
