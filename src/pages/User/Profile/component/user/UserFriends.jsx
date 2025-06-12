/* eslint-disable no-undef */
import { Box, Grid2, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetFriends } from "../../../../../utils/queries";
import Loading from "../../../../../components/Loading";
import LoadingError from "../../../../../components/LoadingError";
import { useNavigate, useParams } from "react-router-dom";
import noImage from "../../../../../assets/images/user.png";

export default function UserFriends() {
  const [friends, setFriends] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const id = useParams().id;
  const { data, isPending, error, refetch } = useGetFriends(id);

  useEffect(() => {
    if (data) {
      const listFriend = data.data.body.listFriend;
      console.log("listFriend", data);
      if (!listFriend.length) {
        setMsg(data.data.body.message);
      } else {
        const friendsList = listFriend.filter((f) => f.status == "accepted");
        setFriends(friendsList);
      }
    }
  }, [data]);

  return (
    <Stack>
      {isPending ? (
        <Loading message="is loading..." />
      ) : error ? (
        <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
          <LoadingError
            handleAction={refetch}
            message={error.response.data.message}
          />
        </Stack>
      ) : friends.length == 0 ? (
        <Typography component={"h5"} variant="h5">
          {msg}
        </Typography>
      ) : (
        <Grid2 container spacing={3}>
          {friends.map((f, index) => {
            return (
              <Grid2 size={3} sx={{ textAlign: "center" }} key={index}>
                <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
                  <Box
                    component={"img"}
                    src={f.profileImg ? SERVER_URL + f.profileImg : noImage}
                    height={80}
                    width={80}
                    sx={{ borderRadius: "50%", cursor: "pointer" }}
                    onClick={() => navigate("/profile/" + f.id)}
                  />
                  <Typography
                    sx={{ fontSize: "18px", mt: 2, cursor: "pointer" }}
                    onClick={() => navigate("/profile/" + f.id)}
                  >
                    {f.username}
                  </Typography>
                </Stack>
              </Grid2>
            );
          })}
        </Grid2>
      )}
    </Stack>
  );
}
