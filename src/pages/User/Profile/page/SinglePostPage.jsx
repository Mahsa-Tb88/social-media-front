import { Container, Stack } from "@mui/material";
import React from "react";
import SinglePost from "../component/shared/post/SinglePost";
import { useGetPost, useGetUserById } from "../../../../utils/queries";
import { useParams } from "react-router-dom";
import Loading from "../../../../components/Loading";
import LoadingError from "../../../../components/LoadingError";
import { useSelector } from "react-redux";

export default function SinglePostPage() {
  const theme = useSelector((state) => state.app.theme);
  const id = useParams().id;
  const { isPending, data, error, refetch } = useGetPost(id);
  console.log("singleeeeeeeee", data);

  return (
    <Stack sx={{ py: 5, bgcolor: theme === "dark" ? "grey.800" : "grey.200" }}>
      {isPending ? (
        <Loading message="Is loading..." />
      ) : error ? (
        <LoadingError handleAction={refetch} message={error.message} />
      ) : (
        <Container maxWidth="md">
          <SinglePost
            post={data.data.body}
            profile={{
              profileImg: data.data.body.userId.profileImg,
              username: data.data.body.userId.username,
            }}
          />
        </Container>
      )}
    </Stack>
  );
}
