/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import noImage from "../../../../assets/images/user.png";
import PostProfile from "../../userLogin/PostProfile";
import { useGetPostsUser } from "../../../../utils/queries";
import LoadingError from "../../../../components/LoadingError";
import Loading from "../../../../components/Loading";
import SinglePost from "./SinglePost";
import { useParams } from "react-router-dom";

export default function PostsSection({ profile }) {
  const theme = useSelector((state) => state.app.theme);
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const userLogin = useSelector((state) => state.user.profile);
  const id = useParams().id;

  const { isPending, data, error, refetch } = useGetPostsUser(profile._id);
  function hasPermission() {
    if (id == userLogin.id) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Container>
      {hasPermission() && (
        <Paper sx={{ p: 4, mb: 3 }}>
          <Stack sx={{ flexDirection: "row", gap: 2 }}>
            <Box
              component="img"
              src={
                userLogin.profileImg
                  ? userLogin.profileImg.includes(SERVER_URL)
                    ? userLogin.profileImg
                    : SERVER_URL + userLogin.profileImg
                  : noImage
              }
              sx={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
            <Button
              sx={{
                bgcolor: theme === "dark" ? "grey.800" : "grey.200",
                width: "100%",
                borderRadius: "20px",
              }}
              disableElevation
              variant="outlined"
              onClick={() => setOpenCreatePost(true)}
            >
              What's on your mind?
            </Button>

            <PostProfile
              open={openCreatePost}
              onClose={() => setOpenCreatePost(false)}
              type="new"
            />
          </Stack>
        </Paper>
      )}
      {data?.data.body.length ? (
        <Stack sx={{ mt: 0, minHeight: "100vh" }}>
          <Stack>
            {isPending ? (
              <Loading message="Loading Post..." />
            ) : error ? (
              <LoadingError
                message={error.response.data.message}
                handleAction={refetch}
              />
            ) : data?.data.body.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
              ) ? (
              <Stack>
                {data?.data.body.map((p) => {
                  return (
                    <Stack key={p._id}>
                      <SinglePost post={p} profile={profile} />
                    </Stack>
                  );
                })}
              </Stack>
            ) : (
              ""
            )}
          </Stack>
        </Stack>
      ) : (
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "20",
            fontWeight: "bold",
            mt: 3,
          }}
          variant="h4"
        >
          There is no post yet!
        </Typography>
      )}
    </Container>
  );
}
