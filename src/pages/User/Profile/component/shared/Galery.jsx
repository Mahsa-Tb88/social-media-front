import {
  Box,
  Container,
  Divider,
  Grid,
  Grid2,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetGalley } from "../../../../../utils/queries";
import Loading from "../../../../../components/Loading";
import LoadingError from "../../../../../components/LoadingError";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Galery() {
  const theme = useSelector((state) => state.app.theme);
  const id = useParams().id;
  const { isPending, data, error, refetch } = useGetGalley(id);
  const navigate = useNavigate();

  return (
    <Stack sx={{ py: 4, bgcolor: theme === "dark" ? "grey.800" : "grey.200" }}>
      {isPending ? (
        <Loading message="Is loading..." />
      ) : error ? (
        <LoadingError handleAction={refetch} message={error.message} />
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
                  data.data.body.videos.map((i, index) => {
                    return (
                      <Stack key={index} sx={{ my: 2, mx: 1 }}>
                        <Box
                          component="img"
                          sx={{
                            width: "300px",
                            height: "300px",
                            borderRadius: "5px",
                          }}
                          src={SERVER_URL + i.videos}
                        />
                        ;
                      </Stack>
                    );
                  })
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
