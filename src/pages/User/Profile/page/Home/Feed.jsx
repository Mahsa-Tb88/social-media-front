import { Alert, Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useGetPublicPosts } from "../../../../../utils/queries";
import Loading from "../../../../../components/Loading";
import LoadingError from "../../../../../components/LoadingError";
import SinglePost from "../../component/shared/post/SinglePost";

export default function Feed() {
  const theme = useSelector((state) => state.app.theme);
  const userLogin = useSelector((state) => state.user.profile);
  const { isPending, error, refetch, data } = useGetPublicPosts(userLogin.id);

  return (
    <Stack
      sx={{
        bgcolor: theme === "dark" ? "grey.800" : "grey.200",
      }}
    >
      {isPending ? (
        <Box>
          <Loading message="Is Loading" />
        </Box>
      ) : error ? (
        <LoadingError handleAction={refetch} message={error.message} />
      ) : data.data.body.length ? (
        data.data.body.map((post) => {
          return (
            <Stack key={post._id}>
              <SinglePost post={post} profile={post.userId} />
            </Stack>
          );
        })
      ) : (
        <Alert color="info">There is no post to show!</Alert>
      )}
    </Stack>
  );
}
