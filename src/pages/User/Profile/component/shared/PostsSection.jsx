import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import noImage from "../../../../../assets/images/user.png";
import PostProfile from "../userLogin/PostProfile";
import { useGetPostsUser } from "../../../../../utils/queries";
import LoadingError from "../../../../../components/LoadingError";
import Loading from "../../../../../components/Loading";
import SinglePost from "./SinglePost";

export default function PostsSection({ profile }) {
  const theme = useSelector((state) => state.app.theme);
  const [openCreatePost, setOpenCreatePost] = useState(false);

  const { isPending, data, error, refetch } = useGetPostsUser(profile._id);
  const [isLike, setIsLike] = useState(false);
  const menuAnchor = useRef(null);

  const [showComments, setShowComments] = useState(false);

  return (
    <Container>
      <Paper sx={{ p: 4 }}>
        <Stack sx={{ flexDirection: "row", gap: 2 }}>
          <Box
            component="img"
            src={profile.profileImg ? profile.profileImg : noImage}
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
      {data?.data.body ? (
        <Stack sx={{ mt: 3, minHeight: "100vh" }}>
          <Stack>
            {isPending ? (
              <Loading message="Loading Post..." />
            ) : error ? (
              <LoadingError message={error.message} handleAction={refetch} />
            ) : data?.data.body ? (
              <Stack>
                {data?.data.body.map((p) => {
                  return <SinglePost p={p} profile={profile} />;
                })}
              </Stack>
            ) : (
              ""
            )}
          </Stack>
        </Stack>
      ) : (
        <Alert
          sx={{
            textAlign: "center",
            fontSize: "20",
            fontWeight: "bold",
            mt: 3,
          }}
          severity="info"
        >
          There is no post
        </Alert>
      )}
    </Container>
  );
}
