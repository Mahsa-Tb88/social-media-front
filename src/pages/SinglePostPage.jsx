import { Container, Stack } from "@mui/material";
import React from "react";
import SinglePost from "../components/profile/shared/post/SinglePost";
import { useGetPost } from "../utils/queries";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import LoadingError from "../components/LoadingError";

export default function SinglePostPage() {
  const id = useParams().id;
  const { isPending, data, error, refetch } = useGetPost(id);
  console.log("error", error);
  return (
    <Stack
      sx={{
        pt: 5,
      }}
    >
      {isPending ? (
        <Loading message="Is loading..." />
      ) : error ? (
        <LoadingError
          handleAction={refetch}
          message={error.response.data.message}
        />
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
