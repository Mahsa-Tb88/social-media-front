/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from "react";
import backGround from "../../../assets/images/back.jpg";
import { Box, Container, Grid2, Stack } from "@mui/material";
import ProfileInfoUser from "./ProfileInfoUser";
import { useGetMutualFriends } from "../../../utils/queries";
import Loading from "../../../components/Loading";
import LoadingError from "../../../components/LoadingError";

export default function ProfileHeaderUser({ user }) {
  const { isPending, data, error, refetch } = useGetMutualFriends(user._id);

  return (
    <Container>
      <Grid2 container>
        <Grid2 size={12} sx={{ mt: 3 }}>
          <Stack sx={{ height: "300px", position: "relative" }}>
            <Stack sx={{ width: "100%", height: "100%" }}>
              <Box
                sx={{
                  backgroundImage: `url(${user.backgroundImg ? SERVER_URL + user.backgroundImg : backGround})`,
                  backgroundSize: "cover", // ensures the image covers the entire box
                  backgroundPosition: "center", // centers the image
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                  height: "100%",
                  borderRadius: "5px",
                }}
              />
            </Stack>
          </Stack>
        </Grid2>
      </Grid2>
      {isPending ? (
        <Loading message="Is loading..." />
      ) : error ? (
        <LoadingError
          handleAction={refetch}
          message={error.response.data.message}
        />
      ) : (
        <ProfileInfoUser
          user={user}
          mutualFriend={data.data.body.mutualFriends}
          numOfFriend={data.data.body.numOfFriends}
        />
      )}
    </Container>
  );
}
