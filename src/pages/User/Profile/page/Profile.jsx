import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetUserById } from "../../../../utils/queries";
import UserLoginProfile from "./userLoginProfile";
import Loading from "../../../../components/Loading";
import LoadingError from "../../../../components/LoadingError";
import UserProfile from "./UserProfile";
import { useParams } from "react-router-dom";

export default function Profile() {
  const userLogin = useSelector((state) => state.user.profile);
  const [user, setUser] = useState({});
  const id = useParams().id;

  const { isPending, data, refetch, error } = useGetUserById(id);

  useEffect(() => {
    if (data) {
      setUser(data.data.body);
    }
  }, [data]);

  return (
    <Stack>
      {isPending ? (
        <Loading message="is loading..." />
      ) : error ? (
        <LoadingError handleAction={refetch} message={error.message} />
      ) : (
        <Stack>
          {id == userLogin.id ? (
            <UserLoginProfile />
          ) : (
            <UserProfile user={user} />
          )}
        </Stack>
      )}
    </Stack>
  );
}
