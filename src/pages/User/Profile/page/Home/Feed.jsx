import { Box, Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useGetPublicPosts } from "../../../../../utils/queries";
import Loading from "../../../../../components/Loading";
import LoadingError from "../../../../../components/LoadingError";
import SinglePost from "../../component/shared/post/SinglePost";

export default function Feed() {
  const userLogin = useSelector((state) => state.user.profile);
  const theme = useSelector((state) => state.app.theme);
  const publicPostList = useGetPublicPosts();
  console.log("publicposts", publicPostList?.data);
  return (
    <Stack sx={{  bgcolor: theme === "dark" ? "grey.800" : "grey.200" }}>
      {publicPostList.isPending ? (
        <Box>
          <Loading message="Is Loading" />
        </Box>
      ) : publicPostList.error ? (
        <LoadingError
          handleAction={publicPostList.refetch}
          message={publicPostList.error.message}
        />
      ) : (
        publicPostList.data.data.body.map((post) => {
          return (
            <Stack key={post._id}>
              <SinglePost post={post} profile={post.userId} />
            </Stack>
          );
        })
      )}
    </Stack>
  );
}
