import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import noImage from "../../../assets/images/user.png";
import PostProfile from "./PostProfile";
import { useGetPostsUser } from "../../../utils/queries";
import LoadingError from "../../../components/LoadingError";
import Loading from "../../../components/Loading";

export default function MainSection() {
  const theme = useSelector((state) => state.app.theme);
  const profile = useSelector((state) => state.user.profile);

  const [openCreatePost, setOpenCreatePost] = useState(false);
  const { isPending, data, error, refetch } = useGetPostsUser(profile._id);

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
            onClose={() => {
              setOpenCreatePost(false);
            }}
          />
        </Stack>
      </Paper>
      {data.data.body ? (
        <Paper sx={{ p: 2, mt: 3, height: "100vh" }}>
          <Stack>
            {isPending ? (
              <Loading message="Loading Post..." />
            ) : error ? (
              <LoadingError message={error.message} handleAction={refetch} />
            ) : data?.data.body ? (
              <Stack>
                {data?.data.body.map((p) => {
                  return <Stack key={p}></Stack>;
                })}
              </Stack>
            ) : (
              ""
            )}
          </Stack>
        </Paper>
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
