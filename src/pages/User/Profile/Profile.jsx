import { Divider, Stack, Typography } from "@mui/material";
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
  const [isPrivate, setIsPrivate] = useState(false);
  const { isPending, data, refetch, error } = useGetUserById(id);

  useEffect(() => {
    if (data) {
      if (data?.data?.body._id == userLogin._id) {
        setUser(userLogin);
        setIsPrivate(false);
      } else {
        setUser(data.data.body);
        const findFriend = user.friends.listFriend?.find(
          (l) => l._id == data.data.body._id
        );
        if (!findFriend || findFriend?.status == "pending") {
          setIsPrivate(true);
        } else {
          setIsPrivate(false);
        }
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

          {isPrivate ? (
            <Stack
              sx={{
                mt: 25,
                mb: 10,
                textAlign: "center",
              }}
            >
              <Divider />
              <Typography component={"h3"} variant="h5" sx={{ pt: 2 }}>
                This profile is private
              </Typography>
            </Stack>
          ) : (
            <Stack>
              <Navbar />
              <Outlet />
            </Stack>
          )}
        </Stack>
      )}
    </Stack>
  );
}
