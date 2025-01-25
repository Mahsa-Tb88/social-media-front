import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileHeader from "./ProfileHeader";
import { Outlet, useParams } from "react-router-dom";
import { useGetUserById } from "../../../utils/queries";
import Loading from "../../../components/Loading";
import LoadingError from "../../../components/LoadingError";
import Navbar from "./Navbar";

export default function Profile() {
  const userLogin = useSelector((state) => state.user.profile);
  const id = useParams().id;
  const [user, setUser] = useState(userLogin);
  const { isPending, data, refetch, error } = useGetUserById(id);

  useEffect(() => {
    if (data) {
      if (data?.data?.body._id == userLogin.id) {
        setUser(userLogin);
      } else {
        setUser(data.data.body);
      }
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
          <ProfileHeader user={user} />
          <Navbar />
          <Outlet />
        </Stack>
      )}
    </Stack>
  );
}
