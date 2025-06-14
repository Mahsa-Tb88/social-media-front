import { Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useGetUserById } from "../../../../utils/queries";
import UserLoginProfile from "./userLoginProfile";
import Loading from "../../../../components/Loading";
import LoadingError from "../../../../components/LoadingError";
import UserProfile from "./UserProfile";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

export default function Profile() {
  const userLogin = useSelector((state) => state.user.profile);
  const id = useParams().id;
  const { isPending, data, refetch, error } = useGetUserById(id);

  // const user=data.data.body

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
          {data.data.body.deleted ? (
            <NotFound />
          ) : id == userLogin.id ? (
            <UserLoginProfile />
          ) : (
            <UserProfile user={data.data.body} />
          )}
        </Stack>
      )}
    </Stack>
  );
}
