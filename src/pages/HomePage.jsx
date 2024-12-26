import {
  Box,
  Button,
  Container,
  Divider,
  Grid2,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useGetAllUser } from "../utils/queries";
import Loading from "../components/Loading";
import LoadingError from "../components/LoadingError";
import noImage from "../../src/assets/images/user.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HomePage() {
  const { isPending, data, error, refetch } = useGetAllUser();
  const theme = useSelector((state) => state.app.theme);
  console.log(data);

  return (
    <Container fixed sx={{ mt: 5 }}>
      <Grid2 container>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <TextField label="Search" variant="outlined" sx={{ width: "100%" }} />
          <Typography sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }}>
            Make new friends
          </Typography>
          <Divider sx={{ mt: 2 }} />
          <Stack>
            {isPending ? (
              <Box>
                <Loading message="Is Loading" />
              </Box>
            ) : error ? (
              <LoadingError handleAction={refetch} message={error.message} />
            ) : (
              data.data.body.map((user) => {
                return (
                  <Stack
                    key={user._id}
                    sx={{
                      my: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 1,
                      borderRadius: "5px",
                      "&:hover": {
                        bgcolor: theme == "light" ? "grey.200" : "grey.800",
                      },
                    }}
                  >
                    <Stack
                      sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1,
                        textDecoration: "none",
                      }}
                      component={Link}
                      to={`profile/${user._id}`}
                    >
                      <Box
                        component="img"
                        sx={{
                          height: "50px",
                          width: "50px",
                          borderRadius: "50%",
                        }}
                        src={
                          user.profileImg
                            ? SERVER_URL + user.profileImg
                            : noImage
                        }
                      />
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: 17,
                          color: theme == "light" ? "grey.800" : "grey.200",
                        }}
                      >
                        {user.username[0].toUpperCase() +
                          user.username.slice(1)}
                      </Typography>
                    </Stack>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        alignItems: "center",
                      }}
                    >
                      <Button>Add frined</Button>
                    </Box>
                  </Stack>
                );
              })
            )}
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 9 }}></Grid2>
      </Grid2>
    </Container>
  );
}
