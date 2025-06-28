/* eslint-disable no-undef */
import {
  Box,
  Container,
  Divider,
  Grid2,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useGetGalley } from "../../../utils/queries";
import Loading from "../../../components/Loading";
import LoadingError from "../../../components/LoadingError";
import { useNavigate, useParams } from "react-router-dom";

export default function Galery() {
  const id = useParams().id;
  const { isPending, data, error, refetch } = useGetGalley(id);
  console.log("galery", data);
  const navigate = useNavigate();

  return (
    <Stack sx={{ py: 4 }}>
      {isPending ? (
        <Loading message="Is loading..." />
      ) : error ? (
        <LoadingError
          handleAction={refetch}
          message={error.response.data.message}
        />
      ) : (
        <Container maxWidth="md">
          <Paper sx={{ p: 2 }}>
            <Stack sx={{ mb: 7 }}>
              <Typography component="h3" variant="h4">
                Photos
              </Typography>
              <Divider sx={{ mt: 1, mb: 2 }} />
              <Stack>
                {data.data.body.photos.length ? (
                  <Grid2 container spacing={3}>
                    {data.data.body.photos.map((i, index) => {
                      return (
                        <Grid2
                          size={{ xs: 12, sm: 6, lg: 4 }}
                          key={index}
                          sx={{
                            textAlign: "center",
                            cursor: "pointer",
                            transition: "transform 0.3s ease-in-out",
                            "&:hover": {
                              transform: "scale(1.08)",
                            },
                          }}
                        >
                          <Box
                            component="img"
                            sx={{
                              width: "200px",
                              height: "200px",
                              borderRadius: "5px",
                            }}
                            src={SERVER_URL + i.image}
                            onClick={() => navigate("/post/" + i.id)}
                          />
                        </Grid2>
                      );
                    })}
                  </Grid2>
                ) : (
                  <Typography component="h5" variant="h5">
                    No photos to show!
                  </Typography>
                )}
              </Stack>
            </Stack>
            <Stack sx={{ mb: 7 }}>
              <Typography component="h3" variant="h4">
                Videos
              </Typography>
              <Divider sx={{ mt: 1, mb: 2 }} />
              <Stack>
                {data.data.body.videos.length ? (
                  <Grid2 container spacing={3}>
                    {data.data.body.videos.map((i, index) => {
                      return (
                        <Stack key={index}>
                          <Box
                            component="video"
                            sx={{
                              maxWidth: "300px",
                              height: "auto",
                              borderRadius: "5px",
                              textAlign: "center",
                              cursor: "pointer",
                              transition: "transform 0.3s ease-in-out",
                              "&:hover": {
                                transform: "scale(1.08)",
                              },
                            }}
                            src={SERVER_URL + i.video}
                            onClick={() => navigate("/post/" + i.id)}
                          />
                        </Stack>
                      );
                    })}
                  </Grid2>
                ) : (
                  <Typography component="h5" variant="h5">
                    No Videos to show!
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Paper>
        </Container>
      )}
    </Stack>
  );
}
