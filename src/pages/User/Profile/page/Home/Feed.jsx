import { Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useGetPublicPosts } from "../../../../../utils/queries";
import Loading from "../../../../../components/Loading";
import LoadingError from "../../../../../components/LoadingError";

export default function Feed() {
  const userLogin = useSelector((state) => state.user.profile);
  const publicPostList = useGetPublicPosts();
  console.log("publivpists", publicPostList);
  return (
    <Stack>
      {isPending ? (
        <Box>
          <Loading message="Is Loading" />
        </Box>
      ) : error ? (
        <LoadingError handleAction={refetch} message={error.message} />
      ) : (
        "yes"
      )}
    </Stack>
  );
}
